<template>
  <section id="testimonial">
    <div class="static-block">
      <h2>testimonial</h2>
    </div>
    <transition-group
      :name="slideForward ? 'photos-fade' : 'photosBack-fade'"
      tag="div"
      class="photos-block"
    >
      <div class="testimonial-block" :key="testimonials[currentTestimonial].id">
        <p class="testimonial-text">
          {{ testimonialTextCutter }}
        </p>
        <img
          class="testimonial-img"
          :src="testimonials[currentTestimonial].image"
          :alt="testimonials[currentTestimonial].name"
        />
        <div>
          <span class="name">{{ testimonials[currentTestimonial].name }}</span>
        </div>
      </div>

      <div class="testimonial-static" key="testimonial-static">
        <div class="control-block">
          <div class="left-button" @click="prevTestimonial"></div>
          <div class="right-button" @click="nextTestimonial"></div>
        </div>
        <div class="dots-container">
          <div
            v-for="(testimonial, index) in testimonials"
            :key="index"
            class="dot"
            :class="{ active: index === currentTestimonial }"
            @click="selectTestimonial(index)"
          ></div>
        </div>
      </div>
    </transition-group>
  </section>
</template>

<script>
export default {
  name: "Testimonial",
  props: {
    testimonials: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {
      currentTestimonial: 0,
      slideForward: true,
    };
  },
  computed: {
    testimonialTextCutter() {
      if (this.testimonials[this.currentTestimonial].text.length > 235) {
        return (
          this.testimonials[this.currentTestimonial].text.slice(0, 235) + "..."
        );
      } else {
        return this.testimonials[this.currentTestimonial].text;
      }
      239;
    },
  },
  methods: {
    prevTestimonial() {
      if (this.currentTestimonial > 0) {
        this.slideForward = false;
        --this.currentTestimonial;
      } else {
        this.slideForward = false;
        this.currentTestimonial = this.testimonials.length - 1;
      }
    },
    nextTestimonial() {
      if (this.currentTestimonial < this.testimonials.length - 1) {
        this.slideForward = true;
        ++this.currentTestimonial;
      } else {
        this.slideForward = true;
        this.currentTestimonial = 0;
      }
    },
    selectTestimonial(index) {
      this.currentTestimonial = index;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./assets/sass/main.scss";
#testimonial {
  font-family: $mainFont;
  font-weight: 300;
  line-height: 28px;
  padding: 50px 0 70px;
  text-align: center;
  overflow: hidden;

  h2 {
    font-size: 30px;
    font-weight: 600;
    color: #3c3c3c;
  }

  .name {
    display: inline-block;
    margin: 25px 0 40px;
    color: #3c3c3c;
    font-size: 14px;
    font-weight: 600;
  }

  .dots-container {
    position: absolute;
    box-sizing: border-box;
    padding: 20px;
    height: 100%;
    display: flex;
    justify-content: center;
    top: 350px;
    left: 50%;
    transform: translateX(-50%);
  }

  .dot {
    cursor: pointer;
    transition: 0.5s;
    margin: 0 10px;
    width: 8px;
    height: 8px;
    background-color: #ebebeb;
    border-radius: 50%;
  }

  .dot:hover {
    background-color: $mainColor;
  }

  .active {
    background-color: $mainColor;
  }
}

.testimonial-static {
  height: 450px;
  width: 100%;
  top: 0;
  z-index: 5;
  position: absolute;
}

.left-button {
  transition: 0.5s;
  position: absolute;
  left: 0;
  top: 30%;
  background-color: #f3f3f344;
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.left-button:hover {
  background-color: #3e976c41;
}

.right-button {
  transition: 0.5s;
  position: absolute;
  right: 0;
  top: 30%;
  background-color: #f3f3f344;
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.right-button:hover {
  background-color: #3e976c41;
}

.left-button::after {
  color: $mainColor;
  content: "\2039";
  font-size: 30px;
}

.right-button::after {
  color: $mainColor;
  content: "\203A";
  font-size: 30px;
}

.testimonial-text {
  font-size: 18px;
  color: #999999;
  margin: 40px auto;
  width: 60%;
}

.testimonial-block {
  height: 350px;
  position: absolute;
  width: 100%;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

.testimonial-img {
  border-radius: 50%;
  object-fit: cover;
  width: 70px;
  height: 70px;
}

.photos-block {
  height: 380px;
  position: relative;
}

@media only screen and (max-width: 1000px) {
  .photos-block {
    height: 340px;
  }
}

@media only screen and (max-width: 768px) {
  .testimonial-text {
    width: 100%;
  }
}

@media only screen and (max-width: 428px) {
  .photos-block {
    height: 400px;
  }
  #testimonial .dots-container {
    top: 400px;
  }
}

@media only screen and (max-width: 368px) {
  .photos-block {
    height: 430px;
  }
  #testimonial .dots-container {
    top: 430px;
  }
}

@media only screen and (max-width: 368px) {
  .photos-block {
    height: 440px;
  }
  #testimonial .dots-container {
    top: 440px;
  }
}

@media only screen and (max-width: 320px) {
  .photos-block {
    height: 470px;
  }
  #testimonial .dots-container {
    top: 470px;
  }
}

//forward testimonial slide animation
.photos-fade-enter-active {
  transition: all 1s ease 0.5s;
}

.photos-fade-leave-active {
  transition: all 1s ease 0.5s;
}

.photos-fade-enter,
.photos-fade-leave-to {
  transform: translateX(50%);
  opacity: 0;
}

.photos-fade-leave-to {
  transform: translateX(-130%);
}

// backward testimonial slide animation
.photosBack-fade-enter-active {
  transition: all 1s ease 0.5s;
}

.photosBack-fade-leave-active {
  transition: all 1s ease 0.5s;
}

.photosBack-fade-enter,
.photosBack-fade-leave-to {
  transform: translateX(-130%);
  opacity: 0;
}

.photosBack-fade-leave-to {
  transform: translateX(50%);
}
</style>