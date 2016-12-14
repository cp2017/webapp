// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'angular-cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-remap-istanbul'),
      require('angular-cli/plugins/karma'),
      require('karma-nightmare')
    ],
    files: [
      './node_modules/babel-polyfill/dist/polyfill.js',
      {pattern: './src/test.ts', watched: false},
      {pattern: './src/assets/ipfs-api/dist/index.js', watched: false}
    ],
    preprocessors: {
      './src/test.ts': ['angular-cli']
    },
    mime: {
      'text/x-typescript': ['ts', 'tsx']
    },
    remapIstanbulReporter: {
      reports: {
        html: 'coverage',
        lcovonly: './coverage/coverage.lcov'
      }
    },
    angularCli: {
      config: './angular-cli.json',
      environment: 'dev'
    },
    reporters: config.angularCli && config.angularCli.codeCoverage
      ? ['progress', 'karma-remap-istanbul']
      : ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
  //  browsers: ['Chrome'],
    browsers: ['Nightmare'],
    nightmareOptions: {
      width: 800,
      height: 600,
      show: false
    },
    // you can define custom flags
    customLaunchers: {
      'NodeWebkitWithCustomPath': {
        base: 'NodeWebkit',
        // Remember to include 'node_modules' if you have some modules there
        paths: ['node_modules', 'node_modules']
      }
    },
    singleRun: false
  });
};
