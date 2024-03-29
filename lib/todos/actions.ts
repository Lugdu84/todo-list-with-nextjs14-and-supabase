'use server';

import { createActionServer } from '@/lib/supabase/actions';
import { Todo } from '@/types/todo';
import { revalidatePath } from 'next/cache';

export const addTodo = async (name: string) => {
	if (!name) {
		return {
			message: 'Le nom est requis',
		};
	}
	const supabase = createActionServer();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) return;
	const { error } = await supabase
		.from('todos')
		.insert([{ name, user_id: user.id }]);
	if (error) {
		return {
			message: error.message,
		};
	}
	revalidatePath('/');
};

export const deleteTodo = async (id: number) => {
	const supabase = createActionServer();
	const { error } = await supabase.from('todos').delete().match({ id });
	if (error) {
		return {
			message: error.message,
		};
	}
	revalidatePath('/');
};

export const checkTodo = async (todo: Todo) => {
	const supabase = createActionServer();
	const { error } = await supabase
		.from('todos')
		.update({ is_completed: !todo.is_completed })
		.match({ id: todo.id });
	if (error) {
		return {
			message: error.message,
		};
	}
	revalidatePath('/');
};
