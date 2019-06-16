import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const DECKS_KEY = 'decks';
const REMINDER_KEY = 'reminder';

const _DEFAULT_DECKS = {
	React: {
		title: 'React',
		questions: [
			{
				question: 'What is React?',
				answer: 'A library for managing user interfaces'
			},
			{
				question: 'Where do you make Ajax requests in React?',
				answer: 'The componentDidMount lifecycle event'
			}
		]
	},
	JavaScript: {
		title: 'JavaScript',
		questions: [
			{
				question: 'What is a closure?',
				answer: 'The combination of a function and the lexical environment within which that function was declared.'
			}
		]
	}
}

export const addCardToDeck = async (title, card) => {
	try {
		const decks = JSON.parse(await AsyncStorage.getItem(DECKS_KEY));
		const deck = decks[title];
		deck.questions.push(card);

		await AsyncStorage.setItem(DECKS_KEY, JSON.stringify(decks));
		return getDecks();
	}
	catch (e) {
		console.error(e);
	}
}

export const getDecks = async () => {
	try {
		const decks = await AsyncStorage.getItem(DECKS_KEY);
		let result;

		if (decks !== null) {
			result = Object.values(JSON.parse(decks));
		}
		else {
			await AsyncStorage.setItem(DECKS_KEY, JSON.stringify(_DEFAULT_DECKS));
			result = Object.values(_DEFAULT_DECKS);
		}

		return result.sort((a, b) => (a.title === b.title) ? 0 : (a.title < b.title) ? -1 : 1);
	}
	catch (e) {
		console.error(e);
	}
}

export const saveDeckTitle = async (title) => {
	const deck = {
		[title]: {
			title,
			questions: []
		}
	}

	try {
		await AsyncStorage.mergeItem(DECKS_KEY, JSON.stringify(deck));
		return getDecks();
	}
	catch (e) {
		console.error(e);
	}
}

export const clearReminder = () => {
	return AsyncStorage.removeItem(REMINDER_KEY)
		.then(Notifications.cancelAllScheduledNotificationsAsync);
}

export const setReminder = async () => {
	const reminder = await AsyncStorage.getItem(REMINDER_KEY);

	if (reminder !== null) {
		return;
	}

	const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

	if (status !== 'granted') {
		return;
	}

	Notifications.cancelAllScheduledNotificationsAsync();

	let today = new Date();
	today.setMinutes(today.getMinutes() + 1);

	const notification = {
		title: 'Time to study!',
		body: "You haven't taken a quiz today yet.",
		ios: {
			sound: true,
		},
		android: {
			sound: true,
			priority: 'high',
			sticky: false,
			vibrate: true,
		}
	};

	Notifications.scheduleLocalNotificationAsync(
		notification,
		{
			time: today,
			repeat: 'day'
		}
	);

	AsyncStorage.setItem(REMINDER_KEY, JSON.stringify(true));
}

export default {
	addCardToDeck,
	getDecks,
	saveDeckTitle,
	clearReminder,
	setReminder
}