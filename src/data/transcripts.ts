export interface Transcript {
  year: number;
  title: string;
  label: string;
  viewUrl: string;
  downloadUrl: string;
}

const makeUrls = (id: string) => ({
  viewUrl: `https://drive.google.com/file/d/${id}/view`,
  downloadUrl: `https://drive.usercontent.google.com/u/0/uc?id=${id}&export=download`,
});

export const transcripts: Transcript[] = [
  {
    year: 2023,
    title: "BSc in Computing — Stage 2",
    label: "Year 2 Transcript",
    ...makeUrls("1n1SINUdy8EDz0_0bL-uYoVy9eQIiVcNF"),
  },
  {
    year: 2024,
    title: "BSc Computer Science — Software Development",
    label: "Year 3 Transcript",
    ...makeUrls("1HKvUkcNMkJ_1XF438dfNJvHOkUnxq_9y"),
  },
  {
    year: 2025,
    title: "BSc (Hons) Computing in Cloud Computing",
    label: "Honours Transcript",
    ...makeUrls("1CxvIhBSTedeEFiU-pupYORTKKkhisRSX"),
  },
  {
    year: 2025,
    title: "European Diploma Supplement",
    label: "Diploma Supplement",
    ...makeUrls("1BZz6BoMlbnmkDFjLBuKH_dVEh148av72"),
  },
];
