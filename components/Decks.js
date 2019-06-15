import React, { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import database from '../util/database';
import styles from '../util/styles';

export default function Decks() {
	const [decks, setDecks] = useState([]);

	useEffect(() => {
		database.getDecks()
			.then((decks) => {
				setDecks(decks);
			});
		  }, []
	);

	const { navigate } = useNavigation();

	const onPressItem = (title) => {
		navigate('Deck', { title });
	}

	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				data={decks}
				renderItem={
					({item}) => (
						<TouchableOpacity onPress={() => onPressItem(item.title)}>
							<View style={[styles.container, {height: 80, width: 400}]}>
								<Text style>{item.title}</Text>
								<Text>{item.questions.length} cards</Text>
							</View>
						</TouchableOpacity>
					)}
				keyExtractor={(_, index) => index.toString()}
				ItemSeparatorComponent={({}) => (
					<View style={styles.separator} />
				)}
			/>
		</SafeAreaView>
	);
}