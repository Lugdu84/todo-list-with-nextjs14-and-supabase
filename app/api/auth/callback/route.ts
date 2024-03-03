import { NextResponse } from 'next/server';

import { createActionServer } from '@/lib/supabase/actions';

export async function GET(request: Request) {
	const { searchParams, origin } = new URL(request.url);
	const code = searchParams.get('code');
	// if "next" is in param, use it as the redirect URL
	const next = searchParams.get('next') ?? '/';

	if (code) {
		const supabase = createActionServer();
		const { error } = await supabase.auth.exchangeCodeForSession(code);
		if (!error) {
			return NextResponse.redirect(`${origin}${next}`);
		}
	}

	// return the user to an error page with instructions
	return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
