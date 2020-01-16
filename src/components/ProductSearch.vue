<template>
  <div>
    <form @submit.prevent="search">
      <fieldset>
        <div class="search__query-box">
          <input
            class="text-field__input"
            type="text"
            placeholder="Search commercetools"
            v-model="searchText"
          />
          <select
            class="form__dropdown"
            v-model="culture"
            :disabled="cultures.length < 2"
          >
            <option v-for="culture in cultures" :key="culture">{{
              culture
            }}</option>
          </select>
          <button class="btn btn--primary" type="submit">Search</button>
        </div>
      </fieldset>
    </form>
    <div v-if="pagedQueryResult">
      <h3>
        {{ pagedQueryResult.total }} Result{{
          pagedQueryResult.total === 1 ? "" : "s"
        }}
      </h3>
      <ProductSearchResultsList
        :culture="culture"
        :results="pagedQueryResult.results"
        @onProductSelected="selectProduct"
      />

      <div class="paging" v-if="pages > 1">
        <button
          class="btn btn--secondary btn--xs"
          :disabled="page === 1"
          @click="getSearchPage(page - 1)"
        >
          Previous
        </button>
        <span class="paging__info">Page {{ page }} of {{ pages }}</span>
        <button
          class="btn btn--secondary btn--xs"
          :disabled="page === pages"
          @click="getSearchPage(page + 1)"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { logEvent } from "../globalEventBus";
import ProductSearchResultsList from "./ProductSearchResultList";

export default {
  components: {
    ProductSearchResultsList
  },
  props: {
    commercetoolsClient: {
      type: Object,
      required: true
    },
    itemsPerPage: {
      type: Number,
      required: false,
      default: 9
    },
    defaultCulture: {
      type: String,
      required: true
    }
  },
  data: () => ({
    cultures: [],
    culture: "",
    searchText: "",
    pagedQueryResult: null,
    page: 1
  }),
  computed: {
    pages: function() {
      var totalPages = Math.ceil(
        this.pagedQueryResult.total / this.pagedQueryResult.limit
      );

      return Math.max(totalPages, 1);
    }
  },
  methods: {
    selectProduct: function(product) {
      this.$emit("onProductSelected", product);
    },
    getSearchPage: function(page) {
      this.page = page;
      logEvent(`Searched for "${this.searchText}"`);

      this.commercetoolsClient
        .searchProducts({
          text: this.searchText,
          limit: this.itemsPerPage,
          offset: (this.page - 1) * this.itemsPerPage,
          culture: this.culture
        })
        .then(result => {
          logEvent(`Got paged query result for "${this.searchText}"`, result);
          this.pagedQueryResult = result;
        })
        .catch(reason => {
          logEvent(`Error searching for "${this.searchText}"`, reason);
        });
    },
    search: function() {
      this.getSearchPage(1);
    },
    loadLanguages: function() {
      this.commercetoolsClient.getProject().then(projectDetails => {
        logEvent("Got project details", projectDetails);
        this.cultures = projectDetails.languages;
      });
    }
  },
  created: function() {
    this.culture = this.defaultCulture;
    this.cultures.push(this.defaultCulture);
    this.loadLanguages();
  }
};
</script>

<style scoped>
fieldset {
  border: none;
  padding: 0;
}

.search__query-box {
  display: flex;
  width: 100%;
  column-gap: 10px;
  margin-bottom: 10px;
}

.search__query-box .text-field__input {
  min-width: inherit;
  flex-grow: 1;
}
.search__query-box .form__dropdown {
  width: auto;
}

.paging {
  display: flex;
  width: 100%;
  margin: 10px 0;
  column-gap: 10px;
  justify-content: center;
}
.paging__info {
  line-height: 31px;
}
</style>
