# parcel-sourcemap-bug

A sourcemap bug occurs when using
```
"transformers": {
    "*.{ts,tsx}": [
      "@parcel/transformer-typescript-tsc"
    ]
  }
 ```
 
 You get duplicate entries in the `sources` field in the generated `.map` file.
 ```
 "sources": [
    "node_modules/@parcel/runtime-browser-hmr/lib/runtime-2c252ac6c9223f3b.js",
    "packages/a/src/server.ts",
    "server.ts",
    "packages/b/src/index.ts",
    "index.ts",
    "node_modules/@parcel/transformer-js/src/esmodule-helpers.js",
    "packages/b/src/same.ts",
    "same.ts",
    "packages/a/src/same.ts"
  ],
  ```
  
  Only the subsequent sources that only refer to the filenames are mapped (`server.ts`, `index.ts`, `same.ts`),
  but these obviously point no where relative to the `sourceRoot` so they are invalid.
  
  In addition, if two filenames are identical when importing from another package in the mono repo,
  their entries get overidden (notice how there is only one `same.ts`).
  
  You can easily see this if you inspect the sourcemap on https://sourcemap-visualiser.vercel.app/
  A `sourcemap-info.json` file has already been generated.
  
  If you remove the transformer plugin from `.parcelrc`, correct sourcemaps are generated.
  
