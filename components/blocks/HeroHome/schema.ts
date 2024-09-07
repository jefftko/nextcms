const HeroHomeSchema = () => ({
  name: 'HeroHome',
  thumbnail: '/images/blocks/card.jpg',
  fields: {
    title: {
      kind: 'text',
      label: 'Title',
      description: 'The title of the hero section',
      defaultValue: 'Hero Section',
      additional: {
        required: true,
        placeholder: 'Title',
      },
    },
    subTitle: {
      kind: 'text',
      label: 'SubTitle',
      description: 'The subTitle of the hero section',
      defaultValue: 'SubTitle',
      additional: {
        required: true,
        placeholder: 'SubTitle',
        type: 'number',
      },
    },
    //descripiton
    description: {
      kind: 'richText',
      label: 'Description',
      description: 'The description of the hero section',
    },
    dateTime: {
      kind: 'date',
      label: 'Date',
      description: 'The date of the hero section',
      additional: {
        flatpickrOptions: {
          dateFormat: 'Y-m-d',
        },
      },
    },
    link: {
      kind: 'link',
      label: 'Link',
      description: 'The links of the hero section',
    },
    textArea: {
      kind: 'textArea',
      label: 'TextArea',
      description: 'The textArea of the hero section',
    },
    image: {
      kind: 'image',
      label: 'Image',
      description: 'The image of the hero section',
    },
    list: {
      kind: 'list',
      label: '列表',
      description: 'A list of items',
      fields: {
        itemTitle: {
          kind: 'text',
          label: 'Item Title',
          description: 'The title of the item',
          defaultValue: 'Default Item Title',
        },
        itemDescription: {
          kind: 'text',
          label: 'Item Description',
          description: 'The description of the item',
        },
      },
    },
    //链接按钮，最多不超过两个，可以为空，可选择样式
    /*links: {
      type: 'links',
      label: 'Links',
      description: 'The links of the hero section',
    },
    video: {
      type: 'string',
      label: 'Video',
      description: 'The video of the hero section',
    },*/
  },
})

export default HeroHomeSchema
