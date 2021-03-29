<template>
  <div>
    <iframe
      class="map"
      src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2742.7156987253984!2d25.290411104392465!3d54.68604783447717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2slt!4v1611000819343!5m2!1sen!2slt"
      allowfullscreen="false"
      aria-hidden="false"
      tabindex="0"
    ></iframe>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
div {
  margin-top: 100px;
}

.map {
  outline: none;
  border: none;
  height: 550px;
  width: 100%;
}
</style>