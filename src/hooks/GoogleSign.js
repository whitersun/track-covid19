// import { Capacitor } from '@capacitor/core'
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

export function GoogleSignIn () {
    const GoogleInitialize = () => {
        GoogleAuth.initialize();
    }

    const AsyncGoogleLoginCallback = async () => {
        try {
            const response = await GoogleAuth.signIn();
            console.log(response);
        } catch (e) {
            console.log(e.message)
        }
    };

    return {
        GoogleInitialize,
        AsyncGoogleLoginCallback,
    };
}