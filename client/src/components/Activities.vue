<template>
  <div class="activites">
    <h1 class="activities-title">Activities...</h1>
    <div class="activities-container">
      <Activity
        v-for="(activity, index) in activities"
        :key="index"
        :activity="activity"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Activity from './Activity';

export default {
  name: 'Activities',
  components: {
    Activity
  },
  mounted() {
    this.$store.dispatch('getActivities');
  },
  computed: {
    ...mapState(['activities'])
  }
};
</script>
