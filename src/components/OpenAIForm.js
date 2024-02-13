import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, ScrollView, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const OpenAIForm = () => {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    // Function to handle the API request when the "Submit" button is pressed
    const handleSubmit = async () => {
        try {
            setLoading(true);
            const apiResponse = await axios.post('http://localhost:5000/send_prompt', { text: prompt });
            setResponse(apiResponse.data.response);

        } catch (error) {
            console.error('Error sending prompt:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const send_response_to_web = async (response) => {
        try {
            setLoading(true);
            const apiResponse = await axios.post('http://localhost:5000/send_response', { text: response });
            // Update the UI with the received response

            console.log('Response sent to web:', apiResponse.data);
        } catch (error) {
            console.error('Error sending response:', error.message);
        } finally {
            setLoading(false);
        }
    }

    // Use useEffect to handle responses from the Telegram app
    useEffect(() => {
        // Assuming you have some logic to listen for responses from Telegram
        // When a response is received, update 'response' state with the response text
        // Example:
        // const receivedResponse = 'Response from Telegram';
        // setResponse(receivedResponse);
    }, []); // Empty dependency array to run this effect only once

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.content}>
                <Image source={require('./logo.jpg')} style={styles.logo} />
                <Text style={styles.title}>ORCHID</Text>
                <Text style={styles.subtitle}>
                    ORCHID decides which model works best for you.
                </Text>
            </View>

            <TextInput
                style={styles.input}
                value={prompt}
                onChangeText={(text) => setPrompt(text)}
                placeholder="Enter Prompt"
            />
            <Button title="Submit" onPress={handleSubmit} />

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" style={styles.activityIndicator} />
            ) : (
                response && (
                    <View style={styles.responseContainer}>
                        <Text style={styles.responseTitle}>Response:</Text>
                        <Text style={styles.responseText}>{response}</Text>
                    </View>
                )
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    content: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 50,
        height: 50,
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        height: 50,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 15,
        borderRadius: 25,
        fontSize: 18,
    },
    activityIndicator: {
        marginTop: 20,
    },
    responseContainer: {
        marginTop: 20,
    },
    responseTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    responseText: {
        fontSize: 16,
    },
});

export default OpenAIForm;
