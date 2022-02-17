import { ref } from 'vue'
import { useStore } from 'vuex'

import { loadingController } from '@ionic/vue'

import { FacebookLogin } from '@capacitor-community/facebook-login'
import { Capacitor } from '@capacitor/core'
import { Storage } from '@capacitor/storage'

import axios from 'axios'

export const FacebookLoginExtension = () => {

    const store = useStore();
    const userData = ref('');

    async function presentLoading(timeout) {
      const loading = await loadingController
        .create({
          cssClass: 'my-custom-class',
          message: 'Please wait...',
          duration: timeout,
        });
        
      await loading.present();
      
      setTimeout(function() {
        loading.dismiss()
      }, timeout);
    }


    async function CallInitializeFacebookLogin() {
        await FacebookLogin.initialize({ appId: '936359327018446' });
    }

    async function AsyncLoginCallback () {

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

            return Promise.all([
                await GetFacebookUserProfile(),
                await DefineFacebookAccessToken()
            ]);
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

            const uri = `https://graph.facebook.com/v13.0/${accessTokenFBId}?fields=id,name,location,birthday,email,picture.width(720),gender,hometown&access_token=${accessTokenFB}`
            const result = await axios.get(uri);

            console.log(result)

            if (result.status === 400) {
                console.warn('Something went wrong with api')
                
                return;
            }

            if (result.accessToken || accessTokenFB) {

                userData.value = result;

                await store.dispatch('GetFbUserDate', userData.value.data);
                console.log(`Facebook access token is ${result.accessToken.token}`);
            }

        } catch (e) {
            console.log(e.message)

            if (e.message === 'FB is not defined') {
                console.warn('FB is not defined, Fail to call back accessToken.');
                return;
            }
        }
    }

    async function GetFacebookUserProfile () {
        const result = await FacebookLogin.getProfile({ fields: [
                'email', 
                'name', 
                'id', 
                'picture.width(720)', 
                'hometown', 
                'gender',
                'birthday',
                'location',
                'languages'
            ] 
        });

        await presentLoading(!result ? 1500 : 100)
        userData.value = result;

        store.state.facebookUserData = userData.value;
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

        const { FbAccessToken } = await ObserverFbAccessToken();
        const { FbAccessId } = await ObserverFbAccessId();


        console.log('token: ', FbAccessToken);
        console.log('id: ', FbAccessId);

        if (FbAccessToken && FbAccessId) {
            // await presentLoading(store.state.facebookUserData ? 500 : 0);

            console.log(1)
            Promise.all([
                await Storage.remove({ key: 'fbAccessToken' }),
                await Storage.remove({ key: 'fbAccessId' })
            ])

            console.log(store.state.facebookUserData)
            if (store.state.facebookUserData) {
                await await FacebookLogin.logout();
            }
        }

        store.state.facebookUserData = '';

    }

    return {
        store,
        userData,
        CallInitializeFacebookLogin,
        AsyncLoginCallback,
        DefineFacebookAccessToken,
        GetFacebookUserProfile,
        LogoutFacebook,
    }
}