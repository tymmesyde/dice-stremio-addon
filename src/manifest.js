require('dotenv').config()
const { version } = require('../package.json')
const { DOMAIN } = process.env

module.exports = {
    "id": "community.diceaddon",
    "version": version,
    "name": "Dice",
    "description": "Roll a dice and get random movies or series from the Stremio catalog.",
    "logo": `${DOMAIN}/static/dice.png`,
    "background": `${DOMAIN}/static/background.png`,
    "contactEmail": "tymmesyde@gmail.com",
    "resources": [
        "catalog"
    ],
    "types": [
        "movie",
        "series"
    ],
    "catalogs": [
        {
            "type": "movie",
            "name": "Random",
            "id": "random",
            "extraRequired": [
                "genre"
            ],
            "extraSupported": [
                "genre"
            ],
            "genres": [
                "Default",
                "Only one",
                "Mystery"
            ]
        },
        {
            "type": "series",
            "name": "Random",
            "id": "random",
            "extraRequired": [
                "genre"
            ],
            "extraSupported": [
                "genre"
            ],
            "genres": [
                "Default",
                "Only one",
                "Mystery"
            ]
        }
    ]
}