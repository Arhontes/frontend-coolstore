export const getStoreLocal = (name: string) => {
	const localStorage = window.localStorage

	if (typeof localStorage !== 'undefined') {
		const ls = localStorage.getItem(name)
		return ls ? JSON.parse(ls) : null
	}
	return null
}
