import {ListItem} from 'react-native-elements';
import { FlatList } from 'react-native';
import React from 'react';

function Menu(props) {

    const renderMenuItem = ({item, index}) => {
        return (
            <ListItem
                key={index}
                title={item.name}
                subtitle={item.description}
                hideChevron={true}
                onPress={() => props.onPress(item.id)}
                leftAvatar={{source: require('./images/uthappizza.png')}}
                />
        );
    }
    return(
        <FlatList 
            data={props.dishes}
            renderItem={renderMenuItem}
            keyExtractor={item => item.id.toString()}
            />
    );
}

export default Menu;