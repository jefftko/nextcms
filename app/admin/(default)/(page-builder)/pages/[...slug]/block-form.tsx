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

export default function BlockForm() {
  const [formSchema, setFormSchema] = useState<FormSchema | null>(null)
  const { blockData, setBlockData } = useBlockData()
  const { pageData, blockId, setPageData } = usePageData()
  const updateTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    async function loadSchema(blockType: string) {
      const schema = await import(`@/components/blocks/${blockType}/schema`)
      //console.log(schema.default())
      setFormSchema(schema.default())
    }

    if (pageData) {
      //remove index from blockId
      console.log('blockForm', blockId)
      const block = pageData.blocks.find((block) => block.id === blockId)
      if (block) {
        setBlockData(block)
        loadSchema(block.type)
      }
    }
  }, [pageData, blockId])

  useEffect(() => {
    if (blockData) {
      if (updateTimeout.current) {
        clearTimeout(updateTimeout.current)
      }
      updateTimeout.current = setTimeout(() => {
        //@ts-ignore
        setPageData((prev) => {
          const newBlocks = prev.blocks.map((block) => {
            if (block.id === blockId) {
              return blockData
            }
            return block
          })
          return { ...prev, blocks: newBlocks }
        })
      }, 200)
    }
  }, [blockData])

  const handleFieldChange = useCallback((name, value) => {
    setBlockData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }, [])

  return (
    <div id="BlockForm" className="flex flex-wrap justify-between ">
      {formSchema &&
        Object.entries(formSchema.fields).map(([fieldName, field]) => {
          return (
            <BlockField
              key={fieldName}
              kind={field.kind}
              name={fieldName}
              label={field.label}
              additional={field.additional}
              fields={field.fields}
              defaultValue={field.defaultValue}
              value={blockData[fieldName]}
              onChange={(value) => handleFieldChange(fieldName, value)}
            />
          )
        })}
    </div>
  )
}
