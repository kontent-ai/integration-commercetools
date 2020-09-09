<template>
  <div class="wrapper">
    <ProductSearch
      v-if="(!value || multiSelect) && !element.disabled"
      :commercetoolsClient="commercetoolsClient"
      @onProductSelected="save"
      :defaultCulture="defaultCulture"
    />
    <div class="preview" v-if="value && !multiSelect">
      <PreviewValue
        :value="value"
        :disabled="element.disabled"
        :multiSelect="true"
        :commercetoolsClient="commercetoolsClient"
        @onProductCleared="reset"
      />
    </div>
    <PreviewValueList
      v-if="value && multiSelect"
      :value="value"
      :commercetoolsClient="commercetoolsClient"
      @onProductCleared="reset"
    />
  </div>
</template>

<script>
import commercetoolsClient from "../helpers/commercetoolsClient";
import PreviewValue from "./PreviewValue";
import PreviewValueList from "./PreviewValueList";
import ProductSearch from "./ProductSearch";

export default {
  components: {
    PreviewValue,
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
      return configAvailable ? this.element.config.multiSelect : null;
    }
  },
  methods: {
    reset: function(value) {
      if (this.multiSelect) {
        let newValue = this.value ? this.value.filter(x => x.id !== value) : [];

        this.$emit("update:value", newValue);
      } else {
        this.save(null);
      }
    },
    save: function(value) {
      if (this.element && !this.element.disabled) {
        if (this.multiSelect) {
          let newValue = this.value ? [...this.value, value] : [value];
          this.$emit("update:value", newValue);
        } else {
          this.$emit("update:value", value);
        }
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
