import { Input } from 'components/_ui/Input/Input';
import { useDebounce } from 'hooks/useDebounce';
import React, { FC, useCallback, useState } from 'react';

import { Props } from './types';

export const SearchCompanyForm: FC<Props> = ({ placeholder, triggerSearch }) => {
	const [value, setValue] = useState('');

	const triggerSearchDebounced = useDebounce(triggerSearch, 500);

	const onChange = useCallback((value: string) => {
		setValue(value);
		triggerSearchDebounced(value);
	}, []);

	const onSubmitProxi = useCallback(
		(e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			triggerSearch(value);
		},
		[value],
	);

	return (
		<form onSubmit={onSubmitProxi}>
			<Input
				type="text"
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				name="search_query"
			/>
		</form>
	);
};
