import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { createAppContainer, createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import database from './util/database';

function Deck() {
	const deckName = useNavigationParam('deckName');

	return (
		<View style={styles.container}>
			<Text>{deckName}</Text>
		</View>
	);
}

function Decks() {
	const [decks, setDecks] = useState([]);

	useEffect(() => {
		database.getDecks()
			.then((decks) => {
				setDecks(decks);
			});
  	});

	return (
		<View style={styles.container}>			
			{Object.values(decks).map(deck => 
				<Text key={deck.title}>{deck.title}</Text>
			)}
		</View>
	);
}

function AddDeck() {
	const [deckName, setDeckName] = useState('');
	const { navigate } = useNavigation();

	const onPressCreateDeck = () => {
		database.saveDeckTitle(deckName)
			.then(() => {
				navigate('Deck', { deckName });
			});
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

	const StackNavigator = createStackNavigator({
		Home: {
			screen: TabNavigator,
			navigationOptions: {
				header: null,
			}
		},
		Deck: {
			screen: Deck
		}
	});

	const AppContainer = createAppContainer(StackNavigator);

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