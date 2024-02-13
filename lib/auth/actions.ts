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
		return {
			message: error.message,
		};
	}
	redirect('/');
};

export const signUpWithPassword = async (data: FormData) => {
	const supabase = createActionServer();
	const { error } = await supabase.auth.signUp({
		email: data.get('email') as string,
		password: data.get('password') as string,
	});

	if (error) {
		return {
			message: error.message,
		};
	}
	redirect('/auth/confirmation');
};

export const signOut = async () => {
	const supabase = createActionServer();
	await supabase.auth.signOut();
	redirect('/auth');
};

export const sentResetPassword = async (email: string) => {
	const supabase = createActionServer();
	const { error } = await supabase.auth.resetPasswordForEmail(email);

	if (error) {
		return {
			message: error.message,
		};
	}
};

export const resetPassword = async (password: string) => {
	const supabase = createActionServer();
	const { error } = await supabase.auth.updateUser({
		password,
	});

	if (error) {
		return {
			message: error.message,
		};
	}
};

export const sendMagicLink = async (email: string) => {
	const supabase = createActionServer();
	const { error } = await supabase.auth.signInWithOtp({
		email,
		options: {
			shouldCreateUser: false,
		},
	});

	if (error) {
		return {
			message: error.message,
		};
	}
};
