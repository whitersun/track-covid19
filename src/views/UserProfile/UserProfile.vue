<script setup>
import { IonSkeletonText, isPlatform } from "@ionic/vue";
import { logOutOutline } from "ionicons/icons";
import { computed, onBeforeMount, onMounted } from "vue";

import {
  LoginFacebookUserEvent,
  ReFetchingLoginPlatform,
  LoginLineUserEvent,
  LoginGoogleUserEvent,
} from "./UserProfile";

import ButtonsComponent from "@/components/atoms/ButtonsComponent.vue";
import UserAuthentication from "@/components/pages/UserAuthentication/UserAuthentication.vue";
import FacebookProfile from "@/components/pages/FacebookProfile/FacebookProfile.vue";
import LineFacebook from "@/components/pages/LineProfile/LineProfile.vue";

import "./UserProfile.scss";

// TODO: facebook login js
const {
  isIos,
  getFbData,
  LogoutFacebook,
  ObserverUserLogin,
  AsyncLoginCallback,
  ObserverUserPlatform,
} = LoginFacebookUserEvent();

// TODO: LINE login js
const { onLineLogout, getLineUserData, AsyncLineLoginCallback } = LoginLineUserEvent();

// TODO: GOOGLE login js
const { AsyncGoogleLoginCallback } = LoginGoogleUserEvent();

onBeforeMount(async () => {
  await ReFetchingLoginPlatform();

  console.log(ObserverUserPlatform.value.facebook.state);
});

const CheckLoginState = computed(() => {
  let facebookState = ObserverUserPlatform.value.facebook.state;
  let lineState = ObserverUserPlatform.value.line.state;
  let googleState = ObserverUserPlatform.value.google.state;
  if (facebookState) return "facebook";
  else if (lineState) return "line";
  else if (googleState) return "google";
  else return "general";
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
    :HeaderTitle="ObserverUserLogin ? 'Your Profile' : 'Login'"
    :HeaderToolbarColor="isIos ? 'transparent' : 'light'"
  >
    <!-- Show Logout Button If User Already Login -->
    <!-- If this one is not iOS system -->
    <template v-if="!isIos" #HeaderButton>
      <slot v-if="ObserverUserPlatform">
        <ButtonsComponent
          Expand="fill"
          Color="danger"
          ButtonSize="small"
          ButtonType="buttons"
          SlotPosition="end"
          ButtonText="logout"
          :ButtonIcon="logOutOutline"
          v-if="ObserverUserLogin"
          @ButtonEvent="
            CheckLoginState === 'facebook'
              ? LogoutFacebook()
              : CheckLoginState === 'line'
              ? onLineLogout()
              : undefined
          "
        />
      </slot>
    </template>

    <!-- Show Logout Button If User Already Login -->
    <!-- If this one is iOS system -->
    <template v-if="isIos" #HeaderContentButton>
      <slot v-if="ObserverUserPlatform">
        <ButtonsComponent
          Expand="fill"
          Color="danger"
          ButtonSize="small"
          ButtonType="buttons"
          SlotPosition="end"
          ButtonText="logout"
          ClassName="ion-margin-bottom"
          v-if="ObserverUserLogin"
          :ButtonIcon="logOutOutline"
          @ButtonEvent="
            CheckLoginState === 'facebook'
              ? LogoutFacebook()
              : CheckLoginState === 'line'
              ? onLineLogout()
              : undefined
          "
        />
      </slot>

      <slot v-else>
        <ion-skeleton-text animated style="width: 50%"></ion-skeleton-text>
      </slot>
    </template>

    <UserAuthentication
      v-if="!ObserverUserLogin"
      :ObserverUserPlatform="ObserverUserPlatform"
      :isLogin="ObserverUserLogin"
      @FacebookLoginEvent="AsyncLoginCallback()"
      @LineLoginEvent="AsyncLineLoginCallback()"
      @GoogleLoginEvent="AsyncGoogleLoginCallback()"
    />

    <LineFacebook v-if="getLineUserData" :lineUser="getLineUserData" />
    <FacebookProfile v-if="getFbData" :facebookUser="getFbData" />
  </LayoutComponent>
</template>
