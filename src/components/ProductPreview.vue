<template>
  <div v-if="details">
    Currenly Selected: {{ value }}<br />
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
    value: {}
  },
  data: () => ({
    details: {}
  }),
  watch: {
    value: {
      immediate: true,
      handler: "getCurrentProduct"
    }
  },
  methods: {
    getCurrentProduct: async function() {
      if (this.$props.value) {
        logEvent(`Getting product details for "${this.$props.value}"`);
        const details = await this.commercetoolsClient.getProductByKey({
          key: this.$props.value
        });

        logEvent(`Got product details for "${this.$props.value}"`, details);
        this.details = details;
      }
    }
  }
};
</script>
