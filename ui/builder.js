// const Parcel = require('@parcel/core').default
const Bundler = require('parcel-bundler');
const path = require('path');
const { execSync } = require('child_process');
// const Rcon = require("rcon-client").Rcon

// const rcon = Rcon.connect({
//     host: "127.0.0.1", port: 30120, password: "verysecret"
// }).then(() => {
//   console.log("connected")
// })

const Rcon = require('rcon');

const options2 = {
  tcp: false, // false for UDP, true for TCP (default true)
  challenge: false, // true to use the challenge protocol (default true)
};

// const rconna = new Rcon('127.0.0.1', '30120', 'verysecret', options2);
// rconna
//   .on('auth', function () {
//     console.log('Authed!');
//   })
//   .on('response', function (str) {
//     // console.log("Got response: " + str);
//   })
//   .on('end', function () {
//     console.log('Socket closed!');
//     process.exit();
//   });

// rconna.connect();

const entryFiles = [path.join(__dirname, './index.html')];

const options = {
  distDir: './dist',
  publicUrl: '.',
  minify: false,
};

(async () => {
  const bundler = new Bundler(entryFiles, options);

  // bundler.on('buildEnd', async () => {
  //   rconna.send('ensure palikka');
  //
  //   // console.log(`running: ${postBuildFile}`);
  //   // const stdout = execSync(`${postBuildFile}`);
  //   // Do things with stdout
  // });

  const bundle = await bundler.bundle();
})();

// (async () => {
//   let bundler = new Parcel({
//     entries: path.join(__dirname, "index.html"),
//     defaultConfig: require.resolve("@parcel/config-default"),
//     additionalReporters: [{packageName: '@parcel/reporter-cli', resolveFrom: __filename}],
//     to: "./dist"
//     // defaultTargetOptions: options
//   });

//     //  bundler.on('buildEnd', async () => {
//     //     console.log(await rcon.send("status"))

//     //     // console.log(`running: ${postBuildFile}`);
//     //     // const stdout = execSync(`${postBuildFile}`);
//     //     // Do things with stdout
//     // });
//     console.log(bundler)

//   await bundler.run();
// })();
