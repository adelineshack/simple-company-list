import cn from 'classnames';
import React, { FC } from 'react';

import style from './Input.module.scss';
import { Props } from './types';

export const Input: FC<Props> = ({
	className,
	onChange,
	value,
	placeholder = '',
	type,
	name,
}) => {
	const onChangeProxy = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (onChange) {
			onChange(e.currentTarget.value);
		}
	};

	return (
		<input
			className={cn(className, style.component)}
			onChange={onChangeProxy}
			placeholder={placeholder}
			value={value}
			type={type}
			name={name}
		/>
	);
};
