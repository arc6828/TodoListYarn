import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Platform, TouchableOpacity, ScrollView,  FlatList, AsyncStorage} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import TodoItem from './TodoItem';    


import * as firebase from 'firebase';
import '@firebase/firestore';

export default class TodosContainer extends React.Component {


  constructor(props){
    super(props);
    this.state = {
      todos : [],
      user : null,
    };

    //LOAD TO STATE 
    this._retrieveData(); 

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        // ...
        
        //SET STATE OF USER 
        this.setState({"user": user});

        //LOAD FROM FIREBASE    
        var db = firebase.firestore();
        db.collection("todos")
          .where("user_id", "==", user.uid)
          .get().then((querySnapshot) => {            
          //console.log("Query : " , querySnapshot.data());
          const data = querySnapshot.docs.map(doc => doc.data());
          console.log(data); // array of cities objects
          this.setState({"todos": data});
          //SAVE TO LOCAL STORAGE
          this._storeData();        
        });

      } else {
        // User is signed out.
        // ...
      }
    });
    

 

  }

  onCreate = () => {
    let newData = {
        _id : '_' + Math.random().toString(36).substr(2, 9), 
        //RANDOM NUMBER
        title : "", //Empty String
        completed : false,
        user_id : this.state.user.uid, 
    };
    let todos = this.state.todos;
    todos.push(newData);

    //SAVE TO STATE
    this.setState({'todos': todos});
    console.log(this.state.todos);   
    
    //SAVE TO LOCAL STORAGE
    this._storeData();

    //SAVE TO FIREBASE
    var db = firebase.firestore();
    db.collection("todos").doc(newData._id).set(newData)
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    }); 

  };

  onUpdate = (changedTitle, _id) => {   
    let todos = this.state.todos;
    //Find index of specific object using findIndex method.   
    let objIndex = todos.findIndex((obj => obj._id == _id));
    //Update object's name property.
    todos[objIndex].title = changedTitle;
    //console.log("After update: ", myArray[objIndex])
    //SAVE TO STATE
    this.setState({'todos': todos});

    //SAVE TO LOCAL STORAGE
    this._storeData();

    //SAVE TO FIREBASE
    var db = firebase.firestore();
    db.collection("todos").doc(todos[objIndex]._id).set(todos[objIndex])
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });

  }; 

  onCheck = (_id) => {   
    let todos = this.state.todos;   
    let objIndex = todos.findIndex((obj => obj._id == _id));
    todos[objIndex].completed = !todos[objIndex].completed;
    this.setState({'todos': todos});

    //SAVE TO LOCAL STORAGE
    this._storeData();

    //SAVE TO FIREBASE
    var db = firebase.firestore();
    db.collection("todos").doc(todos[objIndex]._id).set(todos[objIndex])
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });

  };

  onDelete = (_id) => {
    let todos = this.state.todos;
    let objIndex = todos.findIndex((obj => obj._id == _id));
    todos.splice(objIndex, 1);
    this.setState({'todos': todos});
    
    //SAVE TO LOCAL STORAGE
    this._storeData();
    
    
    //SAVE TO FIREBASE
    var db = firebase.firestore();
    db.collection("todos").doc(_id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });

  };

  _storeData = async () => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(this.state.todos) );
    } catch (error) {
      // Error saving data
    }
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('todos');
      if (value !== null) {
        // We have data!!
        console.log(value);
        var todos = JSON.parse(value);
        this.setState({'todos' : todos})
      }
    } catch (error) {
      // Error retrieving data
    }
  };


  render() {
    return (
      <View style={styles.container}>
        <FlatList 
          style={{ width: '100%', top: 15 }}
          data={this.state.todos}
          keyExtractor={item => item._id}
          renderItem={ ({ item }) => (               
              <TodoItem 
                todo={ item }  
                onUpdate={ this.onUpdate }
                onCheck={ this.onCheck }
                onDelete={ this.onDelete }
                />
          )}
           />         
        
        <TouchableOpacity 
            onPress={() => this.onCreate() }
            style={{
               backgroundColor: "lightblue" ,
               padding : 10,
               width : 50,
               height : 50,
               alignItems : "center",
               alignContent : "center",
               borderRadius:100,
               position : 'absolute'  ,
               right : 10,
               bottom : 10,
           }}>
         

          <Ionicons
            name={ Platform.OS === 'ios' ? 'ios-add' : 'md-add' }
            size={26}
            />
        </TouchableOpacity>
     </View>

    );
  }
}
const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#ffffff',
 },
 
});

