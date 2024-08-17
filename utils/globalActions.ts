//'use server'
import fs from 'fs'
import path from 'path'

/* Edit page */
//eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
//save global data to json file
export async function editGlobal(data: any) {
  if (!data) {
    return { status: 'error', message: 'Data is required.' }
  }

  const filePath = path.join(process.cwd(), 'data/global', `index.json`)

  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8')
    return { status: 'success', message: 'Global data saved successfully.' }
  } catch (err) {
    console.error(err)
    return { status: 'error', error: 'Error saving global data.' }
  }
}
