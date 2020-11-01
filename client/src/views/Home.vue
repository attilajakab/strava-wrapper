<template>
  <div>
    <Greeting v-bind:name="name" />
    <a href="http://localhost:9001/logout">Sign Out</a>
    <ActivityFilters />
    <ActivitiesList />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Greeting from '../components/Greeting';
import ActivitiesList from '../components/ActivitiesList';
import ActivityFilters from '../components/ActivityFilters';

export default {
  name: 'Home',
  components: {
    Greeting,
    ActivitiesList,
    ActivityFilters
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
