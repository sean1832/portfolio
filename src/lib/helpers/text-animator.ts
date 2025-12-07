export interface TextAnimatorConfig {
	revealSpeedMs: number;
	scrambleSpeedMs: number;
	pauseDurationMs?: number; // pause between text transitions (for multi-text mode)
	loop?: boolean; // whether to loop through texts (for multi-text mode)
}

/**
 * Defines the interface for a text decoding strategy.
 * Each strategy provides the logic for how to scramble the un-revealed characters.
 */
export interface IDecoderStrategy {
	/**
	 * Scrambles the un-revealed portion of the text.
	 * @param currentState The current character array of the text.
	 * @param targetText The final, target string.
	 * @param revealProgress The number of characters already revealed.
	 * @returns The updated character array.
	 */
	scramble(currentState: string[], targetText: string, revealProgress: number): string[];
}

/**
 * Uses a random set of characters.
 */
export class ScrambleStrategy implements IDecoderStrategy {
	static SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+=[]{}|;:,.<>?';

	private getRandomChar() {
		const i = Math.floor(Math.random() * ScrambleStrategy.SCRAMBLE_CHARS.length);
		return ScrambleStrategy.SCRAMBLE_CHARS.charAt(i);
	}

	public scramble(currentState: string[], targetText: string, revealProgress: number): string[] {
		for (let i = revealProgress; i < targetText.length; i++) {
			if (targetText[i] === ' ') {
				currentState[i] = ' ';
			} else {
				currentState[i] = this.getRandomChar();
			}
		}
		return currentState;
	}
}

/**
 * Uses the remaining characters from the target text, but shuffled.
 */
export class ShuffleStrategy implements IDecoderStrategy {
	/**
	 * A robust Fisher-Yates shuffle.
	 */
	private shuffleArray(arr: string[]): string[] {
		for (let i = arr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}
		return arr;
	}

	public scramble(currentState: string[], targetText: string, revealProgress: number): string[] {
		const remainingIndices: number[] = [];
		const remainingChars: string[] = [];

		// 1. Collect all non-space characters and their indices from the un-revealed part
		for (let i = revealProgress; i < targetText.length; i++) {
			if (targetText[i] !== ' ') {
				remainingIndices.push(i);
				remainingChars.push(targetText[i]);
			} else {
				// Ensure spaces are set correctly
				currentState[i] = ' ';
			}
		}

		// 2. Shuffle the collected characters
		this.shuffleArray(remainingChars);

		// 3. Re-assign the shuffled characters back to their original slots
		for (let k = 0; k < remainingIndices.length; k++) {
			const charIndex = remainingIndices[k];
			currentState[charIndex] = remainingChars[k];
		}

		return currentState;
	}
}

export class TextAnimator {
	el: HTMLElement;
	targetText: string;
	currentText: string[];
	animationFrameId: number | null;
	lastRevealTime: number;
	lastScrambleTime: number;
	revealProgress: number;
	config: TextAnimatorConfig;
	strategy: IDecoderStrategy;

	// multi-text mode properties
	texts: string[];
	currentTextIndex: number;
	pauseStartTime: number | null;
	isPaused: boolean;

	constructor(element: HTMLElement, strategy: IDecoderStrategy, texts?: string | string[]) {
		this.el = element;
		this.strategy = strategy;

		// handle multi-text mode
		if (Array.isArray(texts)) {
			this.texts = texts;
			this.currentTextIndex = 0;
			this.targetText = texts[0] || element.textContent || '';
		} else if (texts) {
			this.texts = [texts];
			this.currentTextIndex = 0;
			this.targetText = texts;
		} else {
			this.texts = [element.textContent || ''];
			this.currentTextIndex = 0;
			this.targetText = element.textContent || '';
		}

		this.currentText = this.targetText.split('');

		// animation loop and timing state
		this.animationFrameId = null;
		this.lastRevealTime = 0;
		this.lastScrambleTime = 0;

		this.revealProgress = 0;
		this.pauseStartTime = null;
		this.isPaused = false;

		this.config = {
			revealSpeedMs: 50,
			scrambleSpeedMs: 30,
			pauseDurationMs: 2000,
			loop: true
		};

		this.update = this.update.bind(this);
	}

	start() {
		// reset state
		this.revealProgress = 0;
		const now = performance.now();
		this.lastRevealTime = now;
		this.lastScrambleTime = now;

		// use strategy to set initial scrambled state
		this.strategy.scramble(this.currentText, this.targetText, 0);

		// stop any existing animation
		if (this.animationFrameId) {
			cancelAnimationFrame(this.animationFrameId);
		}

		this.animationFrameId = requestAnimationFrame(this.update);
	}

	update(timestamp: number) {
		// handle pause state (for multi-text transitions)
		if (this.isPaused && this.pauseStartTime !== null) {
			const pauseDuration = this.config.pauseDurationMs || 2000;
			if (timestamp - this.pauseStartTime >= pauseDuration) {
				// pause complete, move to next text
				this.isPaused = false;
				this.pauseStartTime = null;
				this.nextText();
				return; // nextText() will request a new frame
			}
			// still pausing, continue loop
			this.animationFrameId = requestAnimationFrame(this.update);
			return;
		}

		// check if animation is complete
		if (this.revealProgress >= this.targetText.length) {
			this.el.textContent = this.targetText; // final cleanup

			// if multi-text mode and should loop
			if (this.texts.length > 1 && this.config.loop) {
				// start pause before transitioning to next text
				this.isPaused = true;
				this.pauseStartTime = timestamp;
				this.animationFrameId = requestAnimationFrame(this.update);
			}
			return;
		}

		// reveal char logics
		if (timestamp - this.lastRevealTime > this.config.revealSpeedMs) {
			this.lastRevealTime = timestamp;
			this.revealProgress++;
		}

		// scramble logic
		if (timestamp - this.lastScrambleTime > this.config.scrambleSpeedMs) {
			this.lastScrambleTime = timestamp;

			// scramble all chars after the reveal progress index
			this.strategy.scramble(this.currentText, this.targetText, this.revealProgress);
		}

		// render output logic
		let output = '';
		for (let i = 0; i < this.targetText.length; i++) {
			if (i < this.revealProgress) {
				output += this.targetText[i];
			} else {
				output += this.currentText[i];
			}
		}
		this.el.textContent = output;

		// continue the loop
		this.animationFrameId = requestAnimationFrame(this.update);
	}

	stop() {
		if (this.animationFrameId) {
			cancelAnimationFrame(this.animationFrameId);
			this.animationFrameId = null;
		}

		// Restore the original text
		if (this.el) {
			this.el.textContent = this.targetText;
		}
	}

	setText(newText: string) {
		// stop any current animation
		if (this.animationFrameId) {
			cancelAnimationFrame(this.animationFrameId);
			this.animationFrameId = null;
		}

		// update target text
		this.targetText = newText;
		this.currentText = this.targetText.split('');

		// restart the animation
		this.start();
	}

	setTexts(newTexts: string[]) {
		// stop any current animation
		if (this.animationFrameId) {
			cancelAnimationFrame(this.animationFrameId);
			this.animationFrameId = null;
		}

		// update texts array
		this.texts = newTexts;
		this.currentTextIndex = 0;
		this.targetText = newTexts[0] || '';
		this.currentText = this.targetText.split('');

		// restart the animation
		this.start();
	}

	nextText() {
		// move to next text in the array
		this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
		this.targetText = this.texts[this.currentTextIndex];
		this.currentText = this.targetText.split('');

		// restart animation for new text
		this.revealProgress = 0;
		const now = performance.now();
		this.lastRevealTime = now;
		this.lastScrambleTime = now;

		// use strategy to set initial state for new text
		this.strategy.scramble(this.currentText, this.targetText, 0);

		this.animationFrameId = requestAnimationFrame(this.update);
	}

	setStrategy(newStrategy: IDecoderStrategy) {
		this.strategy = newStrategy;
		this.start(); // restart with new strategy
	}
}
