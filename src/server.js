#!/usr/bin/env node
require('dotenv').config();
const { PORT } = process.env;
const { serveHTTP } = require("stremio-addon-sdk")
const addonInterface = require('./addon')
serveHTTP(addonInterface, { port: PORT, static: '/static' })
