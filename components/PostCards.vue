<template>
  <div>
    <post-card v-for="post in posts" :key="post._id" :post="post" />
  </div>
</template>

<script>
export default {
  props: {
    posts: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped></style>
