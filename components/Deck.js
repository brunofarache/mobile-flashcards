import React from 'react';
import { Button, Text, View } from 'react-native';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import styles from '../util/styles';

export default function Deck() {
	const title = useNavigationParam('title');
	const { navigate } = useNavigation();

	const onPressAddCard = (title) => {
		navigate('AddCard', { title });
	}

	return (
		<View style={styles.container}>
			<Text>{title}</Text>
			<Button
				title="Add Card"
				onPress={() => onPressAddCard(title)}
			/>
		</View>
	);
}