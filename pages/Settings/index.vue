<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                  v-model="user.image"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  v-model="user.username"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                  v-model="user.bio"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  v-model="user.email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  v-model="user.password"
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { updateUser } from "@/api/user";

export default {
  middleware: "authenticated",
  name: "SettingIndex",
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    async onSubmit() {
      console.log('user',this.user)
      try {
        //修改接口
        await updateUser({
          user: {
            bio: this.user.bio || "",
            email: this.user.email,
            image: this.user.image,
            password: this.user.password,
            username: this.user.username,
          },
        })

        //跳转
        this.$router.push({
          name: "profile",
          query: {
            username: this.user.username,
          },
        })
      } catch (error) {
        // console.log(error);
        console.dir(error);
      }
    },
  },
};
</script>

<style>
</style>