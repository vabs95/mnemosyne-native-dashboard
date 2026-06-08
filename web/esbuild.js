const esbuild = require('esbuild');
const path = require('path');

// Plugin to map react and @hermes/sdk imports to global window objects
const hermesSdkPlugin = {
  name: 'hermes-sdk',
  setup(build) {
    // Redirect "react" to window.__HERMES_PLUGIN_SDK__.React
    build.onResolve({ filter: /^react$/ }, args => ({
      path: args.path,
      namespace: 'hermes-sdk-react',
    }));
    build.onLoad({ filter: /.*/, namespace: 'hermes-sdk-react' }, () => ({
      contents: `
        const React = window.__HERMES_PLUGIN_SDK__.React;
        export default React;
        export const useState = window.__HERMES_PLUGIN_SDK__.hooks.useState;
        export const useEffect = window.__HERMES_PLUGIN_SDK__.hooks.useEffect;
        export const useContext = window.__HERMES_PLUGIN_SDK__.hooks.useContext;
        export const useRef = window.__HERMES_PLUGIN_SDK__.hooks.useRef;
        export const useMemo = window.__HERMES_PLUGIN_SDK__.hooks.useMemo;
        export const useCallback = window.__HERMES_PLUGIN_SDK__.hooks.useCallback;
        export const createContext = window.__HERMES_PLUGIN_SDK__.hooks.createContext;
      `,
    }));

    // Redirect "@hermes/sdk" to window.__HERMES_PLUGIN_SDK__ components/utilities
    build.onResolve({ filter: /^@hermes\/sdk$/ }, args => ({
      path: args.path,
      namespace: 'hermes-sdk-core',
    }));
    build.onLoad({ filter: /.*/, namespace: 'hermes-sdk-core' }, () => ({
      contents: `
        const sdk = window.__HERMES_PLUGIN_SDK__;
        export const api = sdk.api;
        export const fetchJSON = sdk.fetchJSON;
        export const authedFetch = sdk.authedFetch;
        export const buildWsUrl = sdk.buildWsUrl;
        export const useI18n = sdk.useI18n;

        // Components
        export const Card = sdk.components.Card;
        export const CardHeader = sdk.components.CardHeader;
        export const CardTitle = sdk.components.CardTitle;
        export const CardContent = sdk.components.CardContent;
        export const Badge = sdk.components.Badge;
        export const Button = sdk.components.Button;
        export const Checkbox = sdk.components.Checkbox;
        export const Input = sdk.components.Input;
        export const Label = sdk.components.Label;
        export const Select = sdk.components.Select;
        export const SelectOption = sdk.components.SelectOption;
        export const Separator = sdk.components.Separator;
        export const Tabs = sdk.components.Tabs;
        export const TabsList = sdk.components.TabsList;
        export const TabsTrigger = sdk.components.TabsTrigger;
        export const PluginSlot = sdk.components.PluginSlot;

        // Utils
        export const cn = sdk.utils.cn;
        export const timeAgo = sdk.utils.timeAgo;
        export const isoTimeAgo = sdk.utils.isoTimeAgo;
      `,
    }));
  },
};

/**
 * Three.js vendor plugin.
 *
 * Any static `import ... from 'three'` in source files is intercepted and
 * replaced with an empty stub at bundle time. Three.js is intentionally NOT
 * bundled into the plugin output.
 *
 * The real Three.js is loaded lazily at runtime by threeLoader.ts via
 *   import('/static/vendor/three.module.min.js')
 * — an absolute-path dynamic import that esbuild leaves as a native browser
 * import() call and does not attempt to bundle.
 *
 * Result: Three.js (~540 KB) is absent from dist/index.js and is only fetched
 * the first time the user opens the Visualiser tab. The browser then caches it,
 * so subsequent visits (or other tabs that also use it) pay zero cost.
 */
const threeVendorPlugin = {
  name: 'three-vendor',
  setup(build) {
    build.onResolve({ filter: /^three$/ }, () => ({
      path: 'three',
      namespace: 'three-vendor-stub',
    }));
    build.onLoad({ filter: /.*/, namespace: 'three-vendor-stub' }, () => ({
      // Empty stub. All Three.js usage flows through threeLoader.ts at runtime.
      // TypeScript types come from @types/three (devDependency) — they are
      // erased by tsc and produce zero runtime bytes.
      contents: `
        // Three.js is loaded on demand from /static/vendor/three.module.min.js.
        // See web/src/utils/threeLoader.ts.
      `,
    }));
  },
};

const fs = require('fs');

// Build frontend asset bundle
esbuild.build({
  entryPoints: [path.join(__dirname, 'src/index.tsx')],
  outfile: path.join(__dirname, '../dashboard/dist/index.js'),
  bundle: true,
  minify: true,
  sourcemap: false,
  format: 'iife',
  target: ['es2020'],
  plugins: [hermesSdkPlugin, threeVendorPlugin],
  loader: {
    '.css': 'css',
  },
}).then(() => {
  // Ensure the vendor destination folder exists
  const destDir = path.join(__dirname, '../dashboard/dist/vendor');
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  // Copy three.module.min.js from node_modules
  const srcFile = path.join(__dirname, 'node_modules/three/build/three.module.min.js');
  const destFile = path.join(destDir, 'three.module.min.js');
  fs.copyFileSync(srcFile, destFile);
  console.log('Build succeeded and vendor assets copied.');
}).catch((err) => {
  console.error('Build failed:', err);
  process.exit(1);
});
