import React, { Component } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
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

    constructor(props) {
        super(props);
        this.animatedValue = new Animated.Value(0);
    }

    static navigationOptions = {
        title: 'Home'
    }

    componentDidMount() {
        this.animate();
    }

    animate() {
        console.info(this.animatedValue);
        this.animatedValue.setValue(0);
        Animated.timing(
            this.animatedValue,
            {
                toValue: 8,
                duration: 8000,
                easing: Easing.linear
            }
        ).start(() => this.animate())
    }

    render() {
        
        const xpos1 = this.animatedValue.interpolate({
            inputRange: [0, 1, 3, 5, 8],
            outputRange: [1200, 600, 0, -600, -1200]
        });

        const xpos2 = this.animatedValue.interpolate({
            inputRange: [0, 2, 4, 6, 8],
            outputRange: [1200, 600, 0, -600, -1200]
        });

        const xpos3 = this.animatedValue.interpolate({
            inputRange: [0, 3, 5, 7, 8],
            outputRange: [1200, 600, 0, -600, -1200]
        });

        return (
            <View style={{ flex: 1, flexDirection: 'row', justifyContent:'center' }}>
                <Animated.View style={{width: '100%', transform: [{translateX: xpos1}]}}>
                    <RenderItem 
                        item={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                        errMess={this.props.dishes.errMess}
                        isLoading={this.props.dishes.isLoading} />
                </Animated.View>
                    
                <Animated.View style={{ width: '100%', transform: [{ translateX: xpos2 }] }}>
                    <RenderItem
                        item={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                        errMess={this.props.promotions.errMess}
                        isLoading={this.props.promotions.isLoading} />
                </Animated.View>
              
                <Animated.View style={{ width: '100%', transform: [{ translateX: xpos3 }] }}>
                    <RenderItem
                        item={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                        errMess={this.props.leaders.errMess}
                        isLoading={this.props.leaders.isLoading} />
                </Animated.View>
            </View>
        );
    }
}

export default connect(mapStateToProps)(Home);

