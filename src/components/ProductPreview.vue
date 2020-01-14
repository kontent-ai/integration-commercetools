<template>
  <div class="preview" v-if="details">
    <ProductCard :productKey="key" :name="name" :image="image">
      <slot></slot>
    </ProductCard>
  </div>
</template>

<script>
import { logEvent } from "../globalEventBus";
import ProductCard from "./ProductCard";
import { getLocalizedProperty, getSmallImage } from "../helpers/commercetools";

export default {
  components: {
    ProductCard
  },
  props: {
    commercetoolsClient: {
      type: Object,
      required: true
    },
    product: {
      type: Object,
      required: true
    },
    culture: {
      type: String,
      required: true
    }
  },
  data: () => ({
    details: null
  }),
  computed: {
    key: function() {
      if (this.$props.product && this.$props.product.key) {
        return this.$props.product.key;
      }
      return null;
    },
    name: function() {
      return getLocalizedProperty(this.details, "name", this.culture);
    },
    description: function() {
      return getLocalizedProperty(this.details, "name", this.culture);
    },
    image: function() {
      return getSmallImage(this.details);
    }
  },
  watch: {
    product: {
      immediate: true,
      handler: "getCurrentProduct"
    }
  },
  methods: {
    getCurrentProduct: async function() {
      if (this.key) {
        logEvent(`Getting product details for "${this.key}"`);
        const details = await this.commercetoolsClient.getProductByKey({
          key: this.key
        });

        logEvent(`Got product details for "${this.key}"`, details);
        this.details = details;
      }
    }
  }
};
</script>

<style scoped>
.preview {
  width: 100%;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  -webkit-justify-content: center;
}
</style>
