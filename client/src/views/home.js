import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {Header} from 'react-native-elements';
import {useApolloClient, useMutation, useQuery} from '@apollo/react-hooks';
import {GET_SNAPS, CreateSnap, DELETE_SNAP} from '../queries';
import {ListItem, Input, Button} from 'react-native-elements';
var moment = require('moment');
import gql from 'graphql-tag';
const getActiveUser = gql`
  {
    token
    sayMyName
    userId
    isLoggedIn @client
  }
`;
export default home = () => {
  const {data: clientData, client} = useQuery(getActiveUser);
  console.log('client', client);
  const {loading, error, data} = useQuery(GET_SNAPS);
  const [snapText, onChangeSnapText] = useState('');
  const [deleteSnap] = useMutation(DELETE_SNAP, {
    refetchQueries: [{query: GET_SNAPS}],
  });
  const updateCache = (cache, data) => {
    const {snaps} = cache.readQuery({
      query: GET_SNAPS,
    });
    console.log('snaps', snaps);
  };

  const [
    createSnap,
    {loading: dataLoading, error: createSnapError},
  ] = useMutation(CreateSnap, {
    async onCompleted(data) {
      console.log('data', data);
    },
    update: updateCache,
    // refetchQueries: [{query: GET_SNAPS}],
  });
  const added = () => {
    createSnap({
      variables: {text: snapText, user_Id: '5e9daefc454387140640c7ea'},
    });
  };
  const _deleteSnap = (id) => {
    console.log('id', id);
    deleteSnap({
      variables: {id},
    });
  };
  if (loading)
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  if (error)
    return (
      <View style={styles.container}>
        <Text>{error.message}</Text>
      </View>
    );
  const {snaps} = data;
  return (
    <View style={styles.container}>
      <Input
        placeholder="text"
        value={snapText}
        onChangeText={(text) => onChangeSnapText(text)}
      />
      <Button
        title="Added"
        raised
        loading={loading}
        onPress={added}
        buttonStyle={{backgroundColor: 'magenta'}}
      />
      <ScrollView style={styles.scrollView}>
        {snaps.map((snap, index) => (
          <ListItem
            key={index}
            title={snap.user?.username}
            subtitle={snap.text}
            rightTitle={moment(snap.createAt).startOf('day').fromNow()}
            onPress={() => _deleteSnap(snap.id)}
            bottomDivider
          />
        ))}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
});
