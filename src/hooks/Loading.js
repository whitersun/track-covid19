import { loadingController } from "@ionic/vue";

export async function LoadingComponent() {
    const load = await loadingController.create({
        spinner: 'lines-sharp-small',
        message: 'loading...',
        cssClass: 'LoadingComponent',
        translucent: true,
        backdropDismiss: true,
        mode: 'ios',
    });

    return load.present();
}

export async function DismissLoadingComponent() {
    try { await loadingController.dismiss(); }
    catch (error) { 
        console.log(error.message)
        switch (error.message) {
            case 'overlay does not exist':
            case undefined: break;

            default: return
        }
     }
}