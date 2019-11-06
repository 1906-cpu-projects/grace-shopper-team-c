const { db, User, Product, Order, LineItem } = require('../server/db');

const mapAndSave = async(model, items) => Promise.all(await items.map(item => model.create(item)));

const syncAndSeed = async () => {
  try {
    await db.sync({ force: true });

    const users = [
      {
        name: 'Billy Hill',
        email: 'bHill@gmail.com',
        password: '12345'
      },
      {
        name: 'John Ford',
        email: 'jFord@gmail.com',
        password: '12345'
      },
      {
        name: 'Anna Lane',
        email: 'aLane@gmail.com',
        password: '12345'
      },
      {
        name: 'May Taylor',
        email: 'mTaylor@gmail.com',
        password: '12345'
      },
      {
        name: 'James Romero',
        email: 'jRomero@gmail.com',
        password: '12345'
      }
    ];

    const [billy, john, anna, may, james] = await mapAndSave(User, users);

    const products = [
      {
        name: 'Hammer',
        stock: 200,
        price: 25.99
      },
      {
        name: 'Nails',
        stock: 200,
        price: 9.5
      },
      {
        name: 'Paint',
        stock: 200,
        price: 4.5
      },
      {
        name: 'Chair Set',
        stock: 200,
        price: 157.47
      },
      {
        name: 'Shovel',
        stock: 200,
        price: 15.0
      },
      {
        name: 'Lawn Mower',
        stock: 200,
        price: 300.25 },
      {
        name: 'Wrench',
        stock: 200,
        price: 13.99
      }
    ];

    const [ hammer, nails, paint, chairSet, shovel, lawnMower, wrench] = await mapAndSave(Product, products);

    const orders = [
      {
        complete: true,
        userId: anna.id
      },
      {
        complete: true,
        userId: may.id
      },
      {
        complete: true,
        userId: john.id
      }
    ];

    const [order1, order2, order3] = await mapAndSave(Order, orders);

    const lineItems = [
      {
        quantity: 6,
        productId: hammer.id,
        orderId: order1.id
      },
      {
        quantity: 6,
        productId: shovel.id,
        orderId: order2.id
      },
      {
        quantity: 16,
        productId: nails.id,
        orderId: order2.id
      },
      {
        quantity: 3,
        productId: paint.id,
        orderId: order3.id
      }
    ];

    const [item1, item2, item3, item4] = await mapAndSave(LineItem, lineItems);

  } catch (e) {
    throw (e);
    db.close();
  }
};

syncAndSeed();
