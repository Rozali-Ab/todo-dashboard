export type ColumnType = {
	id: string;
	title: string;
	order: number;
}

export type TaskType = {
	id: string;
	title: string;
	parentColumnId: string;
	order: number;
}
