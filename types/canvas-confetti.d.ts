declare module 'canvas-confetti' {
  interface ConfettiOptions {
    particleCount?: number;
    angle?: number;
    spread?: number;
    startVelocity?: number;
    decay?: number;
    gravity?: number;
    ticks?: number;
    x?: number;
    y?: number;
    shapes?: string[];
    colors?: string[];
    origin?: { x?: number; y?: number };
    scalar?: number;
  }

  interface ConfettiFunction {
    (options?: ConfettiOptions): Promise<null>;
  }

  const confetti: ConfettiFunction;
  export default confetti;
}
