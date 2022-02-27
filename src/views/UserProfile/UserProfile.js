import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import { FacebookLoginExtension } from "@/hooks/Facebook";
import { LineLoginExtension } from "@/hooks/Line";
import { GoogleSignIn } from '@/hooks/GoogleSign'

import { DetectedLoginPlatform } from "@/hooks/LoginPlatform";

import LineIcon from '@/assets/images/png/LINE_APP_iOS.png'


export async function ReFetchingLoginPlatform() {
    const { AsyncUserLoginPlatform } = DetectedLoginPlatform();

    const store = useStore();

    await AsyncUserLoginPlatform().then(async (result) => {
        console.log(result);

        const config = {
            facebook: {
                platform: result.UserLoginWithFacebook.platform,
                state: result.UserLoginWithFacebook.state,
            },
            line: {
                platform: result.UserLoginWithLine.platform,
                state: result.UserLoginWithLine.state,
            },
            google: {
                platform: result.UserLoginWithGoogle.platform,
                state: result.UserLoginWithLine.state,
            },
        };

        await store.dispatch("user/LoginPlatform", config);

        const ErrorList = ["", null, undefined, false];
        if (!ErrorList.includes(result.isLoginWithFacebook)) await store.dispatch('user/CheckFacebookUser');
        if (!ErrorList.includes(result.isLineLogin)) await store.dispatch('user/CheckLineUser');
    });
}


export function LoginFacebookUserEvent() {

    const store = useStore();
    const router = useRouter();

    const { AsyncLoginCallback, LogoutFacebook } = FacebookLoginExtension();

    

    const getFbData = computed(() => store.state.user.facebookUserData);

    // const LineImageIcon = ref(LineImage);

    const ObserverUserPlatform = computed(() => {
        return store.state.user.loginPlatform || "";
    });

    const ObserverUserLogin = computed(() => {
        if (ObserverUserPlatform.value) {
            let facebook = ObserverUserPlatform.value.facebook.state;
            let line = ObserverUserPlatform.value.line.state;
            let google = ObserverUserPlatform.value.google.state;

            let Authenticate = facebook || line || google ? true : false;

            return Authenticate;
        } else return false;
    });

    const LineImageIcon = ref(LineIcon)
    const LineIconStyle = "width: 100%; height: 100%; padding: 8px;";
    const isIos = ref(false);

    function RouterToProfile() {
        console.log(ObserverUserLogin.value);
        return ObserverUserLogin.value ? router.push({
            name: "UserProfile"
        }) : undefined;
    }

    return {
        isIos,
        getFbData,
        LineIconStyle,
        LineImageIcon,
        LogoutFacebook,
        RouterToProfile,
        ObserverUserLogin,
        AsyncLoginCallback,
        ObserverUserPlatform,
    }
}

export function LoginLineUserEvent() {
    const {
        AccessToken,
        LineUserData,
        onLineLogout,
        AsyncLineLoginCallback,
        RefetchLineLogin,
        onLineVerifyAccessToken,
    } = LineLoginExtension();

    const store = useStore();
    const getLineUserData = computed(() => store.state.user.lineUserData);

    return { AccessToken, onLineLogout, getLineUserData, LineUserData, RefetchLineLogin, onLineVerifyAccessToken, AsyncLineLoginCallback }
}

export function LoginGoogleUserEvent() {
    const { AsyncGoogleLoginCallback } = GoogleSignIn();

    return { AsyncGoogleLoginCallback, }
}