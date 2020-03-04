import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Platform, TouchableOpacity} from 'react-native';
import { TextInput } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export default class TodoItem extends React.Component {
  render() {
    return (
      <View
        style={{
            flex: 1,
            //width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            paddingRight: 10,
            paddingVertical: 5,
        }}>
        <TouchableOpacity
            onPress={() => this.props.onCheck(this.props.todo._id)}
            style={{ paddingLeft: 25, paddingRight: 15 }} >
            { this.props.todo.completed ?
            (<Ionicons
                name={Platform.OS === 'ios' ? "ios-checkbox" : "md-checkbox"}
                size={23}
                />)
            :
            (<Ionicons
                name={Platform.OS === 'ios' ? "ios-square-outline" : "md-square-outline"}
                size={23}
                />  )

            }
          
        </TouchableOpacity>
        <View style={{ flex: 1, paddingLeft: 25, }}>                  
          
            <TextInput
                style={{ width: '90%' }}
                placeholder="What needs to be done?"
                autoFocus
                underLineColorAndroid="transparent"
                underlineColor="transparent"
                blurOnSubmit
                onChangeText={changedTitle => this.props.onUpdate(changedTitle, this.props.todo._id) }
                value={this.props.todo.title}
                autoCorrect={false}
                autoCapitalize="none"
            />                  
          
        </View>
        <TouchableOpacity
            onPress={() => this.props.onDelete(this.props.todo._id)}
            style={{ paddingLeft: 25, paddingRight: 15 }} >
            <Ionicons
                name={Platform.OS === 'ios' ? "ios-trash" : "md-trash"}
                size={23}
            />
        </TouchableOpacity>
      </View>


    );
  }
}
