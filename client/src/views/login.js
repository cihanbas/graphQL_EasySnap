import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Header, Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useApolloClient, useMutation, useQuery} from '@apollo/react-hooks';
import AsyncStorage from '@react-native-community/async-storage';

import {LOGIN_USER, GET_ACTIVE_USER} from '../queries';
import {Actions} from 'react-native-router-flux';
export default Login = () => {
  const [username, onChangeUserName] = useState('');
  const [password, onChangePassword] = useState('');
  const client = useApolloClient();
  const {loading, error: activeUserError, data} = useQuery(GET_ACTIVE_USER);

  const [loginUser, {loading: dataLoading, error}] = useMutation(LOGIN_USER, {
    async onCompleted({signIn: {token}}) {
      try {
        const user = {
          username,
          password,
        };
        await AsyncStorage.setItem('@token', token);
        await AsyncStorage.setItem('@user', JSON.stringify(user));
        console.log('GET_ACTIVE_USER', data);
        client.writeData({data: {isLoggedIn: true}, token});
        Actions.home();
      } catch (e) {
        console.log('e', e);
        // saving error
      }
    },
  });
  const signIn = () => {
    loginUser({variables: {username, password}});
  };
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          justifyContent: 'space-between',
          flex: 1,
          paddingVertical: 50,
        }}>
        <View>
          <Input
            placeholder="UserName"
            value={username}
            onChangeText={(text) => onChangeUserName(text)}
            leftIcon={{
              type: 'font-awesome',
              name: 'user',
              color: 'magenta',
              containerStyle: {paddingRight: 20},
            }}
          />
          <Input
            placeholder="password"
            value={password}
            onChangeText={(text) => onChangePassword(text)}
            containerStyle={{paddingTop: 20}}
            leftIcon={{
              type: 'font-awesome',
              name: 'key',
              color: 'magenta',
              containerStyle: {paddingRight: 20},
            }}
          />
          {error && <Text>{error.message}</Text>}
        </View>

        <Button
          title="Login"
          raised
          loading={dataLoading}
          onPress={signIn}
          buttonStyle={{backgroundColor: 'magenta'}}
        />
      </View>
    </View>
  );
};
