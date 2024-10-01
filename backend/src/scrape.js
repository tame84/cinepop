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
            const schedulesContainer = document.querySelector('[data-tabup="showtimes"]');
            const posterContainer = document.querySelector('.g-picture');

            const title = document.querySelector('.title').textContent.trim();
            const poster = getPoster(posterContainer);

            const { duration, genre, director, releaseDate, originalLanguage, country } = getDetails(detailsContainer);
            const casting = getCasting(castingContainer);
            const synopsis = synopsisContainer.querySelector('.synopsis').textContent.trim();
            const schedules = await getSchedules(document, schedulesContainer);

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
                schedules,
                poster,
            });
        } catch (error) {
            console.log('Scraping Error : `scrape.js`', link);
        }
    }

    return movies;
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
            const duration = detailValueContainer.textContent.split(' ')[0].trim();
            details.duration = Number(duration);
        } else if (detailNameContainer.textContent.trim().toLowerCase().includes('genre')) {
            details.genre = detailValueContainer.textContent.trim();
        } else if (detailNameContainer.textContent.trim().toLowerCase().includes('réalisé par')) {
            const directors = detailValueContainer.textContent.trim().split('\n');
            if (directors.length > 1) {
                details.director = JSON.stringify([directors[0].trim(), directors[1].split('& ')[1].trim()]);
            } else {
                details.director = JSON.stringify([detailValueContainer.textContent.trim()]);
            }
        } else if (detailNameContainer.textContent.trim().toLowerCase().includes('date de sortie')) {
            const date = detailValueContainer.querySelector('[itemprop="datePublished"]').textContent.trim();
            details.releaseDate = new Date(date);
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

    return JSON.stringify(casting);
};

/**
 * @param {Document} document
 * @param {HTMLElement} schedulesContainer
 * Gérer le cas où il n'y a pas d'horaire pour la journée + fetch les autres jours
 */
const getSchedules = async (document, schedulesContainer) => {
    const dateSelector = schedulesContainer.querySelector('select').querySelectorAll('option');
    const backgroundStyle = document.querySelector('.background').children[0].style.backgroundImage;
    const dates = [];

    dateSelector.forEach((date) => {
        dates.push(date.value);
    });

    const match = backgroundStyle.match(/movies(\d+)\//);

    if (match && match[1]) {
        const movieId = match[1];
        const schedules = [];

        for (const date of dates) {
            const daySchedules = {
                date: new Date(date),
                schedules: [],
            };

            const response = await axios.get(
                `/modules/ajax_showtimes.cfm?Lang=fr&act=movieShowtimes&moviesId=${movieId}&v3&regionId=3&selDate=${date}`
            );

            if (response.data.data.length > 0) {
                const schedulesData = response.data.data[0].data;

                schedulesData.map((cinema) => {
                    const cinemaSchedules = cinema.data;
                    const showtimesByCinema = {
                        cinema: cinema.YellowName,
                        hours: [],
                    };

                    cinemaSchedules.map((showtime) => {
                        showtimesByCinema.hours.push({ hour: showtime.hour, languageVersion: showtime.mVersion });
                    });

                    daySchedules.schedules.push(showtimesByCinema);
                });

                schedules.push(daySchedules);
            }

            daySchedules.schedules = JSON.stringify(daySchedules.schedules);
        }

        return schedules;
    }
};

/**
 * @param {HTMLElement} posterContainer
 */
const getPoster = (posterContainer) => {
    const img = posterContainer.querySelector('img');
    const attributes = {
        url: img.dataset.src,
        alt: img.alt,
    };

    return JSON.stringify(attributes);
};
