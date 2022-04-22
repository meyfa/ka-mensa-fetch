# ka-mensa-fetch

[![CI](https://github.com/meyfa/ka-mensa-fetch/actions/workflows/main.yml/badge.svg)](https://github.com/meyfa/ka-mensa-fetch/actions/workflows/main.yml)
[![Test Coverage](https://api.codeclimate.com/v1/badges/68f45907f4ee7210c54f/test_coverage)](https://codeclimate.com/github/meyfa/ka-mensa-fetch/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/68f45907f4ee7210c54f/maintainability)](https://codeclimate.com/github/meyfa/ka-mensa-fetch/maintainability)


## Introduction

`ka-mensa-fetch` is one component in a three-part project whose goal it is to
aggregate, process and visualize the Studierendenwerk Karlsruhe's canteen plans
in ways superior to the official sources.

**Disclaimer:** This project is neither affiliated with nor endorsed by the
Studierendenwerk Karlsruhe or the Karlsruhe Institute of Technology.

The entire project is written in JavaScript+TypeScript and is composed as follows:

- [ka-mensa-fetch](https://github.com/meyfa/ka-mensa-fetch): library package
    responsible for the fetching of raw plan data and conversion into canonical,
    easily digestible JSON documents
- [ka-mensa-api](https://github.com/meyfa/ka-mensa-api): NodeJS server that
    utilizes the fetcher to continuously collect meal plans and makes them
    available via REST API
- [ka-mensa-ui](https://github.com/meyfa/ka-mensa-ui): single-page web app
    that loads meal plans from an API instance and displays them in a modern,
    responsive interface with filtering and color-coding capabilities


## Installation

`ka-mensa-fetch` has a package on the NPM registry.

Make sure Node and NPM are available on your system, then use
`npm i ka-mensa-fetch` to install it into your project's dependencies.
Please note that it is packaged as an ECMAScript module and is incompatible
with CommonJS.

TypeScript typings are available directly as part of the package.


## Usage

### Fetching a set of plans

You can call the fetcher as follows:

```js
import { fetchMensa } from 'ka-mensa-fetch'

const promise = fetchMensa(/* source, options */)
promise.then(plans => console.log(plans))
```

or in an async context:

```js
import { fetchMensa } from 'ka-mensa-fetch'

;(async () => {
  const plans = await fetchMensa(/* source, options */)
  console.log(plans)
})()
```

**Arguments:**

- `source: string`: The data source (optional). 
  Either `'simplesite'` (the default) or `'jsonapi'`.
- `options: object`: Fetcher options (optional).
  - `parallel: boolean`: Optional, default: `false`.
  Whether to run all network requests in parallel.
  This speeds the fetch up significantly, but also increases server-side load
  and should therefore be used sparingly.

Additional options for 'simplesite' source:

- `canteens: string[]`: Array of canteen ids for which plans are wanted.
  See `src/data/canteens.ts` for possible values.
- `dates: object[]`:
  Array of date specifiers for which plans are wanted. They can have any one of
  the following forms (remember, JavaScript uses 0-indexed months):
  - `{ year: 2019, month: 11, day: 1 }`
  - `'2019-12-01'`
  - `new Date(2019, 11, 1)`
  - `1575158400`
- `sessionCookie: string`:
  Optionally, a session cookie. Existence of the cookie could prevent redirects,
  see note below.

Additional options for 'jsonapi' source:

- **MANDATORY:**
  `auth: object = { user, password }`: Authentication information for the API.

**Return values:**

The return value is a `Promise` resolving to an array of plans.

*!!! WARNING !!! The result may contain all, some or none of the plans that were
requested. It may also contain additional or even completely different plans.
Handle with care.*

**Plan structure**:

- `id: string`: canteen identifier (e.g. `'adenauerring'`)
- `name: string`: canteen name (e.g. `'Mensa Am Adenauerring'`), may be null
- `date: object`: plan date (e.g. `{ day: 2, month: 11, year: 2019 }`)
  (note: month is 0-indexed)
- `lines: object[]`: line array, containing objects of the following structure:
  - `id: string`: line id (e.g. `'l1'`), may be null
  - `name: string`: line name (e.g. `'Linie 1'`), may be null
  - `meals: object[]`: meal array, containing objects of the following structure:
    - `name: string`: meal name (e.g. `'Käseknacker mit Ketchup und Pommes'`)
    - `price: string`: human-readable price (e.g. `'2,60 €'`), may be empty
    - `classifiers: string[]`: meal classifiers (e.g. `[ 'SAT' ]`)
    - `additives: string[]`: meal additives (e.g. `[ '2', '3', 'ML' ]`)

<details>
  <summary>Code example</summary>

```js
fetchMensa('simplesite', { canteens: ['adenauerring', 'moltke'] })
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


### TypeScript Types

This library includes strong typing for its objects.
The following types are available:

```ts
import {

  // types for canteen declarations (src/data/canteens.ts)
  Line,
  Canteen,

  // types for legend declaration (src/data/legend.ts)
  LegendItem,

  // types as they appear in fetch results
  // (plans contain lines, which contain meals)
  CanteenPlan,
  CanteenLine,
  CanteenMeal,
  
  // these types are used whenever dates are needed
  DateSpec,
  datelike,
  
  // types used for specifying fetcher options
  Options,
  SimpleSiteOptions,
  JsonApiOptions,
  AuthConfig

} from 'ka-mensa-fetch'
```


### Caching

Because `ka-mensa-fetch` accesses sources not meant for automated processing,
it cannot know or limit the data that it receives. Even if only a single day's
plan is requested, a whole week or more might be obtained.

To be efficient, that data should not be thrown away but instead cached.
Imagine Monday was requested but Monday-Friday were received, then Tuesday will
already be available without making another request later.

Implementing caching is the polite and resourceful thing to do.


### Avoiding redirects with session cookies

During the COVID-19 pandemic, the Studierendenwerk decided to redirect all
requests site-wide to a press release informing about their measures. Obviously,
this hinders data acquisition. The redirect can be averted though, by requesting
a session cookie first and providing it with future requests. This is
implemented in `ka-mensa-fetch`, to be used as follows:

```js
import { fetchMensa, requestSessionCookie } from 'ka-mensa-fetch'

;(async () => {
  const session = await requestSessionCookie()
  if (!session) {
    console.error('could not retrieve session cookie')
  }

  const plans = await fetchMensa('simplesite', {
    sessionCookie: session  // !!!
  })

  console.log(plans)
})()
```

Multiple requests can be made with the same session cookie. Its lifetime is
limited server-side, but I suspect it will be valid for at least 30 minutes.
It might be valid much longer.

Again, exercise resourcefulness — obtaining a cookie has the overhead of an
additional full request.

The JSON API source does not require a cookie to be set.


## Packaged Data

`ka-mensa-fetch` includes some mappings to facilitate interaction with the API.

### Canteens List

A list of canteens with their internal ids, display name, and lines. Every line
also has an id and a display name.

<details>
  <summary>Code example</summary>

```js
// need to enable JSON imports in TypeScript config
import { canteens } from 'ka-mensa-fetch'
console.log(canteens)
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
import { legend } from 'ka-mensa-fetch'
console.log(legend)
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

### sw-ka simple site (web view for the visually impaired)

This is the default data source. The meal plan is extracted from the HTML page.
This is relatively reliable as long as there are no structural changes.

The URL used is the following:

`https://www.sw-ka.de/de/essen/?view=ok&STYLE=popup_plain&c=adenauerring&p=1&kw=49`

Here, `adenauerring` is the canteen id and `kw=49` indicates that the plan for
the 49th calendar week is requested (weeks _probably_ following ISO 8601).

Unfortunately, the `p` parameter representing price category (1 for students,
2 for guests, 3 for employees, 4 for school children) has no effect. This
appears to be a bug on the sw-ka site.

### sw-ka JSON API

This source retrieves meal plans from the same API used by the official app.
It requires authentication, which is why it is not the default source.

Endpoints:

1. `https://www.sw-ka.de/json_interface/general/` - used for obtaining
  up-to-date canteen and line names
2. `https://www.sw-ka.de/json_interface/canteen/` - used for obtaining the meal
  plans

There are no (known) parameters. The API returns all data from the beginning of
the current week up to 2 weeks into the future, for all canteens.

Note that entries older than 1 day might be included, but they are always empty.
This library filters those entries out.


## Development

Contributions are welcome. Guidelines:

- By contributing, you agree to make your changes available under the MIT
    license of this project.
- Please write unit tests for as much code as possible.
    * To run: `npm test`
    * To create a coverage report: `npm run coverage`
- Make sure to adhere to JS standard style and proper usage of TypeScript.
    * Linter: `npm run lint`
    * Automatic fixing of most style issues: `npm run lint-fix`
