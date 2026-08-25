// On web the native splash screen does not exist, so no overlay is needed
// and the "splash finished" signal resolves immediately.
export const splashDone = Promise.resolve();

export function AnimatedSplashOverlay() {
  return null;
}
