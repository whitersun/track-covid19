<template>
  <TitleComponent
    :className="ClassName"
    :Label="Label"
    :Color="Color"
    :LabelIcon="LabelIcon ? LabelIcon : ''"
    :ButtonIcon="ButtonIcon"
    :TextButton="TextButton"
    :ListHeader="ListHeader"
    :HasButton="HasButton"
  />
</template>

<script>
import TitleComponent from "@/components/atoms/TitleComponent.vue";

export default {
  name: "TitleLayout",
  components: {
    TitleComponent,
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
    required: true,
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

<style lang="scss"></style>
