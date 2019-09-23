let chai = require('chai');
let chaiHttp  = require('chai-http');
let expect = chai.expect;
chai.use(chaiHttp);

describe('Testing  my Rest Api', () => {
    it('should  return status 200 for /',function(done){
        chai
            .request('http://localhost:6500')
            .get('/')
            .then(function(res){
                expect(res).to.have.status(200);
                done();
            })
            .catch(function(err){
                throw(err)
            })
    });

    it('should  return status 400 for /checkQueryParams',function(done){
        chai
            .request('http://localhost:6500')
            .get('/checkQueryParams')
            .then(function(res){
                expect(res).to.have.status(400);
                done();
            })
            .catch(function(err){
                throw(err)
            })
    })
    it('should return the status 200 for /checkQueryParams?q=abc', function(done){
        chai
            .request('http://localhost:6500')
            .get('/checkQueryParams?q=abc')
            .then(function(res){
                expect(res).to.have.status(200);
                done();
            })
            .catch(function(err){
                throw(err);
            });
    });

    it('should return the status 400 for /checkParams', function(done){
        chai
            .request('http://localhost:6500')
            .get('/checkParams')
            .then(function(res){
                expect(res).to.have.status(400);
                done();
            })
            .catch(function(err){
                throw(err);
            });
    });

    it('should return the status 200 for /checkParams/a', function(done){
        chai
            .request('http://localhost:6500')
            .get('/checkParams/a')
            .then(function(res){
                expect(res).to.have.status(200);
                done();
            })
            .catch(function(err){
                throw(err);
            });
    });

    it('should return the status 400 for /getdata', function(done){
        chai
            .request('http://localhost:6500')
            .get('/getdata')
            .then(function(res){
                expect(res).to.have.status(400);
                done();
            })
            .catch(function(err){
                throw(err);
            });
    });

    it('should return the status 204 for /getdata/a', function(done){
        chai
            .request('http://localhost:6500')
            .get('/getdata/a')
            .then(function(res){
                expect(res).to.have.status(204);
                done();
            })
            .catch(function(err){
                throw(err);
            });
    });

    it('should return the status 200 for /getdata/5ab12612f36d2879268f284a', function(done){
        chai
            .request('http://localhost:6500')
            .get('/getdata/5ab12612f36d2879268f284a')
            .then(function(res){
                expect(res).to.have.status(200);
                done();
            })
            .catch(function(err){
                throw(err);
            });
    });

    it('should return the status 400 for /editdata', function(done){
        chai
            .request('http://localhost:6500')
            .get('/editdata')
            .then(function(res){
                expect(res).to.have.status(400);
                done();
            })
            .catch(function(err){
                throw(err);
            });
    });
    it('should return the status 400 for /editdata/5ab12612f36d2879268f284a', function(done){
        chai
            .request('http://localhost:6500')
            .get('/editdata/5ab12612f36d2879268f284a')
            .then(function(res){
                expect(res).to.have.status(400);
                done();
            })
            .catch(function(err){
                throw(err);
            });
    });

    it('should return the status 200 for /editdata/5ab12612f36d2879268f284a/blackpanther', function(done){
        chai
            .request('http://localhost:6500')
            .get('/editdata/5ab12612f36d2879268f284a/blackpanther')
            .then(function(res){
                expect(res).to.have.status(200);
                done();
            })
            .catch(function(err){
                throw(err);
            });
    });
    it('should return the status 500 for /getAll', function(done){
        chai
            .request('http://localhost:6500')
            .get('/getAll')
            .then(function(res){
                expect(res).to.have.status(500);
                done();
            })
            .catch(function(err){
                throw(err);
            });
    });

    it('should return the status 401 for /checkunauthorised', function(done){
        // please delete file authtoken in scratch folder and
        // before testing ths api
        
        chai
            .request('http://localhost:6500')
            .get('/checkunauthorised')
            .then(function(res){
                expect(res).to.have.status(401);
                done();
            })
            .catch(function(err){
                throw(err);
            });
    });

    it('should return the status 200 for /checkauthorised', function(done){
        // please create a file in scratch folder and
        // write some dummy text before testing ths api
        
        chai
            .request('http://localhost:6500')
            .get('/checkauthorised')
            .then(function(res){
                expect(res).to.have.status(200);
                done();
            })
            .catch(function(err){
                throw(err);
            });
    });
})