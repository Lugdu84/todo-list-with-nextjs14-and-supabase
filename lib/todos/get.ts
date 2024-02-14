import { createClientServer } from '@/lib/supabase/server';

export const getTodos = async () => {
	const supabase = createClientServer();
	const { data } = await supabase.from('todos').select();
	return data;
};
