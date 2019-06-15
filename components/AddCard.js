import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import database from '../util/database';
import styles from '../util/styles';

import { connect } from 'react-redux'
import { getDecks } from '../actions'

function AddCard(props) {
	const [question, setQuestion] = useState('');
	const [answer, setAnswer] = useState('');
	const title = useNavigationParam('title');
	const { goBack } = useNavigation();

	const onPressSubmit = () => {
		database.addCardToDeck(title, { question, answer })
			.then((decks) => {
                props.dispatch(getDecks(decks));
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

export default connect()(AddCard);