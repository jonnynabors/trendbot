import api from 'weasel.js';
import axios from 'axios';

api.setApiKey('060713a86c4adbe17419655e7dd6026d');

export async function getRankingsForCharacter(name: string) {
    let response = await axios.get(`http://localhost:8081/${name}`);
    return response.data;
}