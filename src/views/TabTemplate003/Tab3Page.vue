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
  // IonList,
  // IonItem,
  // IonNote,
  // IonImg,
  // IonLabel,
  // IonSkeletonText,
  isPlatform,
} from "@ionic/vue";
import { logoFacebook, logOutOutline } from "ionicons/icons";
import { computed, onBeforeMount, onMounted, ref } from "vue";
import { useStore } from "vuex";

import { FacebookLoginExtension } from "@/hooks/Facebook";
import { LineLogoutExtension } from "@/hooks/Line";

import { DetectedLoginPlatform } from "@/hooks/LoginPlatform";

import "./Tab3Page.scss";
import LineImage from "@/assets/images/png/LINE_APP_iOS.png";

const store = useStore();

const {
  AsyncLoginCallback,
  LogoutFacebook,
  DefineFacebookAccessToken,
} = FacebookLoginExtension();

const {
  LineUserData,
  // onLineLogout,
  // AsyncLineLoginCallback,
  onLineVerifyAccessToken,
} = LineLogoutExtension();

const { AsyncUserLoginPlatform } = DetectedLoginPlatform();

const getFbData = computed(() => store.state.user.facebookUserData);

const LineImageIcon = ref(LineImage);

// async function timeout(time) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve();
//     }, time);
//   });
// }

// const imgLoad = ref(false);
// function imageIsLoading() {
//   imgLoad.value = false;
// }

// async function imageLoaded() {
//   await timeout(250);
//   imgLoad.value = true;
// }

async function RefetchFacebookUserLogin() {
  if (!getFbData.value) await DefineFacebookAccessToken();
}

async function RefetchLineLogin() {
  if (!LineUserData.value) {
    onLineVerifyAccessToken();
  }
}

const ObserverUserPlatform = computed(() => {
  return store.state.user.loginPlatform || "";
});

const LineIconStyle = "width: 100%; height: 100%; padding: 8px;";
const isIos = ref(false);

async function DetectedUserLoginPlatform() {
  // await RefetchFacebookUserLogin();
  await AsyncUserLoginPlatform().then(async (result) => {
    console.log(result);

    const config = {
      facebook: {
        platform: result.UserLoginWithFacebook.platform,
        state: result.UserLoginWithFacebook.state,
      },
      line: {
        platform: result.UserLoginWithLine,
      },
    };

    await store.dispatch("user/LoginPlatform", config);

    const ErrorList = ["", null, undefined, false];
    if (!ErrorList.includes(result.isLoginWithFacebook)) await RefetchFacebookUserLogin();
    if (!ErrorList.includes(result.isLineLogin)) await RefetchLineLogin();
  });
}

onBeforeMount(async () => {
  await DetectedUserLoginPlatform();

  console.log(ObserverUserPlatform.value.facebook.state);
});

onMounted(async () => {
  if (isPlatform("ios")) isIos.value = true;
  else isIos.value = false;
});
</script>

<template>
  <LayoutComponent
    HeaderTitle="Personal"
    HeaderTitleClass="text-uppercase"
    HeaderTitleSize="large"
    :HeaderToolbarColor="isIos ? 'transparent' : 'light'"
  >
    <!-- {{ ObserverUserPlatform.hasOwnProperty("facebook") }} -->

    <div
      v-if="ObserverUserPlatform.facebook && ObserverUserPlatform.line"
      class="ion-padding"
    >
      <slot>
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

    <template v-if="isIos" #HeaderContentButton>
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

      <ion-button
        v-if="ObserverUserPlatform.line.state"
        expand="fill"
        color="danger"
        v-on:click="onLineLogout()"
      >
        <img :src="LineImageIcon" alt="" :style="LineIconStyle" />
        <span>logout</span>
      </ion-button>
    </template>

    <!-- {{ getFbData }} -->
    <!-- <ion-button
      v-if="!UserLoginFacebook.state"
      expand="fill"
      color="success"
      v-on:click="AsyncLineLoginCallback()"
    >
      <img :src="LineImageIcon" alt="" :style="LineIconStyle" />
      <span>Line</span>
    </ion-button> -->

    <!-- <ion-button v-else expand="fill" color="danger" v-on:click="onLineLogout()">
      <img :src="LineImageIcon" alt="" :style="LineIconStyle" />
      <span>logout</span>
    </ion-button> -->

    <!-- <div v-if="LineUserData">
      {{ LineUserData }}
    </div> -->

    <!-- <div class="ion-padding">
      {{ ObserverUserPlatform }}
    </div> -->
    <!-- {{ UserLoginFacebook }} -->
    <!-- <slot v-if="UserLoginFacebook.state && getFbData">
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
    </slot> -->

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
  </LayoutComponent>
</template>
