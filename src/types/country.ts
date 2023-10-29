export interface Country {
    name: {
        common: string,
    };
    capital: string[];
    flags: {
        alt: string,
        png: string,
    };
    population: number;
    region: string;
};