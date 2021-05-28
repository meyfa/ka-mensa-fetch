'use strict'

/*
 * This file is used as an additional build step before publishing,
 * to adapt the package.json to be suitable for publishing from './dist'.
 */

const fs = require('fs')
const path = require('path')

const ORIGINAL_PACKAGE_JSON = path.join(__dirname, 'package.json')
const DIST_PACKAGE_JSON = path.join(__dirname, 'dist', 'package.json')

/**
 * Remove 'dist', '/dist' or './dist' prefix from a string, if it exists.
 *
 * @param {string} string The source string.
 * @returns {string} The string with prefix removed.
 */
function removeDistPrefix (string) {
  return string.replace(/^(\/|\.\/)?dist\//g, '')
}

/**
 * Copy over the package.json file from '/' to '/dist' and perform modifications
 * to enable publishing.
 */
function setupPackage () {
  const packageJsonString = fs.readFileSync(ORIGINAL_PACKAGE_JSON, 'utf-8')
  const packageJson = JSON.parse(packageJsonString)

  packageJson.main = removeDistPrefix(packageJson.main)
  if (typeof packageJson.types === 'string') {
    packageJson.types = removeDistPrefix(packageJson.types)
  }
  if (Array.isArray(packageJson.files)) {
    packageJson.files = packageJson.files.map(removeDistPrefix)
  }

  packageJson.scripts = {}

  fs.writeFileSync(DIST_PACKAGE_JSON, JSON.stringify(packageJson, null, 2))
}

setupPackage()
