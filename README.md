Bundled code has different behavior to unbundled code
=====================================================

To reproduce the issue you should be able to run:


```
$ git clone https://github.com/chromy/2019-02-21-immer-and-rollup-bug.git
$ cd 2019-02-21-immer-and-rollup-bug
$ ./node_modules/.bin/rollup index.js --format iife -o bundle.js -c rollup.config.js
$ node index.js
$ node bundle.js
```

The output of the last two commands differ when they should be the same.


## Details

Hi, I'm running into problems bundling
[immer](https://github.com/mweststrate/immer)
with `rollup`, `rollup-plugin-commonjs`, and, `rollup-plugin-node-resolve`.

Given the following code:

```
const immer = require("immer");
console.log(immer);
console.log(immer.applyPatches);
```

I generated `bundle.js` as follows:


```
$ ./node_modules/.bin/rollup index.js --format iife -o bundle.js -c rollup.config.js
```

Now when I run `index.js` I get different results to when I run `bundle.js`:

```
$ node index.js
{ produce: [Function: bound produce],
  default: [Function: bound produce],
  setAutoFreeze: [Function: bound setAutoFreeze],
  setUseProxies: [Function: bound setUseProxies],
  applyPatches: [Function: bound applyPatches$$1],
  createDraft: [Function: bound createDraft],
  finishDraft: [Function: bound finishDraft],
  Immer: [Function: Immer],
  original: [Function: original],
  isDraft: [Function: isDraft],
  isDraftable: [Function: isDraftable],
  nothing: Symbol(immer-nothing),
  immerable: Symbol(immer-draftable) }
[Function: bound applyPatches$$1]
```

```
$ node bundle.js
[Function: bound produce]
undefined
```

It seems that the bundled version is getting the `default` export somehow rather
than the whole module.


Thanks for your help!
