# Changelog

## [4.1.0](https://github.com/meyfa/ka-mensa-fetch/compare/v4.0.4...v4.1.0) (2025-11-03)


### Features

* Enable TS option verbatimModuleSyntax ([#297](https://github.com/meyfa/ka-mensa-fetch/issues/297)) ([c96e951](https://github.com/meyfa/ka-mensa-fetch/commit/c96e951d6abd885c1e27946dbf7476c50bb9a03b))


### Bug Fixes

* Consolidate fetchMensa function type ([#288](https://github.com/meyfa/ka-mensa-fetch/issues/288)) ([bfa5e8f](https://github.com/meyfa/ka-mensa-fetch/commit/bfa5e8f57127c3d724afe707d6571f3d7f92cece))
* **deps:** update dependency axios to v1.8.2 [security] ([#301](https://github.com/meyfa/ka-mensa-fetch/issues/301)) ([c2306d2](https://github.com/meyfa/ka-mensa-fetch/commit/c2306d20a4cb884e9a3b5db3b8067bb575f00695))
* Improve code style for upcoming ESLint config update ([#286](https://github.com/meyfa/ka-mensa-fetch/issues/286)) ([2462834](https://github.com/meyfa/ka-mensa-fetch/commit/24628349e7e3e48e62885689dbafc5678bb074e7))

## [4.0.4](https://github.com/meyfa/ka-mensa-fetch/compare/v4.0.3...v4.0.4) (2024-08-14)


### Bug Fixes

* **deps:** update dependency axios to v1.7.4 [security] ([#275](https://github.com/meyfa/ka-mensa-fetch/issues/275)) ([1cc7297](https://github.com/meyfa/ka-mensa-fetch/commit/1cc729795b1275d34ba38bb97f00f4a2683c06ba))

## [4.0.3](https://github.com/meyfa/ka-mensa-fetch/compare/v4.0.2...v4.0.3) (2024-07-01)


### Bug Fixes

* Do not rely on .article-div ([#262](https://github.com/meyfa/ka-mensa-fetch/issues/262)) ([8ec5533](https://github.com/meyfa/ka-mensa-fetch/commit/8ec5533a06ff2b686c3b0f58767a9ac24446da9e))

## [4.0.2](https://github.com/meyfa/ka-mensa-fetch/compare/v4.0.1...v4.0.2) (2023-11-17)


### Bug Fixes

* Bump axios dependency range ([#230](https://github.com/meyfa/ka-mensa-fetch/issues/230)) ([4e90575](https://github.com/meyfa/ka-mensa-fetch/commit/4e905752ee782d121ab97f75cd41647483a5eed8))

## [4.0.1](https://github.com/meyfa/ka-mensa-fetch/compare/v4.0.0...v4.0.1) (2023-07-23)


### Miscellaneous Chores

* Publish with provenance ([#201](https://github.com/meyfa/ka-mensa-fetch/issues/201)) ([292f592](https://github.com/meyfa/ka-mensa-fetch/commit/292f5927db6b9d6da7265059176602903c3603e6))

## [4.0.0](https://github.com/meyfa/ka-mensa-fetch/compare/v3.2.0...v4.0.0) (2023-07-18)


### ⚠ BREAKING CHANGES

* Drop support for Node.js older than v18.16.1 ([#198](https://github.com/meyfa/ka-mensa-fetch/issues/198))

### Bug Fixes

* **deps:** Bump dependencies ([#200](https://github.com/meyfa/ka-mensa-fetch/issues/200)) ([50e38ae](https://github.com/meyfa/ka-mensa-fetch/commit/50e38aebbdf305c564c90045bc0c515246505d13))
* **deps:** update dependency axios to v1 ([#139](https://github.com/meyfa/ka-mensa-fetch/issues/139)) ([d46252d](https://github.com/meyfa/ka-mensa-fetch/commit/d46252df00279f1cc5f224777e01ab6c3c7e6fbe))
* Export types with "export type" for clarity ([#197](https://github.com/meyfa/ka-mensa-fetch/issues/197)) ([efb96e6](https://github.com/meyfa/ka-mensa-fetch/commit/efb96e6e2f5d883faf5bb4c625c9bf290cee71d3))
* Use non-deprecated Cheerio load function ([#162](https://github.com/meyfa/ka-mensa-fetch/issues/162)) ([5081869](https://github.com/meyfa/ka-mensa-fetch/commit/5081869e798140d869b9ad873c9cbba91428d041))


### Miscellaneous Chores

* Drop support for Node.js older than v18.16.1 ([#198](https://github.com/meyfa/ka-mensa-fetch/issues/198)) ([81d6da3](https://github.com/meyfa/ka-mensa-fetch/commit/81d6da3870bb0d78da16fb859a166bb249d6d463))

## [3.2.0](https://github.com/meyfa/ka-mensa-fetch/compare/v3.1.0...v3.2.0) (2022-09-01)


### Features

* Export matchCanteenByName() and matchLineByName() ([#129](https://github.com/meyfa/ka-mensa-fetch/issues/129)) ([bc624ac](https://github.com/meyfa/ka-mensa-fetch/commit/bc624acb53837cdde5e17dbdce66d218bb4c7da5))

## [3.1.0](https://github.com/meyfa/ka-mensa-fetch/compare/v3.0.2...v3.1.0) (2022-08-31)


### Features

* **data:** Update canteen and line names ([#125](https://github.com/meyfa/ka-mensa-fetch/issues/125)) ([e3c40bc](https://github.com/meyfa/ka-mensa-fetch/commit/e3c40bc87d425c1e31f5b20b326a7220ec50582f))
* Perform line name matching case-insensitively ([#123](https://github.com/meyfa/ka-mensa-fetch/issues/123)) ([e856efd](https://github.com/meyfa/ka-mensa-fetch/commit/e856efd8d953a8051ee4ae3ca599db6b54232648))

## [3.0.2](https://github.com/meyfa/ka-mensa-fetch/compare/v3.0.1...v3.0.2) (2022-06-18)

### Bug Fixes

* **jsonapi:** Update endpoint URLs to fix infinite redirect errors ([#97](https://github.com/meyfa/ka-mensa-fetch/issues/97)) ([7d598c2](https://github.com/meyfa/ka-mensa-fetch/commit/7d598c28b40fa7c1b28cc97675230c89cad0fe31))
* **simplesite:** Update URL and page structure after SW-KA redesign ([#99](https://github.com/meyfa/ka-mensa-fetch/issues/99)) ([fccb07b](https://github.com/meyfa/ka-mensa-fetch/commit/fccb07b4a221fc19edd625ce6529109bbeef82fc))


## [3.0.1](https://github.com/meyfa/ka-mensa-fetch/compare/v3.0.0...v3.0.1) (2022-06-16)

### Bug Fixes

* **deps:** update dependency axios to ^0.27.0 ([#84](https://github.com/meyfa/ka-mensa-fetch/issues/84)) ([847cca8](https://github.com/meyfa/ka-mensa-fetch/commit/847cca8a7bf4fa7df7d0ca89ca3160dbf1f068fd))


## [3.0.0](https://github.com/meyfa/ka-mensa-fetch/compare/v2.1.5...v3.0.0) (2022-04-22)

### What's Changed

**Breaking changes**

* feat: Convert everything to ESM ([#79](https://github.com/meyfa/ka-mensa-fetch/pull/79))
* feat: Declare 'canteens' and 'legend' dataset directly in TypeScript ([#80](https://github.com/meyfa/ka-mensa-fetch/pull/80))
* feat(data): Move alt. name "Vegane Linie" to l2 in ([#78](https://github.com/meyfa/ka-mensa-fetch/pull/78))

Additionally:

* Configure Renovate ([#27](https://github.com/meyfa/ka-mensa-fetch/pull/27))
* fix(deps): update dependency axios to ^0.26.0 ([#52](https://github.com/meyfa/ka-mensa-fetch/pull/52))
* test: Add test case covering remainder of simplesite-parse ([#57](https://github.com/meyfa/ka-mensa-fetch/pull/57))
* lots and lots of dev dependency updates and some improvements to CI workflows
* simplified packaging


## [2.1.5](https://github.com/meyfa/ka-mensa-fetch/compare/v2.1.4...v2.1.5) (2021-12-08)

### What's Changed
* feat(data): Add alt. name "Vegane Linie" for schnitzelbar ([#26](https://github.com/meyfa/ka-mensa-fetch/pull/26))


## [2.1.4](https://github.com/meyfa/ka-mensa-fetch/compare/v2.1.3...v2.1.4) (2021-11-29)

### What's Changed
* chore(ci): Add "tsc --noEmit" to lint script ([#23](https://github.com/meyfa/ka-mensa-fetch/pull/23))
* feat(data): Add alt. name "Cafeteria 11-14 Uhr To-Go" ([#24](https://github.com/meyfa/ka-mensa-fetch/pull/24)
* feat(data): Switch "Cafeteria 11-14 Uhr" and "To-Go" variant ([#25](https://github.com/meyfa/ka-mensa-fetch/pull/25))


## [2.1.3](https://github.com/meyfa/ka-mensa-fetch/compare/v2.1.2...v2.1.3) (2021-11-22)

### What's Changed
* feat(data): Add names "Linie 2 Gut & Günstig", "Linie 5 Vegane Linie" ([#22](https://github.com/meyfa/ka-mensa-fetch/pull/22))


## [2.1.2](https://github.com/meyfa/ka-mensa-fetch/compare/v2.1.1...v2.1.2) (2021-11-16)

### What's Changed
* chore(test): Replace ts-mocha with ts-node ([#20](https://github.com/meyfa/ka-mensa-fetch/pull/20))
* feat(data): Add multiple current line names ([#21](https://github.com/meyfa/ka-mensa-fetch/pull/21))


## [2.1.1](https://github.com/meyfa/ka-mensa-fetch/compare/v2.1.0...v2.1.1) (2021-11-16)

### What's Changed
* feat(data): Add alt. name "Schnitzel-Burger-Bar" ([#19](https://github.com/meyfa/ka-mensa-fetch/pull/19))


## [2.1.0](https://github.com/meyfa/ka-mensa-fetch/compare/v2.0.1...v2.1.0) (2021-10-14)

### What's Changed
* chore: Update dependencies ([#14](https://github.com/meyfa/ka-mensa-fetch/pull/14))
* chore: Remove types from JSDoc comments in favor of TypeScript ([#15](https://github.com/meyfa/ka-mensa-fetch/pull/15))
* feat(data): Add alt. name "Linie 2 vegane Linie" ([#16](https://github.com/meyfa/ka-mensa-fetch/pull/16))
* feat(data): Add line l5 and add alt. name "Linie 4" for l45 ([#17](https://github.com/meyfa/ka-mensa-fetch/pull/17))
* chore: Update dependencies and fix Axios-related code ([#18](https://github.com/meyfa/ka-mensa-fetch/pull/18))


## [2.0.1](https://github.com/meyfa/ka-mensa-fetch/compare/v2.0.0...v2.0.1) (2021-08-15)

* Add alternative line name "Linie 1 BOOK A MENSA" ([#13](https://github.com/meyfa/ka-mensa-fetch/pull/13))


## [2.0.0](https://github.com/meyfa/ka-mensa-fetch/compare/v1.3.1...v2.0.0) (2021-07-07)

This is effectively a maintenance, but with a breaking change in how the library is imported.
**There is no more default export.**

You need to do the following:

```js
import { fetchMensa } from 'ka-mensa-fetch'
// or for non-transpiled JavaScript:
const { fetchMensa } = require('ka-mensa-fetch')
```

Additionally, `fetchSessionCookie` is now exported by name as well:

```js
import { fetchSessionCookie } from 'ka-mensa-fetch'
// or for non-transpiled JavaScript:
const { fetchSessionCookie } = require('ka-mensa-fetch')
```

**TypeScript typings for every relevant interface/class are included.**
See README.md for a list of all the types.


## [1.3.1](https://github.com/meyfa/ka-mensa-fetch/compare/v1.3.0...v1.3.1) (2021-06-12)

* Add alternative line name "Linie 2 BOOK A MENSA" ([ff9fab8](https://github.com/meyfa/ka-mensa-fetch/commit/ff9fab8eca1f9250def61989cab99abaf9e1c0cc))


## [1.3.0](https://github.com/meyfa/ka-mensa-fetch/compare/v1.2.2...v1.3.0) (2021-06-12)

This release marks the switch to TypeScript.


## [1.2.2](https://github.com/meyfa/ka-mensa-fetch/compare/v1.2.1...v1.2.2) (2021-02-26)

* Update dependencies ([02fb9d0](https://github.com/meyfa/ka-mensa-fetch/commit/02fb9d0bf2b3a12c51aec750b56732f0b77a9c2f), [2228776](https://github.com/meyfa/ka-mensa-fetch/commit/222877658f668ce4c6ff7328a1c1eef5cd65e53d))
* Add test case for plans with invalid dates ([dbe6c4c](https://github.com/meyfa/ka-mensa-fetch/commit/dbe6c4c5835bb5fd95fed686a18c1808979bf73b))


## [1.2.1](https://github.com/meyfa/ka-mensa-fetch/compare/v1.2.0...v1.2.1) (2020-11-11)

* Add alternative name "Linie 1 To-Go" ([87597c3](https://github.com/meyfa/ka-mensa-fetch/commit/87597c382e4c738d2568faeb59ac72b2f9e16cad))


## [1.2.0](https://github.com/meyfa/ka-mensa-fetch/compare/v1.1.3...v1.2.0) (2020-10-25)

* **Use 'simplesite' descriptor instead of 'handicap'** ([084cc9a](https://github.com/meyfa/ka-mensa-fetch/commit/084cc9acc6feb41bbb79971e0e95fa0e6d06f3d9))
  - Please switch! The new terminology is meant to be more inclusive.
  - For now, 'handicap' still works, but is **deprecated** and will be removed in a major release.
* Fix `isDateSupported` operand order and reduce range ([64916ea](https://github.com/meyfa/ka-mensa-fetch/commit/64916eae563316d4dd5eca9ec57ab3d3fae295b3))
* Minor refactors ([64bb9a9](https://github.com/meyfa/ka-mensa-fetch/commit/64bb9a9e3a7c1bf8611e5cc1f8246e064169c4a6), [1fa2764](https://github.com/meyfa/ka-mensa-fetch/commit/1fa27641ab490ca95aef61fd3e7e8608eb2a77e9), [86d344c](https://github.com/meyfa/ka-mensa-fetch/commit/86d344c9434618446eeb6c42c65bd48beb0785e2))
* More unit tests, including for request modules ([21fc7c7](https://github.com/meyfa/ka-mensa-fetch/commit/21fc7c7c79b407f8a4d26da643039eed6c898bfb), [e3a121f](https://github.com/meyfa/ka-mensa-fetch/commit/e3a121f1632371689ef718549039aec4b9271a47), [86d344c](https://github.com/meyfa/ka-mensa-fetch/commit/86d344c9434618446eeb6c42c65bd48beb0785e2))
* Dependency updates ([1c6102f](https://github.com/meyfa/ka-mensa-fetch/commit/1c6102f2e9e96cc90fc8d44678bd644c0146bba3))


## [1.1.3](https://github.com/meyfa/ka-mensa-fetch/compare/v1.1.2...v1.1.3) (2020-10-19)

* Add alternative name "Linie 4/5 G&G-Gerichte To-Go" ([eedffd2](https://github.com/meyfa/ka-mensa-fetch/commit/eedffd2e4239d064cac75984334b6aaf29826aaa))
* Add alternative name "[pizza]werk Pizza 11-14 Uhr To-Go" ([eedffd2](https://github.com/meyfa/ka-mensa-fetch/commit/eedffd2e4239d064cac75984334b6aaf29826aaa))


## [1.1.2](https://github.com/meyfa/ka-mensa-fetch/compare/v1.1.1...v1.1.2) (2020-10-07)

* Add alternative name "[pizza]werk Pizza 11:30-13:30 Uhr To-Go" ([04f90a9](https://github.com/meyfa/ka-mensa-fetch/commit/04f90a9e15782ae95f18aaf3274e965ef5ba7195))
* Update dependencies ([1c65e63](https://github.com/meyfa/ka-mensa-fetch/commit/1c65e632312d9880aa08f795c62b463c7b6efadf))


## [1.1.1](https://github.com/meyfa/ka-mensa-fetch/compare/v1.1.0...v1.1.1) (2020-10-05)

* Add alternative name "[pizza]werk Pizza 11:30-14:30 Uhr To-Go" ([ba06b24](https://github.com/meyfa/ka-mensa-fetch/commit/ba06b246fb12a4f29ad31ca07738d129cb51059c))
* Misc. refactoring ([e74355c](https://github.com/meyfa/ka-mensa-fetch/commit/e74355c0a574448bae870746965abc84cb9013a9), [57c79db](https://github.com/meyfa/ka-mensa-fetch/commit/57c79db41c54ca87e4d004b7b356a7ae24de80e6))


## [1.1.0](https://github.com/meyfa/ka-mensa-fetch/compare/v1.0.0...v1.1.0) (2020-09-11)

* Add option for request parallelization ([b5861cf](https://github.com/meyfa/ka-mensa-fetch/commit/b5861cfe1a8d198e5a6f1970416624a74f8fae75))
* Retrieve up-to-date canteen+line names from JSON API (#2) ([795f34c](https://github.com/meyfa/ka-mensa-fetch/commit/795f34c0104ac3c27b796932d43de5a7e5ab8981))
* Fix wrongly transcribed short properties in `legend.json` ([8f6eade](https://github.com/meyfa/ka-mensa-fetch/commit/8f6eade3a08462cc449d02fef6ebbfc42dc771d6))
* Add more alternative line names ([ba99451](https://github.com/meyfa/ka-mensa-fetch/commit/ba994511f87135725ecbe688ad91ff50ab3ab075))
* Fix semicolon error in README.md examples ([08a94c7](https://github.com/meyfa/ka-mensa-fetch/commit/08a94c7e925f3e0f0428418fcc7daf8ba8aa3e65))


## [1.0.0](https://github.com/meyfa/ka-mensa-fetch/compare/v0.5.3...v1.0.0) (2020-09-02)

* Implement parser & request modules for JSON API ([419fe80](https://github.com/meyfa/ka-mensa-fetch/commit/419fe8092528fb6d0b3d1ff0cb2045c5dd0d2f72), [404b844](https://github.com/meyfa/ka-mensa-fetch/commit/404b8441bdbb7309cb24885d6978bfee531ac759), [fedf42b](https://github.com/meyfa/ka-mensa-fetch/commit/fedf42bd8674f86ccc5f4908514534fa89987577), [c50dfd0](https://github.com/meyfa/ka-mensa-fetch/commit/c50dfd02bfbcea08c9d18b47c7fdf3cc3ba14e17))
* Add 'source' option to main module for request/parser selection ([7c68dd8](https://github.com/meyfa/ka-mensa-fetch/commit/7c68dd88ef515c93b45a4549d17732753526768a))
* Increase resilience to fake headlines in handicap-parse ([a4cdb35](https://github.com/meyfa/ka-mensa-fetch/commit/a4cdb35b84f7e33b83942d0d24dcc6572b6e4ce0))
* Add unit tests for handicap-parse module ([bc81f47](https://github.com/meyfa/ka-mensa-fetch/commit/bc81f471cfde9d074bbe0f7b2deeb8cd36cc587d), [664c6f7](https://github.com/meyfa/ka-mensa-fetch/commit/664c6f75542eff5e0f5cadf088b50bc183cfe32a), [427417b](https://github.com/meyfa/ka-mensa-fetch/commit/427417b3b5112546ad694a276ea0dcaac9bd2f9f))
* Add reference parameter to handicap-parse ([e9f8de1](https://github.com/meyfa/ka-mensa-fetch/commit/e9f8de157b9c85ae4e545ddbd79d77dc478ca305))
* Use cheerio map function to compact parsing ([cb6d3e4](https://github.com/meyfa/ka-mensa-fetch/commit/cb6d3e46d99f993c96a8b6b610cd6240571d8e89))
* Update dependencies ([326a29e](https://github.com/meyfa/ka-mensa-fetch/commit/326a29ecaf7bf8ade8339946b3d82352d1d6d232), [1ac07ca](https://github.com/meyfa/ka-mensa-fetch/commit/1ac07ca098056fc18503dd79fd5846ce39dc5486), [567d998](https://github.com/meyfa/ka-mensa-fetch/commit/567d998ddcf1281521ac848c958a939918b9419f))
* Update README.md ([26ae2e2](https://github.com/meyfa/ka-mensa-fetch/commit/26ae2e244d48e4259f0e7c3a9a48964cc146ac46))


## [0.5.3](https://github.com/meyfa/ka-mensa-fetch/compare/v0.5.2...v0.5.3) (2020-06-30)

* Update dependencies ([969cb99](https://github.com/meyfa/ka-mensa-fetch/commit/969cb99f03a05e24c970f65079003a17864ec071), [24a2dbf](https://github.com/meyfa/ka-mensa-fetch/commit/24a2dbf705835b7020d6d599de4c7bfbc592a782))
* Build on Node 14 instead of 13 ([37c9b58](https://github.com/meyfa/ka-mensa-fetch/commit/37c9b5876f270ef0baae10008423156846cff2c7))
* Update JSON files to use 2 space indentation ([324a799](https://github.com/meyfa/ka-mensa-fetch/commit/324a7995e2ad207adcf3df91b0dcdc90d81535cf))
* Fix datestamp parsing for June/July border ([97d71a5](https://github.com/meyfa/ka-mensa-fetch/commit/97d71a5f0c629a6dbf47511d30f0fe8920d51a55), [9fe885b](https://github.com/meyfa/ka-mensa-fetch/commit/9fe885b7f774f51a15f665cbfc9cbfeb38383f0d))


## [0.5.2](https://github.com/meyfa/ka-mensa-fetch/compare/v0.5.1...v0.5.2) (2020-05-24)

* Add alternative name "[kœri]werk 11-14:30 Uhr" ([550c2f9](https://github.com/meyfa/ka-mensa-fetch/commit/550c2f951d36c2463e005156bb3810420f0db7df))


## [0.5.1](https://github.com/meyfa/ka-mensa-fetch/compare/v0.5.0...v0.5.1) (2020-05-17)

* Add alternative name "[kœri]werk 11-14 Uhr" ([35e4abc](https://github.com/meyfa/ka-mensa-fetch/commit/35e4abc07ca8d5bf4a43ecc98ee1b3e519493a3d))


## [0.5.0](https://github.com/meyfa/ka-mensa-fetch/compare/v0.4.0...v0.5.0) (2020-05-06)

* Add resolution for alternative names ([5a12f8c](https://github.com/meyfa/ka-mensa-fetch/commit/5a12f8c01aa7a3ac50b1b034bc7316033694d605))


## [0.4.0](https://github.com/meyfa/ka-mensa-fetch/compare/v0.3.3...v0.4.0) (2020-05-06)

* Update dependencies ([5dfc9e5](https://github.com/meyfa/ka-mensa-fetch/commit/5dfc9e55d8d6f4327e82e0f167e2c84853ea3fff))
* Improve README.md ([2b0921c](https://github.com/meyfa/ka-mensa-fetch/commit/2b0921c031e9170cffa564a446eba1ab7ce3699b))
* Implement session cookie support ([7284a61](https://github.com/meyfa/ka-mensa-fetch/commit/7284a61ed83b755fefb8b407768c6149e64b1ec6))


## [0.3.3](https://github.com/meyfa/ka-mensa-fetch/compare/v0.3.2...v0.3.3) (2020-03-19)

* Update dependencies ([992ca17](https://github.com/meyfa/ka-mensa-fetch/commit/992ca176bb6a76cc3381656deb7825d067a54ac7))
* Use JS standard style with ESLint ([26c01e0](https://github.com/meyfa/ka-mensa-fetch/commit/26c01e05b3d17668db22afe7198c1f09e976cbe9))


## [0.3.2](https://github.com/meyfa/ka-mensa-fetch/compare/v0.3.1...v0.3.2) (2020-03-19)

* Add check for date validity in parser ([9cbc59f](https://github.com/meyfa/ka-mensa-fetch/commit/9cbc59f925ccf76701b9b190b0380abf98876919))


## [0.3.1](https://github.com/meyfa/ka-mensa-fetch/compare/v0.3.0...v0.3.1) (2020-01-28)

* Fix `REQUEST_MAX_LENGTH` too small ([acc6373](https://github.com/meyfa/ka-mensa-fetch/commit/acc637375bf0fafcdbc735ab910e427f2a4f8297))


## [0.3.0](https://github.com/meyfa/ka-mensa-fetch/compare/v0.2.1...v0.3.0) (2020-01-26)

* Drop Node 8 support; update dependencies ([25692bf](https://github.com/meyfa/ka-mensa-fetch/commit/25692bff730dc6a1710f89fcef71aa243c320a5b))
* Implement request timeout, max response size ([694cbe5](https://github.com/meyfa/ka-mensa-fetch/commit/694cbe5c67df20271f0d3da564be4892bd997cf5))
* Support not passing options parameter ([e52d7dc](https://github.com/meyfa/ka-mensa-fetch/commit/e52d7dcb7a7a3e36fe41358ab923c6ac487c12a6))


## [0.2.1](https://github.com/meyfa/ka-mensa-fetch/compare/v0.2.0...v0.2.1) (2019-12-30)

* Fix nyc mistakenly added as core dependency; add .npmignore ([e15295b](https://github.com/meyfa/ka-mensa-fetch/commit/e15295b489b507bc2d0ca8f8c846e2261c0feb75))


## [0.2.0](https://github.com/meyfa/ka-mensa-fetch/compare/v0.1.1...v0.2.0) (2019-12-30)

**Breaking**

* Use 0-indexed months; add plausibility check ([c0cef48](https://github.com/meyfa/ka-mensa-fetch/commit/c0cef48c44679455c38f660310039893a841a4f8))

**Style**

* Split handicap-parse into testable modules ([c9163d5](https://github.com/meyfa/ka-mensa-fetch/commit/c9163d56d45dd9bc74412ab2e3b644ea76da622f), [b6828f1](https://github.com/meyfa/ka-mensa-fetch/commit/b6828f16a115cb3721307258e01dad19a14602ed))
* Improve handicap-parse input error handling ([efc9ca6](https://github.com/meyfa/ka-mensa-fetch/commit/efc9ca66b7a6ec0afcd168c153731076389d9937))

**Misc**

* Setup CodeClimate (coverage, maintainability) ([13b3c51](https://github.com/meyfa/ka-mensa-fetch/commit/13b3c5155f4053bed86340220ceea4c674ff511d))


## [0.1.1](https://github.com/meyfa/ka-mensa-fetch/compare/v0.1.0...v0.1.1) (2019-12-27)

* Improve year deduction ([ca96f2e](https://github.com/meyfa/ka-mensa-fetch/commit/ca96f2e7df7dfe839f2a3c554da6bdba16092881))


## [0.1.0](https://github.com/meyfa/ka-mensa-fetch/compare/f38dada04a6254be69c16790386e6d6cac02cf0b...v0.1.0) (2019-12-01)

Initial release, supporting "handicap view" data source and basic date/canteen querying capabilities. Also has packaged `canteens.json` and `legend.json` files.
