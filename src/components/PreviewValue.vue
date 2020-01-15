<template>
  <div class="preview">
    <ProductCard
      v-if="productProjection"
      :productKey="product.key"
      :name="product.name"
      :image="product.image"
      :hoverEnabled="!disabled"
    >
      <button class="btn btn--primary" @click="clearSelection">
        <i class="icon-remove"></i>&nbsp;Clear Selection
      </button>
    </ProductCard>
    <div v-else-if="disabled">
      No product selected.
    </div>
  </div>
</template>

<script>
import { logEvent } from "../globalEventBus";
import ProductCard from "./ProductCard";
import { simplifyProductProjection } from "../helpers/commercetools";

export default {
  components: {
    ProductCard
  },
  props: {
    commercetoolsClient: {
      type: Object,
      required: false
    },
    value: {
      required: true,
      validator: prop => typeof prop === "object" || prop === null
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data: () => ({
    productProjection: null
  }),
  computed: {
    culture: function() {
      return this.value && this.value.culture ? this.value.culture : null;
    },
    product: function() {
      if (this.value) {
        return simplifyProductProjection(this.productProjection, this.culture);
      }
      return null;
    }
  },
  watch: {
    value: {
      immediate: true,
      handler: "getCurrentProduct"
    }
  },
  methods: {
    getCurrentProduct: async function() {
      if (this.value && this.value.key) {
        logEvent(`Getting product projection for "${this.value.key}"`);
        const productProjection = await this.commercetoolsClient.getProductByKey(
          {
            key: this.value.key
          }
        );
        logEvent(`Got product projection for "${this.key}"`, productProjection);
        this.productProjection = productProjection;
      }
    },
    clearSelection() {
      this.productProjection = null;
      this.$emit("onClearSelection");
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
