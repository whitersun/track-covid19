<script setup>
import { defineProps } from "vue";
import { IonItemGroup, IonItemDivider, IonLabel, IonItem } from "@ionic/vue";
import ModalLayout from "@/components/modules/ModalLayout.vue";

const props = defineProps({
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

  CloseIcon: {
    type: String,
    required: false,
  },

  CloseButtonText: {
    type: String,
    required: false,
  },

  Label: {
    type: String,
    required: false,
  },

  ListHeader: {
    type: String,
    required: false,
  },

  TitleClassName: {
    type: String,
    required: false,
  },

  ArrayItem: {
    type: Object,
    required: false,
  },
});

console.log(props.HeaderTitle);
</script>

<style lang="scss" scoped></style>

<template>
  <ModalLayout
    :mode="mode"
    :HeaderClass="HeaderClass"
    :HeaderTitle="HeaderTitle"
    :HeaderTranslucent="HeaderTranslucent"
    :HeaderStyle="HeaderStyle"
    :HeaderToolbarColor="HeaderToolbarColor"
    :HeaderToolbarClass="HeaderToolbarClass"
    :HeaderToolbarStyle="HeaderToolbarStyle"
    :HeaderTitleSize="HeaderTitleSize"
    :HeaderTitleClass="HeaderTitleClass"
    :HeaderTitleStyle="HeaderTitleStyle"
    :HeaderCollapse="HeaderCollapse"
    :ContentFullScreen="ContentFullScreen"
    @CloseButton="ModalCloseButton($event)"
  >
    <title-component
      :Mode="mode"
      :Label="Label"
      :ListHeader="ListHeader"
      :ClassName="TitleClassName"
    />

    <ion-item-group v-if="ArrayItem">
      <ion-item-divider>
        <ion-label>{{ ArrayItem.cases }}</ion-label>
      </ion-item-divider>

      <ion-item v-for="(index, item) in ArrayItem" :key="index">
        <ion-label>{{ item.cases.new }}</ion-label>
      </ion-item>
    </ion-item-group>
  </ModalLayout>
</template>
