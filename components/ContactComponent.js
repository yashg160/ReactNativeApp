import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card } from 'react-native-elements';

class Contact extends Component{

    static navigationOptions = {
        title: 'Contact'
    }

    render() {
        return (
            <Card
                title="Contact Information"
            >

                <Text style={{ marginTop: 10, fontSize: 16 }}>121, Clear Water Bay Road</Text>
                <Text style={{ marginTop: 10, fontSize: 16 }}>Clear Water Bay, Kowloon</Text>
                <Text style={{ marginTop: 10, fontSize: 16 }}>HONG KONG</Text>
                <Text style={{ marginTop: 10, fontSize: 16 }}>Tel: +852 1234 5678</Text>
                <Text style={{ marginTop: 10, fontSize: 16 }}>Fax: +852 8765 4321</Text>
                <Text style={{ marginTop: 10, marginBottom: 10, fontSize: 16 }}>Email:confusion@food.net</Text>

            </Card>
        );
    }
    
}

export default Contact;