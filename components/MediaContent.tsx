import { StyleSheet, View, Image, Text } from 'react-native'
import Video from 'react-native-video'

import useRightContext from '../hooks/useRightContext'

export const MediaContent = () => {
	const { media } = useRightContext()

	const renderMediaType = () => {
		switch (media.type) {
			case 'img':
				return (
					<Image
						style={styles.image}
						source={{ uri: media.src }}
						alt={media.label}
						resizeMode="contain"
					/>
				)
			case 'video':
			// return (
			// 	<Video
			// 		style={styles.image}
			// 		// autoPlay={true}
			// 		muted
			// 		source={{uri: media.src}}
			// 		// loop
			// 	/>
			// );
			case 'emergency':
				return (
					<View>
						<Text>{media.header}</Text>
						<Text>{media.text}</Text>
					</View>
				)
			case 'stream':
			// return (
			// 	<Video
			// 		style={styles.image}
			// 		// autoPlay={true}
			// 		muted
			// 		source={{uri: media.src}}
			// 		// crossOrigin="anonymous"
			// 	/>
			// );
			case 'ticker':
				return (
					<View>
						<Text>{media.text}</Text>
					</View>
				)
			default:
				break
		}
	}

	return <View style={styles.imageContainer}>{renderMediaType()}</View>
}

const styles = StyleSheet.create({
	imageContainer: {
		flex: 1,
		width: '100%',
	},
	image: {
		flex: 1,
	},
})
