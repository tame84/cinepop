import axios from 'axios';
import { JSDOM } from 'jsdom';

/**
 * @param {HTMLDivElement} infosElementsContainer
 */
const getInformations = (infosElementsContainer) => {
    let genre = null;
    let duration = null;
    let actors = null;
    let director = null;
    let synopsis = null;

    infosElementsContainer.forEach((p) => {
        const childrenArray = Array.from(p.children);
        childrenArray.map((span, index) => {
            if (span.textContent.startsWith('genre')) {
                const prevGenre = childrenArray[index + 1].textContent;
                genre = prevGenre.split(', ');
            } else if (span.textContent.startsWith('durée')) {
                const prevDuration = childrenArray[index + 1].textContent;
                const [hours, minutes] = prevDuration.toLowerCase().split('h');
                duration = Number(hours.replace('0', '')) * 60 + Number(minutes);
            } else if (span.textContent.startsWith('avec')) {
                const prevActors = childrenArray[index + 1].textContent;
                actors = prevActors.split(', ');
            } else if (span.textContent.startsWith('réalisteur')) {
                const prevDirector = childrenArray[index + 1].textContent;
                director = prevDirector.split(', ');
            } else if (span.textContent.startsWith('synopsis')) {
                synopsis = childrenArray[index + 1].textContent;
            }
        });
    });

    return { genre, duration, actors, director, synopsis };
};

/**
 * @param {HTMLDivElement} schedulesElementsContainer
 */
const getSchedules = (schedulesElementsContainer) => {
    const childrenContainer = schedulesElementsContainer.querySelectorAll('p')[1];
    const childrenArray = Array.from(childrenContainer.children);

    const dates = [];

    childrenArray.map((el) => {
        if (el.className.includes('bl_date')) {
            const dateObject = {
                date: null,
                hours: [],
            };

            const datePart = el.textContent.split(' ')[1];
            const currentYear = new Date().getFullYear();
            const date = new Date(`${datePart}/${currentYear}`.split('/').reverse().join('-'))
                .toISOString()
                .split('T')[0];

            dateObject.date = date;

            dates.push(dateObject);
        } else if (el.tagName === 'A') {
            const hour = el.querySelector('.color_info').textContent.split(' V')[0].toLowerCase();

            if (dates.length > 0) {
                dates[dates.length - 1].hours.push(hour);
            }
        }
    });

    const cleanDates = dates.filter((date) => date.hours.length > 0);

    return cleanDates;
};

const SITE_URL = 'https://www.cineswellington.com/';

export default async function fetchWellington() {
    const pageHTML = (await axios.get(SITE_URL)).data;
    const document = new JSDOM(pageHTML).window.document;

    const linksContainer = document.querySelectorAll('#upgrille');
    const links = [];

    linksContainer.forEach((el) => {
        const link = el.querySelector('a').href;
        links.push(link);
    });

    const movies = [];

    for (const link of links) {
        const movieHTML = (await axios.get(`${SITE_URL}${link}`)).data;
        const document = new JSDOM(movieHTML).window.document;

        const title = document.querySelector('h3').textContent;
        const schedulesContainer = document.querySelector('.col-md-4');
        const schedules = getSchedules(schedulesContainer);
        const infosContainer = document.querySelector('.col-md-6').querySelectorAll('p');
        const { genre, duration, actors, director, synopsis } = getInformations(infosContainer);

        const movieFormated = {
            title,
            duration,
            schedules: schedules,
            genre: JSON.stringify(genre),
            actors: JSON.stringify(actors),
            director: JSON.stringify(director),
            synopsis: synopsis,
            cinemaId: 1,
        };

        movies.push(movieFormated);
    }

    return movies;
}
