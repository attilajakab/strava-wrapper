<template>
  <div class="greet">
    <h3 v-if="name">Welcome {{ name }}</h3>
    <h3 v-else>You are not logged in</h3>
  </div>
</template>

<script>
export default {
  name: 'Greeting',
  props: ['name']
}
</script>