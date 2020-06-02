package com.textrecognition;

//import cl.json.RNSharePackage;
import android.app.Application;

import com.facebook.react.ReactApplication;
import com.imagepicker.ImagePickerPackage;
import com.swmansion.rnscreens.RNScreensPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
//import com.mlkit.RNMlKitPackage;
import org.reactnative.camera.RNCameraPackage;
import com.fetchsky.RNTextDetector.RNTextDetectorPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication  {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(new MainReactPackage(),
            new ImagePickerPackage(),
            new RNScreensPackage(), new VectorIconsPackage(),
          new RNGestureHandlerPackage(),
          // new RNMlKitPackage(),
          new RNCameraPackage(), new RNTextDetectorPackage()

      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
  //  @Override
  //    public String getFileProviderAuthority() {
  //           return "com.textrecognition.provider";
  //    }
}
