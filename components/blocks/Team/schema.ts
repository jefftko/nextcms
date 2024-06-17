const HeroHomeSchema = () => ({
  name: 'Team',
  thumbnail: '/images/blocks/card.jpg',
  fields: {
    title: {
      kind: 'textField',
      label: 'Title',
      description: 'The title of the hero section',
      defaultValue: 'Hero Section',
      additional: {
        required: true,
        placeholder: 'Title',
      },
    },
    subTitle: {
      kind: 'textField',
      label: 'SubTitle',
      description: 'The subTitle of the hero section',
      defaultValue: 'SubTitle',
    },
    //descripiton
    description: {
      kind: 'richText',
      label: 'Description',
      description: 'The description of the hero section',
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
