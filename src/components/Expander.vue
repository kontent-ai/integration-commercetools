<template>
  <div>
    <span @click="expanded = !expanded">
      <i :class="expanded ? 'icon-expand-down' : 'icon-expand'"></i>
      {{ title }}
    </span>
    <div class="content" v-show="expanded">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: ["title"],
  data: () => ({
    expanded: false
  })
};
</script>

<style scoped>
.content {
  padding-left: 20px;
}
</style>
