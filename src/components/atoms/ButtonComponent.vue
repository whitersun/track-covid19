<template>
  <ion-buttons :slot="slotPosition">
    <ion-button @click="$emit('submitSearch')">
      <ion-icon v-if="ButtonIcon" slot="start" :icon="ButtonIcon"></ion-icon>
      {{ ButtonText }}
    </ion-button>
  </ion-buttons>
</template>

<script>
import { IonButtons, IonButton, IonIcon } from "@ionic/vue";

export default {
  name: "ButtonComponent",
  components: {
    IonButtons,
    IonButton,
    IonIcon,
  },
};
</script>

<script setup>
import { defineProps } from "vue";

defineProps({
  slotPosition: {
    type: String,
    required: false,
    slot: "start",
  },

  ButtonIcon: {
    type: String,
    required: false,
  },

  ButtonText: {
    type: String,
    required: false,
  },
});
</script>

<style lang="scss" scoped></style>
