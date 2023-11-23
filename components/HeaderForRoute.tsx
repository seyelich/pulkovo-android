import { Image, StyleSheet, Text, View } from 'react-native'

import useLeftContext from '../hooks/useLeftContext'
import { Colors, Fonts } from '../utils/constants'

export const HeaderForRoute = () => {
	const { route } = useLeftContext()

	return (
		<View style={styles.header}>
			<Image
				source={{ uri: route.icon.length === 0 ? undefined : route.icon }}
				alt="route"
			/>
			<Text style={styles.title}>{route.name}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	header: {
		paddingVertical: 7,
		paddingHorizontal: 10,
		borderBottomWidth: 2,
		borderBottomColor: Colors.lightGrey,
		gap: 16,
		boxSizing: 'border-box',
		backgroundColor: 'inherit',
		flexDirection: 'row',
	},

	title: {
		fontSize: 28,
		fontFamily: Fonts.ptRootUi600,
		lineHeight: 42,
	},

	// @media screen and (minWidth: 2782) {
	// 	title {
	// 		fontSize: 42,
	// 		lineHeight: 80,
	// 	}
	// }
})
