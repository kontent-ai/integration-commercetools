<template>
  <article class="card">
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
      <p v-if="!variantId && product.variants.length > 0" class="card__detail">
        Additional variants: {{ product.variants.length }}
      </p>
      <div v-if="!variantId">
        <select
          class="form__dropdown"
          v-if="product.variants.length > 0"
          v-model="selectedVariantId"
        >
          <option :value="product.masterVariant.id">Master</option>
          <option
            v-for="variant in product.variants"
            :key="variant.id"
            :value="variant.id"
            >Variant {{ variant.id }}</option
          >
        </select>
        <button class="btn btn--primary" @click="selectProduct">
          Select
        </button>
      </div>
      <button v-if="variantId" class="btn btn--primary" @click="clearProduct">
        Clear
      </button>
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
    variantId: {
      type: Number,
      required: false
    },
    culture: {
      type: String,
      required: true
    }
  },
  data: () => ({
    selectedVariantId: -1
  }),
  computed: {
    selectedVariant: function() {
      if (this.product.masterVariant.id == this.selectedVariantId) {
        return this.product.masterVariant;
      } else {
        return this.product.variants.filter(
          variant => variant.id === this.selectedVariantId
        )[0];
      }
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
  },
  methods: {
    selectProduct: function() {
      this.$emit("onProductSelected", {
        id: this.product.id,
        variantId: this.selectedVariantId,
        culture: this.culture
      });
    },
    clearProduct: function() {
      this.$emit("onProductCleared");
    }
  },
  created: function() {
    this.selectedVariantId = this.variantId
      ? this.variantId
      : this.product.masterVariant.id;
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
