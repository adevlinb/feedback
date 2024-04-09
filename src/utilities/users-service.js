import * as usersAPI from './users-api';
import * as SecureStore from 'expo-secure-store';
import { decode as atob, encode as btoa } from 'base-64'

export async function signUp(userData) {
	const token = await usersAPI.signUp(userData);
	return await SecureStore.setItemAsync('token', token);
}

export async function updateUserStorage(userData) {
	const token = await usersAPI.signUp(userData);
	await SecureStore.setItemAsync('token', token);
	return getUser();
}

export async function login(credentials) {
	const token = await usersAPI.login(credentials);
	await SecureStore.setItemAsync('token', token);
	return getUser();
}

export async function getToken() {
	const token = await SecureStore.getItemAsync('token');
	if (!token) return null;
	const payload = JSON.parse(atob(token.split('.')[1]));
	if (payload.exp < Date.now() / 1000) {
		await SecureStore.deleteItemAsync('token');
		return null;
	}

	return token;
}

export async function getUser() {
	const token = await getToken();
	return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

export async function logOut() {
	return await SecureStore.deleteItemAsync('token');
}
