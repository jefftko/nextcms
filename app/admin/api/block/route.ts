import { type NextRequest, NextResponse } from 'next/server'
import { loadSchemas } from '@/utils/blockActions'

//edit Page
export async function GET(req: NextRequest) {
  const schemas = loadSchemas()
  return NextResponse.json(schemas, { status: 200 })
}
