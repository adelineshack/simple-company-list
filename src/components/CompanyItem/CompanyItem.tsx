import { TrashIcon } from 'icons';
import React, { FC } from 'react';
import { Company } from 'types';

import style from './CompanyItem.module.scss';

declare type Props = {
	company: Company;
	onClick: () => void;
};

export const CompanyItem: FC<Props> = ({ company, onClick }) => {
	return (
		<div className={style.component} key={company.id}>
			<span>{company.name}</span>
			<button className={style.button} onClick={onClick}>
				<TrashIcon />
			</button>
		</div>
	);
};
