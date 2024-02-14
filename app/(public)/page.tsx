import AddTodoForm from '@/components/add-todo-form';
import { getTodos } from '@/lib/todos/get';

export default async function Home() {
	const todos = await getTodos();
	return (
		<main className="flex min-h-screen flex-col items-center p-24">
			<h1>Mes todos</h1>
			<AddTodoForm />
			<div className="mt-4">
				{todos?.map((todo) => (
					<div key={todo.id}>{todo.name}</div>
				))}
			</div>
		</main>
	);
}
