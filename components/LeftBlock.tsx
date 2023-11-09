import { Footer } from './Footer';
import { HeaderForStop } from './HeaderForStop';
import { HeaderForRoute } from './HeaderForRoute';
import { Routes } from './Routes';
import useLeftContext from '../hooks/useLeftContext';
import { useRef } from 'react';
import { Stops } from './Stops';
import { StyleSheet, Text, View } from 'react-native';

export const LeftBlock = () => {
	const { currStop } = useLeftContext();
	const transfers = currStop?.transfers;
	const poi = currStop?.poi;
	const nodeRef = useRef<HTMLDivElement>(null);

	return (
		// <SwitchTransition mode="out-in">
		// 	<CSSTransition
		// 		classNames={{
		// 			enter: styles.leftBlockEnter,
		// 			enterActive: styles.leftBlockEnterActive,
		// 			exit: styles.leftBlockExit,
		// 			exitActive: styles.leftBlockExitActive,
		// 		}}
		// 		nodeRef={nodeRef}
		// 		timeout={1000}
		// 		key={!!currStop}
		// 	>
		// ref={nodeRef}
				<View style={styles.leftBlock} > 
				{/* <Text>123</Text> */}
					{currStop ? <HeaderForStop /> : <HeaderForRoute />}
					{currStop && (transfers || poi)?.length !== 0 ? (
						<Routes />
					) : (
						<Stops />
					)}
					<Footer />
				</View>
		// 	</CSSTransition>
		// </SwitchTransition>
	);
};

const styles = StyleSheet.create({
	leftBlock: {
		position: 'relative',
		overflow: 'hidden',
	},
	
	// leftBlockEnter: {
	// 	opacity: 0,
	// },
	// leftBlockExit: {
	// 	opacity: 1,
	// },
	// leftBlockEnterActive: {
	// 	opacity: 1,
	// },
	// leftBlockExitActive: {
	// 	opacity: 0,
	// },
	// leftBlockEnterActive,
	// leftBlockExitActive: {
	// 	transition: opacity 1000ms,
	// }
})