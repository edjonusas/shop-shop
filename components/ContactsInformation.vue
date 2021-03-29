<template>
  <div>
    <h2>Contact Info</h2>
    <span class="span-text">Some information that you want to know</span>
    <div>
      <div class="phone">
        <div class="icon-block">
          <fa class="icon" :icon="['fas', 'phone']" />
        </div>
        <div class="info-block">
          <span>Phone Number</span>
          <span>+1 342 5860 282</span>
        </div>
      </div>
      <div class="address">
        <div class="icon-block">
          <fa class="icon" :icon="['fas', 'map-marker-alt']" />
        </div>
        <div class="info-block">
          <span>Address</span>
          <span>168 King Street Manhattan, NYC 1001 United States</span>
        </div>
      </div>
      <div class="email">
        <div class="icon-block">
          <fa class="icon" :icon="['fas', 'envelope']" />
        </div>
        <div class="info-block">
          <span>Email</span>
          <span>guest@cititours.com</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "assets/sass/main";

h2 {
  font-size: 24px;
  font-weight: 300;
}

.span-text {
  display: block;
  font-size: 14px;
  color: #999999;
  margin-bottom: 40px;
}

.phone,
.address,
.email {
  margin: 20px 0;
  display: flex;
  align-items: center;
}

.icon-block {
  box-sizing: border-box;
  margin-right: 20px;
  min-width: 60px;
  min-height: 60px;
  display: flex;
  justify-content: center;
  align-content: center;

  .icon {
    color: $mainColor;
    font-size: 35px;
    height: inherit;
  }
}

.info-block {
  display: flex;
  flex-direction: column;

  span {
    font-size: 18px;
    color: #3c3c3c;
  }

  span:first-child {
    font-size: 12px;
    color: #c2c2c2;
    margin-bottom: 10px;
  }
}
</style>