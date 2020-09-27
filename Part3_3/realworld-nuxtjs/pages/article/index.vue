<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>

        <div class="article-meta">
          <a href=""><img src="http://i.imgur.com/Qr71crq.jpg"/></a>
          <div class="info">
            <a href="" class="author">Eric Simons</a>
            <span class="date">January 20th</span>
          </div>
          <button class="btn btn-sm btn-outline-secondary">
            <i class="ion-plus-round"></i>
            &nbsp; Follow Eric Simons <span class="counter">(10)</span>
          </button>
          &nbsp;&nbsp;
          <button class="btn btn-sm btn-outline-primary">
            <i class="ion-heart"></i>
            &nbsp; Favorite Post <span class="counter">(29)</span>
          </button>
        </div>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body"></div>
      </div>

      <hr />

      <div class="article-actions">
        <div class="article-meta">
          <a href="profile.html"><img src="http://i.imgur.com/Qr71crq.jpg"/></a>
          <div class="info">
            <a href="" class="author">Eric Simons</a>
            <span class="date">January 20th</span>
          </div>

          <button class="btn btn-sm btn-outline-secondary">
            <i class="ion-plus-round"></i>
            &nbsp; Follow Eric Simons <span class="counter">(10)</span>
          </button>
          &nbsp;
          <button class="btn btn-sm btn-outline-primary">
            <i class="ion-heart"></i>
            &nbsp; Favorite Post <span class="counter">(29)</span>
          </button>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <ArticleComments :article="article" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticle } from '@/api/article'
import MarkdownIt from 'markdown-it' // 把markdown 格式的字符串转成html格式
import ArticleComments from './components/article-comments'
export default {
  name: 'ArticleIndex',
  components: {
    ArticleComments,
  },
  async asyncData({ params }) {
    const { data } = await getArticle(params.slug)
    const { article } = data
    const md = new MarkdownIt()
    article.body = md.render(article.body)
    return {
      article: data.article,
    }
  },
  head() {
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.article.description,
        },
      ],
    }
  },
}
</script>

<style></style>
