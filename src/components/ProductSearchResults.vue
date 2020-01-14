<template>
  <div v-if="resultData">
    <h3>{{ resultData.count }} Results</h3>
    <div class="cards">
      <ProductCard
        v-for="result in results"
        :key="result.key"
        :productKey="result.key"
        :name="result.name"
        :image="result.image"
      >
        <button class="btn btn--primary" @click="selectProduct(result.key)">
          <i class="icon-add"></i>&nbsp;Select product
        </button>
      </ProductCard>
    </div>
  </div>
</template>

<script>
import ProductCard from "./ProductCard";
import { mapProduct } from "../helpers/commercetools";
export default {
  components: {
    ProductCard
  },
  props: {
    resultData: {
      type: Object,
      required: false
    }
  },
  computed: {
    results: function() {
      if (this.$props.resultData && this.$props.resultData.results) {
        return this.$props.resultData.results.map(result =>
          mapProduct(result, "en-US")
        );
      }
      return null;
    }
  },
  methods: {
    selectProduct: function(key) {
      this.$emit("selectProduct", key);
    }
  }
};
</script>

<style scoped>
.cards {
  width: 100%;
  display: flex;
  justify-content: start;
  column-gap: 10px;
  row-gap: 10px;
  flex-wrap: wrap;
}
h3 {
  margin-bottom: 10px;
}
</style>
