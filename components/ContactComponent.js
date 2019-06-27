import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import { MailComposer } from 'expo';
import * as Animatable from 'react-native-animatable';

class Contact extends Component{

    static navigationOptions = {
        title: 'Contact'
    }

    sendMail() {
        MailComposer.composeAsync({
            recipients: ['yashg160@gmail.com'],
            subject: 'App Information Inquiry',
            body: 'To whom it may concern'
        })
    }

    render() {
        return (
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                <Card
                    title="Contact Information"
                >

                    <Text style={{ marginTop: 10, fontSize: 16 }}>121, Clear Water Bay Road</Text>
                    <Text style={{ marginTop: 10, fontSize: 16 }}>Clear Water Bay, Kowloon</Text>
                    <Text style={{ marginTop: 10, fontSize: 16 }}>HONG KONG</Text>
                    <Text style={{ marginTop: 10, fontSize: 16 }}>Tel: +852 1234 5678</Text>
                    <Text style={{ marginTop: 10, fontSize: 16 }}>Fax: +852 8765 4321</Text>
                    <Text style={{ marginTop: 10, marginBottom: 10, fontSize: 16 }}>Email:confusion@food.net</Text>
                    <Button
                        title='Send Email'
                        buttonStyle={{ backgroundColor: '#512DA8' }}
                        icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
                        onPress={() => this.sendMail()}
                    />
                </Card>
            </Animatable.View>
        );
    }
    
}

export default Contact;