<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet, useIonRouter, useBackButton } from "@ionic/vue";

export default {
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
  },
};
</script>

<script setup>
import { useStore } from "vuex";
import { App } from "@capacitor/app";
import { onErrorCaptured } from "@vue/runtime-core";

const store = useStore();
window.store = store;

const ionRouter = useIonRouter();
useBackButton(-1, () => {
  if (!ionRouter.canGoBack()) {
    App.exitApp();
  }
});

onErrorCaptured((e) => {
  console.log(e);

  const _error = [
    "The method FB.login can no longer be called from http pages.",
    "The method FB.getLoginStatus can no longer be called from http pages.",
  ];

  try {
    if (_error.includes(e.message)) {
      return;
    }
  } catch (e) {
    return;
  }
});
</script>
