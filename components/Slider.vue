<template>
  <section
    id="shop-slider"
    @mouseover="sliderHover = true"
    @mouseleave="sliderHover = false"
  >
    <transition-group
      :name="slideForward ? 'photos-fade' : 'photosBack-fade'"
      tag="div"
      class="photos-block"
    >
      <img
        :src="photos[currentPhoto].url"
        :key="photos[currentPhoto].id"
        :alt="photos[currentPhoto].bigText"
      />
      <div class="control-block" key="control-block">
        <div class="left-button" @click="prevPhoto"></div>
        <div class="dots-container">
          <div
            v-for="(photo, index) in photos"
            :key="index"
            class="dot"
            :class="{ active: index === currentPhoto }"
            @click="selectPhoto(index)"
          ></div>
        </div>
        <div class="right-button" @click="nextPhoto"></div>
      </div>
      <transition-group
        name="text-fade"
        tag="div"
        class="text-block"
        key="text-block"
      >
        <div class="small-text" :key="photos[currentPhoto].smallText">
          {{ photos[currentPhoto].smallText }}
        </div>
        <div class="big-text" :key="photos[currentPhoto].bigText">
          {{ photos[currentPhoto].bigText }}
        </div>
      </transition-group>
    </transition-group>
  </section>
</template>

<script>
export default {
    name: "Slider",
  props: {
    photos: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentPhoto: 0,
      slideForward: true,
      sliderHover: false,
      timer: "",
    };
  },
  methods: {
    nextPhoto() {
      if (this.currentPhoto < this.photos.length - 1) {
        this.slideForward = true;
        ++this.currentPhoto;
      } else {
        this.slideForward = true;
        this.currentPhoto = 0;
      }
    },
    prevPhoto() {
      if (this.currentPhoto > 0) {
        this.slideForward = false;
        --this.currentPhoto;
      } else {
        this.slideForward = false;
        this.currentPhoto = this.photos.length - 1;
      }
    },
    selectPhoto(index) {
      this.currentPhoto = index;
    },
    setSliderInterval() {
      this.timer = setInterval(() => {
        if (this.currentPhoto < this.photos.length - 1) {
          this.currentPhoto = this.currentPhoto + 1;
          this.slideForward = true;
        } else {
          this.slideForward = true;
          this.currentPhoto = 0;
        }
      }, 5000);
    },
  },
  watch: {
    sliderHover(val) {
      if (val === false) {
        this.setSliderInterval();
      } else {
        if (this.timer !== "") {
          clearInterval(this.timer);
        }
      }
    },
  },
  mounted() {
    if (this.sliderHover === false) {
      this.setSliderInterval();
    }
  },
};
</script>

<style lang="scss" scoped>
@import "./assets/sass/main.scss";

#shop-slider {
  box-sizing: border-box;
  overflow: hidden;
  margin: 0 auto;
  max-width: 1300px;
  position: relative;
  height: 560px;

  .photos-block {
    position: relative;
    background-color: #dfe6f3;
    height: 560px;
  }

  .photos-block img {
    object-fit: cover;
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .control-block {
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 2;
    position: absolute;
    width: 100%;
    height: 100%;

    .left-button,
    .right-button {
      cursor: pointer;
      transition: 0.5s;
      position: relative;
      background-color: #757575;
      width: 40px;
      height: 40px;
    }

    .left-button:hover,
    .right-button:hover {
      background-color: black;
    }

    .left-button::after,
    .right-button::after {
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      font-size: 30px;
    }

    .left-button::after {
      content: "\2039";
    }

    .right-button::after {
      content: "\203A";
    }

    .dots-container {
      box-sizing: border-box;
      padding: 20px;
      height: 100%;
      display: flex;
      align-items: flex-end;

      .dot {
        cursor: pointer;
        transition: 0.5s;
        margin: 0 5px;
        width: 15px;
        height: 15px;
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
  }

  .text-block {
    z-index: 1;
    position: absolute;
    width: 100%;
    height: 100%;
  }
}

.small-text {
  color: $mainColor;
  text-transform: uppercase;
  max-width: 100px;
  word-wrap: break-word;
  font-weight: 700;
  font-size: 12px;
  position: absolute;
  top: 100px;
  left: 100px;
}

.big-text {
  text-transform: capitalize;
  font-weight: 700;
  line-height: 65px;
  max-width: 300px;
  word-wrap: break-word;
  font-size: 60px;
  position: absolute;
  bottom: 100px;
  left: 100px;
}

//forward
//img animation
.photos-fade-enter-active {
  transition: all 1s ease 0.5s;
}

.photos-fade-leave-active {
  transition: all 1s ease 0.5s;
}

.photos-fade-enter,
.photos-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.photos-fade-leave-to {
  transform: translateX(-100%);
}

//backward
//img animation
.photosBack-fade-enter-active {
  transition: all 1s ease 0.5s;
}

.photosBack-fade-leave-active {
  transition: all 1s ease 0.5s;
}

.photosBack-fade-enter,
.photosBack-fade-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.photosBack-fade-leave-to {
  transform: translateX(100%);
}

//text animation
.text-fade-enter {
  opacity: 0;
}
.text-fade-enter-to {
  transition: opacity 1s ease-in-out 1s;
  opacity: 1;
}

.text-fade-leave {
  opacity: 1;
}

.text-fade-leave-to {
  transition: opacity 1s ease-in-out;
  opacity: 0;
}

@media only screen and (max-width: 768px) {
  #shop-slider {
    height: 400px;

    .photos-block {
      height: 400px;
    }
  }
  .text-block {
    .big-text {
      text-align: center;
      transform: translate(-50%, -50%);
      font-size: 30px;
      bottom: 50px;
      left: 50%;
      line-height: 32px;
    }
    .small-text {
      text-align: center;
      top: 60px;
      transform: translate(-50%, -50%);
      left: 50%;
      max-width: 200px;
    }
  }
}
</style>
