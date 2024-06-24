import * as usersAPI from './users-api';
import * as SecureStore from 'expo-secure-store';
import { decode as atob } from 'base-64'

export async function signUp(userData) {
	const token = await usersAPI.signUp(userData);
	await SecureStore.setItemAsync('token', token);
	return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

export async function updateUser(userData) {
	const token = await usersAPI.updateProfile(userData);
	await SecureStore.setItemAsync('token', token);
	return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

export async function login(credentials) {
	const token = await usersAPI.login(credentials);
	console.log(token, "userToken")
	await SecureStore.setItemAsync('token', token);
	return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

export async function logOut() {
	return await SecureStore.deleteItemAsync('token');
}
