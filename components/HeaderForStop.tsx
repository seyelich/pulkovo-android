import useLeftContext from '../hooks/useLeftContext';
import { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const HeaderForStop = () => {
	const { currStop, route } = useLeftContext();
	const ref = useRef<View>(null);
	const container = ref.current;

	// const isOverflown = (el: View) => el.scrollWidth > el.clientWidth;
	// const condition = container && isOverflown(container);

	return (
		<View
			style={[styles.header, { backgroundColor: route.color }]}
			ref={ref}
		>
			<Text style={[styles.title, { color: route.fontColor }]}> {/*{`${styles.title} ${condition && styles.runningLine}`} */}
				{currStop?.nameRus}
			</Text>
			<Text style={[styles.titleEng, { color: route.fontColor }]}> {/*{`${styles.titleEng} ${condition && styles.runningLine}`} */}
				{currStop?.nameEng}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		paddingHorizontal: 32,
		paddingVertical: 10,
		boxSizing: 'border-box',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
	},
	
	title: {
		fontSize: 40,
		fontWeight: '700',
		lineHeight: 40,
	},
	
	titleEng: {
		fontSize: 28,
		fontWeight: '500',
		lineHeight: 42,
	},
	
	runningLine: {
		// animation: 5s line linear infinite,
	},
	
	// @media screen and (minWidth: 2782) {
	// 	.title {
	// 		font-size: 52;
	// 		lineHeight: 52;
	// 	}
	
	// 	.titleEng {
	// 		font-size: 42;
	// 		lineHeight: 42;
	// 	}
	// }
	
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