<script setup>
import { IonImg, IonSkeletonText } from "@ionic/vue";
import { shieldCheckmarkOutline, bagAddOutline, createOutline } from "ionicons/icons";
import { ref, defineProps } from "vue";

import TabLayout from "@/components/modules/TabLayout.vue";
import ButtonsComponent from "@/components/atoms/ButtonsComponent.vue";

import "./LineProfile.scss";

const info = ref([
  {
    subtitle: "Verify",
    icon: shieldCheckmarkOutline,
    number: new Intl.NumberFormat().format(46),
  },
  { subtitle: "Vaccine", icon: bagAddOutline, number: new Intl.NumberFormat().format(2) },
]);

const structure = ref([
  {
    id: 1,
    subtitle: "Verify",
    icon: shieldCheckmarkOutline,
    number: `${new Intl.NumberFormat().format(46)} Days`,
    color: "light",
    background: "success",
  },
  {
    id: 2,
    subtitle: "Vaccine",
    icon: bagAddOutline,
    number: 2,
    color: "dark",
    background: "light",
  },
]);

defineProps({
  lineUser: [Object, String],
});
</script>

<template>
  <div class="container userLineProfile">
    <div class="box-header ion-margin-bottom" slot="fixed">
      <div class="view">
        <ion-img v-if="lineUser" :src="lineUser.pictureURL" class="user-avatar"></ion-img>
        <ion-skeleton-text v-else animated class="skeleton-class"></ion-skeleton-text>
      </div>

      <div class="content ion-padding-horizontal">
        <div class="userInfo">
          <h1 v-if="lineUser && lineUser.hasOwnProperty('displayName')" class="username">
            {{ lineUser.displayName }}
          </h1>
          <ion-skeleton-text
            v-else
            animated
            class="skeleton-class-username"
          ></ion-skeleton-text>

          <small v-if="lineUser && lineUser.hasOwnProperty('email')" class="userEmail">
            {{ lineUser.email }}
          </small>
          <ion-skeleton-text
            v-else
            animated
            class="skeleton-class-email"
          ></ion-skeleton-text>
        </div>

        <div class="ProfileEdit">
          <ButtonsComponent
            ClassName="EditButton"
            ButtonText="Edit"
            :ButtonIcon="createOutline"
          />
        </div>
      </div>
    </div>

    <div class="box-body">
      <TabLayout
        mode="md"
        v-if="lineUser"
        ClassName="HomeBoxComponent"
        :InfoData="info ? info : undefined"
        :structure="structure"
      />

      <div v-else class="flex-skeleton ion-padding-horizontal">
        <ion-skeleton-text animated class="skeleton-class-1"></ion-skeleton-text>
        <ion-skeleton-text animated class="skeleton-class-2"></ion-skeleton-text>
      </div>
    </div>
  </div>
</template>
