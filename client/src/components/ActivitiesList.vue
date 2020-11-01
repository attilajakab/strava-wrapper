<template>
  <div class="activites">
    <h1 class="activities-title">Activities...</h1>
    <div class="activities-container">
      <ActivityListItem
        v-for="(activity, index) in activities"
        :key="index"
        :activity="activity"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import ActivityListItem from './ActivityListItem';

export default {
  name: 'Activities',
  components: {
    ActivityListItem
  },
  mounted() {
    this.$store.dispatch('getLatestActivities');
  },
  computed: {
    ...mapState(['activities'])
  }
};
</script>
