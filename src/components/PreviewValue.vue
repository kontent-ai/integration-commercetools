<template>
  <ProductCard
    v-if="product"
    :product="product"
    :variantId="variantId"
    :culture="culture"
    :disabled="disabled"
    @onProductCleared="clearProduct"
  />
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
        try {
          logEvent(`Getting product projection for "${this.value.id}"`);

          const product = await this.commercetoolsClient.getProductByID({
            id: this.value.id
          });

          logEvent(`Got product projection for "${this.value.id}"`, product);

          this.product = product;
        } catch (e) {
          logEvent(
            `Error while getting product projection for "${this.value.id}"`,
            e
          );

          this.product = {
            name: { "en-US": "NOT FOUND" },
            variants: [],
            masterVariant: {
              id: 1,
              images: []
            }
          };
        }
      }
    },
    clearProduct() {
      this.$emit("onProductCleared", this.value.id);
    }
  }
};
</script>
