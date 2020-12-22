<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>
              {{ profile.bio }}
            </p>
            <button
              v-if="user.username !== profile.username"
              class="btn btn-sm btn-outline-secondary action-btn"
              @click="userFollow(profile)"
              :class="{ active: profile.following }"
            >
              <i
                :class="
                  profile.following ? 'ion-plus-reduce' : 'ion-plus-round'
                "
              ></i>
              &nbsp;
              {{
                profile.following
                  ? "unFollow&nbsp;" + profile.username
                  : "Follow&nbsp;" + profile.username
              }}
            </button>
            <button
              v-else
              class="btn btn-sm btn-outline-secondary action-btn"
              @click="toSetting"
              :class="{ active: profile.following }"
            >
              <i class="ion-plus-setting"></i>
              &nbsp; Edit Profile Setting
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: favorited === undefined || favorited === '',
                  }"
                  exact
                  :to="{
                    name: 'profile',
                    query: {
                      username: profile.username,
                    },
                  }"
                  >My Articles</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: favorited === profile.username }"
                  exact
                  :to="{
                    name: 'profile',
                    query: {
                      username: profile.username,
                      favorited: profile.username,
                    },
                  }"
                  >Favorited Articles</nuxt-link
                >
              </li>
            </ul>
          </div>

          <div v-if="articles.length === 0">这里什么都没有</div>

          <div
            v-else
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
          <nav>
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
                    name: 'profile',
                    query: {
                      page: item,
                      tab: tab,
                      username: profile.username,
                    },
                  }"
                  >{{ item }}</nuxt-link
                >
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProfiles, follow, unFollow } from "@/api/profile";
import { getArticles, addFavorite, deleteFavorite } from "@/api/article";
import { mapState } from "vuex";

export default {
  middleware: "authenticated",
  name: "ProfileIndex",
  async asyncData({ query }) {
    const page = Number.parseInt(query.page || 1);
    const limit = 5;
    const { favorited, username } = query;
    const [artickeRes, profileRe] = await Promise.all([
      getArticles({
        limit, //分页参数
        offset: (page - 1) * limit, //跳过几条
        author: username,
        favorited: favorited,
      }),
      getProfiles(query.username),
    ]);
    const { articles, articlesCount } = artickeRes.data;
    const { profile } = profileRe.data;
    return {
      articlesCount: articlesCount,
      profile: profile,
      articles: articles,
      tab: query.tab || "my_articles",
      limit,
      page,
      favorited,
    };
  },
  computed: {
    ...mapState(["user"]),
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit);
    },
  },
  watchQuery: ["page", "tag", "favorited", "username"],
  methods: {
    toSetting() {
      this.$router.push({ name: "settings" });
    },
    //关注/取关用户
    async userFollow(profile) {
      if (profile.following) {
        await unFollow(profile.username);
      } else {
        await follow(profile.username);
      }
      profile.following = !profile.following;
    },
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