import React from "react";
import { Text, View, Button, StyleSheet, TextInput} from "react-native";

class LoginPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: 'default_e',
            password: 'default_p'
         };
    }

     handleEmail = (text) => {
        this.setState({ email: text })
     }

     handlePassword = (text) => {
        this.setState({ password: text })
     }

     handleFeedback(statusCode){
        if (statusCode == 200){
            this.props.navigation.navigate("History");
        } else if (statusCode == 404){
            alert("404: User not found")
            console.log("404: User not found")
        } else if (statusCode == 400){
            alert("400: Password entered not correct")
            console.log("400: Password entered not correct")
        }
     }

     login_pressed = () => {
        ip_address = '100.64.166.191';
        const data_base_url = 'http://' + ip_address + ':3001/login';
         fetch(data_base_url, {
             method: "POST",
             headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            }),
         }).then((response) => this.handleFeedback(response.status));
     }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <Text style={{ fontSize: 30 }}>Welcome to Uroflow</Text>
                <TextInput style={styles.input}
                    placeholder = "Email"
                    autoCapitalize = "none"
                    onChangeText = {this.handleEmail}
                />
                <TextInput style={styles.input}
                    
                    placeholder = "Password"
                    autoCapitalize = "none"
                    onChangeText = {this.handlePassword}
                />
                <Button
                    onPress={this.login_pressed}
                    title="Login"
                />
            </View>
        );
    }
}

export default LoginPage;

const styles = StyleSheet.create({
    input: {
       margin: 15,
       height: 40,
       width: 230,
       borderColor: "steelblue",
       borderWidth: 1,
       paddingLeft: 15
    },
    submitButton: {
       padding: 10,
       margin: 15,
       height: 40,
    },
    submitButtonText:{
       color: 'white'
    }
 })