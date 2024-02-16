const { query } = require('express');
const Listing = require('../models/Listing')

async function getAll() {
    return Listing.find({}).lean();
}

async function getById(id) {
    return Listing.findById(id);
}

async function getByUserId(id) {
    return Listing.find({_ownerId: id}).lean()
}

async function filteredRes(brand, model, year, color, fuel, region, transmission, category, maxPrice) {
    data = {
        brand: brand,
        model: model,
        year: year,
        color: color,
        fuel: fuel,
        region: region,
        transmission: transmission,
        category: category,
        price: maxPrice === 'undefined' ?  'undefined' : { $exists: true, $ne: null, $lt: maxPrice }
    }

    Object.keys(data).forEach(key => data[key] === 'undefined' && delete data[key])
    return Listing.find(data)
}

async function filteredResAverage(brand, model, year) {
    return Listing.find({brand: brand, model: model, year: year})
}


async function create(data) {
    const result = new Listing(data);
    await result.save()
    return result;
}

async function update(original, updated) {
    Object.assign(original, updated)
    await original.save()
    return original
}

async function deleteById(id) {
    return await Listing.findByIdAndDelete(id);
}

module.exports = {
    getAll,
    getById,
    getByUserId,
    filteredRes,
    filteredResAverage,
    create,
    update,
    deleteById
}