import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

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
		Decks: {
			screen: Decks,
			navigationOptions: {
				tabBarIcon: ({ tintColor }) =>
					<MaterialCommunityIcons name="cards" size={30} color={tintColor} />
			},
		},
		AddDeck: {
			screen: AddDeck,
			navigationOptions: {
				tabBarLabel: 'Add Deck',
				tabBarIcon: ({ tintColor }) =>
					<FontAwesome name="plus-square" size={30} color={tintColor} />
			},
		}
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