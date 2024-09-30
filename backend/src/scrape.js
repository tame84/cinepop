import { default as a } from 'axios';
import { JSDOM } from 'jsdom';

const axios = a.create({
    baseURL: 'https://www.cinenews.be',
});

let moviesLinksGlobal = new Set();

// à faire : récupérer les horaires par jour par cinéma
export default async function scrapeMovies() {
    const response = await axios.get('/fr/cinema/programme/region/brabant-wallon/');
    const document = new JSDOM(response.data).window.document;

    const moviesLinks = await getMoviesLinks(document);

    const movies = [];

    for (const link of moviesLinks) {
        try {
            const response = await axios.get(link);
            const document = new JSDOM(response.data).window.document;

            const detailsContainer = document.querySelector('[data-tabup="infos"]');
            const castingContainer = document.querySelector('[data-tabup="casting"]');
            const synopsisContainer = document.querySelector('[data-tabup="synopsis"]');

            const title = document.querySelector('.title').textContent.trim();
            const { duration, genre, director, releaseDate, originalLanguage, country } = getDetails(detailsContainer);
            const casting = getCasting(castingContainer);
            const synopsis = synopsisContainer.querySelector('.synopsis').textContent.trim();

            movies.push({
                title,
                duration,
                genre,
                director,
                releaseDate,
                originalLanguage,
                country,
                casting,
                synopsis,
            });
        } catch (error) {
            console.log('Scraping Error : `scrape.js` l46');
        }
    }

    console.log(movies);
}

/**
 * @param {Document} document
 */
const getMoviesLinks = async (document) => {
    const moviesList = document.querySelector('.movies-list').querySelectorAll('article');

    moviesList.forEach((movie) => {
        const link = movie.querySelector('h3').querySelector('a').href;
        if (!moviesLinksGlobal.has(link)) {
            moviesLinksGlobal.add(link);
        }
    });

    await getNextMovies(document);

    return moviesLinksGlobal;
};

/**
 * @param {Document} document
 */
const getNextMovies = async (document) => {
    const pageButton = document.querySelector('.t-r').querySelectorAll('a.btn')[1];

    if (!pageButton.className.includes('btn-disabled')) {
        const response = await axios.get(`/fr/cinema/programme/region/brabant-wallon/${pageButton.href}`);
        const document = new JSDOM(response.data).window.document;

        await getMoviesLinks(document);
    }
};

/**
 * @param {HTMLElement} detailsContainer
 */
const getDetails = (detailsContainer) => {
    const detailsElement = detailsContainer.querySelector('.mobile-block').querySelectorAll('div');

    const details = {
        duration: null,
        genre: null,
        director: null,
        releaseDate: null,
        originalLanguage: null,
        country: null,
    };

    detailsElement.forEach((detail) => {
        const span = Array.from(detail.querySelectorAll('span'));
        const detailNameContainer = span[0];
        const detailValueContainer = span[1];

        if (detailNameContainer.textContent.trim().toLowerCase().includes('durée')) {
            details.duration = detailValueContainer.textContent.split(' ')[0].trim();
        } else if (detailNameContainer.textContent.trim().toLowerCase().includes('genre')) {
            details.genre = detailValueContainer.textContent.trim();
        } else if (detailNameContainer.textContent.trim().toLowerCase().includes('réalisé par')) {
            const directors = detailValueContainer.textContent.trim().split('\n');
            if (directors.length > 1) {
                details.director = [directors[0].trim(), directors[1].split('& ')[1].trim()];
            } else {
                details.director = [detailValueContainer.textContent.trim()];
            }
        } else if (detailNameContainer.textContent.trim().toLowerCase().includes('date de sortie')) {
            const date = detailValueContainer.querySelector('[itemprop="datePublished"]').textContent;
            details.releaseDate = date.trim();
        } else if (detailNameContainer.textContent.trim().toLowerCase().includes('langue originale')) {
            details.originalLanguage = detailValueContainer.textContent.trim();
        } else if (detailNameContainer.textContent.trim().toLowerCase().includes('pays')) {
            details.country = detailValueContainer.textContent.split('(')[0].trim();
        }
    });

    return details;
};

/**
 * @param {HTMLElement} castingContainer
 */
const getCasting = (castingContainer) => {
    if (!castingContainer) {
        return null;
    }

    const castingElement = castingContainer.querySelector('.grid.pt-3').querySelectorAll('b');

    const casting = [];

    castingElement.forEach((actor) => {
        casting.push(actor.textContent.trim());
    });

    return casting;
};
