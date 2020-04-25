import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Header, Input, Button} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import {Actions} from 'react-native-router-flux';
import {useApolloClient, useMutation, useQuery} from '@apollo/react-hooks';

export default logout = () => {
  const client = useApolloClient();
  const logout = async () => {
    await AsyncStorage.removeItem('@user');
    await AsyncStorage.removeItem('@token');
    Actions.start();
  };
  return (
    <View style={styles.container}>
      <Button
        title="logout"
        raised
        onPress={logout}
        buttonStyle={{backgroundColor: 'magenta'}}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center'},
});
