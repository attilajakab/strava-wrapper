<template>
  <h1 v-if="name"><a href='http://localhost:9001/logout'>Sign Out</a></h1>
  <h1 v-else><a href='http://localhost:9001/login'>Sign In</a></h1>
</template>
<script>
export default {
  name: "Login",
  props: ["name"],
};
</script>