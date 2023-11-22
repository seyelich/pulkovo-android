import { useEffect } from 'react';
import { FlightTable } from './FlightsTable';
import { SendJsonMessage } from 'react-use-websocket/dist/lib/types';
import useRightContext from '../hooks/useRightContext';
import { MediaContent } from './MediaContent';
import { StyleSheet, View, Image } from 'react-native';

export const RightBlock = ({
	sendMessage,
}: {
	sendMessage: SendJsonMessage;
}) => {
	const { media, pulkovo, type } = useRightContext();

	const timer = (label: string, duration: number) =>
		setTimeout(() => {
			sendMessage({
				type: 'COMPLETE',
				label: label,
			});
			console.log('Message is sent');
		}, duration * 1000);

	useEffect(() => {
		const contentTimer =
			type === 'pulkovo'
				? timer(pulkovo.subtype, pulkovo.duration)
				: timer(media.label, media.length!);
		return () => clearTimeout(contentTimer);
	}, [pulkovo, media, type]);

	return (
		<View style={styles.rightBlock}>
			{type === 'media' ? (
				<MediaContent />
			) : pulkovo.subtype === 'ARRIVAL' ||
				pulkovo.subtype === 'DEPARTURE' ? (
				<FlightTable />
			) : (
				<View style={styles.imageContainer}>
					<Image
						style={styles.image}
						source={{uri: pulkovo.src}}
						alt={pulkovo.subtype}
						resizeMode='contain'
					/>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	rightBlock: {
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden',
		flex: 1
	},
	
	imageContainer: {
		flex: 1,
		width: '100%'
	},

	image: {
		flex: 1,
	}
})
