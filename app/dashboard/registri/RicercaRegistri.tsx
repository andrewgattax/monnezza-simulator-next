"use client";
import React from 'react';
import InputFloating from '../../../components/InputFloating';
import IconB from '../../../components/IconB';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface RicercaRegistriProps {
	searchQuery?: string;
}

const handleSubmit = (event: React.FormEvent<HTMLFormElement>, router: AppRouterInstance) => {
	event.preventDefault();
	const formData = new FormData(event.currentTarget);
	const searchQuery = formData.get('regQuery');
	router.push(`/dashboard/registri?regQuery=${searchQuery}`);
};

const RicercaRegistri: React.FC<RicercaRegistriProps> = ({ searchQuery }) => {
	const router = useRouter();

	return (
		<form className='row g-2' onSubmit={(e) => handleSubmit(e, router)}>
			<div className='col'>
				<InputFloating type="text" label="Cerca" name="regQuery" defaultValue={searchQuery || ""} />
			</div>
			<div className='col-auto'>
				<button className="btn btn-outline-secondary h-100 px-4" type="submit">
					<IconB iconName="search" hasPadding={false} />
				</button>
			</div>
		</form>
	);
};

export default RicercaRegistri;