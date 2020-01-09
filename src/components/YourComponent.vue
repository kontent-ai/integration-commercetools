<template>
  <fieldset :disabled="element && element.disabled">
    <!-- Your UI below -->
    <button class="btn btn--primary" @click="sampleAction(1)">
      Choose 1
    </button>
    <button class="btn btn--primary" @click="sampleAction(2)">
      Choose 2
    </button>
    <button class="btn btn--primary" @click="reset()">
      Reset
    </button>
    <div v-if="value" class="selectedNumber">
      {{ value.externalId }}
    </div>

    <input
      class="text-field__input"
      type="text"
      placeholder="Search"
      v-model="searchText"
    />
    <button class="form__btn" type="button" @click="search">
      Search
    </button>

    <pre v-if="token">{{ token }}</pre>
    <pre v-if="searchResults">{{ searchResults }}</pre>
    <!-- Your UI above -->
  </fieldset>
</template>

<script>
import commercetools from "../helpers/commercetools";

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
    value: {
      type: Object
    }
  },
  data: () => ({
    token: null,
    searchText: "",
    searchResults: null
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
      const config = this.element.config.commercetools;
      commercetools
        .searchProducts(
          config.api_url,
          config.project,
          this.token,
          this.searchText
        )
        .then(results => {
          this.searchResults = results;
        });
    },
    // Sample action above
    reset: function() {
      this.save(null);
    },
    save: function(value) {
      this.$emit("update:value", value);
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
        this.token = token;
      });
  }
};
</script>

<style scoped>
fieldset {
  border: none;
}
</style>
