<template>
  <ion-item mode="ios" color="default" lines="none" class="ion-no-padding">
    <SearchComponent
      :mode="Mode"
      :color="Color"
      :placeholder="SearchPlaceholder"
      :InputMode="InputMode"
      :InputType="InputType"
      :value="modelValue"
      @ionInput="$emit('update:modelValue', $event.target.value)"
      @searchKeyWordChange="$emit('searchKeyWordChange')"
      @keyup.enter="$emit('EnterSearch')"
    />
    <ButtonsComponent :ButtonIcon="ButtonIcon" @ButtonEvent="$emit('submitSearch')" />
  </ion-item>
</template>

<script>
import { IonItem } from "@ionic/vue";
import SearchComponent from "@/components/atoms/SearchComponent.vue";
import ButtonsComponent from "@/components/atoms/ButtonsComponent.vue";

export default {
  name: "SearchLayout",
  components: {
    IonItem,

    SearchComponent,
    ButtonsComponent,
  },
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

  ButtonIcon: {
    type: String,
    required: false,
  },
});
</script>
