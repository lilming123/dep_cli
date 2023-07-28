import process from 'node:process'
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Command } from 'commander'
import { createServer } from 'vite'
import { analyze } from '../lib/analyze'
import useModules from '../lib/genPkgs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const program = new Command()
program.name('dep-cli').description('A command-line tool for analyzing dependencies under node_moudles').version('0.0.1')
program
  .description('analyze npm packages')
  .option('-d, --dep <depth>', 'display just the first substring', '1')
  .option('-j, --json <file-path>', 'separator character', './')

program.parse(process.argv)
const options = program.opts()

async function startVite() {
  useModules()

  const server = await createServer({
    // 任何合法的用户配置选项，加上 `mode` 和 `configFile`
    configFile: `${path.resolve(__dirname, '../../web/vite.config.ts')}`,
    root: `${path.resolve(__dirname, '../../web')}`,
  })
  await server.listen()

  server.printUrls()
}

const depth = +options.dep
if (depth < 7 && !Number.isNaN(depth))
  analyze(depth)

startVite()
