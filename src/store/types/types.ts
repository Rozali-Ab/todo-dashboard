export type ColumnType = {
	id: number;
	title: string;
	order: number;
}

export type TaskType = {
	id: number;
	title: string;
	parentColumnId: number;
}
