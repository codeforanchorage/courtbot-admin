require('babel-register')
var config = require('../../config')
var chromedrive = require('chromedriver')

// http://nightwatchjs.org/gettingstarted#settings-file
module.exports = {
  src_folders: ['test/e2e/specs'],
  output_folder: 'test/e2e/reports',
  custom_assertions_path: ['test/e2e/custom-assertions'],
  globals_path: './globals.js',
  /* selenum is difficult to run from node on travis ci
     so this just uses the standalone chrome driver */
  selenium: {
    start_process: false,
    server_path: require('selenium-server').path,
    host: '127.0.0.1',
    port: 9515,
    cli_args: {
      'webdriver.chrome.driver': chromedrive.path
    }
  },

  test_settings: {
    default: {
      selenium_port: 9515,
      selenium_host: '127.0.0.1',
      default_path_prefix: "",
      desiredCapabilities: {
        browserName: "chrome",
        chromeOptions : {
          args : ["--no-sandbox", "headless"]
        },
        acceptSslCerts: true
      },
      globals: {
        devServerURL: 'http://localhost:' + (process.env.PORT || config.dev.port)
      }
    },

    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    }
  }
}
