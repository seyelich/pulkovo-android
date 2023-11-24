import { useRef } from 'react'
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'

import useLeftContext from '../hooks/useLeftContext'
import { Fonts } from '../utils/constants'

export const HeaderForStop = () => {
	const { currStop, route } = useLeftContext()
	const ref = useRef<View>(null)
	const container = ref.current
	const { width: deviceWidth } = useWindowDimensions()

	const titleTextStyles = {
		fontSize: deviceWidth > 1920 ? 80 : 40,
		lineHeight: deviceWidth > 1920 ? 80 : 40,
	}

	// const isOverflown = (el: View) => el.scrollWidth > el.clientWidth;
	// const condition = container && isOverflown(container);

	return (
		<View
			style={[
				styles.header,
				{
					backgroundColor: route.color,
					paddingVertical: deviceWidth >= 2782 ? 15 : 10,
				},
			]}
			ref={ref}
		>
			<Text style={[styles.title, { color: route.fontColor }, titleTextStyles]}>
				{currStop?.nameRus}
			</Text>
			<Text
				style={[
					styles.titleEng,
					{ color: route.fontColor, fontSize: deviceWidth >= 2782 ? 42 : 28 },
				]}
			>
				{currStop?.nameEng}
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	header: {
		paddingHorizontal: 32,
		boxSizing: 'border-box',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
	},

	title: {
		fontFamily: Fonts.ptRootUi600,
	},

	titleEng: {
		fontFamily: Fonts.ptRootUi500,
		lineHeight: 42,
	},

	runningLine: {
		// animation: 5s line linear infinite,
	},

	// /* change animation */

	// @keyframes line {
	// 	from {
	// 		transform: translateX(0%);
	// 	}
	// 	to {
	// 		transform: translateX(100%);
	// 	}
	// }
})
