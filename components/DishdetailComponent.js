import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet, Modal, Alert, PanResponder, Button, Share } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

function RenderDish(props) {
    const dish = props.dish;

    handleViewRef = ref => this.view = ref;

    const recognizeDrag = ({moveX, moveY, dx, dy}) => {
        if (dx < -200)
            return true;
        else
            return false;

    };

    const recognizeDragComment = ({ movex, moveY, dx, dy }) => {
        if (dx > 200)
            return true;
        else
            return false;
    }

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderGrant: () => {
            this.view.rubberBand(1000)
                .then(endState => console.log(endState.finishes ? 'Animation finished' : "Animation cancelled"))  
        },
        onPanResponderEnd: (e, gestureState) => {
            if (recognizeDrag(gestureState))
                Alert.alert(
                    'Add to Favorites?',
                    'Are you sure you want to add ' + dish.name + ' to Favorites?',
                    [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel pressed')
                        },
                        {
                            text: 'OK',
                            onPress: () => props.favorite ? console.log('Already Favorite') : props.onPress()
                        }
                    ],
                    {cancelable: true}
                )
            
            if (recognizeDragComment(gestureState))
                props.onPressModal();
            
            return true;
        }
    });

    const shareDish = (title, message, url) => {
        Share.share({
            title: title,
            message: title + ': ' + message + ' ' + url,
            url: url
        }, { 
            dialogTitle: 'Share ' + title
        })
    }

    if(dish != null) {
        return (
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}
                ref={this.handleViewRef}
                {...panResponder.panHandlers}>
                <Card
                    featuredTitle={dish.name}
                    image={{ uri: baseUrl + dish.image }}
                    >
                        <Text style={{margin: 10}}>
                            {dish.description}
                    </Text>
                    <View style={styles.buttonRowView}>
                        <Icon
                            raised
                            reverse
                            name={props.favorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            onPress={() => props.favorite ? console.log("Already Favorite") : props.onPress()}
                            style={{flex: 1}}/>
                        <Icon
                            raised
                            reverse
                            name='pencil'
                            type='font-awesome'
                            color='#512DA8'
                            onPress={() => props.onPressModal() }
                            style={{ flex: 2 }} />
                        <Icon
                            raised
                            reverse
                            name='share'
                            type='font-awesome'
                            color='#51D2A8'
                            onPress={() => shareDish(dish.name, dish.description, baseUrl + dish.image)}
                            style={{ flex: 3 }} />
                    </View>
                    
                    </Card>
                </Animatable.View>
        );
    }
    else{
        return(<View></View>)
    }
}

const mapStateToProps = state => {
    console.info("mapStateToProps");
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
})


function RenderComments(props) {
    const comments = props.comments;
    const renderCommentItem = ({ item, index }) => {
        return (
            <View key={index} style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }}>{item.comment}</Text>
                <Text style={{ fontSize: 12 }}>{item.rating}</Text>
                <Text style={{ fontSize: 12 }}>{'-- ' + item.author + ', ' + item.date}</Text>
            </View>
        );
    }

    return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
            <Card title="Comments">
                <FlatList 
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()} />
            </Card>
        </Animatable.View>
    );
}

class Dishdetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            rating: 5,
            author:'',
            comment: '',
            date: '',
            dishId: null
        }
    }

    markFavorite(dishId) {
        console.info("markFavorite");
        this.props.postFavorite(dishId);
    }

    toggleModal(dishId) {
        this.setState({
            showModal: !this.state.showModal,
            dishId: dishId
        });
    }

    resetModal() {
        this.setState({
            dishId: null,
            rating: null,
            author: '',
            comment: ''
        });
    }

    handleSubmit() {
        console.log("handleSubmit: Adding new comment");
        console.info("Dishdetail adding comment: present state: ");
        console.info("DishId: " + this.state.dishId + "\nAuthor: " + this.state.author + "\nRating: " + this.state.rating + "\nComment: " + this.state.comment);
        postComment(this.state.dishId, this.state.rating, this.state.author, this.state.comment);
        console.log("Called postComment");
        this.toggleModal();
        this.resetModal(); 
    }

    static navigationOptions = {
        title: 'Dish Detail'
    }

    render() {
        console.info("Render Method");
        const dishId = this.props.navigation.getParam('dishId', '');
        console.info("Render Method DishId: " + this.state.dishId);
        return (
            <View>
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)}
                    onPressModal={() => this.toggleModal(dishId)} />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
            </ScrollView>
            <Modal
                animationType={'slide'}
                transparent={false}
                visible={this.state.showModal}
            >
                <Rating
                    type='custom'
                    ratingCount={5}
                    startingValue={5}
                    showRating={true}
                    imageSize={40}
                    onFinishRating={rating => this.setState({ rating: rating })}
                    defaultRating={5}
                    />

                    <Input
                        placeholder="Author"
                        leftIcon={
                            <Icon
                                name='user-o'
                                type='font-awesome'
                                color='black'
                                style={{ marginRight: 10 }}
                            />
                        }
                        onChangeText={author => this.setState({author: author})}
                    />
                    <Input
                        placeholder="Comment"
                        leftIcon={
                            <Icon
                                name='comment-o'
                                type='font-awesome'
                                color='black'
                                style={{ marginRight: 10 }}
                            />
                        }
                        onChangeText={comment => this.setState({ comment: comment })}
                    />
                    <Button
                        title="Submit"
                        backgroundColor="#512DA8"
                        style={styles.buttonStyle}
                        onPress={() => this.handleSubmit()}
                    />

                    <Button
                        title="Cancel"
                        color='#d6d6c2'
                        onPress={() => this.toggleModal()}
                        style={styles.buttonStyle}
                    />
            </Modal>
            </View>
        );
    }
    
}

const styles = StyleSheet.create({
    buttonRowView: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    modalRatingBar: {
        alignSelf: 'center'
    },
    buttonStyle: {
        margin: 10
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);