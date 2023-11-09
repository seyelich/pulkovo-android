import {  StyleSheet, Text, View, Image } from 'react-native';
import useLeftContext from '../hooks/useLeftContext';
import { TContextStop } from '../utils/store';
import circle from '../assets/circle.svg';

type TStopTemplate = {
	stop: TContextStop;
	isFinal: boolean;
	isLast: boolean;
	isFirst: boolean;
};

export const StopTemplate = ({
	stop,
	isLast,
	isFinal,
	isFirst,
}: TStopTemplate) => {
	const { route, stops, currStop } = useLeftContext();

	return (
		<View style={styles.stop}>
			<View style={styles.timeContainer}>
				<Text>{stop.time}</Text>
				<Text style={styles.minute}>мин</Text>
			</View>
			<View
				// style={`${styles.circle} ${
				// 	(isLast || isFinal) && styles.circleWithLine
				// } ${
				// 	((stops.length < 4 && isFinal) || !!currStop) &&
				// 	styles.circleWithLineFinal
				// }`}
				style={styles.circle}
			>
				<Image source={circle} />
			</View>
			<View
				style={styles.nameContainer}
				// style={
				// 	isFirst
				// 		? { backgroundColor: route.color, color: route.fontColor }
				// 		: undefined
				// }
			>
				<Text style={styles.name}></Text>
				<Text style={styles.nameEng}>{stop.nameEng}</Text>
				{isFinal && <Text style={styles.lastStop}>Конечная</Text>}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	stop: {
		alignItems: 'center',
	},
	
	timeContainer: {
		// textAlign: 'center',
		// color: 'rgba(64, 57, 57, 1)',
		// fontSize: 40,
		// fontWeight: '500',
		// lineHeight: 32,
	},
	
	minute: {
		fontSize: 24,
		fontWeight: '400',
		lineHeight: 18,
	},
	
	circle: {
		marginRight: 24,
		marginLeft: 22.5,
		height: '100%',
		alignItems: 'center',
	},
	
	// circleWithLine::after: {
	// 	content: '',
	// 	height: '100%',
	// 	borderLeft: solid 2 #d9d9d9,
	// 	borderImage: linear-gradient(
	// 		180deg,
	// 		#d9d9d9 calc('100%' - var(--gap) * 3),
	// 		#ffffff '100%'
	// 	),
	// 	borderImagSlice: 1,
	// 	position: absolute,
	// 	left: 97,
	// 	top: 0,
	// 	zIndex: -1,
	// },
	
	// circleWithLineFinal::after: {
	// 	height: calc('100%' - var(--gap) * 4),
	// 	borderImage: none,
	// 	bottom: 50%,
	// },
	
	nameContainer: {
		width: '100%',
		height: '100%',
		boxSizing: 'border-box',
		padding: 16,
	},
	
	name: {
		fontSize: 32,
		fontWeight: '500',
		lineHeight: 32,
	},
	
	nameEng: {
		fontSize: 24,
		fontWeight: '500',
		lineHeight: 24,
		marginTop: 4,
	},
	
	lastStop: {
		fontSize: 18,
		fontWeight: '500',
		lineHeight: 18,
		marginTop: 16,
	},
	
	// @media screen and (minWidth: 2782): {
	// 	.name: {
	// 		fontSize: 48;
	// 		lineHeight: 48;
	// 	}
	
	// 	.nameEng: {
	// 		fontSize: 32;
	// 		lineHeight: 32;
	// 	}
	// }
})
