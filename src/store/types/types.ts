export type ListType = {
	id: number;
	title: string;
	order: number;
}

export type ListProps = {
	list: ListType;
	tasks?: TaskType[] | TaskType;
}

export type TaskType = {
	id: number;
	title: string;
	parentListId: number;
}
