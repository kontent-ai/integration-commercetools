import Vue from "vue";
export const GlobalEventBus = new Vue();
export function logEvent(title, data = null) {
  GlobalEventBus.$emit("onLogEvent", { title, data });
}
