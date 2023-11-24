import {
	Image,
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
} from 'react-native'

import useLeftContext from '../hooks/useLeftContext'
import { Colors, Fonts } from '../utils/constants'

export const HeaderForRoute = () => {
	const { route } = useLeftContext()
	const { width: deviceWidth } = useWindowDimensions()

	const titleTextStyles = {
		fontSize: deviceWidth >= 2782 ? 42 : 28,
		lineHeight: deviceWidth >= 2782 ? 80 : 42,
	}

	return (
		<View style={styles.header}>
			<Image
				source={{ uri: route.icon.length === 0 ? undefined : route.icon }}
				alt="route"
			/>
			<Text style={[styles.title, titleTextStyles]}>{route.name}</Text>
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
		fontFamily: Fonts.ptRootUi600,
	},
})
