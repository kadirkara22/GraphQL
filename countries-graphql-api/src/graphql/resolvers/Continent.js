export const Continent = {
    countries: ({ code }, __, { countries }) =>
        Object.entries(countries)
            .filter((entry) => entry[1].continent === code)
            .map(([code, country]) => ({
                ...country,
                code,
            })),
};