// TeamSchema.ts

const ChangeLogSchema = () => ({
  name: 'ChangeLog',
  thumbnail: '/images/blocks/card.jpg',
  fields: {
    title: {
      kind: 'text',
      label: 'Title',
      description: 'The title of the team section',
      defaultValue: 'The humans behind the product',
      additional: {
        required: true,
        placeholder: 'Title',
      },
    },
    items: {
      kind: 'list',
      label: 'Items',
      description: 'A list of team members',
      fields: {
        name: {
          kind: 'text',
          label: 'Name',
          description: 'The name of the team member',
          defaultValue: 'John Doe',
        },
        date: {
          kind: 'date',
          label: 'Date',
          description: 'The date of the team section',
        },
        image: {
          kind: 'image',
          label: 'Image',
          description: 'The image of the team member',
        },
        description: {
          kind: 'richText',
          label: 'Description',
          description: 'A short description of the team member',
        },
      },
    },
  },
})

export default ChangeLogSchema
