<template>
  <article class="card">
    <div v-if="hoverEnabled" class="card__info-hover-bg"></div>
    <div v-if="hoverEnabled" class="card__info-hover">
      <slot></slot>
    </div>
    <div class="card__img">
      <img v-if="image" :src="image" />
    </div>
    <div class="card__info">
      <span class="card__key">{{ productKey }}</span>
      <h3 class="card__name">{{ name }}</h3>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: false
    },
    productKey: {
      type: String,
      required: true
    },
    hoverEnabled: {
      type: Boolean,
      required: false,
      default: true
    }
  }
};
</script>

<style scoped>
.card {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0, 1);
  background-color: #fff;
  position: relative;
  overflow: hidden;
  box-shadow: 0px 13px 10px -7px rgba(0, 0, 0, 0.1);
  border: 2px solid #d0cfce;
  text-align: center;
  /* flex-grow: 1; */
  flex-shrink: 1;
  width: calc(33.3% - 6.66px);
}

.card__info-hover {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0, 1);
  position: absolute;
  padding: 16px;
  width: 100%;
  height: 100%;
  opacity: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card:hover .card__info-hover {
  opacity: 1;
}

.card__info-hover-bg {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0, 1);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  background: #fff;
}

.card:hover .card__info-hover-bg {
  opacity: 0.3;
}

.card__img {
  height: 150px;
  min-width: 150px;
}

.card__key {
  letter-spacing: 1px;
  color: #595959;
}

.card__name {
  margin-top: 5px;
  margin-bottom: 10px;
}
</style>
