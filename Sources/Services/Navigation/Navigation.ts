import {
  NavigationContainerComponent,
  NavigationActions,
  NavigationParams,
  StackActions,
  NavigationNavigateAction,
  DrawerActions
} from "react-navigation";

type AuthenticationRoutes =
  | "SignIn"
  | "SignUp"
  | "SignUpVerification"
  | "Welcome"
  | "Authentication";

type FacilityStackRoutes =
  | "FacilityStack"
  | "FacilityHistory"
  | "FacilityFavouriteHistory";

type DashboardStackRoutes =
  | "DashboardStack"
  | "Dashboard"
  | "DashboardTabNavigator"
  | "Notification"
  | "AnnouncementStack"
  | "PromotionStack";

type DashboardTabNavigatorRoutes =
  | "Profile"
  | "Home"
  | "FamilyStack"
  | "Support"
  | "Family"
  | "AddFamily";

type PromotionStackRoutes =
  | "PromotionStack"
  | "PromotionViewAll"
  | "PromotionDetail";

type AnnouncementStackRoutes =
  | "AnnouncementStack"
  | "Announcement"
  | "AnnouncementDetail";

type BookingSwimmingStack =
  | "BookingSwimmingStack"
  | "BookingSwimming"
  | "BookingSwimmingSchedule"
  | "BookingSwimmingConfirm";

type BookingParkingStack =
  | "BookingParkingStack"
  | "BookingParking"
  | "BookingParkingSchedule"
  | "BookingParkingConfirm";

type BookingOutdoorStack =
  | "BookingOutdoorStack"
  | "BookingOutdoor"
  | "BookingOutdoorSchedule"
  | "BookingOutdoorConfirm";

type ReminderStackRoutes =
  | "ReminderStack"
  | "Reminder"
  | "ReminderCongratulation"
  | "ReminderParkingDetail"
  | "ReminderElectricDetail"
  | "ReminderManagementDetail";

type RouteName =
  | "Start"
  | "HomeDrawer"
  | AuthenticationRoutes
  | DashboardStackRoutes
  | DashboardTabNavigatorRoutes
  | PromotionStackRoutes
  | AnnouncementStackRoutes
  | FacilityStackRoutes
  | BookingSwimmingStack
  | BookingParkingStack
  | BookingOutdoorStack
  | ReminderStackRoutes;

type AnimationType = "slideFromLeft" | "slideFromBottom";
type AnimationParams = { animationType?: AnimationType };
type BottomTabbarProps = { tabBarVisible: boolean };
type ParamsProps = NavigationParams & AnimationParams & BottomTabbarProps | {};
type NavigationContainer = NavigationContainerComponent | null;
class Navigation {
  private static instance = new Navigation();
  private rootNavigator: NavigationContainer = null;
  constructor() {
    if (Navigation.instance) {
      throw new Error(
        "Error: Instantiation failed: Use Navigation.getInstance() instead of new."
      );
    }
    Navigation.instance = this;
  }
  public static getInstance(): Navigation {
    return Navigation.instance;
  }

  public setRoot = (rootNavigator: NavigationContainer | null) => {
    if (this.rootNavigator) return;
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
      console.log("set tabbar for screen", forScreen, isVisible);
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

  public resetDeep(
    routeName: RouteName,
    params?: NavigationParams,
    action?: NavigationNavigateAction,
    key?: string
  ) {
    if (this.rootNavigator) {
      this.rootNavigator.dispatch(
        StackActions.reset({
          index: 1,
          key: null,
          actions: [
            NavigationActions.navigate({ routeName: "HomeDrawer" }),
            NavigationActions.navigate({ routeName: "ReminderStack" })
          ]
        })
      );
    }
  }

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

export default Navigation.getInstance();
