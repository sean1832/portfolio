/**
 * Reactive state for navbar appearance.
 * Controls whether navbar should be transparent (immersive mode) or solid.
 */

// Threshold in pixels, when scrolled past this, navbar becomes solid
const SCROLL_THRESHOLD = 100;

class NavbarState {
	/** Whether the page has an immersive hero section */
	isImmersive = $state(false);

	/** Current scroll position */
	scrollY = $state(0);

	/** Whether navbar should be transparent (immersive + not scrolled past hero) */
	isTransparent = $derived(this.isImmersive && this.scrollY < SCROLL_THRESHOLD);

	/** Hero section height for scroll calculations */
	heroHeight = $state(0);

	/** Whether scrolled past the hero section */
	isPastHero = $derived(this.scrollY > this.heroHeight - 64); // 64px = navbar height approx

	setImmersive(value: boolean) {
		this.isImmersive = value;
	}

	setHeroHeight(height: number) {
		this.heroHeight = height;
	}

	updateScroll(y: number) {
		this.scrollY = y;
	}

	reset() {
		this.isImmersive = false;
		this.scrollY = 0;
		this.heroHeight = 0;
	}
}

export const navbarState = new NavbarState();
