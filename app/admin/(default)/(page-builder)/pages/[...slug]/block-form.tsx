'use client'
import React, { useEffect, useState, useRef, useCallback } from 'react'
import { usePageData } from '@/app/admin/page-data'
import type { Pages } from 'contentlayer/generated'
import BlockField from '@/components/admin/block-field'
import type { AdditionalFieldProps, FieldProps } from '@/components/admin/block-field'
import { useBlockData } from '@/app/admin/block-data'

interface FormSchema {
  fields: Record<string, FieldProps>
}

export default function BlockForm({ blockType }) {
  const [formSchema, setFormSchema] = useState<FormSchema | null>(null)
  const { blockData, setBlockData } = useBlockData()
  const { pageData, blockId, setPageData } = usePageData()

  async function loadSchema(blockType: string) {
    const schema = await import(`@/components/blocks/${blockType}/schema`)
    //console.log(schema.default())
    setFormSchema(schema.default())
  }

  useEffect(() => {
    if (blockType) {
      loadSchema(blockType)
    }
  }, [blockId, blockType])

  const handleFieldChange = useCallback((name, value) => {
    setBlockData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }, [])

  return (
    <div id={`BlockForm-${blockId}`} className="flex flex-wrap justify-between ">
      {formSchema &&
        Object.entries(formSchema.fields).map(([fieldName, field]) => {
          return (
            <BlockField
              key={`${blockId}-${fieldName}`}
              kind={field.kind}
              name={fieldName}
              label={field.label}
              additional={field.additional}
              fields={field.fields}
              defaultValue={field.defaultValue}
              value={blockData?.[fieldName]}
              onChange={(value) => handleFieldChange(fieldName, value)}
            />
          )
        })}
    </div>
  )
}
