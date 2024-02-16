const router = require('express').Router()
const { isAuth, isGuest, isOwner } = require('../middlewares/guards');
const { getAll, getByUserId, filteredRes, filteredResAverage, create, update, deleteById } = require('../sevices/listing');
const { parseError } = require('../util');
const preload = require('../middlewares/preload')
const fs = require('fs');

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'C:/Users/Nowotny/Downloads/carTube_rest/client/images');
  },
  filename: (req, file, cb) => {
    console.log(file)
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage })

router.get('/', async (req, res) => {
    const data = await getAll();
    res.json(data)
});

router.post('/', isAuth(), upload.fields([
        {name: 'image1', maxCount: 1}, 
        {name: 'image2', maxCount: 1},
        {name: 'image3', maxCount: 1},
        {name: 'image4', maxCount: 1},
        {name: 'image5', maxCount: 1},
        {name: 'image6', maxCount: 1},
        {name: 'image7', maxCount: 1},
        {name: 'image8', maxCount: 1},
        {name: 'image9', maxCount: 1}
    ]), async (req, res) => {
    const data = {
        brand: req.body.brand,
        model: req.body.model,
        description: req.body.description,
        year: Number(req.body.year),
        imageUrl1: req.body.imageUrl1,
        imageUrl2: req.body.imageUrl2,
        imageUrl3: req.body.imageUrl3,
        imageUrl4: req.body.imageUrl4,
        imageUrl5: req.body.imageUrl5,
        imageUrl6: req.body.imageUrl6,
        imageUrl7: req.body.imageUrl7,
        imageUrl8: req.body.imageUrl8,
        imageUrl9: req.body.imageUrl9,
        price: Number(req.body.price),
        color: req.body.color,
        mileage: Number(req.body.mileage),
        fuel: req.body.fuel,
        transmission: req.body.transmission,
        category: req.body.category,
        seller: req.body.seller,
        telephone: req.body.telephone,
        region: req.body.region,
        _ownerId: req.user._id
    }



    if (!req.files) {
        res.status(400).send('No file uploaded.');
        return;
        }


    try {
        const result = await create(data)
        res.status(201).json(result);
    } catch (error) {
        console.log(error);
        const message = parseError(error)
        res.status(400).json({message})
    }

})

router.get('/:id', preload(), async (req, res) => {
    const listing = req.data
    res.json(listing)
    // const listing = await getById(req.params.id)
    // res.json(listing)
})

router.get('/userListings/:id', async (req, res) => {
    const id = req.params.id;
    const userListings = await getByUserId(id)
    res.json(userListings)
})

router.get('/search/:brand/:model/:year/:color/:fuel/:region/:transmission/:category/:maxPrice', async (req, res) => {
    const brand = req.params.brand
    const model = req.params.model
    const year = req.params.year
    const color = req.params.color
    const fuel = req.params.fuel
    const region = req.params.region
    const transmission = req.params.transmission
    const category = req.params.category
    const maxPrice = req.params.maxPrice
    const filteredResult = await filteredRes(brand, model, year, color, fuel, region, transmission, category, maxPrice)
    res.json(filteredResult)
})

router.get('/average/:brand/:model/:year', async (req, res) => {
    const brand = req.params.brand
    const model = req.params.model
    const year = req.params.year
    const filteredResultAverage = await filteredResAverage(brand, model, year)
    res.json(filteredResultAverage)
})

router.put('/:id', isAuth(), preload(), isOwner(), async (req,res) => {
    const updated = {
        brand: req.body.brand,
        model: req.body.model,
        description: req.body.description,
        year: Number(req.body.year),
        // imageUrl1: req.body.imageUrl1,
        price: Number(req.body.price),
        color: req.body.color,
        mileage: Number(req.body.mileage),
        fuel: req.body.fuel,
        transmission: req.body.transmission,
        category: req.body.category,
        seller: req.body.seller,
        telephone: req.body.telephone,
        region: req.body.region,
        _ownerId: req.user._id
    }
    console.log(req.data)
    // try {
    //     const result = await update(req.data, updated)
    //     res.json(result);
    // } catch (error) {
    //     const message = parseError(error)
    //     res.status(error.status || 400).json({message})
    // }
});

router.delete('/:id', isAuth(), preload(), isOwner(),  async (req,res) => {
    const id = req.params.id;
    const images = req.body

    try {
        images.forEach(filePath => {
            fs.unlinkSync(`C:/Users/Nowotny/Downloads/carTube_rest/client/images/` + filePath);
            return;
        })
        const result = await deleteById(id)
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(404).json({message: `Item ${id} not found`})
        
    }
});




module.exports = router;