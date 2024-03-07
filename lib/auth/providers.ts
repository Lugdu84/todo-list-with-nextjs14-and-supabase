import { Provider } from '@supabase/supabase-js';
import { supabaseBrowser } from '../supabase/browser';

export const signInWithProvider = async (provider: Provider) => {
	const supabase = supabaseBrowser();
	const { error } = await supabase.auth.signInWithOAuth({
		provider,
		options: {
			redirectTo: `${window.origin}/api/auth/callback`,
		},
	});
	if (error) {
		return {
			message: error.message,
		};
	}
};
