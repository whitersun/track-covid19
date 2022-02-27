<script setup>
import {
  IonImg,
  IonList,
  IonListHeader,
  IonLabel,
  IonText,
  IonItem,
  IonSkeletonText,
} from "@ionic/vue";
import { shieldCheckmarkOutline, bagAddOutline, createOutline } from "ionicons/icons";
import { ref, defineProps } from "vue";

import TabLayout from "@/components/modules/TabLayout.vue";
import ButtonsComponent from "@/components/atoms/ButtonsComponent.vue";

import "./FacebookProfile.scss";

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
  facebookUser: [Object, String],
});
</script>

<template>
  <div class="container userFacebookProfile">
    <div class="box-header ion-margin-bottom" slot="fixed">
      <div class="view">
        <ion-img
          v-if="facebookUser"
          :src="facebookUser.picture.data.url"
          class="user-avatar"
        ></ion-img>
        <ion-skeleton-text v-else animated class="skeleton-class"></ion-skeleton-text>
      </div>

      <div class="content ion-padding-horizontal">
        <div class="userInfo">
          <h1 v-if="facebookUser && facebookUser.hasOwnProperty('name')" class="username">
            {{ facebookUser.name }}
          </h1>
          <ion-skeleton-text
            v-else
            animated
            class="skeleton-class-username"
          ></ion-skeleton-text>

          <small
            v-if="facebookUser && facebookUser.hasOwnProperty('email')"
            class="userEmail"
          >
            {{ facebookUser.email }}
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
        v-if="facebookUser"
        ClassName="HomeBoxComponent"
        :InfoData="info ? info : undefined"
        :structure="structure"
      />

      <div v-else class="flex-skeleton ion-padding-horizontal">
        <ion-skeleton-text animated class="skeleton-class-1"></ion-skeleton-text>
        <ion-skeleton-text animated class="skeleton-class-2"></ion-skeleton-text>
      </div>
    </div>

    <div class="box-footer ion-margin-vertical">
      <ion-list lines="none">
        <ion-list-header class="ion-margin-start">
          <ion-label>
            <span v-if="facebookUser">Detail</span>
            <ion-skeleton-text
              v-else
              animated
              style="width: 20%; border-radius: 25px"
            ></ion-skeleton-text>
          </ion-label>
        </ion-list-header>

        <ion-item
          v-if="facebookUser && facebookUser.hasOwnProperty('gender')"
          button
          class="ion-margin-horizontal ion-margin-bottom"
        >
          <ion-label slot="start">Gender</ion-label>
          <ion-text slot="end" color="dark">{{ facebookUser.gender }}</ion-text>
        </ion-item>
        <ion-skeleton-text
          v-else
          animated
          class="skeleton-class-list ion-margin-horizontal"
        ></ion-skeleton-text>

        <ion-item
          v-if="facebookUser && facebookUser.hasOwnProperty('birthday')"
          button
          class="ion-margin-horizontal ion-margin-bottom"
        >
          <ion-label slot="start">Birthday</ion-label>
          <ion-text slot="end" color="dark">{{ facebookUser.birthday }}</ion-text>
        </ion-item>
        <ion-skeleton-text
          v-else
          animated
          class="skeleton-class-list ion-margin-horizontal"
        ></ion-skeleton-text>

        <ion-item
          v-if="facebookUser && facebookUser.hasOwnProperty('location')"
          button
          class="ion-margin-horizontal ion-margin-bottom"
        >
          <ion-label slot="start">Current location</ion-label>
          <ion-text slot="end" color="dark">{{ facebookUser.location.name }}</ion-text>
        </ion-item>
        <ion-skeleton-text
          v-else
          animated
          class="skeleton-class-list ion-margin-horizontal"
        ></ion-skeleton-text>

        <ion-item
          v-if="facebookUser && facebookUser.hasOwnProperty('gender')"
          button
          class="ion-margin-horizontal ion-margin-bottom"
        >
          <ion-label slot="start">Hometown</ion-label>
          <ion-text slot="end" color="dark">{{ facebookUser.hometown.name }}</ion-text>
        </ion-item>
        <ion-skeleton-text
          v-else
          animated
          class="skeleton-class-list ion-margin-horizontal"
        ></ion-skeleton-text>
      </ion-list>
    </div>
  </div>
</template>
