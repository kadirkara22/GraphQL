export const Query = {
    // Country
    countries: (_, __, { countries }) =>
        Object.entries(countries).map(([code, country]) => ({
            ...country,
            code,
        })),

    country: (_, { code }, { countries }) => {
        return { ...countries[code], code };
    },

    // Continent
    continents: (_, __, { continents }) =>
        Object.entries(continents).map(([code, name]) => ({
            code,
            name,
        })),

    continent: (_, { code }, { continents }) => {
        const name = continents[code];
        return { code, name };
    },

    // Language
    languages: (_, __, { languages }) => {
        return Object.entries(languages).map(([code, language]) => {
            let rtl = false;
            if (language.rtl) rtl = true;
            return {
                ...language,
                code,
                rtl,
            };
        });
    },
    language: (_, { code }, { languages }) => {
        const language = languages[code];
        let rtl = false;
        if (language.rtl) rtl = true;
        return { ...language, code, rtl };
    },
};