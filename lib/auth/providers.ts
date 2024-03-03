import { supabaseBrowser } from '../supabase/browser';

export const signInWithGithub = async () => {
	const supabase = supabaseBrowser();
	const { error } = await supabase.auth.signInWithOAuth({
		provider: 'github',
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
