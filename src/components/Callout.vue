<template>
  <div>
    <div :class="`callout callout--is-${type}`">
      <div class="callout__title">{{ title }}</div>
      <div class="callout__message">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }
};
</script>

<style>
.callout {
  padding-left: 8px;
  font-size: 16px;
  border-left: 4px solid #919194;
}
.callout + .callout {
  margin-top: 16px;
}
.callout--is-info {
  border-left-color: #0a68f5;
}
.callout--is-error {
  border-left-color: #f02222;
}
.callout--is-warning {
  border-left-color: #ffc800;
}
.callout__title {
  display: inline-flex;
  padding: 0 4px;
  font-size: 14px;
  text-transform: uppercase;
}
.callout--is-productivity-tip .callout__title,
.callout__title {
  color: #fff;
  background-color: #4c4d52;
}
.callout--is-info .callout__title {
  color: #fff;
  background-color: #0a68f5;
}
.callout--is-error .callout__title {
  color: #fff;
  background-color: #f02222;
}
.callout--is-warning .callout__title {
  color: #4c4d52;
  background-color: #ffc800;
}
.callout__message {
  white-space: normal;
}
.callout__text-block + .callout__text-block {
  margin-top: 8px;
}
</style>
