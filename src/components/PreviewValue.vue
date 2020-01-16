<template>
  <div class="preview">
    <ProductCard
      v-if="product"
      :product="product"
      :variantId="variantId"
      :culture="culture"
      @onProductCleared="clearProduct"
    />
    <div v-else-if="disabled">
      No product selected.
    </div>
  </div>
</template>

<script>
import { logEvent } from "../globalEventBus";
import ProductCard from "./ProductCard";

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
    product: null
  }),
  computed: {
    culture: function() {
      return this.value && this.value.culture ? this.value.culture : null;
    },
    variantId: function() {
      return this.value && this.value.variantId ? this.value.variantId : null;
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
      if (this.value && this.value.id) {
        logEvent(`Getting product projection for "${this.value.id}"`);

        const product = await this.commercetoolsClient.getProductByID({
          id: this.value.id
        });

        logEvent(`Got product projection for "${this.value.id}"`, product);

        this.product = product;
      }
    },
    clearProduct() {
      this.product = null;
      this.$emit("onProductCleared");
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
