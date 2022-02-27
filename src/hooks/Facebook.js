import { ref } from 'vue'
import { useStore } from 'vuex'

import { FacebookLogin } from '@capacitor-community/facebook-login'
import { Capacitor } from '@capacitor/core'
import { Storage } from '@capacitor/storage'

import { DetectedLoginPlatform } from './LoginPlatform'

import { DismissLoadingComponent, LoadingComponent } from './Loading'

export const FacebookLoginExtension = () => {
    const store = useStore();
    const userData = ref('');

    const { AsyncUserLoginPlatform } = DetectedLoginPlatform();


    async function AsyncDetectedLoginWithFacebook() {
        const { value: isLoginWithFacebook } = await Storage.get({ key: 'LoginWithFacebook' });
    
        return { isLoginWithFacebook }
    }


    async function CallInitializeFacebookLogin() {
        await FacebookLogin.initialize({ appId: '936359327018446' });
    }

    async function AsyncLoginCallback () {
        try {
            await LoadingComponent();

            if (Capacitor.getPlatform() === 'web') await CallInitializeFacebookLogin();

            const FACEBOOK_PERMISSIONS = [
                'email', 
                'user_birthday', 
                'user_photos', 
                'user_gender', 
                'user_location',
                'openid',
                'user_hometown',
                'user_location',
            ];
            const result = await FacebookLogin.login({ permissions: FACEBOOK_PERMISSIONS });

            if (result.accessToken) {
                // Login successful.

                console.log(result)
                console.log(`Facebook access token is ${result.accessToken.token}`);

                await Storage.set({ key: 'LoginWithFacebook', value: "true" });

                const PromiseConfigLogin = [
                    await GetFacebookUserProfile(),
                    await DefineFacebookAccessToken(),
                    AsyncUserLoginPlatform()
                ]

                return Promise.all(PromiseConfigLogin).then(async (AfterLogin) => { 
                    console.log(AfterLogin)
                
                    const config = {
                        facebook: { 
                            platform: AfterLogin[2].UserLoginWithFacebook.platform,
                            state: AfterLogin[2].UserLoginWithFacebook.state
                        },
                        line: { 
                            platform: AfterLogin[2].UserLoginWithLine.platform,
                            state: AfterLogin[2].UserLoginWithLine.state,
                        },
                        google: { 
                            platform: AfterLogin[2].UserLoginWithGoogle.platform,
                            state: AfterLogin[2].UserLoginWithGoogle.state,
                        },
                    };
                    
                    // const StorageFacebookUser = JSON.parse(JSON.stringify(AfterLogin[0].userData));
                    const StorageFacebookUser = JSON.stringify(AfterLogin[0].userData)

                    Promise.all([
                        await Storage.set({ key: 'FacebookUser', value: StorageFacebookUser }),
                        await store.dispatch("user/LoginPlatform", config)
                    ]).then(async () => await DismissLoadingComponent())
                }).catch(error => {
                    console.log(error);
                })
            }
        } catch (error) {
            console.log(error.message);
            await DismissLoadingComponent();
        }
    }

    async function DefineFacebookAccessToken () {
        try {
            const getUserTokenAndId = ref('');
        
            const { value: accessTokenFB } = await Storage.get({ key: 'fbAccessToken' });
            const { value: accessTokenFBId } = await Storage.get({ key: 'fbAccessId' });
        
            if (!accessTokenFB && !accessTokenFBId) {

                getUserTokenAndId.value = await FacebookLogin.getCurrentAccessToken()

                await Storage.set({
                    key: 'fbAccessToken',
                    value: getUserTokenAndId.value.accessToken.token
                });

                await Storage.set({
                    key: 'fbAccessId',
                    value: getUserTokenAndId.value.accessToken.userId
                });
            }
            
            console.log(getUserTokenAndId.value)
         
            console.log('accessToken: ', accessTokenFB);
            console.log('accessTokenID: ', accessTokenFBId);

            return { accessToken: getUserTokenAndId.value }

            // const uri = `https://graph.facebook.com/v13.0/${accessTokenFBId}?fields=id,name,location,birthday,email,picture.width(720),gender,hometown&access_token=${accessTokenFB}`
            // const result = await axios.get(uri);

        } catch (e) {
            console.log(e.message)
            if (e.message === 'FB is not defined') {
                console.warn('FB is not defined, Fail to call back accessToken.');
                return;
            }
        }
    }

    async function GetFacebookUserProfile () {
        const configField = [ 'email',  'name',  'id',  'picture.width(720)',  'hometown',  'gender', 'birthday', 'location', 'languages' ] 
        const result = await FacebookLogin.getProfile({ fields: configField });
        
        userData.value = result;

        // store.state.user.facebookUserData = userData.value;
        await store.dispatch('user/GetFbUserDate', userData.value);

        return { userData: userData.value };
    }

    const ObserverFbAccessToken = async () => {
        const { value: FbAccessToken } = await Storage.get({ key: 'fbAccessToken' })

        return { FbAccessToken }
    }

    const ObserverFbAccessId = async () => {
        const { value: FbAccessId } = await Storage.get({ key: 'fbAccessId' })

        return { FbAccessId }
    }

    async function LogoutFacebook () {
        try {
            await LoadingComponent();

            const { FbAccessToken } = await ObserverFbAccessToken();
            const { FbAccessId } = await ObserverFbAccessId();

            if (FbAccessToken && FbAccessId) {
                // await presentLoading(store.state.facebookUserData ? 500 : 0);
                const PromiseConfig = [
                    await Storage.remove({ key: 'fbAccessToken' }),
                    await Storage.remove({ key: 'fbAccessId' }),
                    await Storage.remove({ key: 'LoginWithFacebook' }),
                    await Storage.remove({ key: 'FacebookUser' }),
                ]

                return Promise.all(PromiseConfig).then(async () => {
                    console.log(store.state.user.facebookUserData);
                    if (store.state.user.facebookUserData) {
                        await FacebookLogin.logout()
                        AsyncUserLoginPlatform().then(async (result) => {
                            console.log(result)
                            // store.state.user.facebookUserData = '';
                            await store.dispatch('user/GetFbUserDate', '')
                            function LogoutState() {
                                let CurrentState = store.state.user.loginPlatform;
                                CurrentState.facebook.state = false;
                                return CurrentState
                            }
                            store.state.user.loginPlatform && LogoutState();
                            return await DismissLoadingComponent();
                        })
                    } else await DismissLoadingComponent()
                })

            }
        } catch(LogOutError) {
            console.log(LogOutError);
            return await DismissLoadingComponent()
        }


    }

    return {
        store,
        userData,
        LogoutFacebook,
        AsyncLoginCallback,
        GetFacebookUserProfile,
        DefineFacebookAccessToken,
        CallInitializeFacebookLogin,
        AsyncDetectedLoginWithFacebook
    }
}