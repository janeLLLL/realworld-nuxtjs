<template>
  <!-- 顶部导航栏 -->
  <div>
    <nav class="navbar navbar-light">
      <div class="container">
        <!-- <a class="navbar-brand" href="index.html">conduit</a> -->
        <nuxt-link class="navbar-brand" to="/">Home</nuxt-link>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <!-- <a class="nav-link active" href="">Home</a> -->
            <nuxt-link class="nav-link" to="/" exact>Home</nuxt-link>
          </li>
          <!-- 登录了 -->
          <template v-if="user">
            <li class="nav-item">
              <!-- <a class="nav-link" href=""> -->
              <nuxt-link class="nav-link" to="/editor">
                <i class="ion-compose"></i>&nbsp;New Post
              </nuxt-link>
              <!-- </a> -->
            </li>
            <li class="nav-item">
              <!-- <a class="nav-link" href=""> -->
              <nuxt-link class="nav-link" to="/settings">
                <i class="ion-gear-a"></i>&nbsp;Settings
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" :to="{
                name:'profile',
                query:{
                  username: user.username,
                }
              }">
                <img
                  class="user-pic"
                  :src="user.image"
                />
                {{ user.username }}
              </nuxt-link>
            </li>
          </template>
          <!-- 未登录 -->
          <template v-else>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/login"> Sign up </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/register"> Sign in </nuxt-link>
            </li>
          </template>
        </ul>
      </div>
    </nav>

    <!-- 子路由 -->
    <nuxt-child />

    <!-- 底部 -->
    <footer>
      <div class="container">
        <a href="/" class="logo-font">conduit</a>
        <span class="attribution">
          An interactive learning project from
          <a href="https://thinkster.io">Thinkster</a>. Code &amp; design
          licensed under MIT.
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "LayoutIndex",
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style>
</style>