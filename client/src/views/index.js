import React, {PureComponent} from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, ListItem, Button, Icon} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';

export default class index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={style.container}>
        <Button
          title="Login"
          type="outline"
          style={style.btnContainer}
          onPress={Actions.login}
        />
        <Button
          title="SignIn"
          type="outline"
          style={style.btnContainer}
          onPress={Actions.signIn}
        />
      </View>
    );
  }
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
  },
  btnContainer: {
    paddingVertical: 20,
  },
});
