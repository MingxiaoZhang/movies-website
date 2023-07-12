export type MovieInfoType = {
    title: string;
    averageRating: number;
    year: number;
    runtime: number;
    director: string;
    genres: { id: string, genreName: string }[];
};
