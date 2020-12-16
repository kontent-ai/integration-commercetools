<template>
  <div class="wrapper">
    <ProductSearch
      v-if="(!value || value.length == 0 || multiSelect) && !element.disabled"
      :commercetoolsClient="commercetoolsClient"
      @onProductSelected="save"
      :defaultCulture="defaultCulture"
    />
    <div class="preview" v-if="value">
      <PreviewValueList
        v-if="value"
        :value="value"
        :disabled="element.disabled"
        :multiSelect="multiSelect"
        :commercetoolsClient="commercetoolsClient"
        @onProductCleared="reset"
      />
    </div>
  </div>
</template>

<script>
import commercetoolsClient from "../helpers/commercetoolsClient";
import PreviewValueList from "./PreviewValueList";
import ProductSearch from "./ProductSearch";

export default {
  components: {
    ProductSearch,
    PreviewValueList
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
  computed: {
    defaultCulture: function() {
      const configAvailable =
        this.element &&
        this.element.config &&
        this.element.config.commercetools &&
        this.element.config.commercetools.defaultCulture;
      return configAvailable
        ? this.element.config.commercetools.defaultCulture
        : null;
    },
    multiSelect: function() {
      const configAvailable =
        this.element && this.element.config && this.element.config.multiSelect;
      return configAvailable ? this.element.config.multiSelect : false;
    }
  },
  methods: {
    reset: function(value) {
      let newValue = this.value ? this.value.filter(x => x.id !== value) : [];

      this.$emit("update:value", newValue);
    },
    save: function(value) {
      if (this.element && !this.element.disabled) {
        // Allow the same product to be only selected once
        if (this.value && this.value.some(x => x.id === value.id)) {
          return;
        }

        const newValue = this.multiSelect
          ? this.value
            ? [...this.value, value]
            : [value]
          : [value];

        this.$emit("update:value", newValue);
      }
    }
  },
  created: function() {
    const config = this.element.config.commercetools;
    this.commercetoolsClient = new commercetoolsClient(config);
  }
};
</script>

<style scoped>
.wrapper {
  margin: 10px;
}

.preview {
  width: 100%;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  -webkit-justify-content: center;
}
</style>
