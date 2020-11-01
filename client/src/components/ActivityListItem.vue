<template>
  <div class="activity">
    <hr />
    <div>
      <router-link :to="`/activity/${activity._id}`">Open</router-link>
    </div>
    <p class="activity-date">
      <small>{{ activity.start_date | convertTimestampToDate }}</small>
    </p>
    <p class="activity-distance">
      <span class="activity-distance-value">{{
        activity.distance | convertMetersToKilometers | roundToDecimals
      }}</span>
      &nbsp;
      <span class="activity-distance-unit">km</span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Activity',
  props: ['activity']
};
</script>
