
const app = require('../src/server');
const expect = require('chai').expect;
const should = require('chai').should();
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp)
var agent = chai.request.agent(app);


function checkStatusOfPage(page, statusCode) {
    return agent
        .get(page)
        .then(function(res) {
            //console.log('Cookie', res.session)
            expect(res).to.have.status(statusCode);            
            // console.log(`page ${page}`+JSON.stringify(res, null, 4))
        }).catch(err => console.log(err));
}

describe('Page access', function() {
   /* it('Should deny all requests', async function() {
        let paths = ['/products/data'];
        return Promise.all(
            paths.map( page => {
                return checkStatusOfPage(page, 403);
            })
        );
    });*/

    it('Should allow all requests', async function() {
        let paths = ['/products/data', '/access', '/products', '/users', '/users/data', ];
        return agent.post('/login')
            .type('form')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                login: '@Katy',
                password: '1234'
            })
            .then(function(res) {
                //expect(res).to.have.cookie('sid');
                return Promise.all(
                    paths.map(  page => {
                        return checkStatusOfPage(page, 200);
                    })
                );
            });
    });

    /*it('check access page', async function(){
        let path = '/access';
        return agent
        .post('/login')
        .type('form')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({
            login: '@Katy',
            password: '1234'
        })
        .then(function(res){
            console.log(res.cookie)
            expect(res).to.have.cookie('sid');
        })

    })*/


});

