# BAKU

High-performance [Grasshopper 3D](https://en.wikipedia.org/wiki/Grasshopper_3D) plugin for simulating large number of particles using GPU acceleration.

![baku-demo](/tools/baku/baku-demo.mp4)

## About

This project started as a personal experiment to learn about GPU programming and high-performance computing. The goal is to create a high-performance particle simulation plugin for Grasshopper 3D using GPU acceleration.

## Features

- Real-time simulation of large number of particles with [Boids algorithm](https://en.wikipedia.org/wiki/Boids)
  - 10k particles in real-time on a RTX 4090
  - Currently unoptimized (looping all the boids positions), expect better performance in future releases.
- GPU accelerated using [ILGPU](https://github.com/m4rs-mt/ILGPU)
  - Up to 100x faster than CPU
  - Supports CUDA and OpenCL
  - Supports CPU fallback
- Customizable boid and particle behaviors
- Particle trails

## Installation

- Download the latest release from the [releases page](https://github.com/sean1832/baku/releases/latest).
- Unzip the file under the Grasshopper Libraries folder.
- Unblock the DLLs by right-clicking on the files, selecting properties, and clicking the `Unblock` button.
- Restart Rhino and Grasshopper.

## References

- [Coding Adventure: Boids](https://www.youtube.com/watch?v=bqtqltqcQhw&ab_channel=SebastianLague)
