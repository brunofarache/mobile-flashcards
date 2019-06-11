import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

function Decks() {
	return (
		<View style={styles.container}>
			<Text>Decks</Text>
		</View>
	);
}

function AddDeck() {
	return (
		<View style={styles.container}>
			<Text>Add Deck</Text>
		</View>
	);
}

export default function App() {
	const TabNavigator = createBottomTabNavigator({
		Home: Decks,
		AddDeck: AddDeck
	});

	const AppContainer = createAppContainer(TabNavigator);

	return (
		<AppContainer />
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});