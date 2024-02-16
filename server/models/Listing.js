const { Schema, model } = require('mongoose');

const schema = new Schema({
    brand: { type: String, required: [true, 'Brand is required'] },
    model: { type: String, required: [true, 'Model is required'] },
    description: { type: String, required: [true, 'Description is required'], minLenght: [5, 'Descrition must be at least 5 characters long'] },
    year: { type: Number, required: [true, 'Year is required'], min: [1930, 'Year must be between 1930 and 2030'], max: 2030 },
    imageUrl1: { type: String, required: [true, 'At least 3 photos are required!'] },
    imageUrl2: { type: String, required: [true, 'At least 3 photos are required!'] },
    imageUrl3: { type: String, required: [true, 'At least 3 photos are required!'] },
    imageUrl4: { type: String },
    imageUrl5: { type: String },
    imageUrl6: { type: String },
    imageUrl7: { type: String },
    imageUrl8: { type: String },
    imageUrl9: { type: String },
    price: { type: Number, required: [true, 'Price is required'], min: [0.01, 'Price must be greater than zero'] },
    color: { type: String, required: [true, 'Color is required'] },
    mileage: { type: Number, required: [true, 'Mileage is required'] },
    fuel: { type: String, required: [true, 'Fuel type is required'] },
    transmission: { type: String, required: [true, 'Transmission type is required'] },
    category: { type: String, required: [true, 'Category is required'] },
    seller: { type: String, required: [true, 'Seller is required'] },
    telephone: { type: String, required: [true, 'Telephone is required'] },
    region: { type: String, required: [true, 'Region is required'] },
    _ownerId: { type: Schema.Types.ObjectId, ref: 'User' }
})

module.exports = model('Listing', schema)