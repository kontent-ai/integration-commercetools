<template>
  <form @submit.prevent="search">
    <fieldset :disabled="element && element.disabled">
      <ProductPreview
        :value="value"
        :commercetoolsClient="commercetoolsClient"
      />
      <div>
        <input
          class="text-field__input"
          type="text"
          placeholder="Search commercetools"
          v-model="searchText"
        />
        <button class="form__btn" type="submit">
          Search
        </button>
      </div>
      <div v-if="searchResults">
        {{ searchResults.count }} Results
        <div v-for="result in searchResults.results" :key="result.key">
          <button
            class="form__icon-btn"
            type="button"
            @click="save(result.key)"
          >
            <i class="icon-add"></i></button
          ><strong>{{ result.name["en-US"] }}</strong
          ><br />
          {{ result.description ? result.description["en-US"] : "" }}
        </div>
      </div>
    </fieldset>
  </form>
</template>

<script>
import commercetoolsClient from "../helpers/commercetoolsClient";
import { logEvent } from "../globalEventBus";
import ProductPreview from "./ProductPreview";

export default {
  components: {
    ProductPreview
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
    reset: function() {
      this.save(null);
    },
    save: function(value) {
      this.$emit("update:value", value);
    }
  },
  created: function() {
    const config = this.element.config.commercetools;
    this.commercetoolsClient = new commercetoolsClient(config);
  }
};
</script>

<style scoped>
fieldset {
  border: none;
}
</style>
