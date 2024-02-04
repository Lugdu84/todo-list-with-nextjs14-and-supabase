'use server';

import { createActionServer } from '@/lib//supabase/actions';
import { redirect } from 'next/navigation';

export const signInWithPassword = async (data: FormData) => {
	const supabase = createActionServer();
	const { error } = await supabase.auth.signInWithPassword({
		email: data.get('email') as string,
		password: data.get('password') as string,
	});

	if (error) {
		throw error;
	}
	redirect('/');
};

export const signOut = async () => {
	const supabase = createActionServer();
	await supabase.auth.signOut();
	redirect('/auth');
};
