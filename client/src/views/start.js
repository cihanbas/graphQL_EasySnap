import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Header, Input, Button} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import {useApolloClient, useMutation, useQuery} from '@apollo/react-hooks';
import {LOGIN_USER, GET_ACTIVE_USER} from '../queries';

export default start = () => {
  const client = useApolloClient();
  const {loading, error: activeUserError, data: activeUserData} = useQuery(
    GET_ACTIVE_USER,
  );

  const [loginUser, {loading: dataLoading, error}] = useMutation(LOGIN_USER, {
    async onCompleted({signIn: {token}}) {
      try {
        const {activeUser} = activeUserData;
        console.log('activeUserData');
        client.writeData({
          data: {
            isLoggedIn: true,
            sayMyName: 'Cihan bas',
            token: token,
            userId: activeUser.id,
          },
        });
        await AsyncStorage.setItem('@token', token);
        Actions.home({client});
      } catch (e) {
        console.log('e', e);
        // saving error
      }
      if (error) {
        alert(error.message);
        Actions.index();
      }
    },
    onError(error) {
      alert(error.message);
      Actions.index();
    },
  });

  useEffect(() => {
    console.log('merhaba');
    (async function getToken() {
      const value = await AsyncStorage.getItem('@user');
      console.log('value', value);
      if (value) {
        const {username, password} = JSON.parse(value);
        loginUser({variables: {username, password}});
      } else {
        Actions.index();
      }
    })();
  }, []);
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="green" />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center'},
});
/*
export default class start extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {
    try {
      const value = await AsyncStorage.getItem('@token');
      if (value !== null) {
        Actions.login();
      } else {
        Actions.index();
      }
    } catch (e) {
      // error reading value
    }
  }
  render() {
    return (
      <View>
        <Text> componentText </Text>
      </View>
    );
  }
}
*/
