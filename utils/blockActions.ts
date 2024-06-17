//'use server'
import fs from 'fs'
import path from 'path'

const blocksDir = path.join(process.cwd(), 'components/blocks')
const outputFile = path.join(process.cwd(), 'components/ComponentMap.ts')

/* Create page */

/*export async function createPage(data: any) {
  const frontMatter = { ...data }
  const mdxContent = matter.stringify('', frontMatter)
  //@ts-ignore
  const posts = allCoreContent(sortPosts(allPages)) as Pages[]
  //checkPagePath empty or not
  if (!data.pagePath || data.pagePath === '') {
    return { status: 'error', message: 'Page path is required.' }
  }
  //check if pagePath already exists
  for (const post of posts) {
    if (post.pagePath === data.pagePath) {
      return { status: 'error', message: 'Page path already exists.' }
    }
  }
  const filePath = path.join(process.cwd(), 'data/pages', `${data.pagePath.replace(/ /g, '-')}.mdx`)
  //if filePath alreay exists reutrn error
  if (fs.existsSync(filePath)) {
    return { status: 'error', message: 'Page path already exists.' }
  }
  try {
    fs.writeFileSync(filePath, mdxContent, 'utf8')
    return { status: 'success', message: 'MDX file saved successfully.' }
  } catch (err) {
    console.error(err)
    return { status: 'error', error: 'Error saving MDX file.' }
  }
}*/

export const loadSchemas = () => {
  const blockFolders = fs
    .readdirSync(blocksDir)
    .filter((file) => fs.statSync(path.join(blocksDir, file)).isDirectory())
  console.log(blockFolders)

  const schemas = blockFolders
    .map((block) => {
      const schemaPath = path.join(blocksDir, block, 'schema.ts')
      if (fs.existsSync(schemaPath)) {
        const schema = require(`@/components/blocks/${block}/schema`).default
        return { ...schema(), type: block }
      }
      return null
    })
    .filter(Boolean)

  return schemas
}

export const generateComponentMap = () => {
  const blockFolders = fs
    .readdirSync(blocksDir)
    .filter((file) => fs.statSync(path.join(blocksDir, file)).isDirectory())

  const imports = blockFolders
    .map((block) => `import ${block} from '../blocks/${block}';`)
    .join('\n')
  const componentMap = `const componentMap = {\n  ${blockFolders.map((block) => `${block},`).join('\n  ')}\n};\n\nexport default componentMap;`

  const fileContent = `${imports}\n\n${componentMap}`

  fs.writeFileSync(outputFile, fileContent)
}
