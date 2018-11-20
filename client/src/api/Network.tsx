import axios from "axios";
import { CharacterRanking } from "../data/CharacterRanking";

export async function getRankingsForCharacter(name: string) {
  let response = await axios.get(`http://localhost:8081/rankings/${name}`);
  return response.data as CharacterRanking[];
}

export async function getParsesForCharacter(name: string) {
  let response = await axios.get(`http://localhost:8081/parses/${name}`);
  return response.data as CharacterRanking[];
}
