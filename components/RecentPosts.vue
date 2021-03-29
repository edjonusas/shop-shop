<template>
  <div>
    <h4>Recent Posts</h4>
    <ul>
      <li v-for="post in recentPosts" :key="post._id">
        <nuxt-link :to="'/post/' + post.slug">{{ post.title }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    recentPosts: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./assets/sass/main.scss";

h4 {
  font-weight: bold;
}
ul {
  margin: 0;
  padding: 0;
}
li {
  margin-bottom: 10px;
  list-style: none;
}
a {
  color: black;
}
a:hover {
  color: $mainColor;
  text-decoration: none;
}
</style>
