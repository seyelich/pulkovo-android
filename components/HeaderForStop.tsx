import { useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import useLeftContext from '../hooks/useLeftContext'
import { Fonts, deviceWidth } from '../utils/constants'

export const HeaderForStop = () => {
	const { currStop, route } = useLeftContext()
	const ref = useRef<View>(null)
	const container = ref.current

	// const isOverflown = (el: View) => el.scrollWidth > el.clientWidth;
	// const condition = container && isOverflown(container);

	return (
		<View style={[styles.header, { backgroundColor: route.color }]} ref={ref}>
			<Text style={[styles.title, { color: route.fontColor }]}>
				{' '}
				{/*{`${styles.title} ${condition && styles.runningLine}`} */}
				{currStop?.nameRus}
			</Text>
			<Text style={[styles.titleEng, { color: route.fontColor }]}>
				{' '}
				{/*{`${styles.titleEng} ${condition && styles.runningLine}`} */}
				{currStop?.nameEng}
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	header: {
		paddingHorizontal: 32,
		paddingVertical: deviceWidth >= 2782 ? 15 : 10,
		boxSizing: 'border-box',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
	},

	title: {
		fontSize: deviceWidth > 1920 ? 80 : 40,
		lineHeight: deviceWidth > 1920 ? 80 : 40,
		fontFamily: Fonts.ptRootUi600,
	},

	titleEng: {
		fontSize: deviceWidth >= 2782 ? 42 : 28,
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
