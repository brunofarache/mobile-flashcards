import React, { useEffect } from 'react';
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import database from '../util/database';
import styles from '../util/styles';

import { connect } from 'react-redux'
import { getDecks } from '../actions'

function Decks(props) {
	useEffect(() => {
		database.getDecks()
			.then((decks) => {
				props.dispatch(getDecks(decks));
			});
		  }, []
	);

	const { navigate } = useNavigation();

	const onPressItem = (deck) => {
		navigate('Deck', { deck });
	}

	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				data={props.decks}
				renderItem={
					({item}) => (
						<TouchableOpacity onPress={() => onPressItem(item)}>
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

function mapStateToProps(decks) {
	return {
		decks
	}
}

export default connect(mapStateToProps)(Decks);