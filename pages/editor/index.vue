<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <ul class="error-messages">
            <template v-for="(messages, field) in errors">
              <li v-for="(message, index) in messages" :key="index">
                {{ field }} {{ message }}
              </li>
            </template>
          </ul>
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="article.title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="article.description"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="article.body"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  v-model="article.tagList"
                />
                <div class="tag-list"></div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click="onSubmit"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createArticle } from "@/api/article";

export default {
  //在路由匹配组件渲染之前会先执行中间件处理
  middleware: "authenticated",
  name: "EditorIndex",
  // async asyncData({ params }) {
  //   const { article } = params;
  //   return article;
  // },
  data() {
    return {
      article: {
        title: "",
        description: "",
        body: "",
        tagList: "",
      },
      errors: [],
    };
  },
  mounted() {
    if (this.$route.params.article) {
      const article = this.$route.params.article;
      console.log(article);
      if (Object.keys(article).length !== 0) {
        this.article = article;
      }
    }
  },
  methods: {
    async onSubmit() {
      try {
        this.article.tagList = this.article.tagList.split(",");
        //提交表单请求登录
        const data = await createArticle({
          article: this.article,
        });
        const { slug } = data.data.article;
        //跳转
        this.$router.push({
          name: "article",
          params: {
            slug: slug,
          },
        });
      } catch (error) {
        console.dir(error);
        this.errors = error.response.data.errors;
      }
    },
  },
};
</script>

<style>
</style>