<template>
  <div class="wrapper">
    <ProductPreview
      v-if="value"
      :product="value"
      :commercetoolsClient="commercetoolsClient"
      :culture="this.element.config.commercetools.defaultCulture"
    >
      <button
        class="btn btn--primary"
        :disabled="element.disabled"
        @click="reset"
      >
        <i class="icon-remove"></i>&nbsp;Clear Selection
      </button>
    </ProductPreview>

    <form v-if="!value" @submit.prevent="search">
      <fieldset :disabled="element && element.disabled">
        <div class="searchBox">
          <input
            class="text-field__input"
            type="text"
            placeholder="Search commercetools"
            v-model="searchText"
          />
          <button class="btn btn--primary" type="submit">Search</button>
        </div>
        <ProductSearchResults
          :resultData="searchResults"
          @selectProduct="selectProduct"
        ></ProductSearchResults>
      </fieldset>
    </form>
  </div>
</template>

<script>
import commercetoolsClient from "../helpers/commercetoolsClient";
import { logEvent } from "../globalEventBus";
import ProductPreview from "./ProductPreview";
import ProductSearchResults from "./ProductSearchResults";

export default {
  components: {
    ProductPreview,
    ProductSearchResults
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
    commercetoolsClient: null,
    searchText: "",
    searchResults: null
  }),
  methods: {
    search: function() {
      logEvent(`Searched for "${this.searchText}"`);

      this.commercetoolsClient
        .searchProducts({ text: this.searchText })
        .then(results => {
          logEvent(`Results for "${this.searchText}"`, results);
          this.searchResults = results;
        })
        .catch(reason => {
          logEvent(`Search error for "${this.searchText}"`, reason);
        });
    },
    selectProduct(value) {
      this.searchText = "";
      this.searchResults = null;
      this.save({
        key: value
      });
    },
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

<style scoped>
.wrapper {
  margin: 10px;
}

fieldset {
  border: none;
  padding: 0;
}

.searchBox {
  display: flex;
  width: 100%;
  column-gap: 10px;
  margin-bottom: 10px;
}

.searchBox .text-field__input {
  min-width: inherit;
  flex-grow: 1;
}
</style>
