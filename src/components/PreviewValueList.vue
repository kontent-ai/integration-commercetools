<template>
  <div class="wrapper">
    <h3 v-if="multiSelect">
      {{ value.length }} product{{ value.length === 1 ? "" : "s" }} selected
    </h3>

    <div v-if="value" class="cards">
      <PreviewValue
        v-for="product in value"
        :key="product.id"
        :value="product"
        :commercetoolsClient="commercetoolsClient"
        :disabled="disabled"
        @onProductCleared="clearProduct"
      >
      </PreviewValue>
    </div>
  </div>
</template>

<script>
import PreviewValue from "./PreviewValue";

export default {
  components: {
    PreviewValue
  },
  props: {
    value: {
      type: Array,
      required: true
    },
    commercetoolsClient: {
      type: Object,
      required: false
    },
    multiSelect: {
      type: Boolean,
      required: true,
      default: false
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    clearProduct: function(payload) {
      this.$emit("onProductCleared", payload);
    }
  }
};
</script>

<style scoped>
.cards {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  column-gap: 10px;
  row-gap: 10px;
  flex-wrap: wrap;
}

.wrapper {
  width: 100%;
}
</style>
