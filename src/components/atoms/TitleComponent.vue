<script>
import {
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  IonButtons,
  IonButton,
  IonIcon,
} from "@ionic/vue";
export default {
  name: "TitleComponent",
  components: {
    IonList,
    IonListHeader,
    IonItem,
    IonLabel,
    IonButtons,
    IonButton,
    IonIcon,
  },
};
</script>

<script setup>
import { defineProps } from "vue";

defineProps({
  ListHeader: {
    type: String,
    required: false,
  },

  Label: {
    type: String,
    required: false,
  },

  SlotPosition: {
    type: String,
    required: false,
    default: "end",

    validator: (value) => {
      const _SlotPosition = ["start", "end", "primary", "secondary"];
      return _SlotPosition.includes(value);
    },
  },

  TextButton: {
    type: String,
    required: false,
  },

  ButtonIcon: {
    type: String,
    required: false,
  },

  LabelIcon: {
    type: String,
    required: false,
  },

  HasButton: {
    type: Boolean,
    required: false,
    default: false,
  },

  Mode: {
    type: String,
    required: false,
  },

  Color: {
    type: String,
    required: false,
  },

  ClassName: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <ion-list :class="ClassName" :mode="Mode">
    <ion-list-header :color="Color" size="small" v-if="ListHeader">
      {{ ListHeader }}
    </ion-list-header>
    <ion-item :color="Color" lines="none">
      <ion-label v-if="Label">
        <ion-icon v-if="LabelIcon" slot="start" :icon="LabelIcon"></ion-icon>
        <span> {{ Label }} </span>
      </ion-label>
      <ion-buttons v-if="HasButton" :slot="SlotPosition">
        <ion-button @click="$emit('ButtonClick')">
          <ion-icon v-if="ButtonIcon" slot="start" :icon="ButtonIcon"></ion-icon>
          <span>{{ TextButton }}</span>
        </ion-button>
      </ion-buttons>
    </ion-item>
  </ion-list>
</template>

<style lang="scss" scoped></style>
