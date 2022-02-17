<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script>
import {
  IonApp,
  IonRouterOutlet,
  useIonRouter,
  useBackButton,
  alertController,
  isPlatform,
} from "@ionic/vue";

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

async function callAlert() {
  const alert = await alertController.create({
    header: "Error",
    message:
      "Oop! Have some problem about fetching data, please reopen app and check again",

    backdropDismiss: isPlatform("ios") ? false : true,

    buttons: isPlatform("android")
      ? [
          {
            role: "cancel",
            text: "exit",

            handler: () => {
              App.exitApp();
            },
          },
        ]
      : undefined,
  });

  return alert.present();
}

onErrorCaptured(async (e) => {
  console.log(e.message);

  const _error = [
    "The method FB.login can no longer be called from http pages.",
    "The method FB.getLoginStatus can no longer be called from http pages.",
  ];

  switch (e.message) {
    case "Request failed with status code 502": {
      if (isPlatform("mobile")) await callAlert();

      break;
    }

    case _error: {
      break;
    }

    default: {
      break;
    }
  }

  try {
    if (_error.includes(e.message)) {
      return;
    }
  } catch (e) {
    return;
  }
});
</script>
