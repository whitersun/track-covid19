<template>
  <ion-searchbar
    :mode="Mode"
    :color="Color"
    :placeholder="SearchPlaceholder"
    :inputmode="InputMode"
    :type="InputType"
    :value="modelValue"
    :debounce="250"
    @ionInput="$emit('update:modelValue', $event.target.value)"
    @ionChange="$emit('searchKeyWordChange')"
  ></ion-searchbar>
</template>

<script>
import { IonSearchbar } from "@ionic/vue";

export default {
  name: "SearchComponent",
  components: { IonSearchbar },
};
</script>

<script setup>
import { defineProps } from "vue";

defineProps({
  SearchPlaceholder: {
    type: String,
    required: false,
  },

  InputMode: {
    type: String,
    required: false,
    default: "search",
  },

  InputType: {
    type: String,
    required: true,
    default: "search",
  },

  modelValue: {
    type: String,
    required: false,
  },

  Color: {
    type: String,
    required: false,
  },

  Mode: {
    type: String,
    required: false,
    default: "ios",
  },
});
</script>
