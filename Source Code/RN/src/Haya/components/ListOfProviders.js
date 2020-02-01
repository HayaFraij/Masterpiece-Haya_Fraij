import React, { Component, Fragment } from 'react';
import {
	SafeAreaView,
	StyleSheet,
	ScrollView,
	View,
	Switch,
	Text,
	TextInput,
	Button,
	StatusBar,
	FlatList,
	TouchableOpacity,
	Image,
} from 'react-native';
import axios from "axios";
import StarRating from 'react-native-star-rating';

import { NativeModules } from 'react-native';
import { Card } from 'react-native-elements';
const { ToastModule } = NativeModules

class ListOfProviders extends Component {
	state = {
		listOfProviders: [],
		display: false,
		starCount: 4,
	}
	onStarRatingPress = (rating) => {
		this.setState({
			starCount: rating
		});
	}

	serveceProvider(listOfProviders) {
		axios.get(`http://${this.props.ipAddress}:9000/users/listOfProviders/${listOfProviders}`)
			.then(res => {
				this.setState({ listOfProviders: res.data })
				this.setState({ display: true })
				console.log('this.props.requested.listOfProviders', this.state.listOfProviders)
			})
	}

	updateProvider(serviceProvider) {
		axios.put(`http://${this.props.ipAddress}:9000/posts/updateProvider/${this.props.postId}/${serviceProvider}`)
			.then(res => {
				this.setState({ display: !this.state.display })
      })
      // this.props.refreshing()
	}
	render() {
		return (
			<Fragment >
				<Button
					title='Providers'
					onPress={this.serveceProvider.bind(this, this.props.listOfProviders)} />
				{this.state.display ?
					<View>
						<FlatList
							inverted={true}
							data={this.state.listOfProviders}
							renderItem={({ item }) => {
								return (
									<Card>
										<Text>
											The serveceProvider Name:
                      {item.name}
										</Text>
										<Text>
											Rating:
										</Text>
										<View style={styles.stars}>
											<StarRating
												maxStars={5}
												rating={item.rating}
												starSize={13}
												fullStarColor='gold'
											/>
										</View>
										<Button
											title='Select'
											onPress={this.updateProvider.bind(this, item.name)}
										/>
									</Card>
								)
							}}
						/>
					</View>
					:
					null
				}
			</Fragment>
		);
	}
};

const styles = StyleSheet.create({
	info: {
		flexDirection: 'row',
		justifyContent: 'flex-start'
	},
	item: {
		marginRight: 30,
		width: 50,
		height: 50,
	},
	stars: {
		width: 30,
		alignItems: 'flex-start',
		marginLeft: 10
	},
	historyContainer: {
		alignItems: 'center'
	},
	historyItem: {
		borderWidth: 2,
		width: 400,
		padding: 10,
		borderRadius: 15,
		margin: 10
	},
	row: {
		flexDirection: 'row',
		margin: 5
	}
})

export default ListOfProviders;