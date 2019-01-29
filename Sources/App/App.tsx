import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { configStore } from "ReduxManager";
import { Navigator, AppContainer } from "Navigation";
import { SplashScreen, NetInfo, Loading, Alert } from "Components";

import { BleManager } from "react-native-ble-plx";

const { store, persistor } = configStore();

export default class App extends React.Component {
  private loadingRef = React.createRef<Loading>();
  private alertRef = React.createRef<Alert>();

  constructor() {
    super();
    this.manager = new BleManager();
  }

  componentWillMount() {
    const subscription = this.manager.onStateChange(state => {
      console.log("state", state);
      if (state === "PoweredOn") {
        this.scanAndConnect();
        subscription.remove();
      }
    }, true);
  }

  scanAndConnect() {
    this.manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        // Handle error (scanning will be stopped automatically)
        return;
      }

      // Check if it is a device you are looking for based on advertisement data
      // or other criteria.
      console.log("device name", device.name);
    });
  }

  showLoading = () => {
    if (this.loadingRef.current) this.loadingRef.current.show();
  };

  hideLoading = (onClose?: () => void) => {
    if (this.loadingRef.current) this.loadingRef.current.hide(onClose);
  };

  alertShow = (msg: string, onClose?: () => void) => {
    if (this.alertRef.current) this.alertRef.current.show(msg, onClose);
  };

  alertConfirm = (msg: string, onOk?: () => void, onCancel?: () => void) => {
    if (this.alertRef.current)
      this.alertRef.current.confirm(msg, onOk, onCancel);
  };

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<SplashScreen />} persistor={persistor}>
          <NetInfo />
          <AppContainer
            ref={r => {
              Navigator.setRoot(r);
            }}
            screenProps={{
              showLoading: this.showLoading,
              hideLoading: this.hideLoading,
              alertShow: this.alertShow,
              alertConfirm: this.alertConfirm
            }}
          />
          <Loading ref={this.loadingRef} />
          <Alert ref={this.alertRef} />
        </PersistGate>
      </Provider>
    );
  }
}
