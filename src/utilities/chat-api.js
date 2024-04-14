import sendRequest from './send-request';
const BASE_URL = '/api/chat';

export function getMessages(chatId) {
    return sendRequest(`${BASE_URL}/${chatId}`);
}

export function getUserChats() {
    return sendRequest(`${BASE_URL}/user`);
}

export function createChat(chatInfo) {
    return sendRequest(`${BASE_URL}`, "POST", chatInfo);
}

export function addMessage(chatId, chatInfo) {
    return sendRequest(`${BASE_URL}/${chatId}/message`, "POST", chatInfo);
}