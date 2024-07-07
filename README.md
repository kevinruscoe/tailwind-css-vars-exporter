# tailwind-css-vars-exporter

A tailwind plugin to export Tailwind variables as CSS variables.

## Usage 

Simply pull in the package and add it as a plugin to your tailwind.config.js file.

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-css-vars-exporter')('screens'),
  ],
}
```

The plugin exports a function that takes a "rules" argument which expects a dot-notated list of tailwind theme config value to export.

The example above will add

```css
:root {
  --screens-sm: 640px;
  --screens-md: 768px;
  --screens-lg: 1024px;
  --screens-xl: 1280px;
  --screens-2xl: 1536px
}
```

You can also pass an array of dot-notatated config values


```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-css-vars-exporter')(['screens', 'fontFamily']),
  ],
}
```

will add

```css
:root {
  --screens-sm: 640px;
  --screens-md: 768px;
  --screens-lg: 1024px;
  --screens-xl: 1280px;
  --screens-2xl: 1536px;
  --fontFamily-sans: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --fontFamily-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  --fontFamily-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace
}
```