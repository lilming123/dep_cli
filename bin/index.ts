import { Command } from 'commander'
import { genByCommand } from 'lib'
import { cleanFiles } from 'lib/cleanFile'
import { genJSONFile } from 'lib/genFile'
import {
  analyzeCommandWords,
  bothOptionWords,
  cleanCommandWords,
  depthOptionWords,
  description,
  filePathOptionWords,
  logDepthError,
  version,
} from 'lib/utils/const.js'

const program = new Command()
// TODO: 添加版本自动控制
program
  .name('truth-cli')
  .description(description)
  .version(version)

// TODO: 更好的用户提示，将 description、options 的打印语句添加到 lib/utils/const.ts 中
program
  .command('analyze')
  .description(analyzeCommandWords)
  .option('-d, --dep [depth]', depthOptionWords, '2')
  .option('-j, --json [file-path]', filePathOptionWords)
  .option('-b, --both', bothOptionWords, false)
  .action(async ({ dep, json, both }) => {
    try {
      const depth = +dep
      if (Number.isNaN(depth))
        throw new TypeError('illegal type of depth')
      if (json && !both) {
        genJSONFile(depth - 1, json)
        return
      }
      await genByCommand(depth + 1, depth - 1, both)
    }
    catch (err: any) {
      logDepthError(err.message)
    }
  })

program
  .command('clean')
  .description(cleanCommandWords)
  .action(async () => {
    await cleanFiles()
  })

program.parse()
