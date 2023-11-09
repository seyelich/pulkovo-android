import { StopTemplate } from './StopTemplate';
import useLeftContext from '../hooks/useLeftContext';
import { FlatList, StyleSheet, Text } from 'react-native';
import { TContextStop } from '../utils/store';

export const Stops = () => {
	const { stops, currStop } = useLeftContext();
	const index = stops.length >= 4 ? 0 : stops.length;

	const renderItem = (item: TContextStop, i: number) => {
		if ((index === stops.length - 1 && !currStop) ||
			(stops.length === 1 && currStop)) return (
				<Text style={styles.lastStop}>Конечная</Text>
			)
		else {
			const condition = (currStop ? 1 : 0) <= i && i < 4;
			if (condition) return (
					<StopTemplate
						key={i}
						stop={item}
						isFinal={i === stops.length - 1}
						isLast={i === 3}
						isFirst={i === 0 && !currStop}
					/>
				)
			else return null;
		}
	}

	return (
		<FlatList 
			style={styles.stops}
			data={stops}
			renderItem={({item, index}) => <Text>{item.nameRus}</Text>
				// <StopTemplate
				// 	key={index}
				// 	stop={item}
				// 	isFinal={index === stops.length - 1}
				// 	isLast={index === 3}
				// 	isFirst={index === 0 && !currStop}
				// />
			}
		/>
	);
};

const gap = 24;

const styles = StyleSheet.create({
	stops: {
		position: 'relative',
		margin: 0,
		paddingHorizontal: 17.5,
		paddingBottom: 18,
		paddingTop: 16,
		flexDirection: 'column',
		gap: gap,
		// height: fit-content,
	},
	
	lastStop: {
		fontSize: 24,
		fontWeight: '500',
		lineHeight: 24,
		paddingLeft: 14.5,
		backgroundColor: 'white',
		zIndex: 2,
	},
	
	// @media screen and (min-width: 2782) {
	// 	.stops {
	// 		--gap: 48;
	// 		padding: 32 17.5 32 17.5;
	// 	}
	// }
})
