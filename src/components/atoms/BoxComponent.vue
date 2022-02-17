<script>
import { IonItem, IonLabel, IonNote, IonIcon } from "@ionic/vue";

export default {
  name: "BoxComponent",
  components: {
    IonItem,
    IonLabel,
    IonNote,
    IonIcon,
  },
};
</script>

<script setup>
import { defineProps } from "vue";

defineProps({
  className: {
    type: String,
    required: false,
  },

  Icon: {
    type: String,
    required: false,
  },

  BoxSubtitle: {
    type: String,
    required: false,
  },

  BoxNumber: {
    type: String,
    required: false,
  },

  Color: {
    type: String,
    required: false,
    default: "primary",

    validator: (value) => {
      const _colors = [
        "primary",
        "secondary",
        "tertiary",
        "success",
        "warning",
        "danger",
        "light",
        "medium",
        "dark",
      ];
      return _colors.includes(value);
    },
  },

  Lines: {
    type: String,
    required: false,
    default: "none",
  },

  Button: {
    type: Boolean,
    required: false,
    default: false,
  },

  ClassName: {
    type: String,
    required: false,
  },

  Detail: {
    type: Boolean,
    required: false,
  },
});
</script>

<template>
  <ion-item
    :color="Color"
    :lines="Lines"
    :button="Button"
    :class="ClassName"
    :detail="Detail"
  >
    <ion-label>
      <ion-icon size="default" :icon="Icon"></ion-icon>
      {{ BoxSubtitle }}
    </ion-label>
    <ion-note color="primary">{{ BoxNumber }}</ion-note>
  </ion-item>
</template>

<style lang="scss" scoped></style>
