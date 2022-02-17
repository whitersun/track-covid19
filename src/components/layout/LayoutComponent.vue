<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/vue";

export default {
  name: "LayoutComponent",
  components: { IonPage, IonHeader, IonToolbar, IonTitle, IonContent },
};
</script>

<script setup>
import { defineProps } from "vue";

defineProps({
  mode: {
    type: String,
    required: false,
  },
  HeaderClass: {
    type: String,
    required: false,
  },

  HeaderTranslucent: {
    type: Boolean,
    required: false,
    default: true,
  },

  HeaderStyle: {
    type: String,
    required: false,
  },

  HeaderToolbarColor: {
    type: String,
    required: false,
    default: "transparent",

    validator: (value) => {
      var _HeaderToolbarColor = [
        "primary",
        "secondary",
        "tertiary",
        "success",
        "warning",
        "danger",
        "light",
        "medium",
        "dark",
        "transparent",
      ];

      return _HeaderToolbarColor.includes(value);
    },
  },

  HeaderToolbarClass: {
    type: String,
    required: false,
  },

  HeaderToolbarStyle: {
    type: String,
    required: false,
  },

  HeaderTitleSize: {
    type: String,
    required: false,
    default: "large",

    validator: (value) => {
      var _HeaderTitleSize = ["small", "large", "default"];
      return _HeaderTitleSize.includes(value);
    },
  },

  HeaderTitleClass: {
    type: String,
    required: false,
  },

  HeaderTitleStyle: {
    type: String,
    required: false,
  },

  HeaderTitle: {
    type: String,
    required: false,
  },

  HeaderCollapse: {
    type: String,
    required: false,
    default: "condense",
  },

  ContentFullScreen: {
    type: Boolean,
    required: false,
    default: true,
  },
});
</script>

<template>
  <ion-page>
    <ion-header
      :mode="mode"
      :class="HeaderClass"
      :translucent="HeaderTranslucent"
      :style="HeaderStyle"
    >
      <ion-toolbar
        :color="HeaderToolbarColor"
        :class="HeaderToolbarClass"
        :style="HeaderToolbarStyle"
      >
        <ion-title
          :size="HeaderTitleSize"
          :class="HeaderTitleClass"
          :style="HeaderTitleStyle"
        >
          {{ HeaderTitle }}
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :mode="mode" :fullscreen="ContentFullScreen">
      <ion-header
        :collapse="HeaderCollapse"
        :translucent="HeaderTranslucent"
        :style="HeaderToolbarStyle"
      >
        <ion-toolbar
          :color="HeaderToolbarColor"
          :class="HeaderToolbarClass"
          :style="HeaderTitleStyle"
        >
          <ion-title :size="HeaderTitleSize" :class="HeaderTitleClass">
            {{ HeaderTitle }}
          </ion-title>
        </ion-toolbar>
      </ion-header>

      <slot />
    </ion-content>
  </ion-page>
</template>
