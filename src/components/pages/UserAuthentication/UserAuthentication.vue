<script setup>
import { logoFacebook, logoGoogle } from "ionicons/icons";
import { defineProps, ref } from "vue";

import ButtonComponent from "@/components/atoms/ButtonComponent.vue";
import LineIcon from "@/assets/images/png/LINE_APP_iOS.png";

import "./UserAuthentication.scss";

defineProps({
  ObserverUserPlatform: [Object, String],
  isLogin: Boolean,
});

const LineImageIcon = ref(LineIcon);
const LineIconStyle = "max-width: 100%; height: 100%; padding: 8px;";
</script>

<template>
  <div v-if="ObserverUserPlatform" class="ion-padding authenticate-class" slot="fixed">
    <slot v-if="!isLogin">
      <ButtonComponent
        Expand="block"
        color="primary"
        ButtonText="facebook"
        v-if="!ObserverUserPlatform.facebook.state"
        :ButtonIcon="logoFacebook"
        @ButtonEvent="$emit('FacebookLoginEvent')"
      />

      <ButtonComponent
        Expand="block"
        Color="success"
        ClassName="LineLoginButton"
        v-if="!ObserverUserPlatform.line.state"
        @ButtonEvent="$emit('LineLoginEvent')"
      >
        <div class="line-login">
          <img :src="LineImageIcon" class="line-class-image" :style="LineIconStyle" />
          <span class="line-text">Line</span>
        </div>
      </ButtonComponent>

      <ButtonComponent
        Expand="block"
        color="danger"
        ButtonText="Google +"
        v-if="!ObserverUserPlatform.google.state"
        :ButtonIcon="logoGoogle"
        @ButtonEvent="$emit('GoogleLoginEvent')"
      />
    </slot>
  </div>
</template>
