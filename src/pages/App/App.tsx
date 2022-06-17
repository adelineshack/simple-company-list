import { AddCompanyForm } from 'components/AddCompanyForm/AddCompanyForm';
import { CompanyItem } from 'components/CompanyItem/CompanyItem';
import { SearchCompanyForm } from 'components/SearchCompanyForm/SearchCompanyForm';
import { SortIcon } from 'icons';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Company } from 'types';
import { searchByName, sortByName } from 'utils';

import data from '../../data.json';
import style from './App.module.scss';

const companiesData = data.companies;

function App() {
	const [searchQuery, setSearchQuery] = useState('');
	const [fiterQuery, setFilterQuery] = useState<number[]>([]);
	const [companies, setCompanies] = useState<Company[]>();

	useEffect(() => {
		setCompanies(companiesData);
	}, [companiesData]);

	useEffect(() => {
		if (searchQuery && companies) {
			const filteredData = searchByName(companies, searchQuery);
			setFilterQuery(filteredData || []);
		} else {
			setFilterQuery([]);
		}
	}, [searchQuery]);

	const triggerSearch = useCallback((value: string) => {
		setSearchQuery(value);
	}, []);

	const deleteCompany = useCallback(
		(id: number) => {
			const filteredCompanies = companies?.filter((company) => company.id !== id);
			setCompanies(filteredCompanies);
		},
		[companies],
	);

	const handleSort = useCallback(() => {
		if (companies) {
			setCompanies(sortByName(companies));
		}
	}, [companies]);

	const handleSubmit = useCallback((addedCompany) => {
		setCompanies((state) => {
			if (state) {
				return [
					{
						id: new Date().getTime(),
						name: addedCompany,
					},
					...state,
				];
			}
		});
	}, []);

	const filteredCompanies = useMemo(
		() =>
			companies?.filter((company) => {
				if (searchQuery) {
					return fiterQuery.includes(company.id);
				} else return true;
			}),
		[companies, searchQuery, fiterQuery],
	);

	return (
		<div className={style.app}>
			<div className={style.container}>
				<header className={style.header}>
					<SearchCompanyForm
						placeholder="Search"
						triggerSearch={triggerSearch}
					/>

					<AddCompanyForm onSubmit={handleSubmit} placeholder="New company" />
				</header>

				<section className={style.content}>
					<section className={style.title}>
						<h2>Company name</h2>
						<button className={style.button} onClick={handleSort}>
							<SortIcon />
						</button>
					</section>
					{filteredCompanies?.length === 0 ? (
						<span>Nothing found</span>
					) : (
						filteredCompanies?.map((company) => (
							<CompanyItem
								key={company.id}
								onClick={() => deleteCompany(company.id)}
								company={company}
							/>
						))
					)}
				</section>
			</div>
		</div>
	);
}

export default memo(App);
