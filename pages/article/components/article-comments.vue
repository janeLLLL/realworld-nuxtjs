<template>
  <div>
    <form class="card comment-form">
      <div class="card-block">
        <textarea
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
          v-model="comment.body"
        ></textarea>
      </div>
      <div class="card-footer">
        <img :src="article.author.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary" @click="addUserCommond">Post Comment</button>
      </div>
    </form>

    <div class="card" v-for="(comment,index) in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">
          {{ comment.body }}
        </p>
      </div>
      <div class="card-footer">
        <nuxt-link
          href=""
          class="comment-author"
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username,
            },
          }"
        >
          <img
            :src="comment.author.image"
            class="comment-author-img"
          />
        </nuxt-link>
        &nbsp;
        <a href="" class="comment-author">{{ comment.author.username }}</a>
        <span class="date-posted">{{ comment.createdAt | date() }}</span>
        <span v-if="comment.author.username === user.username" class="mod-options" @click="deleteComment(comment.id,index)">
          <i class="ion-trash-a"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { getComments,addComments, deleteComments } from "@/api/article";
import { mapState } from "vuex";

export default {
  name: "ArticleComments",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(["user"])
  },
  data() {
    return {
      comments: [],
      comment:{
        body:""
      }
    };
  },
  async mounted() {
    const { data } = await getComments(this.article.slug);
    this.comments = data.comments;
  },
  methods:{
    async addUserCommond(){
      if(this.comment.body){
        await addComments(this.article.slug, this.comment);
        this.comment = {
          body:""
        }
      }
    },
    async deleteComment(id,index){
      await deleteComments(this.article.slug,id)
      this.comments.splice(index,1)
    }
  }
};
</script>

<style>
</style>