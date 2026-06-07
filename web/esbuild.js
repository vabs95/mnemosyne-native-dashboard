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

// Build frontend asset bundle
esbuild.build({
  entryPoints: [path.join(__dirname, 'src/index.tsx')],
  outfile: path.join(__dirname, '../dashboard/dist/index.js'),
  bundle: true,
  minify: true,
  sourcemap: false,
  format: 'iife',
  target: ['es2020'],
  plugins: [hermesSdkPlugin],
  loader: {
    '.css': 'css',
  },
}).then(() => {
  console.log('Build succeeded.');
}).catch(() => {
  process.exit(1);
});
