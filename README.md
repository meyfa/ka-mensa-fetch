# ka-mensa-fetch

[![Build Status](https://travis-ci.com/meyfa/ka-mensa-fetch.svg?branch=master)](https://travis-ci.com/meyfa/ka-mensa-fetch)

`ka-mensa-fetch` is a NodeJS package that fetches the Karlsruhe Mensa (canteen)
meal plan. It supports all canteens operated by the Studierendenwerk.

This project is neither affiliated with nor endorsed by the Studierendenwerk
Karlsruhe or the Karlsruhe Institute of Technology.

If you see anything break, please feel free to open an issue!


## Usage

### Fetching a set of plans

You can call the fetcher as follows:

```js
const fetchMensa = require("ka-mensa-fetch");

let promise = fetchMensa(options);
promise.then(plans => console.log(plans));
```

or in an async context:

```js
const fetchMensa = require("ka-mensa-fetch");

(async () => {
    let plans = await fetchMensa(options);
    console.log(plans);
})();
```

**Options:**

- `String[] canteens`: Array of canteen ids for which plans are wanted.
  See `data/canteens.json` for possible values.
- `Object[] dates`:
  Array of date specifiers for which plans are wanted. They can have any one of
  the following forms (remember, JavaScript uses 0-indexed months):
  - `{ year: 2019, month: 11, day: 1 }`
  - `"2019-12-01"`
  - `new Date(2019, 11, 1)`
  - `1575158400`

**Return values:**

The return value is a `Promise` resolving to an array of plans.

*!!! WARNING !!! The result may contain all, some or none of the plans that were
requested. It may also contain additional or even completely different plans.
Handle with care.*

**Plan structure**:

- `String id`: canteen identifier (e.g. `"adenauerring"`)
- `String name`: canteen name (e.g. `"Mensa am Adenauerring"`), may be null
- `Object date`: plan date (e.g. `{ day: 2, month: 11, year: 2019 }`)
  (note: month is 0-indexed)
- `Object[] lines`: line array, containing objects of the following structure:
  - `String id`: line id (e.g. `"l1"`), may be null
  - `String name`: line name (e.g. `"Linie 1"`), may be null
  - `Object[] meals`: meal array, containing objects of the following structure:
    - `String name`: meal name (e.g. `"Käseknacker mit Ketchup und Pommes"`)
    - `String price`: human-readable price (e.g. `"2,60 €"`), may be empty
    - `String[] classifiers`: meal classifiers (e.g. `[ "SAT" ]`)
    - `String[] additives`: meal additives (e.g. `[ "2", "3", "ML" ]`)

<details>
  <summary>Code example</summary>

```js
fetchMensa({ canteens: ["adenauerring", "moltke"] })
```

Promise resolution value (shortened):

```js
[
    {
        "id": "adenauerring",
        "name": "Mensa Am Adenauerring",
        "date": { "day": 2, "month": 11, "year": 2019 },
        "lines": [
            {
                "id": "l1",
                "name": "Linie 1",
                "meals": [
                    {
                        "name": "Käseknacker mit Ketchup und Pommes",
                        "price": "2,60 €",
                        "classifiers": [ "SAT" ],
                        "additives": [ "2", "3", "ML" ]
                    },
                    //...
                ]
            },
            //...
        ]
    },
    {
        "id": "adenauerring",
        "name": "Mensa Am Adenauerring",
        "date": { "day": 3, "month": 11, "year": 2019 },
        "lines": [ /* ... */ ]
    },
    {
        "id": "adenauerring",
        "name": "Mensa Am Adenauerring",
        "date": { "day": 4, "month": 11, "year": 2019 },
        "lines": [ /* ... */ ]
    },
    {
        "id": "adenauerring",
        "name": "Mensa Am Adenauerring",
        "date": { "day": 5, "month": 11, "year": 2019 },
        "lines": [ /* ... */ ]
    },
    {
        "id": "adenauerring",
        "name": "Mensa Am Adenauerring",
        "date": { "day": 6, "month": 11, "year": 2019 },
        "lines": [ /* ... */ ]
    },
    {
        "id": "moltke",
        "name": "Mensa Moltke",
        "date": { "day": 2, "month": 11, "year": 2019 },
        "lines": [
            {
                "id": "wahl1",
                "name": "Wahlessen 1",
                "meals": [
                    {
                        "name": "Chicken Drum Sticks mit Sweet Chilli Soße",
                        "price": "2,50 €",
                        "classifiers": [],
                        "additives": [ "5", "Se", "We" ]
                    },
                    //...
                ]
            },
            //...
        ]
    },
    {
        "id": "moltke",
        "name": "Mensa Moltke",
        "date": { "day": 3, "month": 11, "year": 2019 },
        "lines": [ /* ... */ ]
    },
    {
        "id": "moltke",
        "name": "Mensa Moltke",
        "date": { "day": 4, "month": 11, "year": 2019 },
        "lines": [ /* ... */ ]
    },
    {
        "id": "moltke",
        "name": "Mensa Moltke",
        "date": { "day": 5, "month": 11, "year": 2019 },
        "lines": [ /* ... */ ]
    },
    {
        "id": "moltke",
        "name": "Mensa Moltke",
        "date": { "day": 6, "month": 11, "year": 2019 },
        "lines": [ /* ... */ ]
    }
]
```
</details>


### Caching

Because `ka-mensa-fetch` accesses sources not meant for automated processing,
it cannot know or limit the data that it receives. Even if only a single day's
plan is requested, a whole week or more might be obtained.

To be efficient, that data should not be thrown away but instead cached.
Imagine Monday was requested but Monday-Friday were received, then Tuesday will
already be available without making another request later.


## Packaged Data

`ka-mensa-fetch` includes some mappings to facilitate interaction with the
API.

### Canteens List

A list of canteens with their internal ids, display name, and lines. Every line
also has an id and a display name.

<details>
  <summary>Code example</summary>

```js
const canteens = require("ka-mensa-fetch/data/canteens.json");

console.log(canteens);
```

Output (shortened):

```js
[
    {
        "id": "adenauerring",
        "name": "Mensa Am Adenauerring",
        "lines": [
            { "id": "l1", "name": "Linie 1" },
            { "id": "l2", "name": "Linie 2" },
            //...
        }
    },
    //...
]
```

</details>

### Legend

A list of meal qualifiers / additives / warnings / etc.

<details>
  <summary>Code example</summary>

```js
const canteens = require("ka-mensa-fetch/data/canteens.json");
console.log(canteens);
```

Output (shortened):

```js
[
    { "short": "1", "label": "mit Farbstoff" },
    //...
    { "short": "VEG", "label": "vegetarisches Gericht" },
    { "short": "VG", "label": "veganes Gericht (ohne Fleischzusatz)" },
    //...
    { "short": "Er", "label": "Erdnüsse" },
    //...
]

```

</details>


## Data Sources

### sw-ka handicap view

This is the default (and so far, only) data source. The meal plan is extracted
from the HTML page. This is relatively reliable as long as there are no
structural changes.

The URL used is as follows:

```https://www.sw-ka.de/de/essen/?view=ok&STYLE=popup_plain&c=adenauerring&p=1&kw=49```

Here, `adenauerring` is the canteen id and `kw=49` indicates that the plan for
the 49th calendar week is requested (weeks _probably_ following ISO 8601).

Unfortunately, the `p` parameter representing price category (1 for students,
2 for guests, 3 for employees, 4 for school children) has no effect. This
appears to be a bug on the sw-ka site.
