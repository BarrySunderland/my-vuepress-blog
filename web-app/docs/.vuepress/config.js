const { description } = require('../../package')

module.exports = {

  title: 'Data Science Dev',
  description: description,

  // **
  //  * Extra tags to be injected to the page HTML `<head>`
  //  *
  //  * ref：https://v1.vuepress.vuejs.org/config/#head
   
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    logo: '/img/matterhorn_icon.jpg',
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    nav: [
      {
        text: 'Home',
        link: '/'
      },
      { 
        text: 'About',
        link: '/about/'
      },
      {
        text: 'Projects',
        link: '/projects/',
      },
      {
        text: 'Blog',
        link: '/blog/'
      },
    ],
    sidebar: 'auto'
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}
