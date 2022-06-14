export const sortByName = <T extends { name: string }>(arr: T[]): T[] => {
	return [...arr]?.sort((a, b) =>
		a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
	);
};

export const searchByName = <T extends { name: string; id: number }>(
	arr: T[],
	searchQuery: string,
): number[] => {
	return arr
		.filter((item) => {
			return item?.name?.toLowerCase().includes(searchQuery.toLowerCase());
		})
		.map((item) => item.id);
};
