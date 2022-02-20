<script>
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
} from "@ionic/vue";

export default {
  name: "TabsPage",
  components: {
    IonLabel,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonPage,
    IonRouterOutlet,
  },
};
</script>

<script setup>
import { earthOutline, person, triangle } from "ionicons/icons";
import { FacebookLoginExtension } from "@/hooks/Facebook";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";

const {
  DefineFacebookAccessToken,
  AsyncDetectedLoginWithFacebook,
} = FacebookLoginExtension();

const store = useStore();

const ObserverUserLogin = computed(() => {
  return store.state.facebookUserData ? store.state.facebookUserData : "";
});

async function beforeTabChange(event) {
  const { isLoginWithFacebook } = AsyncDetectedLoginWithFacebook();

  switch (event.tab) {
    case "tab3": {
      const ErrorList = ["", null, undefined];
      if (ErrorList.includes(isLoginWithFacebook)) return;

      if (!ObserverUserLogin.value) await DefineFacebookAccessToken();

      break;
    }

    default: {
      return;
    }
  }
}
</script>

<template>
  <ion-page>
    <ion-tabs @ionTabsWillChange="beforeTabChange($event)">
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/tab1">
          <ion-icon :icon="earthOutline" />
          <ion-label>World wide</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/tabs/tab2">
          <ion-icon :icon="triangle" />
          <ion-label>Tab 2</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/tabs/tab3">
          <ion-icon :icon="person" />
          <ion-label>Personal</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>
