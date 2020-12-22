<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link
                  v-if="user"
                  class="nav-link"
                  :class="{ active: tab === 'your_feed' }"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'your_feed',
                    },
                  }"
                  >Your Feed</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'global_feed' }"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'global_feed',
                    },
                  }"
                  >Global Feed</nuxt-link
                >
              </li>
              <li v-if="tag" class="nav-item">
                <nuxt-link
                  class="nav-link active"
                  :class="{ active: tab === 'tag' }"
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'tag',
                      tag: tag,
                    },
                  }"
                  >#{{ tag }}</nuxt-link
                >
              </li>
            </ul>
          </div>

          <!-- 文章列表 -->
          <div
            class="article-preview"
            v-for="article in articles"
            :key="article.slug"
          >
            <!-- slug是文章的路径别名 -->
            <div class="article-meta">
              <nuxt-link
                :to="{
                  name: 'profile',
                  query: {
                    username: article.author.username,
                  },
                }"
              >
                <img :src="article.author.image" />
              </nuxt-link>
              <div class="info">
                <nuxt-link
                  :to="{
                    name: 'profile',
                    query: {
                      username: article.author.username,
                    },
                  }"
                  >{{ article.author.username }}</nuxt-link
                >
                <span class="date">{{
                  article.createdAt | date("MMM DD, YYYY")
                }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{ active: article.favorited }"
                @click="onFavorite(article)"
                :disabled="article.favoriteDisabled"
              >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link
              :to="{
                name: 'article',
                params: {
                  slug: article.slug,
                },
              }"
            >
              <h1>{{ article.title }}</h1>
              <p>{{ article.body }}</p>
              <span>Read more...</span>
              <ul class="tag-list" style="float: right">
                <li
                  class="tag-default tag-pill tag-outline"
                  v-for="item in article.tagList"
                  :key="item"
                >
                  {{ item }}
                </li>
              </ul>
            </nuxt-link>
          </div>

          <!-- 页码 -->
          <nav v-if="$route.query.tab !== 'your_feed'">
            <ul class="pagination">
              <li
                class="page-item"
                :class="{ active: item === page }"
                v-for="item in totalPage"
                :key="item"
              >
                <nuxt-link
                  class="page-link"
                  :to="{
                    name: 'home',
                    query: {
                      page: item,
                      tag: $route.query.tag,
                      tab: tab,
                    },
                  }"
                  >{{ item }}</nuxt-link
                >
              </li>
            </ul>
          </nav>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link
                :to="{
                  name: 'home',
                  query: {
                    tab: 'tag',
                    tag: item,
                    page: $route.query.page,
                  },
                }"
                class="tag-pill tag-default"
                v-for="item in tags"
                :key="item"
                >{{ item }}</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticles, addFavorite, deleteFavorite } from "@/api/article";
import { getTags } from "@/api/tag";
import { mapState } from "vuex";

export default {
  name: "HomeIndex",
  //提高首屏渲染速度，支持SEO
  async asyncData({ query }) {
    const page = Number.parseInt(query.page || 1);
    const limit = 20;
    const { tag } = query;
    //将串行任务改成异步任务
    const [artickeRes, tagRes] = await Promise.all([
      getArticles({
        limit: query.tab === "your_feed" ? 10 : limit, //分页参数
        offset: query.tab === "your_feed" ? 0 : (page - 1) * limit, //跳过几条
        tag: tag,
      }),
      getTags(),
    ]);

    const { articles, articlesCount } = artickeRes.data;
    const { tags } = tagRes.data;

    return {
      articles: articles,
      articlesCount: articlesCount, //分页
      tags: tags,
      limit,
      page,
      tag,
      tab: query.tab || "global_feed",
    };
  },
  watchQuery: ["page", "tag", "tab"],
  computed: {
    ...mapState(["user"]),
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit);
    },
  },
  methods: {
    async onFavorite(article) {
      article.favoriteDisabled = true;
      console.log(article.favoriteDisabled);
      if (article.favorited) {
        //取消点赞
        await deleteFavorite(article.slug);
        article.favorited = false;
        article.favoritesCount += -1;
      } else {
        //添加点赞
        await addFavorite(article.slug);
        article.favorited = true;
        article.favoritesCount += 1;
      }
      article.favoriteDisabled = false;
      console.log(article.favoriteDisabled);
    },
  },
};
</script>

<style>
</style>