import React from 'react'

export default function CategoriesTable({ categories, onEdit, onDelete, loading }) {
  return (
    <div className="bg-white shadow-lg rounded-sm border border-slate-200">
      <div className="overflow-x-auto">
        <table className="table-auto w-full divide-y divide-slate-200">
          <thead className="text-xs uppercase text-slate-500 bg-slate-50 border-t border-slate-200">
            <tr>
              <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div className="font-semibold text-left">Name</div>
              </th>
              <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div className="font-semibold text-left">Slug</div>
              </th>
              <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div className="font-semibold text-left">Description</div>
              </th>
              <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div className="font-semibold text-left">Layout</div>
              </th>
              <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div className="font-semibold text-left">Actions</div>
              </th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-200">
            {categories.map((category) => (
              <tr key={category.slug}>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-left font-medium text-slate-800">{category.name}</div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-left">{category.slug}</div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-left">{category.description}</div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="text-left">{category.layout}</div>
                </td>
                <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="space-x-1">
                    <button
                      className="text-slate-400 hover:text-slate-500 rounded-full"
                      onClick={() => onEdit(category)}
                      disabled={loading}
                    >
                      <span className="sr-only">Edit</span>
                      <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                        <path d="M19.7 8.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM12.6 22H10v-2.6l6-6 2.6 2.6-6 6zm7.4-7.4L17.4 12l1.6-1.6 2.6 2.6-1.6 1.6z" />
                      </svg>
                    </button>
                    <button
                      className="text-rose-500 hover:text-rose-600 rounded-full"
                      onClick={() => onDelete(category.slug)}
                      disabled={loading}
                    >
                      <span className="sr-only">Delete</span>
                      <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                        <path d="M13 15h2v6h-2zM17 15h2v6h-2z" />
                        <path d="M20 9c0-.6-.4-1-1-1h-6c-.6 0-1 .4-1 1v2H8v2h1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V13h1v-2h-4V9zm-6 1h4v1h-4v-1zm7 3v9H11v-9h10z" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}