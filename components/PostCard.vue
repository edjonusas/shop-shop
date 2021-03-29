<template>
  <div class="post">
    <div
      class="post-image"
      :style="{
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundImage: `url(${post.image})`
      }"
    ></div>
    <div class="d-flex justify-content-between">
      <small>{{ post.createdAt | dateFilter("datetime") }}</small>
      <small>
        <fa icon="comments" /> {{ post.comments.length }} <fa icon="eye" />
        {{ post.views }}
      </small>
    </div>

    <h2>{{ post.title }}</h2>
    <p>{{ post.description }}</p>
    <nuxt-link :to="'/post/' + post.slug" class="button">Read more</nuxt-link>
    <hr class="spacing" />
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./assets/sass/main.scss";
.post {
  margin-bottom: 40px;
}

.button {
  padding: 10px;
  background: $mainColor;
  color: white;
  border-radius: 5px;
  text-decoration: none;
}
p {
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  display: -webkit-box;
}

a:hover {
  text-decoration: none;
}
</style>
