<script setup>
import { IonGrid, IonRow, IonCol } from "@ionic/vue";
import { defineComponent, defineProps } from "vue";

defineComponent({
  name: "GridComponent",
  components: { IonGrid, IonRow, IonCol },
});

defineProps({
  Column: {
    type: String,
    required: true,

    validator: (number) => {
      const _ColumnNumber = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
      ];
      return _ColumnNumber.includes(number);
    },
  },

  GridFixed: {
    type: Boolean,
    required: false,
    default: true,
  },

  Items: {
    type: Object,
    required: false,
  },
});
</script>

<style lang="scss" scoped></style>

<template>
  <ion-grid :fixed="GridFixed">
    <ion-row v-if="Items.length">
      <ion-col v-for="(item, index) in Items" :key="index" :size="Column">
        <slot :item="item" />
      </ion-col>
    </ion-row>

    <ion-row v-else>
      <ion-col :size="Column">
        <slot />
      </ion-col>
    </ion-row>
  </ion-grid>
</template>
