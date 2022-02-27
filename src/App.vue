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
import { onErrorCaptured, onMounted } from "@vue/runtime-core";
import { GoogleSignIn } from "@/hooks/GoogleSign";

const store = useStore();
window.store = store;

const { GoogleInitialize } = GoogleSignIn();

async function AlertExit() {
  const alert = await alertController.create({
    header: "Warning",
    subHeader: "Exit Track Covid19 App",
    message: "Are you sure wanna Exit?",
    cssClass: "ExitAlert",
    buttons: [
      {
        role: "cancel",
        text: "cancel",
      },
      {
        role: "confirm",
        text: "Exit",
        handler: () => {
          App.exitApp();
        },
      },
    ],
  });

  return alert.present();
}

const ionRouter = useIonRouter();
useBackButton(-1, async () => {
  if (!ionRouter.canGoBack()) {
    await AlertExit();
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

onMounted(() => GoogleInitialize());
</script>

<style lang="scss">
.ExitAlert {
  .alert-title {
    color: #fc4f4f;
  }
}
</style>

<template>
  <ion-app>
    <ion-router-outlet mode="ios" />
  </ion-app>
</template>
