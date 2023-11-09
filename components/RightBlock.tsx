import { useEffect, useRef } from 'react';
// import { FlightTable } from '../FlightsTable/FlightsTable';
import { SendJsonMessage } from 'react-use-websocket/dist/lib/types';
import useRightContext from '../hooks/useRightContext';
// import { MediaContent } from '../MediaContent/MediaContent';
import { StyleSheet, View, Image } from 'react-native';

export const RightBlock = ({
	sendMessage,
}: {
	sendMessage: SendJsonMessage;
}) => {
	const { media, pulkovo, type } = useRightContext();
	const nodeRef = useRef<HTMLDivElement>(null);

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
				: timer(media.label, media.length);
		return () => clearTimeout(contentTimer);
	}, [pulkovo, media, type]);

	return (
		// <SwitchTransition mode="out-in">
		// 	<CSSTransition
		// 		classNames={{
		// 			enter: styles.rightBlockEnter,
		// 			enterActive: styles.rightBlockEnterActive,
		// 			exit: styles.rightBlockExit,
		// 			exitActive: styles.rightBlockExitActive,
		// 		}}
		// 		nodeRef={nodeRef}
		// 		timeout={1000}
		// 		key={type + media.src + pulkovo.subtype}
		// 	>
				<View style={styles.rightBlock}> {/* ref={nodeRef} */}
					{/* {type === 'media' ? (
						<MediaContent />
					) : pulkovo.subtype === 'ARRIVAL' ||
					  pulkovo.subtype === 'DEPARTURE' ? (
						<FlightTable />
					) : (
						<View style={styles.imageContainer}>
							<Image
								style={styles.image}
								source={pulkovo.src}
								alt={pulkovo.subtype}
							/>
						</View>
					)} */}
				</View>
		// 	</CSSTransition>
		// </SwitchTransition>
	);
};

const styles = StyleSheet.create({
	rightBlock: {
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden',
	},
	
	rightBlockEnter: {
		opacity: 0,
	},

	rightBlockExit: {
		opacity: 1,
	},

	rightBlockEnterActive: {
		opacity: 1,
	},

	rightBlockExitActive: {
		opacity: 0,
	},

	// rightBlockEnterActive,
	// rightBlockExitActive: {
	// 	transition: opacity 1000ms,
	// },
	
	imageContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
	},
	
	image: {
		width: '100%',
		// objectFit: 'contain',
	},
})
