import React from "react";
import { Text, TouchableOpacity, Alert } from "react-native";
import { Card, CardItem, Left, Body, Thumbnail, Right } from "native-base";
import styles from "./styles";
import Icon from 'react-native-vector-icons/FontAwesome5'


const ShowUsers = ({ name, img, onImgTap, onNameTap, onDeleteUser }) => {
  return (
    <Card style={styles.cardStyle}>
      <CardItem style={styles.cardItemStyle}>
        <Left>
          <TouchableOpacity style={[styles.logoContainer]} onPress={onImgTap}>
            {img ? (
              <Thumbnail source={{ uri: img }} resizeMode="cover" />
            ) : (
              <Text style={styles.thumbnailName}>{name.charAt(0)}</Text>
            )}
          </TouchableOpacity>

          <Body>
            <Text style={styles.profileName} onPress={onNameTap}>
              {name}
            </Text>
          </Body>
        </Left>
        <Right>
        <Icon name="user-times" size={20}  
         onPress={() => Alert.alert('Delete Friend', 'Are you sure', [
          {
              text: 'Yes',
              onPress:(onDeleteUser) , 
          },{
              text: 'No'
          }
      ])}
         />
        </Right>
      </CardItem>
    </Card>
  );
};

export default ShowUsers;