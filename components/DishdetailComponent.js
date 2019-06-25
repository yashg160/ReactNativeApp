import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet, Modal,  } from 'react-native';
import { Card, Icon, Rating, Input, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';

function RenderDish(props) {
    const dish = props.dish;
    console.info("RenderDish Method");
    if(dish != null) {
        return(
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
                        name={'pencil'}
                        type='font-awesome'
                        color='#512DA8'
                        onPress={() => props.onPressModal() }
                        style={{flex: 2}}/>
                </View>
                
            </Card>
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
        <Card title="Comments">
            <FlatList 
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()} />
            
        </Card>
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