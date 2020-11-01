import Vue from 'vue';

Vue.filter('convertMetersToKilometers', value =>
  value && value > 0 ? value / 1000 : 0
);

Vue.filter('roundToDecimals', (value, numberOfDecimals = 2) =>
  value.toFixed(numberOfDecimals)
);

Vue.filter('convertTimestampToDate', timestamp => {
  const monthShortNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];
  const date = new Date(timestamp * 1000);
  return `${date.getDate()}. ${
    monthShortNames[date.getMonth()]
  }. ${date.getFullYear()}`;
});
