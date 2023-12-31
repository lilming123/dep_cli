/* eslint-disable no-console */
// TODO: 完成各种报错以及其他打印语句
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { Chalk } from 'chalk'

const chalk = new Chalk({ level: 3 })
const __dirname = fileURLToPath(new URL('.', import.meta.url))
const __root = path.resolve(__dirname, '..')

// TODO: 根据项目根目录的 package.json 文件自动控制版本和描述
// 之前直接 import 会导致 dev 命令失效，暂时没有什么好办法
const v = '0.3.81'
const c = 'A command-line tool for analyzing dependencies under node_moudles'
const errorPrefix = chalk.bgRedBright('Error!')

const fileWirteError = `  ${errorPrefix} ${chalk.cyan.yellow('Here is error message:')}`
export function logFileWirteError(message: string) {
  console.log(`${fileWirteError}: ${message}\n`)
}

const depthError = `
  ${errorPrefix} ${chalk.redBright('illegal type of depth')}`
export function logDepthError() {
  console.log(`${depthError}\n`)
}

const logo = `
  ${chalk.greenBright.bold('TRUTH-CLI')} ${chalk.greenBright(`v${v}`)}
`
export function logLogo() {
  console.log(logo)
}

const webStart = `  ➜  ${chalk.whiteBright.bold('Local')}: ${chalk.cyan('http://localhost:3002')}\t`
export function logAnalyzeFinish(duration: number) {
  console.log(`${webStart} ${chalk.black('ready in')} ${chalk.whiteBright.bold(duration)} ${chalk.black('ms')}\n`)
}

const fileWriteFinished = `  ➜  ${chalk.whiteBright.bold('File:')}`
export function logFileWirteFinished(duration: number, p: string) {
  console.log(`${fileWriteFinished} ${chalk.cyan(path.resolve(p, './pkgs.json'))}\t${chalk.black('ready in')} ${chalk.whiteBright.bold(duration)} ${chalk.black('ms')}\n`)
}

const cleanError = `
  ${errorPrefix} ${chalk.black('There are no files to clean up')}
`
export function logCleanError() {
  console.log(cleanError)
}

const cleanFinish = `
  ${chalk.cyanBright.bold('File cleanup succeeded!')}
`
export function logCleanFinish() {
  console.log(cleanFinish)
}

export const description = chalk.cyan.bold(c)
export const version = chalk.greenBright.bold(v)

export const analyzeCommandWords = chalk.cyan.bold('Help developer analyze npm packages')
export const depthOptionWords = chalk.yellowBright('The depth of the packages, 3 for tree and 2 for pkgs.json by default')
export const filePathOptionWords = chalk.yellowBright('The path to the pkgs.json file')
export const bothOptionWords = chalk.yellowBright('Generate pkgs.json file and start webSite')

export const cleanCommandWords = chalk.cyan.bold('Clean the files that the website needs')

export const webPath = path.resolve(__root, './dist/web/')
export const devWebPath = path.resolve(__root, '../packages/web/')
