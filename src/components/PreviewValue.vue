<template>
  <div class="preview">
    <ProductCard
      v-if="product"
      :product="product"
      :culture="culture"
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
    clearSelection() {
      this.product = null;
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
