import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiDom from 'chai-dom';
import jsdom from 'jsdom';
import dotenv from "dotenv";

chai.use(chaiHttp);
chai.use(chaiDom);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const should = chai.should();
const expect = chai.expect;

process.env.NODE_ENV = "testing"
dotenv.config({path: `.env-testing`});


// load app after env
import {app} from '../app';

describe('GET /', () => {
    it('should return index page', async () => {
        const response = await chai.request(app).get('/');
        response.should.have.status(200);

        const dom = new jsdom.JSDOM(response.text);
        expect(dom.window.document.body.innerHTML).contain("Create")
    });
});



