<script setup>
import { IonButtons, IonButton, IonIcon, IonSkeletonText, isPlatform } from "@ionic/vue";
import { logoFacebook, logOutOutline } from "ionicons/icons";
import { onBeforeMount, onMounted } from "vue";
import {
  LoginFacebookUserEvent,
  ReFetchingLoginPlatform,
  LoginLineUserEvent,
} from "./UserProfile";

import "./UserProfile.scss";

const {
  isIos,
  getFbData,
  LineIconStyle,
  LineImageIcon,
  LogoutFacebook,
  RouterToProfile,
  ObserverUserLogin,
  AsyncLoginCallback,
  ObserverUserPlatform,
} = LoginFacebookUserEvent();

const {
  AccessToken,
  onLineLogout,
  LineUserData,
  getLineUserData,
  AsyncLineLoginCallback,
} = LoginLineUserEvent();

onBeforeMount(async () => {
  await ReFetchingLoginPlatform();

  console.log(ObserverUserPlatform.value.facebook.state);
});

onMounted(async () => {
  if (isPlatform("ios")) isIos.value = true;
  else isIos.value = false;
});
</script>

<template>
  <LayoutComponent
    HeaderClass="PersonalPage"
    HeaderTitleSize="large"
    HeaderTitleClass="PersonalTitle"
    HeaderTitleClassName="FlexAvatar"
    :HeaderTitle="
      ObserverUserLogin ? getFbData.name || getLineUserData.displayName : 'Login'
    "
    :HeaderToolbarColor="isIos ? 'transparent' : 'light'"
    @CallEvent="RouterToProfile()"
  >
    <!-- Show Avatar if User Already Login -->
    <template v-if="ObserverUserLogin" #Avatar>
      <slot v-if="ObserverUserPlatform.facebook.state">
        <img v-if="getFbData" class="show" :src="getFbData.picture.data.url" />
      </slot>
      <slot v-if="ObserverUserPlatform.line.state">
        <img v-if="getLineUserData" class="show" :src="getLineUserData.pictureURL" />
      </slot>
    </template>

    <!-- Show Logout Button If User Already Login -->
    <!-- If this one is not iOS system -->
    <template v-if="!isIos" #HeaderButton>
      <slot v-if="ObserverUserPlatform">
        <ion-buttons slot="end">
          <ion-button
            v-if="ObserverUserPlatform.facebook.state"
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

        <ion-buttons slot="end">
          <ion-button
            v-if="ObserverUserPlatform.line.state"
            expand="fill"
            color="danger"
            v-on:click="onLineLogout()"
          >
            <ion-icon class="rotation-icon" slot="start" :icon="logOutOutline"></ion-icon>
            log out
          </ion-button>
        </ion-buttons>
      </slot>
    </template>

    <!-- Show Logout Button If User Already Login -->
    <!-- If this one is iOS system -->
    <template v-if="isIos" #HeaderContentButton>
      <slot v-if="ObserverUserPlatform">
        <ion-buttons slot="end">
          <ion-button
            size="small"
            expand="fill"
            color="danger"
            v-if="ObserverUserPlatform.facebook.state"
            class="ion-margin-bottom"
            v-on:click="LogoutFacebook()"
          >
            <ion-icon class="rotation-icon" slot="start" :icon="logOutOutline"></ion-icon>
            log out
          </ion-button>
        </ion-buttons>

        <ion-buttons slot="end">
          <ion-button
            size="small"
            expand="fill"
            color="danger"
            v-if="ObserverUserPlatform.line.state"
            class="ion-margin-bottom"
            v-on:click="onLineLogout()"
          >
            <ion-icon class="rotation-icon" slot="start" :icon="logOutOutline"></ion-icon>
            log out
          </ion-button>
        </ion-buttons>
      </slot>

      <slot v-else>
        <ion-skeleton-text animated style="width: 50%"></ion-skeleton-text>
      </slot>
    </template>

    <!-- {{ ObserverUserLogin }} -->
    <!-- {{ ObserverUserPlatform }} -->
    <div v-if="ObserverUserPlatform" class="ion-padding">
      <slot v-if="!ObserverUserLogin">
        <ion-button
          v-if="!ObserverUserPlatform.facebook.state"
          expand="fill"
          color="primary"
          v-on:click="AsyncLoginCallback()"
        >
          <ion-icon slot="start" :icon="logoFacebook"></ion-icon>
          facebook
        </ion-button>

        <ion-button
          v-if="!ObserverUserPlatform.line.state"
          expand="fill"
          color="success"
          v-on:click="AsyncLineLoginCallback()"
        >
          <img :src="LineImageIcon" alt="" :style="LineIconStyle" />
          <span>Line</span>
        </ion-button>
      </slot>
    </div>

    <!-- <ion-button v-else expand="fill" color="danger" v-on:click="onLineLogout()">
      <img :src="LineImageIcon" alt="" :style="LineIconStyle" />
      <span>logout</span>
    </ion-button> -->

    <!-- <div v-if="LineUserData"> -->
    {{ ObserverUserPlatform }}

    <div>
      {{ ObserverUserLogin }}
    </div>
    <div>
      {{ AccessToken || "No access" }}
    </div>
    <div>{{ LineUserData || "No line data" }}</div>

    <br />
    <br />
    <div>{{ getLineUserData || "get No line data" }}</div>

    <br />
    <br />
    <div>{{ getFbData || "no facebook data" }}</div>
    <!-- </div> -->

    <!-- <div class="ion-padding">
      {{ ObserverUserPlatform }}
    </div> -->
    <!-- {{ UserLoginFacebook }} -->
  </LayoutComponent>
</template>
