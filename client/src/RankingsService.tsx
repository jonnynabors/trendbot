export function doThing(data: any) {
    // difficulties: 3 -> normal
    // difficulties: 5 -> mythic
    let dataSet = {
        name: 'Taloc',
        data: []
    }
    console.log(data);
    data
    .sort(function(a: any,b:any){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        // @ts-ignore
        return a.startTime - b.startTime;
      })
    .filter((encounter:any) => encounter.encounterName == 'Taloc')
    .filter((encounter:any) => encounter.difficulty == 4)
    .map((encounter: any) => {
        let thing = {
            x: encounter.startTime,
            y: encounter.percentile
        }
        // @ts-ignore
        dataSet.data.push(thing)
    });
    return dataSet;
}

const reducer = (nameIWant:string, currentName:string) => {
    return nameIWant==currentName;
}