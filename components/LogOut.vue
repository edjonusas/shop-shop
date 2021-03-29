<template>
  <div>
    <div class="container">
      {{ this.$store.getters.getIsLoggedIn.loggedIn }}
    </div>
  </div>
</template>

<script>
export default {
  name: "LogOut",
  created() {
    this.$store.getters.getIsLoggedIn.loggedIn = false;
    this.$store.getters.getIsLoggedIn.token = "";
    this.$router.push("/");
  }
};
</script>

<style></style>
