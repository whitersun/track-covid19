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

        return { AsyncDetectedLoginWithFacebook, isLineLoginGotFromStorage }
    } 

    const AsyncUserLoginPlatform = async () => {

        const { AsyncDetectedLoginWithFacebook, isLineLoginGotFromStorage } = AsyncAllLoginPlatform();

        const UserLoginFacebook = ref('');
        const UserLoginWithLine = ref('');

        // TODO: fetch Data from AsyncDetectedLoginWithFacebook and isLineLoginGotFromStorage
        const { isLoginWithFacebook } = await AsyncDetectedLoginWithFacebook();
        const { isLineLogin } = await isLineLoginGotFromStorage();

        [UserLoginFacebook.value, UserLoginWithLine.value] = [isLoginWithFacebook, isLineLogin];

        const config = {
            ReturnFacebookObject: {
                platform: "facebook",
                state: UserLoginFacebook.value || false,
            },

            ReturnLineObject: {
                platform: "line",
                state: UserLoginWithLine.value || false,
            },
        };

        // TODO: if storage does not have any data
        if (!UserLoginFacebook.value) UserLoginFacebook.value = config.ReturnFacebookObject;
        if (!UserLoginWithLine.value) UserLoginWithLine.value = config.ReturnLineObject;

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

        return { isLoginWithFacebook, isLineLogin, UserLoginWithFacebook: UserLoginFacebook.value, UserLoginWithLine: UserLoginWithLine.value };
    };

    return { AsyncUserLoginPlatform }
}