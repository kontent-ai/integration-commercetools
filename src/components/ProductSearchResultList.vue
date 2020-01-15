<template>
  <div v-if="results" class="cards">
    <ProductCard
      v-for="result in simplifiedResults"
      :key="result.key"
      :productKey="result.key"
      :name="result.name"
      :image="result.image"
    >
      <button class="btn btn--primary" @click="selectProductKey(result.key)">
        <i class="icon-add"></i>&nbsp;Select product
      </button>
    </ProductCard>
  </div>
</template>

<script>
import ProductCard from "./ProductCard";
import { simplifyProductProjection } from "../helpers/commercetools";

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
  computed: {
    simplifiedResults: function() {
      return this.results.map(result =>
        simplifyProductProjection(result, this.culture)
      );
    }
  },
  methods: {
    selectProductKey: function(key) {
      this.$emit("onProductSelected", { key, culture: this.culture });
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
</style>
