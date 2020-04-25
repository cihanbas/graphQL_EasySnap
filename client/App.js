import React, {PureComponent} from 'react';
import {View, YellowBox} from 'react-native';
import Rooter from './src/router';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';
import AsyncStorage from '@react-native-community/async-storage';

console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  resolvers: {},

  request: async (operation) => {
    const token = await AsyncStorage.getItem('@token');
    operation.setContext({
      headers: {
        authorization: token ? `${token}` : '',
      },
    });
  },
});
export default class App extends PureComponent {
  render() {
    return (
      <ApolloProvider client={client}>
        <Rooter />
      </ApolloProvider>
    );
  }
}
