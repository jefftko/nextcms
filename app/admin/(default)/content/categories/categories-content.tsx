'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import CategoriesTable from './categories-table'
import LoadingSpinner from '@/components/admin/loading-spinner'
import { useAppProvider } from '@/app/admin/app-provider'
import ModalBasic from '@/components/admin/modal-basic'
import { useMessage } from '@/app/admin/message-provider'
import { addOrEditCategory, deleteCategory, getCategoryData } from '@/utils/contentActions'

interface Category {
  slug: string;
  name: string;
  description?: string;
  layout?: string;
}

function CategoryForm({ category, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    layout: 'default',
  })

  useEffect(() => {
    if (category) {
      setFormData(category)
    }
  }, [category])

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'slug') {
      const formattedSlug = formatSlug(value)
      setFormData((prev) => ({ ...prev, [name]: formattedSlug }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const formatSlug = (input: string) => {
    //slug  允许一个中划线, 不允许下划线
    return input
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // Correct: No change needed
      .replace(/[^\w-]+/g, '') // Remove unnecessary escape
      .replace(/--+/g, '-') // Remove unnecessary escape
      .replace(/__+/g,'_')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 px-5 py-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
          Slug
        </label>
        <input
          type="text"
          name="slug"
          id="slug"
          value={formData.slug}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="layout" className="block text-sm font-medium text-gray-700">
          Layout
        </label>
        <input
          type="text"
          name="layout"
          id="layout"
          value={formData.layout}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-700">
              <div className="flex flex-wrap justify-end space-x-2">
                <button className="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300" 
                onClick={onCancel}>Cancel</button>
                <button  type="submit" className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">Save</button>
              </div>
       </div>

    
    </form>
  )
}

export default function CategoriesContent() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const { loading, setLoading } = useAppProvider()
  const { setToast } = useMessage()
  const router = useRouter()

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    setLoading(true)
    try {
      const categoryData = await getCategoryData()
      const categoriesArray = Object.entries(categoryData).map(([slug, data]) => {
        // 添加类型检查
        if (typeof data === 'object' && data !== null) {
          return {
            slug,
            ...data,
          }
        }
        return { slug } // 如果 data 不是对象，返回一个包含 slug 的对象
      }) as Category[]
      setCategories(categoriesArray)
    } catch (error) {
      console.error('Error fetching categories:', error)
      setToast({ message: 'Error fetching categories', type: 'error' })
    }
    setLoading(false)
  }

  const handleAddCategory = () => {
    setEditingCategory(null)
    setIsModalOpen(true)
  }

  const handleEditCategory = (category) => {
    setEditingCategory(category)
    setIsModalOpen(true)
  }

  const handleDeleteCategory = async (slug) => {
    setLoading(true)
    try {
      const res = await deleteCategory(slug)
      if(res.status === 'success'){
      setToast({ message: 'Category deleted successfully', type: 'success' })
      await fetchCategories()
      }else{
        setToast({ message: 'Error deleting category', type: 'error' })
      }
    } catch (error) {
      console.error('Error deleting category:', error)
      setToast({ message: 'Error deleting category', type: 'error' })
    }
    setLoading(false)
  }

  const handleSaveCategory = async (data: Record<string, any>) => {
    setLoading(true)
    try {
      let categoryData: Record<string, any> = {}
      if(editingCategory){
        categoryData = {
          type: 'edit',
          oldSlug: editingCategory.slug,
          ...data,
        }
      }else{
        categoryData = {
          type: 'add',
          ...data,
        }
      }
       
      const res = await addOrEditCategory(categoryData)
     if(res.status === 'success'){
        setToast({ message: res.message, type: 'success' })
        await fetchCategories()
        setIsModalOpen(false)
      }else{
        setToast({ message: res.message, type: 'error' })
      }
    } catch (error) {
      console.error('Error saving category:', error)
      setToast({ message: 'Error saving category', type: 'error' })
    }
    setLoading(false)
  }

  return (
    <div className="mx-auto w-full max-w-[96rem] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 sm:flex sm:items-center sm:justify-between">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 md:text-3xl">
            Categories 📚
          </h1>
        </div>
        <div className="grid grid-flow-col justify-start gap-2 sm:auto-cols-max sm:justify-end">
          <button
            className="btn bg-indigo-500 text-white hover:bg-indigo-600"
            onClick={handleAddCategory}
          >
            <svg className="h-4 w-4 shrink-0 fill-current opacity-50" viewBox="0 0 16 16">
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1z" />
            </svg>
            <span className="ml-2">Add Category</span>
          </button>
        </div>
      </div>
      <CategoriesTable
        categories={categories}
        onEdit={handleEditCategory}
        onDelete={handleDeleteCategory}
        loading={loading}
      />
      <ModalBasic isOpen={isModalOpen} setIsOpen={setIsModalOpen} title="Add Category">
        <CategoryForm
          category={editingCategory}
          onSave={handleSaveCategory}
          onCancel={() => setIsModalOpen(false)}
        />
        
      </ModalBasic>
    </div>
  )
}


