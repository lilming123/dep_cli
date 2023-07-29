import chalk from 'chalk'
import { Command } from 'commander'
import genPkgs from 'lib'
import { analyze } from '../lib/analyze'
import { logDepthError } from '../lib/src/const'

const program = new Command()
program.name('truth-cli').description(chalk.cyan.bold('A command-line tool for analyzing dependencies under node_moudles')).version('0.0.1')

program.command('analyze')
  .description(chalk.bgCyanBright('Help developer analyze npm packages'))
  .option('-d, --dep [depth]', 'the depth of the packages', '2')
  .option('-j, --json [file-path]', 'the output file path')
  .action(async ({ dep, json }) => {
    const depth = +dep
    if (json) {
      await analyze(dep, json)
    }
    else {
      if (depth < 7 && !Number.isNaN(depth)) {
        await analyze(depth)
        await genPkgs()
      }
      else {
        logDepthError()
      }
    }
  })

program.parse()
