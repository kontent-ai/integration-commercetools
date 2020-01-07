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
    <!-- Your UI above -->
  </fieldset>
</template>

<script>
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
  methods: {
    // Sample action below
    sampleAction: function(value) {
      this.save({
        externalId: value,
        updated: Date.now()
      });
    },
    // Sample action above
    reset: function() {
      this.save(null);
    },
    save: function(value) {
      this.$emit("update:value", value);
    }
  }
};
</script>

<style scoped>
fieldset {
  border: none;
}

.selectedNumber {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  padding: 0px;
  background: #4caf50;
  color: #fff;
  text-align: center;
  font-size: 32px;
  line-height: 50px;
  font-weight: 700;
  margin: 10px 0;
}
</style>
