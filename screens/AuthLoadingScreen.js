import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'

import * as firebase from 'firebase';
import '@firebase/firestore';

export default class AuthLoadingScreen extends React.Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'Root' : 'Login')
        })
    }  
    
    render() {
        return (
            <View style={styles.container}>
                <Text>Loading</Text>
                <ActivityIndicator size="large" />
            </View>
            )
    }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})