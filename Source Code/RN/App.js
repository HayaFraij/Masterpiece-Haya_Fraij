import { createStackNavigator, createAppContainer } from 'react-navigation';
import UserHomeScreen from './src/screens/UserHomeScreen';
import ServeceProviderHome from './src/screens/ServeceProviderHome';

// import Sort from './src/Haya/components/Sort'
// import Haya from "./src/Haya/HayaApp"
import SignupScreen from './src/Registeration/components/SignupScreen'
import LoginScreen from './src/Registeration/components/LoginScreen'
// import SigninServiceProviderScreen from './src/Registeration/components/LoginServiceProvider'
// import SignupServiceProviderScreen from './src/Registeration/components/SignupServiceProvider'
import WellcomePage from './src/Haya/components/Wellcome'

import HomeScreen from './src/screens/HomeScreen'
import HomeScreen2 from './src/screens/HomeScreen(copy)'
import AbouttUs from './src/screens/AboutUsScreen'
import ContactUs from './src/screens/ContactUsScreen'
import LoginScreen2 from './src/Registeration/components/LoginScreen(copy)'
import SignupScreen2 from './src/Registeration/components/SignupScreen(copy)'
import Dashboard from './src/Haya/components/DashBoard'
import DashBoard2 from './src/Haya/components/DashBoard(copy)'


const navigator = createStackNavigator(
  {
    // UserHomeScreen: UserHomeScreen,
    // ServeceProviderHome: ServeceProviderHome,
    LoginScreen: LoginScreen,
    LoginScreen2: LoginScreen2,
    SignupScreen: SignupScreen,
    SignupScreen2: SignupScreen2,
    // SigninServiceProviderScreen,
    // SignupServiceProviderScreen,
    WellcomePage: WellcomePage,
    // Posts,
    Dashboard,
    DashBoard2,
    // NewPost,
    HomeScreen,
    HomeScreen2,
    ContactUs,
    AbouttUs,
    // Wellcomeee
  },
  {
    initialRouteName: 'WellcomePage',
    defaultNavigationOptions: {
      title: 'App'
    }
  }
);

export default createAppContainer(navigator);
