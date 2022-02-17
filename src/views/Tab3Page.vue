<script>
export default {
  name: "Tab3Page",
};
</script>

<script setup>
import {
  IonButtons,
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonNote,
  IonImg,
  IonLabel,
  IonSkeletonText,
  isPlatform,
} from "@ionic/vue";
import { logoFacebook, logOutOutline } from "ionicons/icons";

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

const isIos = ref(false);

onBeforeMount(async () => {
  console.log(getFbData.value);

  if (!getFbData.value) {
    await DefineFacebookAccessToken();
  }

  if (isPlatform("ios")) isIos.value = true;
  else isIos.value = false;
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

ion-img.avatar-style::part(image) {
  margin: auto;
  width: 250px;
  height: 250px;
  border-radius: 50%;
}

ion-icon.rotation-icon {
  transform: rotate(180deg);
}

ion-note.text-note {
  font-size: 14px;
}

ion-skeleton-text.img-skeleton-loading {
  width: 250px;
  height: 250px;
  border-radius: 50%;

  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: auto;
  margin-right: auto;
}
</style>

<template>
  <LayoutComponent
    HeaderTitle="Personal"
    HeaderTitleClass="text-uppercase"
    HeaderTitleSize="large"
    :HeaderToolbarColor="isIos ? 'transparent' : 'light'"
  >
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
        class="avatar-style ion-padding ion-margin-vertical"
        :class="[imgLoad ? 'show' : 'hide']"
        :src="getFbData.picture.data.url"
        @ionImgWillLoad="imageIsLoading"
        @ionImgDidLoad="imageLoaded"
      ></ion-img>

      <ion-skeleton-text
        animated
        v-if="!imgLoad"
        class="img-skeleton-loading"
      ></ion-skeleton-text>

      <ion-list class="ion-margin-vertical" lines="none">
        <ion-item>
          <ion-label>ID:</ion-label>
          <ion-note v-if="getFbData" slot="end" class="text-note">{{
            getFbData.id
          }}</ion-note>
          <ion-skeleton-text v-else animated style="width: 50%"></ion-skeleton-text>
        </ion-item>
        <ion-item>
          <ion-label>Email:</ion-label>
          <ion-note v-if="getFbData" slot="end" class="text-note">{{
            getFbData.email
          }}</ion-note>
          <ion-skeleton-text v-else animated style="width: 50%"></ion-skeleton-text>
        </ion-item>
        <ion-item>
          <ion-label>username:</ion-label>
          <ion-note v-if="getFbData" slot="end" class="text-note">{{
            getFbData.name
          }}</ion-note>
          <ion-skeleton-text v-else animated style="width: 50%"></ion-skeleton-text>
        </ion-item>
        <ion-item>
          <ion-label>Gender:</ion-label>
          <ion-note v-if="getFbData.gender" slot="end" class="text-note">{{
            getFbData.gender
          }}</ion-note>
          <ion-skeleton-text v-else animated style="width: 50%"></ion-skeleton-text>
        </ion-item>
        <ion-item>
          <ion-label>Birthday:</ion-label>
          <ion-note v-if="getFbData" slot="end" class="text-note">{{
            getFbData.birthday
          }}</ion-note>
          <ion-skeleton-text v-else animated style="width: 50%"></ion-skeleton-text>
        </ion-item>
        <ion-item>
          <ion-label>Hometown:</ion-label>
          <ion-note v-if="getFbData" slot="end" class="text-note">{{
            getFbData.hometown.name
          }}</ion-note>
          <ion-skeleton-text v-else animated style="width: 50%"></ion-skeleton-text>
        </ion-item>
        <ion-item>
          <ion-label>Current Location:</ion-label>
          <ion-note v-if="getFbData" slot="end" class="text-note">{{
            getFbData.location.name
          }}</ion-note>
          <ion-skeleton-text v-else animated style="width: 50%"></ion-skeleton-text>
        </ion-item>
      </ion-list>
    </slot>

    <slot v-else>
      <ion-img
        src="https://images.unsplash.com/photo-1594322436404-5a0526db4d13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=829&q=80"
      ></ion-img>
    </slot>

    <template v-if="!isIos" #HeaderButton>
      <ion-buttons slot="end">
        <ion-button
          v-if="getFbData"
          class="ion-margin-bottom"
          expand="fill"
          color="danger"
          size="small"
          v-on:click="LogoutFacebook()"
        >
          <ion-icon class="rotation-icon" slot="start" :icon="logOutOutline"></ion-icon>
          log out
        </ion-button>
      </ion-buttons>
    </template>

    <template v-if="isIos" #HeaderContentButton>
      <ion-buttons slot="end">
        <ion-button
          v-if="getFbData"
          class="ion-margin-bottom"
          expand="fill"
          color="danger"
          size="small"
          v-on:click="LogoutFacebook()"
        >
          <ion-icon class="rotation-icon" slot="start" :icon="logOutOutline"></ion-icon>
          log out
        </ion-button>
      </ion-buttons>
    </template>
  </LayoutComponent>
</template>
