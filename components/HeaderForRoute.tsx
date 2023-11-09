import useLeftContext from '../hooks/useLeftContext';
import { Image, StyleSheet, Text, View } from 'react-native';

export const HeaderForRoute = () => {
	const { route } = useLeftContext();

	return (
		<View style={styles.header}>
			<Image source={route.icon} alt="route" />
			<Text style={styles.title}>{route.name}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		paddingVertical: 7,
		paddingHorizontal: 10,
		borderbottom: '2 solid #d9d9d9',
		gap: 16,
		boxSizing: 'border-box',
		backgroundColor: 'inherit',
	},
	
	title: {
		fontSize: 28,
		fontWeight: '700',
		lineHeight: 42,
	}
	
	// @media screen and (minWidth: 2782) {
	// 	title {
	// 		fontSize: 42,
	// 		lineHeight: 80,
	// 	}
	// }
})