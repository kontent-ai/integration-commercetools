<template>
  <div v-if="results" class="cards">
    <ProductCard
      v-for="result in results"
      :key="result.id"
      :product="result"
      :culture="culture"
      @onProductSelected="selectProduct"
    >
    </ProductCard>
  </div>
</template>

<script>
import ProductCard from "./ProductCard";

export default {
  components: {
    ProductCard
  },
  props: {
    results: {
      type: Array,
      required: true
    },
    culture: {
      type: String,
      required: true
    }
  },
  methods: {
    selectProduct: function(payload) {
      this.$emit("onProductSelected", payload);
    }
  }
};
</script>

<style scoped>
.cards {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  column-gap: 10px;
  row-gap: 10px;
  flex-wrap: wrap;
}
</style>
