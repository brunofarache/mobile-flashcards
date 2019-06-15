import React from 'react';
import { Button, Text, View } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import styles from '../util/styles';

import { connect } from 'react-redux'

function Deck(props) {
	const { deck } = props;
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

function mapStateToProps(state, { navigation }) {
	const { state: { params: title } } = navigation;

	return {
		deck: state.find((deck) => deck.title === title)
	 };
}

export default connect(mapStateToProps)(Deck);