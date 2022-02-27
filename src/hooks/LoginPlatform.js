import { ref } from "vue";
import { Storage } from '@capacitor/storage'

export function DetectedLoginPlatform () {

    function AsyncAllLoginPlatform () {
        async function AsyncDetectedLoginWithFacebook() {
            const { value: isLoginWithFacebook } = await Storage.get({ key: 'LoginWithFacebook' });
            return { isLoginWithFacebook }
        }
        
        async function isLineLoginGotFromStorage() {
            const { value: isLineLogin } = await Storage.get({ key: 'isLineLogin' });
            
            return { isLineLogin }
        }

        async function isGoogleLoginGotFromStorage() {
            const { value: isGoogleLogin } = await Storage.get({ key: 'isGoogleLogin' });
            
            return { isGoogleLogin }
        }

        return { AsyncDetectedLoginWithFacebook, isLineLoginGotFromStorage, isGoogleLoginGotFromStorage }
    } 

    const AsyncUserLoginPlatform = async () => {

        const { AsyncDetectedLoginWithFacebook, isLineLoginGotFromStorage, isGoogleLoginGotFromStorage } = AsyncAllLoginPlatform();

        const UserLoginFacebook = ref('');
        const UserLoginWithLine = ref('');
        const UserLoginWithGoogle = ref('');

        // TODO: fetch Data from AsyncDetectedLoginWithFacebook and isLineLoginGotFromStorage
        const { isLoginWithFacebook } = await AsyncDetectedLoginWithFacebook();
        const { isLineLogin } = await isLineLoginGotFromStorage();
        const { isGoogleLogin } = await isGoogleLoginGotFromStorage();

        [UserLoginFacebook.value, UserLoginWithLine.value, UserLoginWithGoogle.value] = [isLoginWithFacebook, isLineLogin, isGoogleLogin];

        const config = {
            ReturnFacebookObject: {
                platform: "facebook",
                state: UserLoginFacebook.value || false,
            },

            ReturnLineObject: {
                platform: "line",
                state: UserLoginWithLine.value || false,
            },
            ReturnGoogleObject: {
                platform: "google",
                state: UserLoginWithGoogle.value || false,
            },
        };

        // TODO: if storage does not have any data
        if (!UserLoginFacebook.value) UserLoginFacebook.value = config.ReturnFacebookObject;
        if (!UserLoginWithLine.value) UserLoginWithLine.value = config.ReturnLineObject;
        if (!UserLoginWithGoogle.value) UserLoginWithGoogle.value = config.ReturnGoogleObject;

        // TODO: if have facebook data in storage
        if (UserLoginFacebook.value) {
            if (UserLoginFacebook.value !== undefined) {
                config.ReturnFacebookObject.state = isLoginWithFacebook || false;
                UserLoginFacebook.value = config.ReturnFacebookObject;
            }
        }

        // TODO: if have line data in storage
        if (UserLoginWithLine.value) {
            if (UserLoginWithLine.value !== undefined) {
                config.ReturnLineObject.state = isLineLogin || false;
                UserLoginWithLine.value = config.ReturnLineObject;
            }
        }

        if (UserLoginWithGoogle.value) {
            if (UserLoginWithGoogle.value !== undefined) {
                config.ReturnGoogleObject.state = isGoogleLogin || false;
                UserLoginWithGoogle.value = config.ReturnGoogleObject;
            }
        }

        return { 
            isLoginWithFacebook, 
            isLineLogin, 
            UserLoginWithFacebook: UserLoginFacebook.value, 
            UserLoginWithLine: UserLoginWithLine.value,
            UserLoginWithGoogle: UserLoginWithGoogle.value,
        };
    };

    return { AsyncUserLoginPlatform }
}
