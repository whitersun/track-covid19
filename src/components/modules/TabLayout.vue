<script>
import { IonSkeletonText } from "@ionic/vue";

import GridComponent from "@/components/atoms/GridComponent.vue";
import BoxComponent from "@/components/atoms/BoxComponent";

export default {
  name: "TabLayout",
  components: { GridComponent, BoxComponent, IonSkeletonText },
};
</script>

<script setup>
import { defineProps } from "vue";

defineProps({
  InfoData: {
    type: Object,
    required: false,
  },

  structure: {
    type: Object,
    required: false,
  },

  ClassName: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <template v-if="InfoData">
    <GridComponent :Items="structure" Column="6">
      <template #default="{ item }">
        <BoxComponent
          Color="light"
          Lines="none"
          :ClassName="ClassName"
          :Button="true"
          :Detail="false"
          :Icon="item.icon"
          :BoxSubtitle="item.subtitle"
          :BoxNumber="item.number"
        />
      </template>
    </GridComponent>
  </template>

  <template v-else>
    <div class="ion-padding">
      <ion-skeleton-text
        animated
        style="width: 100%; height: 10rem; border-radius: 8px"
      ></ion-skeleton-text>
    </div>
  </template>
</template>
