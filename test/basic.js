const tape = require('tape')
const client = require('stremio-addon-client')
const { serveHTTP } = require("stremio-addon-sdk")
const addonInterface = require('../addon')

const PORT = 4651

let addonUrl
let addonServer
let addonClient

tape('it should serve the addon', (t) => {
    serveHTTP(addonInterface, { port: PORT }).then(h => {
        t.ok(h.url, 'has url')
        t.ok(h.url.endsWith('manifest.json'), 'url ends with manifest.json')
        t.ok(h.server, 'has h.server')

        addonUrl = h.url
        addonServer = h.server

        t.end()
    })
})

tape('it should be detected by client', (t) => {
    client.detectFromURL(addonUrl).then(res => {
        t.ok(res, 'has response')
        t.ok(res.addon, 'response has addon')
        t.equal(typeof res.addon, 'object', 'addon is a valid object')
        
        addonClient = res.addon

        t.end()
    })
})

tape('it should return nothing', (t) => {
    addonClient.get('catalog', 'movie', 'nothing').then(res => {
        t.ok(res, 'has response')
        t.equal(res.metas.length, 0, 'should be empty')
        t.end()
    })
})

tape('it should return metas movies', (t) => {
    addonClient.get('catalog', 'movie', 'random', 'genre=Default').then(res => {
        t.ok(res, 'has response')
        t.ok(res.metas, 'has metas')
        t.notEqual(res.metas.length, 0, 'length should be superior to 0')
        t.equal(res.metas[0].type, 'movie', 'should be a movie')
        t.end()
    })
})

tape('it should return only one meta movie', (t) => {
    addonClient.get('catalog', 'movie', 'random', 'genre=Only one').then(res => {
        t.ok(res, 'has response')
        t.ok(res.metas, 'has metas')
        t.equal(res.metas.length, 1, 'length should be equal to one')
        t.equal(res.metas[0].type, 'movie', 'should be a movie')
        t.end()
    })
})

tape('it should return mystery metas movies', (t) => {
    addonClient.get('catalog', 'movie', 'random', 'genre=Mystery').then(res => {
        t.ok(res, 'has response')
        t.ok(res.metas, 'has metas')
        t.notEqual(res.metas.length, 0, 'length should be superior to 0')
        t.equal(res.metas[0].type, 'movie', 'should be a movie')
        t.equal(res.metas[0].name, 'Open to reveal', 'should be a mystery meta')
        t.end()
    })
})

tape('it should return metas series', (t) => {
    addonClient.get('catalog', 'series', 'random', 'genre=Default').then(res => {
        t.ok(res, 'has response')
        t.ok(res.metas, 'has metas')
        t.notEqual(res.metas.length, 0, 'length should be superior to 0')
        t.equal(res.metas[0].type, 'series', 'should be a series')
        t.end()
    })
})

tape('it should return only one meta series', (t) => {
    addonClient.get('catalog', 'series', 'random', 'genre=Only one').then(res => {
        t.ok(res, 'has response')
        t.ok(res.metas, 'has metas')
        t.equal(res.metas.length, 1, 'length should be equal to one')
        t.equal(res.metas[0].type, 'series', 'should be a series')
        t.end()
    })
})

tape('it should return mystery metas series', (t) => {
    addonClient.get('catalog', 'series', 'random', 'genre=Mystery').then(res => {
        t.ok(res, 'has response')
        t.ok(res.metas, 'has metas')
        t.notEqual(res.metas.length, 0, 'length should be superior to 0')
        t.equal(res.metas[0].type, 'series', 'should be a series')
        t.equal(res.metas[0].name, 'Open to reveal', 'should be a mystery meta')
        t.end()
    })
})

tape.onFinish(() => {
    addonServer.close()
})