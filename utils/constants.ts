import { WS_IP } from '@env'
import { Dimensions } from 'react-native'

export const socketUrl = `ws://${WS_IP}`

export const Colors = {
	red: '#ffcbcb',
	green: '#c9ffd5',
	blue: 'rgba(182, 229, 255, 1)',
	routeBlack: 'rgba(0, 0, 0, 1)',
	darkGrey: '#334743',
	darkGreyTime: 'rgba(64, 57, 57, 1)',
	lightGrey: '#d9d9d9',
	lightGreyBorder: '#D1D1D1',
	lightGreyBg: '#FCF9F9',
	purple: 'rgba(62, 58, 107, 1)',
}

export const Fonts = {
	ptRootUi: 'pt-root-ui',
	ptRootUi500: 'pt-root-ui-medium',
	ptRootUi600: 'pt-root-ui-bold',
}

export const deviceWidth = Dimensions.get('window').width
export const gap = deviceWidth >= 2782 ? 48 : 16
