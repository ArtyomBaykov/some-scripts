import React from 'react';
import { AppLoading, Asset, Font } from 'expo';
import { View, Text, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

export default class App extends React.Component {
   constructor() {
    super();
    this.state = {
     isReady: false,
      store: configureStore(() => this.setState({ isLoading: false })),
      mainApplication: false,
    };
  }
  

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
     require("./assets/icons/app.png"),
      require("./assets/icons/loading.png"),
      require("./img/img1.jpg"),
      require("./img/img2.jpg"),
      require("./img/img3.jpg"),
      
    ]);

    const fontAssets = cacheFonts([
     Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
        Arial: require("native-base/Fonts/Roboto.ttf"),
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),]);

    await Promise.all([...imageAssets, ...fontAssets]);
  }

 render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
else {
    return (
      return  <Provider store={this.state.store}>
      <Root>
            <Nav/>
            </Root>
</Provider>;
    );
  }
}
