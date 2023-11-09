import { createContext } from 'react';
import { TFullStop, TMedia, TPulkovo } from '../types';
import { pulkovoSubtypes, rightContentTypes } from './constants';

export type TContextStop = TFullStop & { time: number };

export type TContextRoute = {
	icon: string;
	color: string;
	fontColor: string;
	name: string;
};

export type TContextMedia = TMedia & { type: string };

export type TLeftContext = {
	route: TContextRoute;
	speed: number;
	temperature: number;
	currStop: TFullStop | undefined;
	stops: TContextStop[];
};

export type TRightContext = {
	media: TContextMedia;
	pulkovo: TPulkovo;
	type: 'media' | 'pulkovo';
};

export const RouteInitState = {
	icon: '',
	color: '',
	fontColor: '',
	name: '',
};

export const LeftInitState = {
	route: RouteInitState,
	speed: 0,
	temperature: 0,
	currStop: undefined,
	stops: [],
};

export const MediaInitState = {
	src: '',
	label: '',
	length: 0,
	type: '',
};

export const PulkovoInitState = {
	subtype: pulkovoSubtypes.ARRIVAL,
	duration: 0,
	color: '',
	contents: [],
	src: '',
};

export const RightInitState = {
	media: MediaInitState,
	pulkovo: PulkovoInitState,
	type: rightContentTypes.media,
};

export const LeftContext = createContext<TLeftContext>(LeftInitState);
export const RightContext = createContext<TRightContext>(RightInitState);
