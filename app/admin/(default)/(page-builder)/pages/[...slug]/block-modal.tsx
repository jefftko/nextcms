'use client'
import React, { useEffect, useState, useRef } from 'react'
import { useBlockData } from '@/app/admin/block-data'
import ModalBasic from '@/components/admin/modal-basic'
import request from '@/utils/request'
import BlockCards from './block-cards'

export default function BlockModal() {
  const { blockModalOpen, setBlockModalOpen } = useBlockData()
  const [schemas, setSchemas] = useState([])

  const loadSchemas = async () => {
    const res = await request('/admin/api/block')
    console.log(res)
    if (res && res.length > 0) {
      setSchemas(res)
    }
  }
  useEffect(() => {
    loadSchemas()
  }, [])

  return (
    <>
      {/* Change your Plan */}
      <div className="m-1.5">
        {/* Start */}
        <ModalBasic isOpen={blockModalOpen} setIsOpen={setBlockModalOpen} title="Add Block">
          {/* Modal content */}
          <div className="px-5 pb-4 pt-4">
            <div className="grid grid-cols-12 gap-6">
              <BlockCards schemas={schemas} />
            </div>
          </div>
        </ModalBasic>
        {/* End */}
      </div>
    </>
  )
}
