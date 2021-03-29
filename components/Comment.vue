<template>
  <div>
    <div class="comment-header">
      <h4>
        <i>{{ comment.name }}</i>
      </h4>
      <span>
        {{ comment.date | dateFilter("datetime") }}
      </span>
    </div>
    <div class="comment">{{ comment.text }}</div>
  </div>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.comment-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
}
</style>
