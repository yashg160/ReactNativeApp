import React, { Component } from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponent';
import Login from './LoginComponent';
import { View, Platform, Image, StyleSheet, ScrollView, Text } from 'react-native';
import { createStackNavigator, createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
})

const MenuNavigator = createStackNavigator({
    Menu: {
        screen: Menu,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <Icon name='menu'size={24} color='white' onPress={() => navigation.toggleDrawer()}/>
        })},
    Dishdetail: { screen: Dishdetail },
    }, {
        initialRouteName: "Menu",
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#512DA8'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    });


const HomeNavigator = createStackNavigator({
    Home: { screen: Home }
}, {
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#512DA8'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon name='menu' size={24} color='white' onPress={() => navigation.toggleDrawer()} />

        })
    });

const ContactNavigator = createStackNavigator({
    Contact: { screen: Contact }
}, {
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#512DA8'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon name='menu' size={24} color='white' onPress={() => navigation.toggleDrawer()} />
        })
    });

const AboutNavigator = createStackNavigator({
    About: { screen: About }
}, {
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#512DA8'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon name='menu' size={24} color='white' onPress={() => navigation.toggleDrawer()} />

        })
    });

const ReservationNavigator = createStackNavigator({
    Reservation: { screen: Reservation }
}, {
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#512DA8'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon name='menu' size={24} color='white' onPress={() => navigation.toggleDrawer()} />

        })
    });

const FavoritesNavigator = createStackNavigator({
    Favorites: { screen: Favorites }
}, {
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#512DA8'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon name='menu' size={24} color='white' onPress={() => navigation.toggleDrawer()} />

        })
    });

const LoginNavigator = createStackNavigator({
    Login: { screen: Login }
}, {
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#512DA8'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon name='menu' size={24} color='white' onPress={() => navigation.toggleDrawer()} />

        })
    });
const CustomDrawerContentComponent = (props) => (
    <ScrollView>
        <SafeAreaView style={styles.container}
            forceInset={{ top: 'always', horizontal: 'never' }}>
            <View style={styles.drawerHeader}>
                <View style={{ fles: 1 }}>
                    <Image source={require('./images/logo.png')}
                        style={styles.drawerImage} />
                </View>
                <View style={{ flex: 2 }}>
                    <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
                </View>
            </View>
            <DrawerItems {...props} />
        </SafeAreaView>
        
    </ScrollView>
);

const MainNavigator = createDrawerNavigator({
    Login: {
        screen: LoginNavigator,
        navigationOptions: {
            title: 'Login',
            drawLabel: 'Login',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='sign-in'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }
    },
    Home: {
        screen: HomeNavigator,
        navigationOptions: {
            title: 'Home',
            drawLabel: 'Home',
            drawerIcon: ({ tintColor }) => (
                <Icon 
                    name='home'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }
    },
    Menu: {
        screen: MenuNavigator,
        navigationOptions: {
            title: 'Menu',
            drawLabel: 'Menu',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='list'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }
    },
    Contact: {
        screen: ContactNavigator,
        navigationOptions: {
            title: 'Contact Us',
            drawLabel: 'Contact Us',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='address-card'
                    type='font-awesome'
                    size={22}
                    color={tintColor}
                />
            )
        }
    },
    About: {
        screen: AboutNavigator,
        navigationOptions: {
            title: 'About Us',
            drawLabel: 'About Us',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='info-circle'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }
    },
    Reservation: {
        screen: ReservationNavigator,
        navigationOptions: {
            title: 'Reserve Table',
            drawLabel: 'Reserve Table',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='cutlery'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }
    },
    Favorites: {
        screen: FavoritesNavigator,
        navigationOptions: {
            title: 'My Favorites',
            drawLabel: 'My Favorites',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='heart'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }
    }
}, {
        initialRouteName: 'Home',
        drawerBackgroundColor: '#D1C4E9',
        contentComponent: CustomDrawerContentComponent
});

class Main extends Component {

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }
    
    render() {
        return (
            <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight}}>
                <MainNavigator />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawerHeader: {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);