const bossNames = ['Taloc', 'MOTHER', "Zek'voz", 'Fetid Devourer', 'Vectis', 'Zul', 'Mythrax', "G'huun"];

type DataSet = {
    name: string;
    data: any[]
}

export function doThing(data: any) {
    let datas: DataSet[] = [];

    bossNames.forEach(bossName => {
        const goodData = data.filter((ranking: any) => {
            return ranking.encounterName == bossName && ranking.difficulty == 4;
        }).sort(function (a: any, b: any) {
            return a.startTime - b.startTime;
        }).map((ranking: any) => {
            console.log(ranking);
            return {
                x: ranking.startTime,
                y: ranking.percentile
            }
        })

        datas.push({
            name: bossName,
            data: goodData
        });
    });
    return datas;
}
