<script>
import SearchLayout from "@/components/modules/SearchLayout.vue";
import TitleLayout from "@/components/modules/TitleLayout.vue";
import TabLayout from "@/components/modules/TabLayout.vue";

export default {
  name: "Tab1Page",
  components: {
    SearchLayout,
    TitleLayout,
    TabLayout,
  },
};
</script>

<script setup>
import {
  alertController,
  loadingController,
  modalController,
  IonRefresher,
  toastController,
  IonRefresherContent,
} from "@ionic/vue";
import { earthOutline, searchOutline, close } from "ionicons/icons";
import { ref, computed, onBeforeMount } from "vue";
import { useStore } from "vuex";
import { TotalData } from "@/hooks/TotalData";

import ModalSearch from "@/components/organisms/ModalSearch.vue";

const { info, structure, lastUpdated } = TotalData();

const store = useStore();

const headerSearch = ref("");

const GetSearchData = computed(() => {
  const regions = store.state.Region.regions;

  return regions ? regions : {};
});

async function alertFunction({ message: mess }) {
  const alert = await alertController.create({
    mode: "ios",
    header: mess,
    buttons: [{ text: "Close" }],
  });

  return alert.present();
}

async function LoadingComponent() {
  const loading = await loadingController.create({
    spinner: "circles",
    message: "Please wait...",
    cssClass: "SearchLoading",
    translucent: true,
    animated: true,
    mode: "ios",
  });

  return loading.present();
}

async function DismissLoadingComponent() {
  try {
    await loadingController.dismiss();
  } catch (e) {
    return;
  }
}

async function submitSearch(value) {
  console.log(value.replace(/\s/g, ""));

  // alert("hello world");

  Promise.all([
    await LoadingComponent(),
    await store.dispatch("Region/CALL_REGIONS", value.replace(/\s/g, "")),
  ]).then(async () => {
    if (GetSearchData.value) {
      console.log(GetSearchData.value.response[0]);

      if (!GetSearchData.value.response[0]) {
        const alert = `We does not provide short hand in ${value}!`;
        alertFunction({ message: alert });

        await DismissLoadingComponent();
        return;
      }

      const propsSearchItem = GetSearchData.value.response[0];
      // const propsSearchItemTotal = new Intl.NumberFormat().format(
      //   propsSearchItem.cases.total
      // );

      console.log(propsSearchItem);

      const modal = await modalController.create({
        component: ModalSearch,
        breakpoints: [0.1, 0.75, 1],
        initialBreakpoint: 0.75,
        componentProps: {
          mode: "ios",
          HeaderTitle: propsSearchItem.country,
          HeaderClass: "ModalComponentHeader",
          TitleClassName: "ModalClassTitle",
          ArrayItem: propsSearchItem,
        },
        cssClass: "ModalComponent",
        swipeToClose: true,

        mode: "ios",
      });

      await DismissLoadingComponent();
      return modal.present();
    } else {
      console.log(GetSearchData.value);
      await DismissLoadingComponent();

      debugger;
      return;
    }
  });
}

async function callToast() {
  const toast = await toastController.create({
    message: "Updated success",
    color: "primary",
    position: "top",
    duration: 650,
    buttons: [
      {
        side: "start",
        icon: close,
      },
      {
        text: "Done",
        role: "cancel",
        handler: () => {
          console.log("Cancel clicked");
        },
      },
    ],
  });

  return toast.present();
}

const doRefresh = async (event) => {
  console.log(event);

  await store.dispatch("Region/CALL_TOTAL_REPORT");

  setTimeout(
    async () => {
      console.log("Async operation has ended");
      event.target.complete();

      await callToast();
    },
    !store.state.loading ? 2000 : 0
  );
};

onBeforeMount(async () => {
  await store.dispatch("Region/CALL_TOTAL_REPORT");
});
</script>

<style lang="scss">
ion-list.SecondHomeTitleComponent {
  ion-item {
    ion-label {
      display: flex !important;
      column-gap: 8px;
      align-items: center;
    }
  }
}

.width-100 {
  max-width: 100%;
  width: 100%;
}

ion-list.ModalItemColor {
  --ion-item-background: var(--ion-color-step-100);
}

ion-item.HomeBoxComponent::part(native) {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  border-radius: 8px;
  padding-top: 13px;
  padding-bottom: 20px;
}

ion-item.HomeBoxComponent {
  ion-label {
    display: flex !important;
    flex-direction: row;
    column-gap: 8px;
  }

  &.md ion-note {
    font-size: 16px;
  }
}

ion-modal.ModalComponent::part(content) {
  border-radius: 50px 50px 0 0;
}

ion-modal.ModalComponent {
  ion-header ion-toolbar ion-title {
    text-transform: uppercase;
  }

  ion-list.ModalClassTitle {
    ion-label {
      font-size: 32px;
      letter-spacing: 0.1rem;
    }
  }
}
</style>

<template>
  <LayoutComponent HeaderTitle="Covid-19" HeaderTitleClass="text-uppercase">
    <ion-refresher
      slot="fixed"
      pull-factor="0.5"
      pull-min="100"
      pull-max="200"
      @ionRefresh="doRefresh($event)"
    >
      <ion-refresher-content
        pulling-text="Pull to refresh"
        refreshing-spinner="lines-sharp-small"
        refreshing-text="Refreshing..."
      />
    </ion-refresher>

    <SearchLayout
      v-model.lazy="headerSearch"
      SearchPlaceholder="Search Country..."
      InputType="search"
      :ButtonIcon="searchOutline"
      @EnterSearch="submitSearch(headerSearch)"
      @submitSearch="submitSearch(headerSearch)"
    />

    <TitleLayout
      ClassName="HomeTitleComponent"
      TextButton="detail"
      ListHeader="Last Updated"
      :Label="lastUpdated"
      :HasButton="true"
    />
    <TitleLayout
      ClassName="SecondHomeTitleComponent"
      Label="World wide"
      :LabelIcon="earthOutline"
    />
    <TabLayout
      mode="md"
      ClassName="HomeBoxComponent"
      :InfoData="info ? info : undefined"
      :structure="structure"
    />
  </LayoutComponent>
</template>
