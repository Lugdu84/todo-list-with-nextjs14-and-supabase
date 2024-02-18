import AddTodoForm from '@/components/add-todo-form';
import TodoRow from '@/components/todow-row';
import { getTodos } from '@/lib/todos/get';

export default async function Home() {
	const todos = await getTodos();
	return (
		<main className="flex min-h-screen flex-col items-center p-24">
			<h1>Mes todos</h1>
			<AddTodoForm />
			<div className="mt-4 w-full md:w-2/3 lg:w-1/2">
				{todos?.map((todo) => (
					<TodoRow
						key={todo.id}
						todo={todo}
					/>
				))}
			</div>
		</main>
	);
}
