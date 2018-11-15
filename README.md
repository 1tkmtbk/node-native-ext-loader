# Node Native Loader

Package for loading native files in Node and Electron applications. The project is inspired by the [node-addon-loader](https://github.com/ushu/node-addon-loader). It works in the similar way but **allows to build path at runtime**.

## Installation

Add the package to the development dependencies:

```bash
# using npm:
$ npm install native-ext-loader --save-dev

# using yarn:
$ yarn add --dev native-ext-loader
```

## Usage

Update rules entry in the Webpack configuration file:

```js
module: {
  rules: [
    {
      test: /\.node$/,
      loader: "native-ext-loader"
    }
  ];
}
```

## Options

Options are configurable using `options` hash:

```js
module: {
  rules: [
    {
      test: /\.node$/,
      loader: "native-ext-loader",
      options: {
        pathReg: /.*(node_modules[\/\\].*\.node$)/,
        basePath: ['resources', 'app'],
      }
    }
  ];
}
```

### `basePath` (default: `[]`)

It allows adjusting path to the native module. The array will be concatenated with the resource name and then used in the runtime. For example, when the compile application lives inside `app.asar/renderer` subdirectory (Electron package), the path to the native module can be adjusted by using `basePath: ['app.asar', 'renderer']`.

Note that `basePath` is ignored when `rewritePath` option is used.

### `pathReg` (default: `undefined`)

node_modules 以下の *.node ファイルまでのパスに関して、実行時の current working directory から正規表現の$1に該当するパスを native files のパスとして設定します。

basePath の指定がある場合、上記のパスの前に追加します。例では package 時のパスを想定しています。開発時は未設定で構わないと思います。

別途、*.node ファイルのあるフォルダを該当パスへDLL等含めてコピーする必要があります。
自動化できるもんならしたいところですが。。現状、知識不足です。


## Releasing a new version

1.  Bump version number in the `package.json` and `CHANGELOG.md` files.
1.  Run `npm install` to update `package-lock.json` file.
1.  Commit changes (include changes)
1.  Add a new tag (use `-a` and include changes)
1.  Push commits and tag
1.  Run `npm publish`
