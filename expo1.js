import React from 'react';
import { AppLoading, Asset, Font } from 'expo';
import { View, Text, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      appIsReady: false,
      store: configureStore(() => this.setState({ isLoading: false })),
      mainApplication: false,
    };
  }



  render() {
    if (this.state.appIsReady) {
      return (
      <Provider store={this.state.store}>
      <Root>
            <Nav/>
            </Root>
</Provider>
      );
    } else {
      return <AppLoading
       startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading} />;
    }
  }


  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
         require("./assets/icons/app.png"),
      require("./assets/icons/loading.png"),
      require("./img/img1.jpg"),
      require("./img/img2.jpg"),
      require("./img/img3.jpg"),
         
      ]),
      Font.loadAsync({
        Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
        Arial: require("native-base/Fonts/Roboto.ttf"),
         }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ appIsReady: true });
  };

}
