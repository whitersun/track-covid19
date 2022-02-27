import { ref } from 'vue'
import { useStore } from 'vuex'

import { LineLogin } from '@awesome-cordova-plugins/line-login';
import { Storage } from '@capacitor/storage'

// import axios from 'axios'
import { Capacitor } from '@capacitor/core';
import { alertController } from '@ionic/vue';
import { LoadingComponent, DismissLoadingComponent } from './Loading';
import { DetectedLoginPlatform } from './LoginPlatform'

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

    return alert.present().then(async () => await DismissLoadingComponent())
}

export const LineLoginExtension = () => {

    const store = useStore();
    const LineUserData = ref('');
    const AccessToken = ref('')

    const { AsyncUserLoginPlatform } = DetectedLoginPlatform();


    function CallInitializeLineLogin() {
        return new Promise(function(resolve, reject) {
            LineLogin.initialize({ channel_id: '1656907010' });
            resolve('Initialize success channel line id.');
            reject(new Error('Initialize channel line id fail.'))
        })
    }

    async function AsyncLineLoginCallback () {
        CallInitializeLineLogin().then((result) => {
            if (result === 'Initialize success channel line id.') {
                const DeterminePlatform = ['web', 'ios'];
                if (DeterminePlatform.includes(Capacitor.getPlatform())) CallLineUserLoginWithWeb();
            }
        }).catch(async error => {
            return await AlertNotification({
                header: `Error System`,
                subHeader: 'Line error message',
                message: error.message,
            })

        }).finally(async () => {
            const configCallLine = [ await CallLineUserLogin(), await CallAccessTokenLineLogin() ]
            Promise.all(configCallLine).then(async (results) => AccessToken.value = results).catch ((errorLogin) => {
                if (Capacitor.getPlatform() !== 'web') alert(errorLogin.message);
                console.log(errorLogin)
            }).finally(() => {
                AsyncUserLoginPlatform().then(async (AfterLogin) => {
                    await LoadingComponent();

                    const config = {
                        facebook: { 
                            platform: AfterLogin.UserLoginWithFacebook.platform,
                            state: AfterLogin.UserLoginWithFacebook.state
                        },
                        line: { 
                            platform: AfterLogin.UserLoginWithLine.platform,
                            state: AfterLogin.UserLoginWithLine.state,
                        },
                        google: { 
                            platform: AfterLogin.UserLoginWithGoogle.platform,
                            state: AfterLogin.UserLoginWithGoogle.state,
                        },
                    };

                    await store.dispatch("user/LoginPlatform", config)

                    return await AlertNotification({
                        header: `Welcome ${LineUserData.value.displayName}`,
                        subHeader: 'Line message',
                        message: 'You are success login by using line,'
                    })
                })
            })

        })
        
    }

    function CallLineUserLogin() {
        return new Promise(function (resolve, reject) {
            LineLogin.login().then(async response => {
                console.log(response);
                LineUserData.value = response;

                Promise.all([
                    await store.dispatch('user/GetLineUserDate', response),
                    await Storage.set({ key: 'LineUser', value: JSON.stringify(response) }),
                ])
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

            await Storage.set({ key: 'isLineLogin', value: "true" });

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
            console.log(error.message)
            // alert(error.message)
        });
    }

    function onLineLogout () {
        // logout...

        LineLogin.logout().then(async (result) => {
            alert(result);
            LineUserData.value = ''

            Promise.all([
                await Storage.remove({ key: 'isLineLogin' }),
                await Storage.remove({ key: 'LineUser' }),
            ]).then(() => {
                AsyncUserLoginPlatform().then(async () => {
                    await store.dispatch('user/GetLineUserDate', '');
                
                    function LogoutState() {
                        let CurrentState = store.state.user.loginPlatform;
                        CurrentState.line.state = false;
                        return CurrentState
                    }

                    store.state.user.loginPlatform && LogoutState();
                })
            })



        }).catch(error => {
            alert(error.message)
        });

        // LineLogin.logout(async function(result) {
        //     console.log(result);
        //     LineUserData.value = ''

        //     // onLineVerifyAccessToken();
        //     Promise.all([
        //         await Storage.remove({ key: 'isLineLogin' }),
        //         await Storage.remove({ key: 'LineUser' }),
        //     ]).then(() => {
        //         AsyncUserLoginPlatform().then(async () => {
        //             await store.dispatch('user/GetLineUserDate', '');
                
        //             function LogoutState() {
        //                 let CurrentState = store.state.user.loginPlatform;
        //                 CurrentState.line.state = false;
        //                 return CurrentState
        //             }

        //             store.state.user.loginPlatform && LogoutState();
        //         })
        //     })
        // }, function(error) {
        //     console.log(error);
        // });
    }

    async function isLineLoginGotFromStorage() {
        const { value: isLineLogin } = await Storage.get({ key: 'isLineLogin' });
        return { isLineLogin }
    }

    async function isLineUserFromStorage() {
        const { value: LineUser } = await Storage.get({ key: 'LineUser' });
        return { LineUser }
    }

    async function RefetchLineLogin() {
        if (!LineUserData.value) {
            onLineVerifyAccessToken();
        }
    }

    return {
        store,
        AccessToken,
        LineUserData,
        onLineLogout,
        RefetchLineLogin,
        CallInitializeLineLogin,
        AsyncLineLoginCallback,
        isLineLoginGotFromStorage,
        onLineVerifyAccessToken,
        isLineUserFromStorage
    }
}