export const Country = {
    continent: ({ continent }, __, { continents }) => ({
        code: continent,
        name: continents[continent],
    }),
    languages: ({ languages: langs }, __, { languages }) =>
        langs.map((code) => {
            const language = languages[code];
            let rtl = false;
            if (language.rtl) rtl = true;
            return {
                ...language,
                code,
                rtl,
            };
        }),
};