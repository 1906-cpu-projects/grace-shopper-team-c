const app = require('supertest')(require('./server.js'));
const db = require('./db');
const {User, Product} = db.models;
const { expect } = require('chai');

// describe('Testing', ()=> {
//   it('true is true', ()=>{
//   })
// })

//     TO RUN TEST TYPE IN THE TERMINAL =>    npm run test:dev


describe('Grace Shopper tests', ()=>{
  let seed;
  beforeEach(async ()=> seed = await db.syncAndSeed().catch(err => console.log(err)));
  describe('Data Layer', ()=> {
    it('There is 7 products', ()=> {
      expect(seed.products.hammer.name).to.equal('Hammers');
      expect(seed.products.silverware.name).to.equal('Silverware');
      expect(seed.products.paint.name).to.equal('Paint');
      expect(seed.products.chair.name).to.equal('Chair Set');
      expect(seed.products.carpet.name).to.equal('Carpet');
      expect(seed.products.game.name).to.equal('Game Consoles');
      expect(seed.products.movie.name).to.equal('Movie');
    });
    it('There are 5 Users', ()=> {
      expect(seed.users.billy.name).to.equal('Billy Hill');
      expect(seed.users.john.name).to.equal('John Ford');
      expect(seed.users.anna.name).to.equal('Anna Lane');
      expect(seed.users.may.name).to.equal('May Taylor');
      expect(seed.users.james.name).to.equal('James Romero');
    })
  })
})
