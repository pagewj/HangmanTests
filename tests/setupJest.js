global.fetch = require("jest-fetch-mock");

global.fetch.mockResponse(JSON.stringify({ word: "test" }));