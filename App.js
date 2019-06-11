import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
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
	const [deckName, setDeckName] = useState('');

	const onPressCreateDeck = () => {
		alert(deckName);
	};

	return (
		<View style={styles.container}>
			<Text>What's the title of your new deck?</Text>
			<TextInput
				style={{height: 40, width: 300, borderColor: 'gray', borderWidth: 1}}
				onChangeText={(text) => setDeckName(text)}
			/>
			<Button
				title="Create Deck"
				onPress={onPressCreateDeck}
			/>
		</View>
	);
}

export default function App() {
	const TabNavigator = createBottomTabNavigator(
		{
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
		},
		{
			initialRouteName: 'AddDeck'
		}
	);

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