import * as SecureStore from 'expo-secure-store';
import { decode as atob } from 'base-64'

async function getToken() {
	const token = await SecureStore.getItemAsync('token');
	if (!token) return null;
	const payload = JSON.parse(atob(token.split('.')[1]));
	if (payload.exp < Date.now() / 1000) {
		await SecureStore.deleteItemAsync('token');
		return null;
	}
	return token;
}

export default async function sendRequest(url, method = 'GET', payload = null, payloadIsFormData = null) {
	const options = { method };
	if (payload) {
		options.headers = payloadIsFormData ? { "Content-Type": "multipart/form-data; " } : { 'Content-Type': 'application/json' };
		options.body = payloadIsFormData ? payload : JSON.stringify(payload);
	}

	const token = await getToken();
	if (token) {
		options.headers = options.headers || {};
		options.headers.Authorization = `Bearer ${token}`;
	}

	const res = await fetch(`${process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000'}${url}`, options);
	if (res.ok) return res.json();
	if (!res.ok) return "bad request"
	// throw new Error('Bad Request');
}