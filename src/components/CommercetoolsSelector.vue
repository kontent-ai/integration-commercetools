<template>
  <div id="commercetoolsWrapper">
    <ProductSearch
      v-if="!value && !element.disabled"
      :commercetoolsClient="commercetoolsClient"
      @onProductSelected="save"
    />
    <PreviewValue
      :value="value"
      :disabled="element.disabled"
      :commercetoolsClient="commercetoolsClient"
      @onClearSelection="reset"
    />
  </div>
</template>

<script>
import commercetoolsClient from "../helpers/commercetoolsClient";
import PreviewValue from "./PreviewValue";
import ProductSearch from "./ProductSearch";

export default {
  components: {
    PreviewValue,
    ProductSearch
  },
  props: {
    element: {
      type: Object,
      required: true
    },
    context: {
      type: Object,
      required: true
    },
    value: {}
  },
  data: () => ({
    commercetoolsClient: null
  }),
  methods: {
    reset: function() {
      this.save(null);
    },
    save: function(value) {
      if (this.element && !this.element.disabled) {
        this.$emit("update:value", value);
      }
    }
  },
  created: function() {
    const config = this.element.config.commercetools;
    this.commercetoolsClient = new commercetoolsClient(config);
  }
};
</script>

<style>
#commercetoolsWrapper {
  margin: 10px;
}

fieldset {
  border: none;
  padding: 0;
}
</style>
