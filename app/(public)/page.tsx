import { createClientServer } from '@/lib/supabase/server';

const gestTodos = async () => {
	const supabase = createClientServer();
	const { data } = await supabase.from('todos').select();
	return data;
};

export default async function Home() {
	const todos = await gestTodos();
	console.log('todos', todos);
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<h1>Mes todos</h1>
		</main>
	);
}
