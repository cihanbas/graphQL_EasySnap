import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Header, Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useApolloClient, useMutation} from '@apollo/react-hooks';
import AsyncStorage from '@react-native-community/async-storage';
import {Actions} from 'react-native-router-flux';

import {CREATE_USER} from '../queries';
export default SignIn = () => {
  const [username, onChangeUserName] = useState('');
  const [password, onChangePassword] = useState('');
  const client = useApolloClient();

  const [
    createUser,
    {loading: dataLoading, error, data: createUserData},
  ] = useMutation(CREATE_USER, {
    async onCompleted({createUser: {token}}) {
      try {
        const user = {
          username,
          password,
        };
        await AsyncStorage.setItem('@token', token);
        await AsyncStorage.setItem('@user', JSON.stringify(user));
        client.writeData({data: {isLoggedIn: true}, token});
        Actions.home();
      } catch (e) {
        console.log('e', e);
        // saving error
      }
    },
  });
  const signIn = () => {
    createUser({variables: {username, password}});
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
          title="SignIn"
          raised
          loading={dataLoading}
          onPress={signIn}
          buttonStyle={{backgroundColor: 'magenta'}}
        />
      </View>
    </View>
  );
};
