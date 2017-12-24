import React from 'react';
import {Platform} from 'react-native';
import {Provider} from "react-redux";
import {Navigation} from "react-native-navigation";
import * as appActions from "./actions/index";
import {registerScreens} from "./screens";
import store from './actions/configureStore';
registerScreens(store, Provider);
// import {iconsMap,iconsLoaded} from './src/utils/AppIcons';

const navigatorStyle = {
    navBarTranslucent: true,
    drawUnderNavBar: true,
    navBarTextColor: 'white',
    navBarButtonColor: 'white',
    statusBarTextColorScheme: 'light',
    drawUnderTabBar: true
};

//adb reverse tcp:8081 tcp:8081 4.10.1  ./gradlew assembleRelease       chmod +x gradlew     adb shell input keyevent 82

export default class App {
    constructor() {
        store.subscribe(this.onStoreUpdate.bind(this));
        store.dispatch(appActions.appInitialized());
    }

    onStoreUpdate() {
        const {root} = store.getState().app;
        // handle a root change
        // if your app doesn't change roots in runtime, you can remove onStoreUpdate() altogether
        if (this.currentRoot != root) {
            this.currentRoot = root;

         //   Platform.OS==='ios' ?  iconsLoaded.then(() => {
                    this.startApp(root);
          //      }) :
          //      this.startApp(root);
        }
    }

    startApp(root) {
        switch (root) {
            case 'login':
                Platform.OS==='android' ?
                    Navigation.startSingleScreenApp({
                        screen: {
                             screen: 'example.Test',
                            navigatorStyle: {
                                navBarHidden : true,
                                navBarTranslucent: false,
                                drawUnderNavBar: false,
                                navBarTransparent: false,
                                navBarButtonColor: '#ffffff',
                            },
                            passProps: {
                                dispatch: store.dispatch,
                            },
                        },
                        appStyle: {
                            orientation: 'portrait',
                        },
                        passProps: {},
                        animationType: 'fade'
                    }) :
                    Navigation.startSingleScreenApp({
                        screen: {
                            screen: 'example.Test',
                            //    screen: 'gorgias.story.payDialog',
                            navigatorStyle: {
                                statusBarHideWithNavBar: false,
                                statusBarTextColorScheme: 'light',
                                navBarHidden : true,
                                statusBarHidden: false,
                                navBarBackgroundColor: 'black',
                            },
                            // navigatorButtons: {
                            //     leftButtons :[{
                            //         icon:iconsMap['ios-arrow-back'],
                            //     }
                            //     ]
                            // },
                        },
                        appStyle: {
                            orientation: 'portrait',
                        },
                        passProps: {},
                        animationType: 'slide-down',
                    });
                return;
            default:
                console.error('Unknown app root');
        }
    }
}