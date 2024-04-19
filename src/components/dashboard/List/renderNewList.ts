import {ListType} from '../../../store/types/types.ts';
import {List} from './List.ts';

export const renderNewList = (list: ListType) => {
	const dashboard = document.querySelector('#dashboard');

	dashboard?.insertAdjacentHTML('beforeend', List({list}));
};
