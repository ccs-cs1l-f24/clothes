## Usage <a name="usage"></a>

### Getting Started <a name="gettingStarted"></a>

#### Developing and building

This template comes with build configs for both Chrome and Firefox. Running
`dev` or `build` commands without specifying the browser target will build
for Chrome by default.

1. Clone this repository or click "Use this template"
2. Change `name` and `description` in `manifest.json`
3. Run `yarn` or `npm i` (check your node version >= 16)
4. Run `yarn dev[:chrome|:firefox]`, or `npm run dev[:chrome|:firefox]`

Running a `dev` command will build your extension and watch for changes in the
source files. Changing the source files will refresh the corresponding
`dist_<chrome|firefox>` folder.

To create an optimized production build, run `yarn build[:chrome|:firefox]`, or
`npm run build[:chrome|:firefox]`.

#### Load your extension

For Chrome

1. Open - Chrome browser
2. Access - [chrome://extensions](chrome://extensions)
3. Tick - Developer mode
4. Find - Load unpacked extension
5. Select - `dist_chrome` folder in this project (after dev or build)

For Firefox

1. Open - Firefox browser
2. Access - [about:debugging#/runtime/this-firefox](about:debugging#/runtime/this-firefox)
3. Click - Load temporary Add-on
4. Select - any file in `dist_firefox` folder (i.e. `manifest.json`) in this project (after dev or build)

### Customization <a name="customization"></a>

#### Adding / removing pages

The template includes source code for **all** of the extension pages (i.e. New Tab, Dev Tools, Popup, Side Panel
etc.). You will likely have to customize it to fit your needs.

E.g. you don't want the newtab page to activate whenever you open a new tab:

1. remove the directory `newtab` and its contents in `src/pages`
2. remove `chrome_url_overrides: { newtab: 'src/pages/newtab/index.html' },` in `manifest.json`

Some pages like the "Side Panel" don't work the exact same in Chrome and Firefox. While this template includes
the source code for the side panel, it won't automatically be included in the dist file to prevent cross browser
build warnings.

To include the side panel for Chrome add the following to the `manifest.json`:

```typescript
{
  "manifest_version": 3,
  // ...
  "permissions": [
    "activeTab",
    "sidePanel" // <-- permission for sidepanel
  ],
  // ...
  "side_panel": {
    "default_path": "src/pages/panel/index.html" // <-- tell vite to include it in the build files
  },
  // ...
}
```

If you need to declare pages in addition to the manifest pages, e.g. a custom `app` page, create a
new folder in the `pages` directory and add the corresponding `.html`, `.tsx` and `.css`
files (see `options/*` for an example to copy). Then include the root html in the `vite.config.base.ts`
file under `build.rollupOptions.input` like so:

```typescript
// ...
build: {
   rollupOptions: {
      input: {
         app: resolve(pagesDir, "app", "index.html"),
      },
      output: {
         entryFileNames: (chunk) => `src/pages/${chunk.name}/index.js`,
      },
   },
}
// ...
```

#### Styling

CSS files in the `src/pages/*` directories are not necessary. They are left in there in case you want
to use it in combination with Tailwind CSS. **Feel free to delete them**.

Tailwind can be configured as usual in the `tailwind.config.cjs` file. See doc link below.

# Credit <a name="credit"></a>

Heavily inspired by [Jonghakseo's vite chrome extension boilerplate](https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite).
It uses SASS instead of TailwindCSS and is ~~slightly~~ _a lot_ less minimalist in case you want to check it out.
