<template>
  <div v-if="details">
    Currenly Selected: {{ name }} ({{ key }})<br />
    <p v-if="description">Desc: {{ description }}</p>
    <img :src="image" v-if="image" />
    <button class="form__icon-btn" type="button" @click="reset()">
      <i class="icon-remove"></i>
    </button>
  </div>
</template>

<script>
import { logEvent } from "../globalEventBus";

export default {
  props: {
    commercetoolsClient: {
      type: Object,
      required: true
    },
    product: {
      type: Object,
      required: true
    },
    culture: {
      type: String,
      required: true
    }
  },
  data: () => ({
    details: null
  }),
  computed: {
    key: function() {
      if (this.$props.product && this.$props.product.key) {
        return this.$props.product.key;
      }
      return null;
    },
    name: function() {
      return this.getLocalizedProperty("name", this.culture);
    },
    description: function() {
      return this.getLocalizedProperty("description", this.culture);
    },
    image: function() {
      if (
        this.details &&
        this.details.masterVariant &&
        this.details.masterVariant.images.length > 0
      ) {
        const full = this.details.masterVariant.images[0].url;
        const index = full.lastIndexOf(".");
        return full.substring(0, index) + "-small" + full.substring(index);
      }
      return null;
    }
  },
  watch: {
    product: {
      immediate: true,
      handler: "getCurrentProduct"
    }
  },
  methods: {
    getCurrentProduct: async function() {
      if (this.key) {
        logEvent(`Getting product details for "${this.key}"`);
        const details = await this.commercetoolsClient.getProductByKey({
          key: this.key
        });

        logEvent(`Got product details for "${this.key}"`, details);
        this.details = details;
      }
    },
    getLocalizedProperty: function(property, culture) {
      const valueExists =
        this.details &&
        this.details[property] &&
        this.details[property][culture];

      return valueExists ? this.details[property][culture] : null;
    }
  }
};
</script>
