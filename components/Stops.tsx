import { StopTemplate } from './StopTemplate';
import useLeftContext from '../hooks/useLeftContext';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { TContextStop } from '../utils/store';
import { LinearGradient } from 'expo-linear-gradient';

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
						isFirst={i === 0 && !currStop}
					/>
				)
			else return null;
		}
	}

	return (
		<View>
			<FlatList 
				style={styles.stops}
				scrollEnabled={false}
				data={stops}
				renderItem={({item, index}) => renderItem(item, index) }
			/>
			{
				stops.length < 4 || !!currStop ? 
					<View style={[styles.line, { height: index*92 + (index - 2)*gap}]} /> :
					<>
						<View style={[styles.line, { height: '100%' }]} />
						<LinearGradient
							colors={['#d9d9d9', '#fff']}
							style={styles.gradientLine} 
						/>
					</>
			}
		</View>
	);
};

const gap = 16;

const styles = StyleSheet.create({
	stops: {
		position: 'relative',
		margin: 0,
		paddingHorizontal: 17.5,
		paddingBottom: 18,
		paddingTop: 16,
		flexDirection: 'column',
		flex: 1,
	},
	
	lastStop: {
		fontSize: 24,
		fontWeight: '500',
		lineHeight: 24,
		paddingLeft: 14.5,
		backgroundColor: 'white',
		zIndex: 2,
	},

	gradientLine: {
		height: 82, 
		position: 'absolute', 
		width: 2, zIndex: -1, 
		bottom: 0, 
		left: 97
	},

	line: {
		height: '100%',
		width: 2,
		backgroundColor: '#d9d9d9',
		position: 'absolute',
		left: 97,
		top: 0,
		zIndex: -1,
	},
	
	// @media screen and (min-width: 2782) {
	// 	.stops {
	// 		--gap: 48;
	// 		padding: 32 17.5 32 17.5;
	// 	}
	// }
})
