import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import database from '../util/database';
import styles from '../util/styles';

export default function AddDeck() {
	const [title, setTitle] = useState('');
	const { navigate } = useNavigation();

	const onPressCreateDeck = () => {
		database.saveDeckTitle(title)
			.then(() => {
				navigate('Deck', { title });
			});
	};

	return (
		<View style={styles.container}>
			<Text>What's the title of your new deck?</Text>
			<TextInput
				style={styles.input}
				onChangeText={(text) => setTitle(text)}
			/>
			<Button
				title="Create Deck"
				onPress={onPressCreateDeck}
			/>
		</View>
	);
}