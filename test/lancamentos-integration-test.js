const app = require('../server');
const request = require('supertest');
const chai = require('chai');  
const nock = require('nock');
import { DataMock } from './data-mock';
var expect = chai.expect; 
var urlRoot='http://localhost:5003';


describe('Routes: Users - Integration', () => {
    let dataMock = new DataMock();
  
     describe('When requesting list users on pagination', () => {
      const data = dataMock.obterLancamentos();

      beforeEach(async () => { 
        nock(urlRoot)
          .get('/users?since=135')
          .reply(200, { link: 'https://api.github.com/users?since=135', data: data});
      });

      it('Then this endpoint must return a list of GitHub users and the link for the next page', async () => {
    
        var response = await request(app).get('/api/users?since=135');
        
        var objeto = JSON.parse(response.text);
        
        expect(objeto.data.data).to.length.greaterThan(0);
        expect(objeto.data.link).to.not.empty;
      });
     });
});