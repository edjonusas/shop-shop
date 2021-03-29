<template>
  <div class="slider-container">
    <h6>Filter by price</h6>
    <div class="range-slider">
      <div class="price-slider-full"></div>
      <div class="price-slider-progress" :style="getProgressStyle"></div>

      <input
        type="range"
        :min="minPrice"
        :max="maxPrice"
        :step="step"
        v-model="sliderMin"
      />
      <input
        type="range"
        :min="minPrice"
        :max="maxPrice"
        :step="10"
        v-model="sliderMax"
      />
    </div>
    <div class="info-container">
      <div><button @click="FilterPrice">Filter</button></div>
      <span
        >Price: {{ minCurrentPrice }} &euro; -
        {{ maxCurrentPrice }} &euro;</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "FilterByPrice",
  data() {
    return {
      minCurrentPrice: 0,
      minPrice: 0,
      maxCurrentPrice: 3000,
      maxPrice: 3000,
      step: "10",
      style: {
        lineLow: " 90px",
        lineHigh: " 20px"
      }
    };
  },
  computed: {
    sliderMin: {
      get: function() {
        const val = parseInt(this.minCurrentPrice);
        return val;
      },
      set: function(val) {
        val = parseInt(val);
        if (val > this.maxCurrentPrice) {
          this.maxCurrentPrice = val;
        }
        this.minCurrentPrice = val;
      }
    },
    sliderMax: {
      get: function() {
        const val = parseInt(this.maxCurrentPrice);
        return val;
      },
      set: function(val) {
        val = parseInt(val);
        if (val < this.minCurrentPrice) {
          this.minCurrentPrice = val;
        }
        this.maxCurrentPrice = val;
      }
    },
    getProgressStyle() {
      const low =
        Math.round(
          100 *
            ((this.minCurrentPrice - this.minPrice) /
              (this.maxPrice - this.minPrice))
        ) - 0.5;
      const high =
        Math.round(
          100 *
            ((this.maxCurrentPrice - this.minPrice) /
              (this.maxPrice - this.minPrice))
        ) + 0.5;

      return {
        "--low": low + "%",
        "--high": high + "%"
      };
    }
  },
  methods: {
    FilterPrice() {
      // need to implement filter
      console.log("Min price: ", this.minCurrentPrice);
      console.log("Max price: ", this.maxCurrentPrice);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./assets/sass/main.scss";

.slider-container {
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  width: 200px;
}

.info-container {
  margin-left: 10px;
  display: flex;
  flex-direction: column;
}

.range-slider {
  position: relative;
  margin: 20px 0;
}

input[type="range"] {
  cursor: pointer;
  margin: 0;
  padding: 0;
  border: 0;
  outline: none;
  background: transparent;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 100%;
  height: 10px;
  margin-bottom: -5px;
  pointer-events: none; // Prevent mouse interaction on the range slider.
}

input[type="range"]::-webkit-slider-runnable-track {
  cursor: default;
  height: 1px;
  outline: 0;
  -webkit-appearance: none;

  // Add custom styles here..
}
input[type="range"]::-moz-range-track {
  cursor: default;
  -moz-appearance: none;
  outline: 0;
  height: 1px;

  // Add custom styles here..
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none; // Reset appearance so we can apply backgrounds/borders etc.
  pointer-events: auto; // Re-enable pointer events so the handles can be used.
}

input[type="range"]::-moz-range-thumb {
  -moz-appearance: none; // Reset appearance so we can apply backgrounds/borders etc.
  pointer-events: auto; // Re-enable pointer events so the handles can be used.
}

/* chrome slide bullet style */
input[type="range"]::-webkit-slider-thumb {
  z-index: 2;
  // position: relative;
  box-shadow: 0px 0px 0px #000;
  border: 2px solid $mainColor;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #fff;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -10px;
}

/* moz slide bullet style */
input[type="range"]::-moz-range-thumb {
  z-index: 2;
  //position: relative;
  box-shadow: 0px 0px 0px #000;
  border: 2px solid $mainColor;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background-color: #fff;
  cursor: pointer;
  -webkit-appearance: none;
}

.range-slider input[type="range"] {
  position: absolute;
  left: 0;
  bottom: 0;
}

.price-slider-progress {
  position: absolute;
  bottom: -2px;
  width: 100%;
  height: 4px;
  --track-background: linear-gradient(
      to right,
      transparent var(--low),
      var(--range-color) 0,
      var(--range-color) var(--high),
      transparent 0
    )
    no-repeat 0 100% / 100% 100%;
  --range-color: #3e976c;
  background: var(--track-background);
}

.price-slider-full {
  position: absolute;
  bottom: -2px;
  width: 100%;
  height: 4px;
  background-color: #dadada;
  border-radius: 2px;
}

button {
  transition: 0.5s;
  outline: none;
  font-size: 13px;
  margin: 5px 0;
  padding: 5px 15px;
  border: none;
  border-radius: 3px;
  color: #fff;
  background-color: #070707;
}

button:hover {
  background-color: #4e4e4e;
}
</style>
