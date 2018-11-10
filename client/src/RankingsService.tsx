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

type DataSet = {
  name: string;
  data: any[];
};

export function doThing(data: any) {
  let datas: DataSet[] = [];

  return bossNames.map(bossName => {
    return data
      .filter((ranking: any) => {
        return ranking.encounterName == bossName && ranking.difficulty == 4;
      })
      .sort(function(a: any, b: any) {
        return a.percentile > b.percentile;
      })
      .map((ranking: any) => {
        return ranking
      });
  });
}
