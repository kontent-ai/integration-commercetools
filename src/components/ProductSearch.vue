<template>
  <div>
    <form @submit.prevent="search">
      <fieldset>
        <div class="searchBox">
          <input
            class="text-field__input"
            type="text"
            placeholder="Search commercetools"
            v-model="searchText"
          />
          <button class="btn btn--primary" type="submit">Search</button>
        </div>
      </fieldset>
    </form>
    <div v-if="pagedQueryResult">
      <h3>{{ pagedQueryResult.total }} Results</h3>
      <ProductSearchResultsList
        :culture="culture"
        :results="pagedQueryResult.results"
        @onProductSelected="selectProduct"
      />
      <button v-if="page > 1 && pages > 1" @click="goToPage(page - 1)">
        Previous
      </button>
      Page {{ page }} of {{ pages }}
      <button v-if="page < pages" @click="goToPage(page + 1)">Next</button>
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
      default: 3
    }
  },
  data: () => ({
    culture: "en-US",
    searchText: "",
    pagedQueryResult: null,
    page: 1
  }),
  computed: {
    pages: function() {
      return Math.ceil(
        this.pagedQueryResult.total / this.pagedQueryResult.limit
      );
    }
  },
  methods: {
    selectProduct: function(product) {
      this.$emit("onProductSelected", product);
    },
    goToPage: function(page) {
      this.page = page;
      this.search();
    },
    search: function() {
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
    }
  }
};
</script>

<style scoped>
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
