import * as mocha from 'mocha';
import * as Chai from 'chai';
import * as td from 'testdouble';
const supertes = require('supertest');
import App from '../../api/api';
import supertest = require('supertest');



const app = App;
const request = supertest;
const expect = Chai.expect;
const testDouble = td;


export {app, request, expect, testDouble};



