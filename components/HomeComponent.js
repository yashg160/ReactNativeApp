import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

function RenderItem(props) {
    const item = props.item;

    if (props.isLoading) {
        return (
            <Loading />
        );
    }
    else if (props.errMess) {
        return (
            <View>
                <Text>{props.errMess}</Text>
            </View>
        );
    }
    else {
        if (item != null) {
            return (
                <Card
                    featuredTitle={item.name}
                    featuredSubtitle={item.designation}
                    image={{ uri: baseUrl + item.image }}>
                    <Text
                        style={{ margin: 10 }}>
                        {item.description}</Text>
                </Card>
            );
        }
        else {
            return (<View></View>);
        }
    }
}

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

class Home extends Component {

    static navigationOptions = {
        title: 'Home'
    }

    render() {
        var TAG = "Home Component";
        return (
            <ScrollView>
                <RenderItem 
                    item={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                    errMess={this.props.dishes.errMess}
                    isLoading={this.props.dishes.isLoading}/>
                    
                <RenderItem
                    item={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                    errMess={this.props.promotions.errMess}
                    isLoading={this.props.promotions.isLoading}/>
              
                <RenderItem
                    item={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                    errMess={this.props.leaders.errMess}
                    isLoading={this.props.leaders.isLoading}/>
                
          </ScrollView>  
        );
    }
}

export default connect(mapStateToProps)(Home);

