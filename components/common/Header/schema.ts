// HeaderSchema.ts

const HeaderSchema = () => ({
  name: 'Header',
  fields: {
    nav: {
      kind: 'menu',
      label: 'Menu',
      description: 'The menu of the team section',
      additional: {
        required: true,
        placeholder: 'Menu',
      },
    },
  },
})

export default HeaderSchema
