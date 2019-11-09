const { db, User, Product, Order, LineItem } = require('../server/db');

const mapAndSave = async(model, items) => Promise.all(await items.map(item => model.create(item)));

const syncAndSeed = async () => {

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
      price: 25.99,
      imageURL: '/public/img/Hammer.jpeg',
      description: 'Molded on Shock Reduction Grip® reduces shock up to 70%.Head and handle forged in 1 piece .Fully polished'
    },
    {
      name: 'Nails',
      stock: 200,
      price: 9.5,
      imageURL: '/public/img/Nails.jpeg',
      description: '100ct galvanized steel nails.'
    },
    {
      name: 'Wrench',
      stock: 200,
      price: 13.99,
      imageURL: '/public/img/Wrench.jpeg',
      description: 'Super Heavy Duty forged steel, Jaws open extra-wide for added versatility'
    },
    {
      name: 'Paint, Black',
      stock: 200,
      price: 4.5,
      imageURL: '/public/img/Paint.jpeg',
      description: 'This satin sheen is ideal for moderate to high-traffic areas of your home such as kitchens, bathrooms, laundry rooms and hallways,It stands up to anything™ and High-hiding paint + primer easily covers existing colors and provides a smooth, even finish'
    },
    {
      name: 'Paint, White',
      stock: 200,
      price: 4.5,
      imageURL: '/public/img/Paint.jpeg',
      description: 'This satin sheen is ideal for moderate to high-traffic areas of your home such as kitchens, bathrooms, laundry rooms and hallways,It stands up to anything™ and High-hiding paint + primer easily covers existing colors and provides a smooth, even finish'
    },
    {
      name: 'Paint, Red',
      stock: 200,
      price: 4.5,
      imageURL: '/public/img/Paint.jpeg',
      description: 'This satin sheen is ideal for moderate to high-traffic areas of your home such as kitchens, bathrooms, laundry rooms and hallways,It stands up to anything™ and High-hiding paint + primer easily covers existing colors and provides a smooth, even finish'
    },
    {
      name: 'Paint, Orange',
      stock: 200,
      price: 4.5,
      imageURL: '/public/img/Paint.jpeg',
      description: 'This satin sheen is ideal for moderate to high-traffic areas of your home such as kitchens, bathrooms, laundry rooms and hallways,It stands up to anything™ and High-hiding paint + primer easily covers existing colors and provides a smooth, even finish'
    },
    {
      name: 'Paint, Yellow',
      stock: 200,
      price: 4.5,
      imageURL: '/public/img/Paint.jpeg',
      description: 'This satin sheen is ideal for moderate to high-traffic areas of your home such as kitchens, bathrooms, laundry rooms and hallways,It stands up to anything™ and High-hiding paint + primer easily covers existing colors and provides a smooth, even finish'
    },
    {
      name: 'Paint, Green',
      stock: 200,
      price: 4.5,
      imageURL: '/public/img/Paint.jpeg',
      description: 'This satin sheen is ideal for moderate to high-traffic areas of your home such as kitchens, bathrooms, laundry rooms and hallways,It stands up to anything™ and High-hiding paint + primer easily covers existing colors and provides a smooth, even finish'
    },
    {
      name: 'Paint, Blue',
      stock: 200,
      price: 4.5,
      imageURL: '/public/img/Paint.jpeg',
      description: 'This satin sheen is ideal for moderate to high-traffic areas of your home such as kitchens, bathrooms, laundry rooms and hallways,It stands up to anything™ and High-hiding paint + primer easily covers existing colors and provides a smooth, even finish'
    },
    {
      name: 'Paint, Purple',
      stock: 200,
      price: 4.5,
      imageURL: '/public/img/Paint.jpeg',
      description: 'This satin sheen is ideal for moderate to high-traffic areas of your home such as kitchens, bathrooms, laundry rooms and hallways,It stands up to anything™ and High-hiding paint + primer easily covers existing colors and provides a smooth, even finish'
    },
    {
      name: 'Chair Set',
      stock: 200,
      price: 157.47,
      imageURL: '/public/img/ChairSet.jpeg',
      description: 'Adds sophistication to any kitchen or breakfast nook.Features slatted, high backed kitchen chairs with graceful curves from top to bottom'
    },
    {
      name: 'Shovel',
      stock: 200,
      price: 10.02,
      imageURL: '/public/img/Shovel.jpeg',
      description: 'Round point blade is ideal for digging a variety of holes. Secure step allows for solid foot placement for added digging force. Durable plastic handle'
    },
    {
      name: 'Rake',
      stock: 200,
      price: 25.5,
      imageURL: '/public/img/Rake.jpeg',
      description: 'Smooth plastic handle for easy use. Perfect for the general leaf raking and clean up task'
    },
    {
      name: 'Broom',
      stock: 200,
      price: 28,
      imageURL: '/public/img/Broom.jpeg',
      description: 'Great for use on garage, deck, patio, sidewalk, driveways, and more. Natural fibers will sweep both wet or dry debris, indoor or outdoors. Sturdy wire wound construction with 4 sews for long lasting use'
    },
    {
      name: 'Smart Lock',
      stock: 200,
      price: 289,
      imageURL: '/public/img/SmartLock.jpeg',
      description: 'Premis is a touchscreen smart lock that works with Apple® HomeKit™. It is a one-touch locking motorized deadbolt. You can enter your home with the convenience of keyless entry using Siri® voice commands, the Premis App, or with your personalized code. It features patented SecureScreen™ technology to prevent code detection from fingerprints on the touchscreen. Premis is easy to install, program and use, and operates on 4 AA batteries. This single cylinder deadbolt can be locked or unlocked by using the keypad or key from the outside as well as the turn button from the inside. The crisp, clean appearance of the Satin Nickel finish adds to the overall look of the product and brings a modern feel'
    },
    {
      name: 'Deadbolt Lock',
      stock: 200,
      price: 109,
      imageURL: '/public/img/Deadbolt.jpeg',
      description: 'Single cylinder deadbolt operates with a key on the outside and a thumbturn on the inside. Features adjustable latch and deadbolt to fit all standard door preparations ANSI/BHMA Grade 3'
    },
    {
      name: 'Door Knobs',
      stock: 200,
      price: 9.97,
      imageURL: '/public/img/DoorKnob.jpeg',
      description: 'For use on exterior doors where keyed entry and security is needed. Designed to fit all standard door preparations. ANSI/BHMA Grade 3'
    },
    {
      name: 'Hinge Set (x12)',
      stock: 200,
      price: 26.98,
      imageURL: '/public/img/HingeSet.jpeg',
      description: 'Commercial full mortise spring hinge. UL R19063 listed. Conforms to ANSI for self closing hinges'
    },
    {
      name: 'Power Drill',
      stock: 200,
      price: 159,
      imageURL: '/public/img/PowerDrill.jpeg',
      description: 'Brushless motor delivers up to 57% more runtime over brushed. Ergonomic comfort grip handle provides ideal balance and tool control. Compact and has a lightweight design to fit into tight areas'
    },
    {
      name: 'Circular Saw',
      stock: 200,
      price: 149,
      imageURL: '/public/img/CircularSaw.jpeg',
      description: 'Powerful 15-amp motor delivers 5,300-RPM (no-load speed) for greater speed and faster cuts 51° bevel capacity, with positive stop at 45°, for a wide variety of cuts. Package includes a 7-1/4-inch 24-tooth carbide blade and blade wrench'
    },
    {
      name: 'Reciprocating Saw',
      stock: 200,
      price: 119,
      imageURL: '/public/img/ReciprocatingSaw.jpeg',
      description: '4-position blade clamp allows for flush cutting and increased positional versatility with tool free blade changes 1-1/8-in stroke length delivers a faster cutting speed. Variable speed trigger with 0-3000 SPM provides increased blade control and faster cut speed'
    },
    {
      name: 'Table Saw',
      stock: 200,
      price: 599.47,
      imageURL: '/public/img/TableSaw.jpeg',
      description: 'Rack and pinion telescoping fence system makes fence adjustments fast, smooth and accurate. Patented material support, can be used for narrow rip cuts 32-1/2-in rip capacity easily cuts a variety of larger shelving and trim materials'
    },
    {
      name: 'Tool Set',
      stock: 200,
      price: 149.02,
      imageURL: '/public/img/ToolSet.jpeg',
      description: 'The ideal all-purpose set for campus,home or workshop'
    },
    {
      name: 'Ratchets & Sockets',
      stock: 200,
      price: 99.99,
      imageURL: '/public/img/Ratchets&Sockets.jpeg',
      description: 'CORROSION RESISTANCE: Full Polish Chrome Finish. MINIMAL ARC SWING: 72-tooth Ratchet. ACCEPTS 6 DIFFERENT TYPES OF FASTENERS: Universal Socket'
    },
    {
      name: 'Tool Storage Workbench, Small',
      stock: 200,
      price: 139.47,
      imageURL: '/public/img/WorkbenchSmall.jpeg',
      description: '1.5-in thick solid hardwood top. 66.5 in W x 38 in H x 20 in D'
    },
    {
      name: 'Tool Storage Workbench, Medium',
      stock: 200,
      price: 636.98,
      imageURL: '/public/img/WorkbenchMedium.jpeg',
      description: '1.5-in thick solid hardwood top. 72.5 in W x 38 in H x 24 in D'
    },
    {
      name: 'Tool Storage Workbench, Large',
      stock: 200,
      price: 1098.49,
      imageURL: '/public/img/WorkbenchLarge.jpg',
      description: '1.5-in thick solid hardwood top. 84 in W x 38 in H x 24 in D'
    },
    {
      name: 'Saw Blades',
      stock: 200,
      price: 14.97,
      imageURL: '/public/img/SawBlade.jpeg',
      description: 'Exclusive, patent-pending ToughTrack tooth design for accurate tracking over the life of the blade. Patented body slots reduce vibration for exceptional feel. High-density tungsten carbide for toughness, wear-resistance, and long life'
    },
    {
      name: 'Drill Bits',
      stock: 200,
      price: 12.97,
      imageURL: '/public/img/DrillBits.jpg',
      description: 'Patented pilot point tip starts on contact. Titanium coating for longer life. Includes 14 pieces'
    },
    {
      name: 'Batteries & Chargers',
      stock: 200,
      price: 198.99,
      imageURL: '/public/img/DrillBattery.jpeg',
      description: 'UC18YSL3: Best in-class charge time (charges an 18 V Li-ion 6.0 Ah battery in 38 min. UC18YSL3: USB terminal (can charge mobile device and tool battery simultaneously). UC18YSL3: Large multi-color charge indicator'
    },
    {
      name: 'Air Compressor',
      stock: 200,
      price: 299.99,
      imageURL: '/public/img/AirCompressor.jpeg',
      description: 'Proudly Made in the USA with Global Materials in Jackson, Tennessee. PORTABILITY: 6 gal pancake maximizes portability and stored air. NO MAINTENANCE: Durable, oil-free pump for long-life and no maintenance'
    },
    {
      name: 'Lawn Mower',
      stock: 200,
      price: 299.99,
      imageURL: '/public/img/LawnMower.jpeg',
      description: 'No prime, no choke with the 140cc Briggs and Stratton® engine featuring ReadyStart®. 21-in, 3-in-1 convertible deck lets you side discharge, mulch or rear bag grass clippings. Dual-lever, 6 position height adjustment makes it easy to change cutting heights from 1.25-in-3.75-in high'
    }
  ];

  const [ hammer, nails, wrench, paintBlack, paintWhite, paintRed, paintOrange, paintYellow, paintGreen, paintBlue, paintPurple, chairSet, shovel, rake, broom, smartLock, deadbolt, doorKnob, hinge, drill, circularSaw, reciprocatingSaw, tableSaw, toolSet, sockets, workbenchSmall, workbenchMedium, workbenchLarge, sawBlades, batteries, air, lawnMower ] = await mapAndSave(Product, products);

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
      productId: paintBlack.id,
      orderId: order3.id
    }
  ];

  const [item1, item2, item3, item4] = await mapAndSave(LineItem, lineItems);

  //TESTING
  return {
    users: {
      billy,
      john,
      anna,
      may,
      james
    },
    products: {
      hammer,
      nails,
      wrench,
      paintBlack,
      paintWhite,
      paintRed,
      paintOrange,
      paintYellow,
      paintGreen,
      paintBlue,
      paintPurple,
      chairSet,
      shovel,
      rake,
      broom,
      smartLock,
      deadbolt,
      doorKnob,
      hinge,
      drill,
      circularSaw,
      reciprocatingSaw,
      tableSaw,
      toolSet,
      sockets,
      workbenchSmall,
      workbenchMedium,
      workbenchLarge,
      sawBlades,
      batteries,
      air,
      lawnMower
    },
    order: {
      order1,
      order2,
      order3
    },
    lineItems: {
      item1,
      item2,
      item3,
      item4
    }
  }
}



syncAndSeed();
