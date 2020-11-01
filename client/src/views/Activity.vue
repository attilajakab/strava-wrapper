<template>
  <div>
    <h1>Activity</h1>
    <p>
      <strong>Total elevation gain</strong>: {{ activity.total_elevation_gain }}
    </p>
  </div>
</template>

<script>
import StravaService from '../services/StravaService';

export default {
  name: 'Activity',
  data() {
    return {
      activity: {}
    };
  },
  async beforeRouteEnter(to, from, next) {
    const { data } = await StravaService.getActivity(to.params.id);
    next(vm => vm.setActivity(data));
  },
  methods: {
    setActivity(activity) {
      this.activity = activity;
    }
  }
};
</script>
