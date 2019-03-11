require('dotenv').config();
const { ENV, DOMAIN, CINEMETA } = process.env;
const manifest = require("./manifest");
const request = require('request');
const randomWords = require('random-words');
const { addonBuilder } = require("stremio-addon-sdk");

const builder = new addonBuilder(manifest);
const catalog = manifest.catalogs[0];

builder.defineCatalogHandler(async ({ type, id, extra }) => {
	if (ENV === 'dev') console.log("CATALOG:", id, type, extra);
	const { genre } = extra;

	let metas = [];
	if (id === catalog.id && type && genre)  {
		if (genre === catalog.genres[1]) {
			metas = await getRandomItem(type);
		} else if (genre === catalog.genres[2]) {
			const items = await getRandomItem(type, 21);
			metas = items.map(item => {
				return toMisteryMeta(item);
			})
		} else {
			metas = await getRandomItem(type, 30);
		}
	}
	
	return Promise.resolve({ metas: metas });
})

async function getRandomItem(type, nb = 1) {
	return Promise.all(randomWords(nb).map(async word => {
		const search = await searchByName(type, word);
		return search[randInt(0, search.length)];
	}));
}

function searchByName(type, name) {
	return new Promise(resolve => {
		request(`${CINEMETA}/catalog/${type}/top/search=${encodeURIComponent(name)}.json`, (err, res, body) => {
			if (err) resolve(null);
			resolve(JSON.parse(body).metas);
		});
	});
}

function toMisteryMeta(meta) {
	const { id, imdb_id, type } = meta || {};
	return {
		id: imdb_id || id,
		type: type,
		name: 'Open to reveal',
		poster: `${DOMAIN}/static/mystery.png`
	};
}

function randInt(f, t) {
	return Math.floor(Math.random() * t + f);
}

module.exports = builder.getInterface();