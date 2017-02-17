const expect = require('chai');
const request = require('supertest');

describe('user model test', function(){
    let host = "localhost:8083";
    it('user register', function(done){
        request(host)
            .post('/user/register')
            .type('form')
            .send({ username: 'zhangsan' })
            .send({ password: '123456' })
            .send({ email: '123456@163.com' })
            .expect(200, done);
    });

    // it('user login', function(done){
    //     request(host)
    //         .post('/user/login')
    //         .type('form')
    //         .send({ username: 'zhangsan' })
    //         .send({ password: '123456' })
    //         .expect(200, done)
    // })

    // it('user findList', function(done){
    //     request(host)
    //         .get('/user/list')
    //         .expect(200, done);
    // })

});