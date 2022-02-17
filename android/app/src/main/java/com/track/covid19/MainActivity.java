package com.track.covid19;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        registerPlugin(com.getcapacitor.community.facebooklogin.FacebookLogin.class);
    }
}
