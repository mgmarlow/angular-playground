# Playground Angular CLI Example

## Development:

Install dependencies:
```
cd examples/cli-example/
npm i
```

Run `npm run playground:build` to replace the installed angular-playground with the development version.

`npm run playground` accesses `node_modules/angular-playground/dist/bin/index.js` directory, so changes
within the CLI will require `npm run playground:build` to be run before changes will appear.