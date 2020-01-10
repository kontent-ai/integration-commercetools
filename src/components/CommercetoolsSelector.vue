<template>
  <form @submit.prevent="search">
    <fieldset :disabled="element && element.disabled">
      <div v-if="value">
        Currenly Selected: {{ value }}<br />
        <button class="form__icon-btn" type="button" @click="reset()">
          <i class="icon-remove"></i>
        </button>
      </div>
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
import commercetools from "../helpers/commercetools";
import { logEvent } from "../globalEventBus";

export default {
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
    token: null,
    searchText: "",
    searchResults: null,
    currentProductDetails: null
  }),
  methods: {
    // Sample action below
    sampleAction: function(value) {
      this.save({
        externalId: value,
        updated: Date.now()
      });
    },
    search: function() {
      logEvent(`Searched for "${this.searchText}"`);
      const config = this.element.config.commercetools;
      commercetools
        .searchProducts(
          config.api_url,
          config.project,
          this.token,
          this.searchText
        )
        .then(results => {
          logEvent(`Results for "${this.searchText}"`, results);
          this.searchResults = results;
        })
        .catch(reason => {
          logEvent(`Search error for "${this.searchText}"`, reason);
        });
    },
    getProductByKey: async function(key) {
      logEvent(`Getting product for key "${key}"`);
      const config = this.element.config.commercetools;
      const product = await commercetools.getProductByKey(
        config.api_url,
        config.project,
        this.token,
        key
      );

      logEvent(`Got product for key "${key}"`, product);

      return product;
    },
    getCurrentProduct: function() {
      if (this.$props.value) {
        this.getProductByKey(this.$props.value);
      }
    },
    // Sample action above
    reset: function() {
      this.save(null);
    },
    save: function(value) {
      this.$emit("update:value", value);
    }
  },
  watch: {
    value: function() {
      this.getCurrentProduct();
    }
  },
  created: function() {
    const config = this.element.config.commercetools;
    commercetools
      .getToken(
        config.oauth_url,
        config.client_id,
        config.client_secret,
        config.scope
      )
      .then(token => {
        logEvent(`commercetools token retrieved`, token);
        this.token = token;
        this.getCurrentProduct();
      });
  }
};
</script>

<style scoped>
fieldset {
  border: none;
}
</style>
