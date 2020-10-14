<template>
  <div id="app">
    <header>
      <h1>Strava Wrapper</h1>
    </header>
    <div id="container">
      <Greeting v-bind:name="name" />
      <Login v-bind:name="name" />
    </div>
  </div>
</template>

<script>
import AuthService from './services/AuthService';

import Greeting from './components/Greeting';
import Login from './components/Login';

export default {
  name: 'app',
  components: {
    Greeting,
    Login
  },
  data() {
    return {
      name: '',
      user: null
    };
  },
  async mounted() {
    const { data: user } = await AuthService.getUser();
    if (Object.keys(user).length !== 0) {
      this.name = `${user.firstname} ${user.lastname}`;
      this.user = user;
    }
  }
};
</script>
