<template>
  <div>
    <datepicker
      :disabled-dates="{ from: new Date() }"
      :clear-button="true"
      :placeholder="'After date'"
      @selected="setAfterDate"
    ></datepicker>
    <input type="text" placeholder="Min. pace" @change="setMinPace" />
    <button type="button" v-on:click="getFilteredActivities">Filter</button>
    <div>
      <button type="button" v-if="filters.page > 1" @click="previous">
        Previous
      </button>
      <button type="button" v-if="activities.length === 10" @click="next">
        Next
      </button>
    </div>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'ActivityFilters',
  components: {
    Datepicker // eslint-disable-line
  },
  data() {
    return {
      filters: {
        after: null,
        minPace: null,
        page: 1
      }
    };
  },
  methods: {
    ...mapActions(['getActivities', 'getLatestActivities']),
    getFilteredActivities() {
      const filters = Object.keys(this.filters)
        .filter(key => (this.filters[key] ? true : false))
        .reduce((obj, key) => {
          return {
            ...obj,
            [key]: this.filters[key]
          };
        }, {});
      if (Object.keys(filters).length === 0) return;
      this.getActivities(filters);
    },
    setAfterDate(date) {
      this.filters.after = new Date(date).getTime() / 1000;
    },
    setMinPace(event) {
      const paceInMinsPerKm = event.target.value;
      const paceInMinsPerKmRegex = RegExp('^\\d{1,2}:\\d{2}$');
      const isValidPace = paceInMinsPerKmRegex.test(paceInMinsPerKm);
      if (!isValidPace) return;
      const colonIndex = paceInMinsPerKm.indexOf(':');
      const minutes = paceInMinsPerKm.substring(0, colonIndex);
      const seconds = paceInMinsPerKm.substring(
        colonIndex + 1,
        paceInMinsPerKm.length
      );
      const totalSeconds =
        Number.parseInt(minutes) * 60 + Number.parseInt(seconds);
      const speedInMetersPerSecs = (1000 / totalSeconds).toFixed(2);
      this.filters.minPace = speedInMetersPerSecs;
    },
    next() {
      this.filters.page += 1;
      this.getFilteredActivities();
    },
    previous() {
      this.filters.page -= 1;
      this.getFilteredActivities();
    }
  },
  computed: {
    ...mapState(['activities'])
  }
};
</script>
