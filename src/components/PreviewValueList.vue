<template>
  <div>
    <h3>
      {{ value.length }} product{{ value.length === 1 ? "" : "s" }} selected
    </h3>

    <div v-if="value" class="cards">
      <PreviewValue
        v-for="product in value"
        :key="product.id"
        :value="product"
        :multiSelect="true"
        :commercetoolsClient="commercetoolsClient"
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
</style>
