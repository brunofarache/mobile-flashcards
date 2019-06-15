import React from 'react';
import { Button, Text, View } from 'react-native';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import styles from '../util/styles';

export default function Deck() {
	const deck = useNavigationParam('deck');
	const { navigate } = useNavigation();

	const onPressAddCard = (deck) => {
		const { title } = deck;
		navigate('AddCard', { title });
	}

	return (
		<View style={styles.container}>
			<Text>{deck.title}</Text>
			<Text>{deck.questions.length} cards</Text>
			<Button
				title="Add Card"
				onPress={() => onPressAddCard(deck)}
			/>
		</View>
	);
}