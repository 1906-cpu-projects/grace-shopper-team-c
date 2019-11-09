const app = require('supertest')(require('./server/index'));
const db = require('./scripts/seed');
const { expect } = require('chai');

// describe('Testing', ()=> {
//   it('true is true', ()=>{
//   })
// })

//     TO RUN TEST TYPE IN THE TERMINAL =>    npm run test:dev


describe('Grace Shopper tests', ()=>{
  let seed;
  beforeEach(async ()=> seed = await db.syncAndSeed());
  describe('Data Layer', ()=> {
    it('These are the products', ()=> {
      expect(seed.products.hammer.name).to.equal('Hammers');
      expect(seed.products.nails.name).to.equal('Nails');
      expect(seed.products.chairSet.name).to.equal('Chair Set');
      expect(seed.products.shovel.name).to.equal('Shovel');
      expect(seed.products.lawnMower.name).to.equal('Lawn Mower');
      expect(seed.products.wrench.name).to.equal('Wrench');
    });
    it('There are 5 Users', ()=> {
      expect(seed.users.billy.name).to.equal('Billy Hill');
      expect(seed.users.john.name).to.equal('John Ford');
      expect(seed.users.anna.name).to.equal('Anna Lane');
      expect(seed.users.may.name).to.equal('May Taylor');
      expect(seed.users.james.name).to.equal('James Romero');
    });
    it('There are 3 Orders that are completed', ()=>{
      expect(seed.orders.order1.complete).to.equal(true);
      expect(seed.orders.order2.complete).to.equal(true);
      expect(seed.orders.order3.complete).to.equal(true);
    });
    it('Our current quantity for the items in our orders are thus', ()=>{
      expect(seed.lineItems.item1.quantity).to.equal(6);
      expect(seed.lineItems.item2.quantity).to.equal(6);
      expect(seed.lineItems.item3.quantity).to.equal(16);
      expect(seed.lineItems.item4.quantity).to.equal(3);
    })
    it('An order belongs to a user', ()=>{
      expect(seed.orders.order1.userId).to.equal(seed.users.anna.id);
      expect(seed.orders.order2.userId).to.equal(seed.users.may.id);
      expect(seed.orders.order3.userId).to.equal(seed.users.john.id);
    });
    it('A LineItem belongs to an order', ()=>{
      expect(seed.lineItems.item1.orderId).to.equal(seed.users.order1.id);
      expect(seed.lineItems.item2.orderId).to.equal(seed.users.order2.id);
      expect(seed.lineItems.item3.orderId).to.equal(seed.users.order2.id);
      expect(seed.lineItems.item4.orderId).to.equal(seed.users.order3.id);
    });
  });
  describe('User validation', ()=>{
    it('name is required', ()=>{
      return User.create({})
        .then(()=> {throw 'ERROR!!!'})
        .catch(ex => expect(ex.errors[0].path.to.equal('name')))
    });
    it('name can not be an empty string', ()=>{
      return User.create({name: ''})
        .then(()=> {throw 'ERROR!!!'})
        .catch(ex => expect(ex.errors[0].path.to.equal('name')))
    })
  })
});

describe('Authentication', ()=> {
  let seed;
  beforeEach(async()=> seed = await db.syncAndSeed())
  discribe.only('GET /api/sessions', ()=>{
    describe('When not logged in', ()=> {
     xit('returns a 401', async ()=>{
       const response = await app.get('/api/sessions')
       expect(response.status).to.equal(401);
     })
    })
    describe('When logged in', ()=>{
      let cookie;
      beforeEach( async()=> {
        const response = await app.post('/api/sessions')
          .send({ email: 'jRomero@gmail.com', password: '12345'})
        cookie = response.headers['set-cookie']
      })
      xit('returns a 200 with the user', async()=>{
        const response = await app.get('/api/sessions')
          .set('cookie', cookie)
        expect(response.status).to.equal(200);
        expect(response.body.name).to.equal('James Romero')
      })
    })
  })
  describe('POST /api/sessions', ()=>{
    discribe('With correct credentials', ()=>{
      xit('returns 204 with a cookie', async ()=>{
        const response = await app.post('/api/sessions')
          .send({email: 'jRomero@gmail.com', password: '12345'})
        expect(response.status).to.equal(204);
        expect(response.headers['set-cookie']).to.be.ok
      })
    })
    describe('Weth incorrect credentials', ()=>{
      xit('returns 401', async ()=>{
        const response = await app.post('/api/sessions')
          .send({email: 'jRomero@gmail.com', password: '12346'});
        expect(response.status).to.equal(401);
      })
    })
  })
  describe('DELETE /api/sessions', ()=>{
    let cookie;
    beforeEach(async()=>{
      const response = await app.post('/api/sessions')
        .send({email: 'jRomero@gmail.com', password: '12345'})
      cookie = response.headers['set-cookie']
    })
    xit('returns a 204', async ()=>{
      let response = await app.delete('/api/sessions')
        .set('cookie', cookie)

      expect(response.status).to.equal(204);

      response = await app.get('/api/sessions')
        .set('cookie', cookie)
      expect(response.status).to.equal(401);
    })
  })
})
