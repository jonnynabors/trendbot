import axios from 'axios';

export async function getRankingsForCharacter(name: string) {
    let response = await axios.get(`http://localhost:8081/rankings/${name}`);
    return response.data;
}