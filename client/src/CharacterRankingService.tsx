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
type DataSet = {
  name: string;
  data: any[];
};
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

export function buildParsesForEachBoss(data: CharacterRanking[]) {
  let datas: DataSet[] = [];
  bossNames.forEach(bossName => {
    const graphData = data
      .filter((ranking: CharacterRanking) => {
        return ranking.encounterName == bossName && ranking.difficulty == 4;
      })
      .sort(function(a: any, b: any) {
        return a.startTime - b.startTime;
      })
      .map((ranking: any) => {
        return {
          x: ranking.startTime,
          y: ranking.percentile
        };
      });

    datas.push({
      name: bossName,
      data: graphData
    });
  });
  return datas;
}
