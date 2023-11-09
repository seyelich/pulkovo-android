import { useContext } from 'react';
import { RightContext } from '../utils/store';

export default function useRightContext() {
	return useContext(RightContext);
}
