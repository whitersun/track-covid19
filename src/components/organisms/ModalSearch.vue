<script setup>
import { defineProps } from "vue";
import { IonList, IonNote, IonSkeletonText, IonLabel, IonItem } from "@ionic/vue";
import ModalLayout from "@/components/modules/ModalLayout.vue";
import TitleComponent from "@/components/atoms/TitleComponent.vue";

defineProps({
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

  TitleClassName: {
    type: String,
    required: false,
  },

  HeaderClass: {
    type: String,
    required: false,
  },

  ArrayItem: {
    type: Object,
    required: false,
  },
});
</script>

<style lang="scss" scoped></style>

<template>
  <ModalLayout
    HeaderToolbarColor="transparent"
    :HeaderClass="HeaderClass"
    :HeaderTitle="ArrayItem.country"
    :HeaderTranslucent="false"
    @CloseButton="ModalCloseButton($event)"
  >
    <TitleComponent
      ListHeader="Date"
      :Label="ArrayItem.day"
      :ClassName="TitleClassName"
    />

    <ion-list v-if="ArrayItem">
      <ion-item>
        <ion-label>new</ion-label>
        <ion-note>{{ ArrayItem.cases.new }}</ion-note>
      </ion-item>
      <ion-item>
        <ion-label>total</ion-label>
        <ion-note>{{ ArrayItem.cases.total }}</ion-note>
      </ion-item>
      <ion-item>
        <ion-label>active</ion-label>
        <ion-note>{{ ArrayItem.cases.active }}</ion-note>
      </ion-item>
      <ion-item>
        <ion-label>critical</ion-label>
        <ion-note>{{ ArrayItem.cases.critical }}</ion-note>
      </ion-item>
      <ion-item>
        <ion-label>recovered</ion-label>
        <ion-note>{{ ArrayItem.cases.recovered }}</ion-note>
      </ion-item>
      <ion-item>
        <ion-label>deaths total</ion-label>
        <ion-note>{{ ArrayItem.deaths.total }}</ion-note>
      </ion-item>
      <ion-item>
        <ion-label>deaths new</ion-label>
        <ion-note>{{ ArrayItem.deaths.new }}</ion-note>
      </ion-item>
    </ion-list>

    <ion-list v-else>
      <ion-skeleton-text animated style="width: 100%; height: 25rem"></ion-skeleton-text>
    </ion-list>
  </ModalLayout>
</template>
