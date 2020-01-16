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
      <h3 class="card__name">{{ name }}</h3>
      <p v-if="selectedVariant.key" class="card__sku card__detail">
        KEY:
        {{ selectedVariant.key }}
      </p>
      <p v-if="selectedVariant.sku" class="card__sku card__detail">
        SKU:
        {{ selectedVariant.sku }}
      </p>
      <p class="card__detail">Variants: {{ product.variants.length }}</p>
    </div>
  </article>
</template>

<script>
import { getLocalizedProperty } from "../helpers/commercetools";
export default {
  props: {
    product: {
      type: Object,
      required: true
    },
    hoverEnabled: {
      type: Boolean,
      required: false,
      default: true
    },
    culture: {
      type: String,
      required: true
    }
  },
  computed: {
    selectedVariant: function() {
      return this.product.masterVariant;
    },
    image: function() {
      const imageExists =
        this.selectedVariant &&
        this.selectedVariant &&
        this.selectedVariant.images.length > 0;

      return imageExists ? this.selectedVariant.images[0].url : "";
    },
    name: function() {
      return getLocalizedProperty(this.product, "name", this.culture);
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

.card__img img {
  max-width: 100%;
  max-height: 100%;
}

.card__detail {
  color: #595959;
}

.card__sku {
  letter-spacing: 1px;
}

.card__name {
  margin-top: 5px;
  margin-bottom: 10px;
}
</style>
