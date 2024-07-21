// TeamSchema.ts

const TeamSchema = () => ({
  name: 'Team',
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
    members: {
      kind: 'list',
      label: 'Team Members',
      description: 'A list of team members',
      fields: {
        name: {
          kind: 'text',
          label: 'Name',
          description: 'The name of the team member',
          defaultValue: 'John Doe',
        },
        position: {
          kind: 'text',
          label: 'Position',
          description: 'The position of the team member',
          defaultValue: 'CEO & Co-founder',
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
        twitter: {
          kind: 'text',
          label: 'Twitter',
          description: 'Twitter URL',
        },
        github: {
          kind: 'text',
          label: 'GitHub',
          description: 'GitHub URL',
        },
        linkedin: {
          kind: 'text',
          label: 'LinkedIn',
          description: 'LinkedIn URL',
        },
      },
    },
  },
})

export default TeamSchema
