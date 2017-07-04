const exec = require('child_process').exec;
const spawn = require('child_process').spawn;
const webpack = require('webpack');
const nodemon = require('nodemon');
const chalk = require('chalk');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');

const webpackConfigBackend = require('./webpack/webpack.config.backend.js');

exec('mkdir -p dist && printf \'{}\' > dist/stats.json', (err) => {
  if (err) {
    console.error('Could not create empty stats.json file');
  } else {
    spawn('webpack-dev-server', ['--config', './webpack/webpack.config.dev.js'], { stdio: 'inherit' });

    let serverRunning = false;
    const serverCompiler = webpack(webpackConfigBackend);
    serverCompiler.watch({}, () => {});

    serverCompiler.plugin('invalid', () => {
      console.log('Compiling server...');
    });
    serverCompiler.plugin('done', (stats) => {
      const messages = formatWebpackMessages(stats.toJson({}, true));
      const isSuccessful = !messages.errors.length && !messages.warnings.length;

      if (isSuccessful) {
        console.log(chalk.green.bold('Server has just been compiled successfully'));
      }

      if (messages.errors.length) {
        console.error(chalk.red.bold('Server has been compiled with errors'));
        messages.errors.forEach(error => console.error(error));
      }

      if (messages.warnings.length) {
        console.warn(chalk.blue.bold('Server has been compiled with warnings'));
        messages.warnings.forEach(warning => console.warn(warning));
      }

      if (isSuccessful && !serverRunning) {
        nodemon({
          script: 'dist/server.js',
          stdout: true
        });

        serverRunning = true;
      }
    });
  }
});
