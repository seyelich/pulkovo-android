import { useEffect, useRef } from 'react';
import useLeftContext from '../hooks/useLeftContext';
import { StyleSheet, View, Text, FlatList, Image } from 'react-native';
import { TTransfer } from '../types';

const { VITE_ICONS_URL } = process.env;

export const Routes = () => {
	const { currStop, stops } = useLeftContext();
	const isLast = currStop?.index === stops.length - 1;
	const lastRef = useRef<HTMLLIElement>(null);
	const firstRef = useRef<HTMLLIElement>(null);

	useEffect(() => {
		if (currStop?.transfers.find((el) => el.icons.length > 14)) {
			setInterval(() => {
				lastRef.current?.scrollIntoView({
					behavior: 'smooth',
					block: 'end',
				});
				firstRef.current?.scrollIntoView({
					behavior: 'smooth',
					block: 'start',
				});
			}, 10000);
		}
	}, [currStop]);

	const renderItem = (el: TTransfer) => {
		el.icons.slice(1).map((icon, il) => (
			<View key={il} > {/* ref={il === 0 ? firstRef : lastRef} */}
				<Image
					style={styles.icon}
					source={VITE_ICONS_URL + icon}
					alt="Номер маршрута"
				/>
			</View>
		))
		if(el.nameRus) return (
			<View>
				<Text style={styles.station}>{el.nameRus}</Text>
				<Text style={styles.stationEng}>{el.nameEng}</Text>
			</View>
		)
		else return null;
	}

	return (
		<View style={styles.container}>
			{isLast && <Text style={styles.finalStop}>Конечная</Text>}
			<View style={styles.iconsContainer}>
				{currStop?.transfers.map((el, iu) => {
					return (
						<View style={styles.row} key={iu}>
							<Image
								style={styles.icon}
								source={VITE_ICONS_URL + el.icons[0]}
								alt="Тип ТС"
							/>
							<FlatList
								style={styles.list} /*{`${styles.list} ${el.nameRus && styles.listMetro}`} */
								data={el.icons}
								renderItem={({item}) => renderItem(item)}
							/>
						</View>
					);
				})}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingVertical: 16,
		paddingHorizontal: 32,
	},
	
	finalStop: {
		fontSize: 24,
		fontWeight: '500',
		lineHeight: 24,
		marginBottom: 24,
	},
	
	iconsContainer: {
		flexDirection: 'column',
		gap: 16,
	},
	
	row: {
		gap: 16,
	},
	
	list: {
		columnGap: 16,
		rowGap: 8,
		flexWrap: 'wrap',
		maxHeight: 108,
		// overflowY: 'hidden',
	},
	
	listMetro: {
		columnGap: 8,
	},
	
	station: {
		fontSize: 32,
		fontWeight: '700',
		lineHeight: 32,
	},
	
	stationEng: {
		fontSize: 16,
		fontWeight: '500',
		lineHeight: 16,
	},
	
	icon: {
		height: 50,
	},	
})