<script>
export default {
  name: "Tab3Page",
};
</script>

<script setup>
import {
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonNote,
  IonImg,
  IonLabel,
  IonSkeletonText,
} from "@ionic/vue";
import { logoFacebook } from "ionicons/icons";

import { computed, onBeforeMount, ref } from "vue";

import { FacebookLoginExtension } from "@/hooks/Facebook";

const {
  store,
  AsyncLoginCallback,
  LogoutFacebook,
  DefineFacebookAccessToken,
} = FacebookLoginExtension();

const getFbData = computed(() => {
  return store.state.facebookUserData;
});

async function timeout(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

const imgLoad = ref(false);
function imageIsLoading() {
  imgLoad.value = false;
}

async function imageLoaded() {
  await timeout(250);
  imgLoad.value = true;
}

onBeforeMount(async () => {
  console.log(getFbData.value);

  if (!getFbData.value) {
    await DefineFacebookAccessToken();
  }
});
</script>

<style>
.text-wrap {
  white-space: normal;
}

.hide {
  display: flex;
  opacity: 0;

  position: absolute;
  visibility: hidden;
  transition: opacity 500ms ease;
}

.show {
  display: block;
  opacity: 1;
}
</style>

<template>
  <LayoutComponent mode="ios" HeaderTitle="Personal" HeaderTitleClass="text-uppercase">
    <ion-button
      v-if="!getFbData"
      expand="block"
      color="primary"
      v-on:click="AsyncLoginCallback()"
    >
      <ion-icon slot="start" :icon="logoFacebook"></ion-icon>
      facebook
    </ion-button>

    <slot v-if="getFbData">
      <ion-img
        :class="[imgLoad ? 'show' : 'hide']"
        :src="getFbData.picture.data.url"
        @ionImgWillLoad="imageIsLoading"
        @ionImgDidLoad="imageLoaded"
      ></ion-img>

      <ion-skeleton-text
        v-if="!imgLoad"
        class="ion-no-margin"
        animated
        style="width: 100%; height: 25rem"
      ></ion-skeleton-text>

      <ion-list class="ion-margin-vertical" lines="none">
        <ion-item>
          <ion-label>ID:</ion-label>
          <ion-note>{{ getFbData.id }}</ion-note>
        </ion-item>
        <ion-item>
          <ion-label>Email:</ion-label>
          <ion-note>{{ getFbData.email }}</ion-note>
        </ion-item>
        <ion-item>
          <ion-label>username:</ion-label>
          <ion-note>{{ getFbData.name }}</ion-note>
        </ion-item>
        <ion-item>
          <ion-label>Gender:</ion-label>
          <ion-note>{{ getFbData.gender }}</ion-note>
        </ion-item>
        <ion-item>
          <ion-label>Birthday:</ion-label>
          <ion-note>{{ getFbData.birthday }}</ion-note>
        </ion-item>
        <ion-item>
          <ion-label>Hometown:</ion-label>
          <ion-note>{{ getFbData.hometown.name }}</ion-note>
        </ion-item>
        <ion-item>
          <ion-label>Current Location:</ion-label>
          <ion-note>{{ getFbData.location.name }}</ion-note>
        </ion-item>
      </ion-list>
    </slot>

    <slot v-else>
      <ion-img
        src="https://images.unsplash.com/photo-1594322436404-5a0526db4d13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=829&q=80"
      ></ion-img>
    </slot>

    <ion-button
      v-if="getFbData"
      class="ion-margin-bottom"
      expand="block"
      color="danger"
      v-on:click="LogoutFacebook()"
    >
      <ion-icon slot="start" :icon="logoFacebook"></ion-icon>
      log out
    </ion-button>
  </LayoutComponent>
</template>
