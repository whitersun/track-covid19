<script>
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonAvatar,
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

const { AsyncDetectedLoginWithFacebook } = FacebookLoginExtension();

const store = useStore();

const facebookUserProfile = computed(() => {
  return store.state.user.facebookUserData || "";
});

const LineUserProfile = computed(() => {
  return store.state.user.lineUserData || "";
});

const CheckUserLogin = computed(() => {
  let facebook = facebookUserProfile.value;
  let line = LineUserProfile.value;

  if (facebook) return true;
  else if (line) return true;
  else return false;
});

async function beforeTabChange(event) {
  const { isLoginWithFacebook } = AsyncDetectedLoginWithFacebook();

  switch (event.tab) {
    case "tab3": {
      console.log(facebookUserProfile.value);
      const ErrorList = ["", null, undefined];
      if (ErrorList.includes(isLoginWithFacebook)) return;

      if (!facebookUserProfile.value) await store.dispatch("user/CheckFacebookUser");
      if (!LineUserProfile.value) await store.dispatch("user/CheckLineUser");

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
      <ion-tab-bar class="ion-padding-top" slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/tab1">
          <ion-icon :icon="earthOutline" />
          <ion-label>World wide</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/tabs/tab2">
          <ion-icon :icon="triangle" />
          <ion-label>Tab 2</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/tabs/tab3">
          <slot v-if="!CheckUserLogin">
            <ion-icon :icon="person" />
            <ion-label>Personal</ion-label>
          </slot>

          <ion-avatar v-if="facebookUserProfile">
            <img :src="facebookUserProfile.picture.data.url" />
            <ion-label>{{ facebookUserProfile.name }}</ion-label>
          </ion-avatar>

          <ion-avatar v-if="LineUserProfile">
            <img :src="LineUserProfile.pictureURL" />
            <ion-label>{{ LineUserProfile.displayName }}</ion-label>
          </ion-avatar>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>
