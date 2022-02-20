import { ref } from 'vue'
import { useStore } from 'vuex'

import { LineLogin } from '@awesome-cordova-plugins/line-login';
import { Storage } from '@capacitor/storage'

// import axios from 'axios'
import { Capacitor } from '@capacitor/core';
import { alertController, loadingController } from '@ionic/vue';


async function AlertNotification ({ header: header, subHeader: subHeader, message: message }) {
    const alert = await alertController.create({
        header: header,
        subHeader: subHeader,
        message: message,
        backdropDismiss: true,

        buttons: [{
            text: 'Confirm',
            role: 'cancel',
        }]
    })

    return alert.present().then(async () => await loadingController.dismiss())
}

export const LineLogoutExtension = () => {

    const store = useStore();
    const LineUserData = ref('');

    async function presentLoading(timeout) {
      const loading = await loadingController
        .create({
          cssClass: 'my-custom-class',
          message: 'Please wait...',
          duration: timeout,
        });
        
      await loading.present();
      
      setTimeout(async function() {
        return await loading.dismiss()
      }, timeout);
    }


    function CallInitializeLineLogin() {
        return new Promise(function(resolve, reject) {
            LineLogin.initialize({ channel_id: '1656907010' });
            resolve('Initialize success channel line id.');
            reject(new Error('Initialize channel line id fail.'))
        })
    }

    async function AsyncLineLoginCallback () {
        CallInitializeLineLogin().then(async (result) => {
            await presentLoading();
            if (result === 'Initialize success channel line id.') {
                const DeterminePlatform = ['web', 'ios'];
                if (DeterminePlatform.includes(Capacitor.getPlatform())) CallLineUserLoginWithWeb();
            } else await loadingController.dismiss()

        }).catch(async error => {
            if (Capacitor.getPlatform() !== 'web') alert(error.message);
            
            return await AlertNotification({
                header: `Error System`,
                subHeader: 'Line error message',
                message: error.message,
            }).then(async () => await loadingController.dismiss());

        }).finally(async () => {
            Promise.all([ await CallLineUserLogin(), await CallAccessTokenLineLogin() ]).then(async (results) => {
                alert('Access token: ' + results.accessToken);
                alert('Expire Time: ' + results.expireTime);

                return await AlertNotification({
                    header: `Welcome ${LineUserData.value.displayName}`,
                    subHeader: 'Line message',
                    message: 'You are success login by using line,'
                })
            })

        })
        
    }

    function CallLineUserLogin() {
        return new Promise(function (resolve, reject) {
            LineLogin.login().then(response => {
                console.log(response);
                LineUserData.value = response;
                resolve(response);
                return LineUserData.value
            }).catch(error => {
                console.log(error)
                reject(error)
            })
        })
        
        
    }

    function CallLineUserLoginWithWeb() {
        LineLogin.loginWithWeb().then((response) => {
            console.log(response);
        })
    }

    function CallAccessTokenLineLogin() {
        // get access token
        LineLogin.getAccessToken(async function(result) {
            console.log(result); // {accessToken:'xxxxxxxx', expireTime: 123456789}

            await Storage.set({ key: 'isLineLogin', value: true });

        }, function(error) {
            if (Capacitor.getPlatform() !== 'web') alert(error.message);
            else console.log(error);
        });
    }

    function onLineVerifyAccessToken() {
        // verify current access token
        LineLogin.verifyAccessToken(function(result) {
            console.log(result)
        }, function(error) {
            // failed
            alert(error.message)
        });
    }

    function onLineLogout () {
        // logout...
        LineLogin.logout(async function(result) {
            console.log(result);
            alert(result)
            LineUserData.value = ''

            onLineVerifyAccessToken();

            await Storage.remove({ key: 'isLineLogin' })
        }, function(error) {
            console.log(error);
        });
    }

    async function isLineLoginGotFromStorage() {
        const { value: isLineLogin } = await Storage.get({ key: 'isLineLogin' });
        return { isLineLogin }
    }

    return {
        store,
        LineUserData,
        onLineLogout,
        CallInitializeLineLogin,
        AsyncLineLoginCallback,
        isLineLoginGotFromStorage,
        onLineVerifyAccessToken,
    }
}