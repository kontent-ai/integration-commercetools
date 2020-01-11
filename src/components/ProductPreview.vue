<template>
  <div v-if="details">
    Currenly Selected: {{ details.name[culture] }} ({{ productKey }})<br />
    <button class="form__icon-btn" type="button" @click="reset()">
      <i class="icon-remove"></i>
    </button>
  </div>
</template>

<script>
import { logEvent } from "../globalEventBus";

export default {
  props: {
    commercetoolsClient: {
      type: Object,
      required: true
    },
    productKey: {
      type: String,
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
  watch: {
    value: {
      immediate: true,
      handler: "getCurrentProduct"
    }
  },
  methods: {
    getCurrentProduct: async function() {
      if (this.$props.productKey) {
        logEvent(`Getting product details for "${this.$props.productKey}"`);
        const details = await this.commercetoolsClient.getProductByKey({
          key: this.$props.productKey
        });

        logEvent(
          `Got product details for "${this.$props.productKey}"`,
          details
        );
        this.details = details;
      }
    }
  }
};
</script>
