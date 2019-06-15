import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import database from '../util/database';
import styles from '../util/styles';

export default function AddCard() {
	const [question, setQuestion] = useState('');
	const [answer, setAnswer] = useState('');
	const title = useNavigationParam('title');
	const { goBack } = useNavigation();

	const onPressSubmit = () => {
		database.addCardToDeck(title, { question, answer })
			.then(() => {
				goBack(null);
			});
	};

	return (
		<View style={styles.container}>
			<Text>Question</Text>
			<TextInput
				style={styles.input}
				onChangeText={(text) => setQuestion(text)}
			/>
			<Text>Answer</Text>
			<TextInput
				style={styles.input}
				onChangeText={(text) => setAnswer(text)}
			/>
			<Button
				title="Submit"
				onPress={onPressSubmit}
			/>
		</View>
	);
}