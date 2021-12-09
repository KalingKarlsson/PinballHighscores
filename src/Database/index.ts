export interface HighscoreDetails {
  rank?: number | undefined;
  name: string;
  score: string;
  evidence?: File;
}

let content = "Hello Zip";
let data = new Blob([content], { type: "application/zip" });
let arrayOfBlob = new Array<Blob>();
arrayOfBlob.push(data);
let applicationZip = new File(arrayOfBlob, "Mock.zip");

export const dummyData: HighscoreDetails[] = [
  {
    name: "Anton",
    score: "1586000000",
  },
  {
    name: "Victor",
    score: "1100000000",
  },
  {
    name: "Iskandär",
    score: "1048000000",
  },
  {
    name: "Thomas",
    score: "1024000000",
  },
  {
    name: "Gustav",
    score: "940000000",
  },
];
