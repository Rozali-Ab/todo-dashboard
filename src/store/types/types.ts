export type ListType = {
	id: number;
	title: string;
	order: number;
}

export type TaskType = {
	id: number;
	title: string;
	parentListId: number;
}
