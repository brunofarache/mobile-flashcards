import React, { useEffect } from 'react';
import { createAppContainer, createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

import AddCard from './components/AddCard';
import AddDeck from './components/AddDeck';
import Deck from './components/Deck';
import Decks from './components/Decks';
import Quiz from './components/Quiz';

import database from './util/database';

import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";

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
		initialRouteName: 'Decks'
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
	},
	AddCard: {
		screen: AddCard
	},
	Quiz: {
		screen: Quiz
	}
});

const AppContainer = createAppContainer(StackNavigator);

export default function App() {
	useEffect(() => { database.setReminder() }, []);

	return (
		<Provider store={createStore(reducer)}>
			<AppContainer />
		</Provider>
	);
}