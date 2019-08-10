const execa = require('execa')
const { readFile, outputFile } = require('fs-extra')
const ora = require('ora')
const { join } = require('path')
const { json2xml, xml2json } = require('xml-js')

const appcastXmlFileName = '.appcast.xml'
const zipFileName = 'plugin.zip'

async function main () {
  const type = process.argv[2]
  if (typeof type === 'undefined') {
    throw new Error('Need a release type')
  }
  await release(type)
}
main()

async function release (type) {
  const log = ora()

  // Read configuration
  const packageJsonPath = join(process.cwd(), 'package.json')
  const { name, repository, skpm } = require(packageJsonPath)
  const { githubUserName, repositoryName } = parseRepository(repository)

  // Update `package.json` version
  log.start('Updating package.json version')
  const { stdout } = await execa('npm', ['version', type])
  const newVersion = stdout.substring(1)
  const gitTagName = `${name}-${newVersion}`
  log.succeed('Updated package.json version')

  // Build the plugin, create `plugin.zip`
  log.start('Building plugin')
  await execa('npm', ['run', 'build'])
  log.succeed(`Built plugin at ${skpm.main}`)
  log.start(`Creating ${zipFileName}`)
  await execa('zip', ['-r', zipFileName, skpm.main, '-x', '.DS_Store'])
  log.succeed(`Created ${zipFileName}`)

  // Update `.appcast.xml` version
  log.start('Updating .appcast.xml version')
  await updateAppcastVersion(
    githubUserName,
    repositoryName,
    newVersion,
    gitTagName
  )
  log.succeed('Updated .appcast.xml version')

  // Commit changes, tag, and push
  log.start(
    `Committing package.json and .appcast.xml, creating Git tag ${gitTagName}`
  )
  await execa('git', ['add', 'package.json', appcastXmlFileName])
  await execa('git', ['commit', '--message', gitTagName])
  await execa('git', ['tag', '--annotate', gitTagName, '--message', gitTagName])
  log.start('Pushing changes')
  await execa('git', ['push', 'origin', 'master'])
  await execa('git', ['push', 'origin', gitTagName])
  log.succeed('Committed and pushed')

  // Create a new GitHub release, delete the `.zip`
  log.start('Creating a GitHub release')
  await execa('github-release', [
    'upload',
    '--token',
    process.env.GITHUB_TOKEN,
    '--owner',
    githubUserName,
    '--repo',
    repositoryName,
    '--tag',
    gitTagName,
    zipFileName
  ])
  log.succeed('Created GitHub release')
  log.start(`Deleting ${zipFileName}`)
  await execa('rm', [zipFileName])
  log.succeed(`Deleted ${zipFileName}`)
  log.info(
    `https://github.com/${githubUserName}/${repositoryName}/releases/tag/${gitTagName}`
  )
}

function parseRepository (repository) {
  const repositoryRegex = /^git:\/\/github.com\/([\w-]+)\/([\w-]+).git$/
  const matches = repository.url.match(repositoryRegex)
  return {
    githubUserName: matches[1],
    repositoryName: matches[2]
  }
}

async function updateAppcastVersion (
  githubUserName,
  repositoryName,
  version,
  gitTagName
) {
  const appcastXmlFilePath = join(process.cwd(), appcastXmlFileName)
  const appcastXml = await readFile(appcastXmlFilePath, 'utf8')
  const appcastJson = JSON.parse(xml2json(appcastXml, { compact: false }))
  appcastJson.elements[0].elements[0].elements.unshift(
    createAppcastItem(githubUserName, repositoryName, version, gitTagName)
  )
  const result = json2xml(appcastJson, { fullTagEmptyElement: true, spaces: 2 })
  return outputFile(appcastXmlFilePath, `${result}\n`)
}

function createAppcastItem (
  githubUserName,
  repositoryName,
  version,
  gitTagName
) {
  return {
    type: 'element',
    name: 'item',
    elements: [
      {
        type: 'element',
        name: 'enclosure',
        attributes: {
          url: `https://github.com/${githubUserName}/${repositoryName}/releases/download/${gitTagName}/${zipFileName}`,
          'sparkle:version': version
        }
      }
    ]
  }
}
