<template>
  <div class="activity">
    <hr />
    <p class="activity-date">
      <small>{{ activity.start_date }}</small>
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
  props: ['activity'],
  filters: {
    convertMetersToKilometers(value) {
      return value && value > 0 ? value / 1000 : 0;
    },
    roundToDecimals(value, numberOfDecimals = 2) {
      return value.toFixed(numberOfDecimals);
    }
  }
};
</script>
