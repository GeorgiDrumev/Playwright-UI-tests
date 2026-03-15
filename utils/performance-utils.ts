import { expect } from "@playwright/test";

export class PerformanceUtils {
  private startTime: number = 0;

  public startTimer(): void {
    this.startTime = Date.now();
  }

  public getElapsedTime(): number {
    return Date.now() - this.startTime;
  }

  public stopTimer(): number {
    const elapsed = this.getElapsedTime();
    console.log(`Elapsed time: ${elapsed}ms`);
    return elapsed;
  }

  public assertLoadTime(maxTimeMs: number, description?: string): void {
    const elapsed = this.stopTimer();
    const message = description
      ? `${description} - Expected load time < ${maxTimeMs}ms, actual: ${elapsed}ms`
      : `Expected load time < ${maxTimeMs}ms, actual: ${elapsed}ms`;

    console.log(message);
    expect(elapsed, message).toBeLessThan(maxTimeMs);
  }

  public reset(): void {
    this.startTime = 0;
  }
}
