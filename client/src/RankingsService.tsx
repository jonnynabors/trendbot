import { Ranking } from "./data/Ranking";

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
      .filter((ranking: Ranking) => {
        return ranking.encounterName == bossName && ranking.difficulty == 4;
      })
      .sort(function(a: Ranking, b: Ranking) {
        return a.percentile > b.percentile;
      })
      .map((ranking: Ranking) => {
        return ranking
      });
  });
}
