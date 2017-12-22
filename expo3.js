type AppState = { ready: boolean };

export default class App extends React.Component<{}, AppState> {
  
    async componentWillMount(): Promise<void> {
        this.setState({ ready: false });
        const promises = [];
        promises.push(
            Font.loadAsync({
                "Avenir-Book": require("./fonts/Avenir-Book.ttf"),
                "Avenir-Light": require("./fonts/Avenir-Light.ttf")
            })
               Asset.loadAsync([
     require("./assets/icons/app.png"),
      require("./assets/icons/loading.png"),
      require("./img/img1.jpg"),
      require("./img/img2.jpg"),
      require("./img/img3.jpg"),
      
    ]);
        );
        await Promise.all(promises.concat(Images.downloadAsync()));
        this.setState({ ready: true });
    }

    render(): React.Node {
        const {ready} = this.state;
        if (ready) {
          return <Nav />;
        } else {
          return  <AppLoading startAsync={null} onError={null} onFinish={null} />;
        }          
    }
}
