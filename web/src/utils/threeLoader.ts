/**
 * Lazy loader for Three.js.
 *
 * Three.js is NOT bundled into the plugin. Instead it is loaded on demand
 * from the platform vendor file (/static/vendor/three.module.min.js) the
 * first time the Visualiser tab is opened. Subsequent calls return the
 * already-resolved module immediately.
 *
 * This keeps the main plugin bundle small and avoids loading Three.js for
 * users who never open the Visualiser tab.
 */

import type * as THREEns from 'three';

export type ThreeModule = typeof THREEns;

let _cached: ThreeModule | null = null;
let _pending: Promise<ThreeModule> | null = null;

export function getThree(): Promise<ThreeModule> {
  if (_cached) return Promise.resolve(_cached);
  if (_pending) return _pending;

  let vendorPath = '/dashboard-plugins/mnemosyne-native-dashboard/dist/vendor/three.module.min.js';
  const currentScript = typeof document === 'undefined' ? null : (document.currentScript as HTMLScriptElement);
  if (currentScript?.src) {
    try {
      vendorPath = new URL('./vendor/three.module.min.js', currentScript.src).pathname;
    } catch (err) {
      console.warn('Failed to resolve vendor path from script tag, using default', err);
    }
  }

  const staticPath = '/static/vendor/three.module.min.js';
  _pending = (
    import(vendorPath as any) as Promise<ThreeModule>
  ).catch(() => {
    // If the plugin-relative path fails or returns non-JS, try the platform-wide static vendor path
    return import(staticPath as any) as Promise<ThreeModule>;
  }).then((mod) => {
    _cached = mod;
    _pending = null;
    return mod;
  }).catch((err) => {
    _pending = null; // allow retry on next call
    throw err;
  });

  return _pending;
}

/** Returns the cached module synchronously, or null if not yet loaded. */
export function getThreeSync(): ThreeModule | null {
  return _cached;
}
