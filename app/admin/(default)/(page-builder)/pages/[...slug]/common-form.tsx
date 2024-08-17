'use client'
import React, { useEffect, useState, useRef, useCallback } from 'react'
import BlockField from '@/components/admin/block-field'
import type { AdditionalFieldProps, FieldProps } from '@/components/admin/block-field'
import { useAppProvider } from '@/app/admin/app-provider'

interface FormSchema {
  fields: Record<string, FieldProps>
}

export default function CommonForm() {
  const [formSchema, setFormSchema] = useState<FormSchema | null>(null)
  const { commonId, setCommonId, commonData, setCommonData } = useAppProvider()
  const updateTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    async function loadSchema(blockType: string) {
      const schema = await import(`@/components/common/${blockType}/schema`)
      //console.log(schema.default())
      setFormSchema(schema.default())
    }

    if (commonData) {
      if (commonId && !formSchema) {
        loadSchema(commonId)
      }
    }
  }, [commonId])

  const handleFieldChange = useCallback(
    (name, value) => {
      if (!commonId) {
        return
      }
      setCommonData((prev) => {
        return {
          ...prev,
          [commonId]: {
            ...prev[commonId],
            [name]: value,
          },
        }
      })
    },
    [commonId]
  )

  return (
    <div id="CommonForm" className="flex flex-wrap justify-between ">
      {formSchema &&
        commonId &&
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
              value={commonData[commonId][fieldName]}
              onChange={(value) => handleFieldChange(fieldName, value)}
            />
          )
        })}
    </div>
  )
}
