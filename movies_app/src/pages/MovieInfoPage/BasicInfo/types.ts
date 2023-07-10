export type MovieInfoType = {
    title: string;
    year: number;
    runtime: number;
    director: string;
    genres: { id: string, genreName: string }[];
};
