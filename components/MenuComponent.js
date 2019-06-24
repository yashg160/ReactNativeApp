import {ListItem} from 'react-native-elements';
import { FlatList } from 'react-native';
import React from 'react';
import { Component } from 'react';
import { DISHES } from '../shared/dishes';

class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES
        };
    }

    static navigationOptions = {
        title: 'Menu'
    }
    
    render() {
        const renderMenuItem = ({ item, index }) => {
            return (
                <ListItem
                    key={index}
                    title={item.name}
                    subtitle={item.description}
                    hideChevron={true}
                    onPress={() => navigate('Dishdetail', {dishId: item.id})}
                    leftAvatar={{ source: require('./images/uthappizza.png') }}
                />
            );
        }

        const { navigate } = this.props.navigation;
        return (
            <FlatList
                data={this.state.dishes}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}

export default Menu;