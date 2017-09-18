#!/usr/bin/env node

const program = require('commander')
const pkg = require('./package.json')
const Jetpack = require('fs-jetpack')
const DIST_PATH = './dist'
const LEGACY_PATH = './legacy'

function cleanDist({ distPath }) {
  try {
    if (!distPath) throw 'You need to specify a distPath.'
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
  console.log('Cleaning GBS dist folder')
  Jetpack.remove(distPath)
}

program.version(pkg.version).usage('[options] <command>')
// .option('-C, --chdir <path>', 'change the working directory')
// .option('-c, --config <path>', `set config path. defaults to ${configPath}`)
// .option('-T, --no-tests', 'ignore test hook')

program
  .command('clean-dist')
  .alias('cd')
  .description('clears the dist folder')
  .action(() => {
    cleanDist({ distPath: DIST_PATH })
  })
  .on('--help', () => {
    console.log('  Examples:')
    console.log()
    console.log('    $ build-tools clean-dist')
    console.log()
  })

program.parse(process.argv)

if (program.args.length === 0) program.help()
