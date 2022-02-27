package com.track.covid19;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;

import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        registerPlugin(com.getcapacitor.community.facebooklogin.FacebookLogin.class);

        this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
            add(GoogleAuth.class);
        }});
    }
}
