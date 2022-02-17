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
    <!-- <SearchComponent
      v-model.lazy="headerSearch"
      SearchPlaceholder="Search Country..."
      InputType="search"
      @keyup.enter="submitSearch(headerSearch)"
    /> -->

    <ButtonComponent :ButtonIcon="ButtonIcon" @submitSearch="$emit('submitSearch')" />
    <!-- <ButtonComponent
      :ButtonIcon="searchOutline"
      @submitSearch="submitSearch(headerSearch)"
    /> -->
  </ion-item>
</template>

<script>
import { IonItem } from "@ionic/vue";
import SearchComponent from "@/components/atoms/SearchComponent.vue";
import ButtonComponent from "@/components/atoms/ButtonComponent.vue";

export default {
  name: "SearchLayout",
  components: {
    IonItem,

    SearchComponent,
    ButtonComponent,
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
