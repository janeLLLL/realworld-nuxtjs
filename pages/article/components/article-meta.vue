<template>
  <div class="article-meta">
    <nuxt-link
      :to="{
        name: 'profile',
        query: {
          username: article.author.username,
        },
      }"
      ><img :src="article.author.image"
    /></nuxt-link>

    <div class="info">
      <nuxt-link
        class="a"
        :to="{
          name: 'profile',
          query: {
            username: article.author.username,
          },
        }"
        >{{ article.author.username }}</nuxt-link
      >
      <span class="date">{{ article.createdAt | date }}</span>
    </div>
    <button
      class="btn btn-sm btn-outline-secondary"
      :class="{
        active: article.author.following,
      }"
      @click="userFollow(article.author)"
      v-if="user.username !== article.author.username"
    >
      <i :class="article.author.following ? 'ion-plus-reduce' : 'ion-plus-round'"></i>
      &nbsp;{{
        article.author.following
                  ? "unFollow&nbsp;" + article.author.username
                  : "Follow&nbsp;" + article.author.username
      }}
    </button>
    <button
      class="btn btn-sm btn-outline-secondary"
      @click="editArticle"
      v-else
    >
      <i class="ion-edit"></i>
      &nbsp; Edit Article
    </button>
    &nbsp;&nbsp;
    <button
      class="btn btn-sm btn-outline-primary"
      :class="{
        active: article.author.favorited,
      }"
      @click="onFavorite(article)"
      :disabled="article.favoriteDisabled"
      v-if="user.username !== article.author.username"
    >
      <i class="ion-heart"></i>
      &nbsp; Favorite Post
      <span class="counter">({{ article.favoritesCount }})</span>
    </button>
    <button class="btn btn-outline-danger btn-sm" @click="deleteArticle" v-else>
      <i class="ion-trash-a"></i>
      &nbsp; Delete Article
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { deleteArticle,addFavorite, deleteFavorite } from "@/api/article";
import { follow, unFollow } from "@/api/profile";

export default {
  name: "ArticleMeta",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    async editArticle() {
      this.$router.push({
        name:"editor",
        params:{
          article:this.article
        }
      })
    },
    async deleteArticle() {
      await deleteArticle(this.article.slug)
      this.$router.push('/')
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
    //点赞
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