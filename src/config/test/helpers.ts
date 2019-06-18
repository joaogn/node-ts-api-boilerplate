import * as Chai from 'chai';
import * as td from 'testdouble';
import App from '../../api/api';
import supertest = require('supertest');

// code for the execution of the tests with mocha and chai, makes all necessary imports,
// used not to have to repeat these imports in the whole test code.

// the file mocha.opts, does the require of this file and sets up some more details necessary for the mocha.

const app = App;
const request = supertest;
const expect = Chai.expect;
const testDouble = td;

export { app, request, expect, testDouble };
