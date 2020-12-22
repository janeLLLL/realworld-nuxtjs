<template>
  <div class="article-meta">
    <nuxt-link
      :to="{
        name: 'profile',
        params: {
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
          params: {
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
      v-if="user.username !== article.author.username"
    >
      <i class="ion-plus-round"></i>
      &nbsp; Follow Eric Simons <span class="counter">(10)</span>
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
      v-if="user.username !== article.author.username"
    >
      <i class="ion-heart"></i>
      &nbsp; Favorite Post
      <span class="counter">({{ article.favoritesCount }}})</span>
    </button>
    <button class="btn btn-outline-danger btn-sm" @click="deleteArticle" v-else>
      <i class="ion-trash-a"></i>
      &nbsp; Delete Article
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { deleteArticle } from "@/api/article";

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
  },
};
</script>

<style>
</style>