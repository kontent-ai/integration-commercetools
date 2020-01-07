<template>
  <div
    class="debug-window"
    v-if="element && element.config && element.config.debug"
  >
    <div class="tag tag--yellow">
      Debug Window
    </div>
    <div class="debug-window__content">
      <div class="switch-wrapper">
        <input type="checkbox" :checked="!element.disabled" hidden />
        <label
          class="switch"
          @click="$emit('handleDisable', !element.disabled)"
        ></label>
        <span class="switch__label">Element enabled</span>
      </div>

      <Expander title="Value">
        <pre>{{ value ? value : "null" }}</pre>
      </Expander>

      <Expander title="Element">
        <pre>{{ element }}</pre>
      </Expander>

      <Expander title="Context">
        <pre>{{ context }}</pre>
      </Expander>

      <Expander title="Event History">
        <em v-if="eventHistory.length === 0">No events</em>
        <Expander
          v-for="(event, index) in eventHistory"
          :key="index"
          :title="event.title"
        >
          Occured at: {{ event.occuredAt }}
          <pre>{{ event.data }}</pre>
        </Expander>
      </Expander>
    </div>
  </div>
</template>

<script>
import { GlobalEventBus } from "./../globalEventBus";
import Expander from "./Expander";

export default {
  components: {
    Expander
  },
  props: {
    context: { required: true },
    element: { required: true },
    value: { required: true }
  },
  data: () => ({
    eventHistory: []
  }),
  created: function() {
    GlobalEventBus.$on("onElementChanged", payload => {
      this.eventHistory.push({
        type: "elementChanged",
        title: `Element Changed: ${payload}`,
        occuredAt: Date.now(),
        data: {
          elementCodename: payload
        }
      });
    });
  }
};
</script>

<style scoped>
.debug-window {
  margin: 10px;
}

.debug-window .tag {
  float: right;
}

.debug-window__content {
  border: 1px solid #ffc800;
  background: #ffc8000f;
  border-radius: 2px;
  padding: 5px;
}

.tag {
  display: inline-block;
  height: 26px;
  max-width: 100%;
  padding: 3px 6px;
  overflow: hidden;
  font-size: 16px;
  line-height: normal;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  cursor: inherit;
  background-color: #919194;
  border-radius: 2px;
  transition: all 0.15s cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

.tag--yellow,
.tag--yellow:focus {
  color: #4c4d52;
  text-decoration: none;
  background-color: #ffc800;
  outline: none;
}
</style>
