process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let models = require('../models/models');
let Menu = models.Menu;

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();


chai.use(chaiHttp);

describe('Menu', () => {
    beforeEach((done) => {
        Menu.remove({}, (err) => {
            done();
        });
    });

    describe('/GET menu', () => {
        it('it should GET all the menus', (done) => {
            chai.request(app)
                .get('/menu')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('/POST menu', () => {
       it('it should Create a new menu', (done) => {
           let menu = {
               rest: '2'
           }
           chai.request(app).post('/menu')
               .send(menu)
               .end((err, res) => {
                   res.should.have.status(200);
                   res.body.should.be.a('object');
                   res.body.should.have.property('content').eql(menu.content);
                   done();
               });
       });
    });

});
