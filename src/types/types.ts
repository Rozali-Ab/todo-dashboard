export type ColumnType = {
	id: string;
	title: string;
	order: string;
}

export type TaskType = {
	id: string;
	title: string;
	parentColumnId: string;
	order: string;
	isDone: boolean;
}

export type UserType = {
	id: string;
	username?: string;
	email: string;
	password: string;
	tasks: TaskType[];
	columns: ColumnType[];
}
