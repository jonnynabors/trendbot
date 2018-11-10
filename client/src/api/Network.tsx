import axios from "axios";
import { Ranking } from "../data/Ranking";

export async function getRankingsForCharacter(name: string) {
  let response = await axios.get(`http://localhost:8081/rankings/${name}`);
  return response.data as Ranking;
}
