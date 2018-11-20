import { CharacterRanking } from "./data/CharacterRanking";

const bossNames = [
  "Taloc",
  "MOTHER",
  "Zek'voz",
  "Fetid Devourer",
  "Vectis",
  "Zul",
  "Mythrax",
  "G'huun"
];

export function buildRankingForEachBoss(data: any) {
  return bossNames.map(bossName => {
    return data
      .filter((ranking: CharacterRanking) => {
        return ranking.encounterName == bossName && ranking.difficulty == 4;
      })
      .sort(function(a: CharacterRanking, b: CharacterRanking) {
        return a.percentile > b.percentile;
      })
      .map((ranking: CharacterRanking) => {
        return ranking;
      });
  });
}
