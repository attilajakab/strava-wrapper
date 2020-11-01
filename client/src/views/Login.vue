<template>
  <div class="login">
    <p v-if="showLoading">Loading...</p>
    <h1 v-else><a href="http://localhost:9001/login">Sign In</a></h1>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      showLoading: true
    };
  },
  async created() {
    await this.$store.dispatch('getUser');
    const user = this.$store.state.user;
    if (Object.prototype.hasOwnProperty.call(user, 'username')) {
      this.$router.push('/');
    } else {
      this.showLoading = false;
    }
  }
};
</script>
