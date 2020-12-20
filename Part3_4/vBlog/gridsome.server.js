// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const axios = require('axios')

module.exports = function(api) {
  api.loadSource(async (actions) => {
    const { data } = require('./src/jsons/news.json')
    const collection = actions.addCollection({
      typeName: 'news',
    })
    collection.addNode(data)

    const res = await axios.get(
      'https://api.github.com/users/GitHub-Laziji/followers'
    )
    const collectionBlog = actions.addCollection({
      typeName: 'BlogLists',
    })
    for (const item of res.data) {
      collectionBlog.addNode({ ...item })
    }

    const blogRes = await axios.get(
      'https://api.github.com/users/GitHub-Laziji/gists?page=1&per_page=5'
    )
    console.log('blogRes', blogRes.data)
    const collectionBlogs = actions.addCollection({
      typeName: 'Blogs',
    })
    for (const val of blogRes.data) {
      console.log('val', val)
      collectionBlogs.addNode({
        id: val.id,
        createdAt: val.created_at,
        updatedA: val.updated_at,
        htmlUrl: val.html_url,
        avatarUrl: val.avatar_url,
      })
    }
  })
  // api.loadSource(({ addCollection }) => {
  // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
  // })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}
