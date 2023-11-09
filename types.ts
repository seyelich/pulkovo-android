export type TSpeed = {
	speed: number;
};

export type TTransfer = {
	icons: string[];
	nameRus?: string;
	nameEng?: string;
};

export type TPoi = {
	icon: string;
	name: string;
};

export type TRoute = {
	icon: string;
	color: string;
	fontColor: string;
	stops: TFullStop[];
};

export type TFullStop = {
	index: number;
	iconsBefore: string[];
	nameRus: string;
	nameEng: string;
	iconsAfter: string[];
	transfers: TTransfer[];
	poi: TPoi[];
};

export type TStop = {
	index: number;
	time: number;
};

export type TStopTimes = {
	stops: TStop[];
};

export type TStopStart = {
	index: number;
};

export type TMedia = {
	src?: string;
	label: string;
	length?: number;
	header?: string;
	text?: string;
	url?: string;
	format?: string;
};

export type TTemp = {
	temperature: number;
};

export type TFlight = {
	time: string;
	direction: string;
	flightNumber: string;
	status: string;
	airline: string;
	aircraftType: string;
	counters?: string;
};

export type TPulkovoSubtype = 'DEPARTURE' | 'ARRIVAL' | 'COUNTERS';

export type TPulkovo = {
	subtype: TPulkovoSubtype;
	duration: number;
	color: string;
	contents?: TFlight[];
	src?: string;
};

export type TWsMessage = (
	| TStopTimes
	| TSpeed
	| TRoute
	| TStopStart
	| TMedia
	| TTemp
	| TPulkovo
) & {
	type: string;
};
