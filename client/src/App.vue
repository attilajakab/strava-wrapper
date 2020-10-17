<template>
  <div id="app">
    <header>
      <h1>Strava Wrapper</h1>
    </header>
    <div id="container">
      <Greeting v-bind:name="name" />
      <Login v-bind:name="name" />
      <Activities v-if="name" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Greeting from './components/Greeting';
import Login from './components/Login';
import Activities from './components/Activities';

export default {
  name: 'app',
  components: {
    Greeting,
    Login,
    Activities
  },
  mounted() {
    this.$store.dispatch('getUser');
  },
  computed: {
    ...mapState(['user']),
    name: function() {
      if (Object.keys(this.user).length !== 0) {
        return `${this.user.firstname} ${this.user.lastname}`;
      }

      return '';
    }
  }
};
</script>
