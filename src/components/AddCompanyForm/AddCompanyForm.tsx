import { Input } from 'components/_ui/Input/Input';
import React, { FC, useCallback, useState } from 'react';

import style from './AddCompanyForm.module.scss';
import { Props } from './types';

export const AddCompanyForm: FC<Props> = ({ onSubmit, placeholder }) => {
	const [value, setValue] = useState('');

	const onChange = useCallback((value: string) => {
		setValue(value);
	}, []);

	const onSubmitProxi = useCallback(
		(e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			onSubmit(value);
			setValue('');
		},
		[value],
	);

	return (
		<form className={style.component} onSubmit={onSubmitProxi}>
			<Input
				value={value}
				type="text"
				name="new_company"
				onChange={onChange}
				placeholder={placeholder}
				className={style.input}
			/>
			<button className={style.button}>+</button>
		</form>
	);
};
