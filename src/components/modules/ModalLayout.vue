<script>
import ModalComponent from "@/components/atoms/ModalComponent.vue";

export default {
  name: "ModalLayout",
  components: {
    ModalComponent,
  },
};
</script>

<script setup>
import { defineProps } from "vue";

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
});

console.log(props.HeaderTitle);
</script>

<style lang="scss" scoped></style>

<template>
  <ModalComponent
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
    @CloseButton="CloseButton($event)"
  >
    <slot />
  </ModalComponent>
</template>
