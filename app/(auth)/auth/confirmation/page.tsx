import React from 'react';

export default function ConfirmationPage() {
	return (
		<div className="h-screen flex flex-col justify-center items-center">
			<h1 className="text-2xl">Confirmation de la création de votre compte</h1>
			<span className=" text-green-500 text-xl w-full md:w-2/3 lg:w-1/2 p-4 border rounded-lg shadow-xl mt-4">
				Votre compte a bien été créé. Cliquez sur le lien de confirmation dans
				votre boite mail pour activer votre compte et vous connecter.
			</span>
		</div>
	);
}
