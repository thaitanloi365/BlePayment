import {
  NavigationContainerComponent,
  NavigationActions,
  NavigationParams,
  StackActions,
  NavigationNavigateAction,
  DrawerActions
} from "react-navigation";

type RouteName = "Start" | "Home" | "Authentication";

type AnimationType = "slideFromLeft" | "slideFromBottom";
type AnimationParams = { animationType?: AnimationType };
type BottomTabbarProps = { tabBarVisible: boolean };
type ParamsProps = NavigationParams & AnimationParams & BottomTabbarProps | {};
type NavigationContainer = NavigationContainerComponent | null;

class Navigator {
  private static instance = new Navigator();
  private rootNavigator: NavigationContainer = null;
  constructor() {
    if (Navigator.instance) {
      throw new Error(
        "Error: Instantiation failed: Use Navigation.getInstance() instead of new."
      );
    }
    Navigator.instance = this;
  }
  public static getInstance(): Navigator {
    return Navigator.instance;
  }

  public setRoot = (rootNavigator: NavigationContainer | null) => {
    if (this.rootNavigator) return;
    console.log("root", rootNavigator);
    this.rootNavigator = rootNavigator;
  };

  public navTo = (
    routeName: RouteName,
    params?: ParamsProps,
    action?: NavigationNavigateAction,
    key?: string
  ) => {
    if (this.rootNavigator) {
      this.rootNavigator.dispatch(
        NavigationActions.navigate({ routeName, params, action, key })
      );
    }
  };

  public setTabbar(forScreen: string, isVisible: boolean = true) {
    const params = { tabBarVisible: isVisible };
    if (this.rootNavigator) {
      this.rootNavigator.dispatch(
        NavigationActions.setParams({ params, key: forScreen })
      );
    }
  }

  public back = (key?: string | null) => {
    if (this.rootNavigator) {
      this.rootNavigator.dispatch(NavigationActions.back({ key }));
    }
  };

  public reset = (
    routeName: RouteName,
    params?: NavigationParams,
    action?: NavigationNavigateAction,
    key?: string
  ) => {
    if (this.rootNavigator) {
      this.rootNavigator.dispatch(
        StackActions.reset({
          index: 0,
          key: null,
          actions: [
            NavigationActions.navigate({ routeName, params, action, key })
          ]
        })
      );
    }
  };

  public popToTop = (key?: RouteName, immediate?: boolean) => {
    if (this.rootNavigator) {
      this.rootNavigator.dispatch(StackActions.popToTop({ key, immediate }));
    }
  };

  public push = (
    routeName: RouteName,
    params?: NavigationParams,
    action?: NavigationNavigateAction,
    key?: string
  ) => {
    if (this.rootNavigator) {
      this.rootNavigator.dispatch(
        StackActions.push({ routeName, params, action, key })
      );
    }
  };

  public pop = (n?: number, immediate?: boolean) => {
    if (this.rootNavigator) {
      this.rootNavigator.dispatch(StackActions.pop({ n, immediate }));
    }
  };

  public closeDrawer() {
    if (this.rootNavigator) {
      this.rootNavigator.dispatch(DrawerActions.closeDrawer());
    }
  }

  public openDrawer() {
    if (this.rootNavigator) {
      this.rootNavigator.dispatch(DrawerActions.openDrawer());
    }
  }

  public toggleDrawer() {
    if (this.rootNavigator) {
      this.rootNavigator.dispatch(DrawerActions.toggleDrawer());
    }
  }

  public getScreenProps() {
    if (this.rootNavigator) {
      return this.rootNavigator.props.screenProps;
    }
    return null;
  }

  public showLoading() {
    if (this.rootNavigator) {
      const { showLoading } = this.rootNavigator.props.screenProps;
      if (showLoading) showLoading();
    }
  }

  public hideLoading(onClose?: () => void) {
    if (this.rootNavigator) {
      const { hideLoading } = this.rootNavigator.props.screenProps;
      if (hideLoading) hideLoading(onClose);
    }
  }
  public alertShow = (msg: string, onClose?: () => void) => {
    if (this.rootNavigator) {
      const { alertShow } = this.rootNavigator.props.screenProps;
      if (alertShow) alertShow(msg, onClose);
    }
  };

  public alertConfirm = (
    msg: string,
    onOk?: () => void,
    onCancel?: () => void
  ) => {
    if (this.rootNavigator) {
      const { alertConfirm } = this.rootNavigator.props.screenProps;
      if (alertConfirm) alertConfirm(msg, onOk, onCancel);
    }
  };
}

export default Navigator.getInstance();
