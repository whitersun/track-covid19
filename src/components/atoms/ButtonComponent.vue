<template>
  <ion-button
    :color="Color"
    :expand="Expand"
    :class="ClassName"
    :size="ButtonSize"
    :slot="SlotPosition"
    @click="$emit('ButtonEvent')"
  >
    <ion-icon v-if="ButtonIcon" slot="start" :icon="ButtonIcon"></ion-icon>
    <slot v-if="ButtonText">{{ ButtonText }}</slot>
    <slot />
  </ion-button>
</template>

<script>
import { IonButton, IonIcon } from "@ionic/vue";

export default {
  name: "ButtonComponent",
  components: {
    IonButton,
    IonIcon,
  },
};
</script>

<script setup>
import { defineProps } from "vue";

defineProps({
  SlotPosition: {
    type: String,
    required: false,
    slot: "start",
  },

  ButtonIcon: {
    type: [String, Object],
    required: false,
  },

  ButtonSize: {
    type: [String, Object],
    required: false,
  },

  ButtonText: {
    type: [String, Object],
    required: false,
  },

  Expand: {
    type: [String, Object],
    required: false,
  },

  Color: {
    type: [String, Object],
    required: false,
  },

  ClassName: {
    type: [String, Object],
    required: false,
  },
});
</script>

<style lang="scss" scoped></style>
