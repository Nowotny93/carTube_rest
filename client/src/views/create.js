import { html } from '../../node_modules/lit-html/lit-html.js';
import { create } from '../api/services.js';

const createTemplate = (onSubmit, changeCarList) => html `
<section>
    <div id="create-form">
        <form method="POST" enctype="multipart/form-data" @submit=${onSubmit}>
            <p id="create-form-headers"><i class="fa-solid fa-circle-info" id="create-form-icon"></i>Listing information</p>
            <hr>
            <table id="listing-main-infrmation">
                <tbody>
                    <tr>
                        <td id="create-form-label">Brand</td>
                        <td id="create-form-label">Model</td>
                        <td id="create-form-label">Year</td>
                    </tr>
                    <tr>
                        <td>
                            <select name="brand" id="brand" @change=${changeCarList}>
                                <option value="" selected="selected">Select brand</option>
                                <option value="Mercedes">Mercedes</option> 
                                <option value="BMW">BMW</option> 
                            </select>
                        </td>
                        <td>
                            <select name="model" id="model">
                                <option value="" selected="selected">Select model</option>
                            </select>
                        </td>
                        <td>
                            <input type="number" placeholder="Enter Car Year" name="year" id="year">
                        </td>
                    </tr>
                    <tr>
                        <td id="create-form-label">Color</td>
                        <td id="create-form-label">Fuel Type</td>
                        <td id="create-form-label">Mileage</td>
                    </tr>
                    <tr>
                        <td>
                            <select name="color" id="color">
                                <option value="black">Black</option>
                                <option value="blue">Blue</option>
                                <option value="green">Green</option>
                                <option value="yellow">Yellow</option>
                                <option value="pink">Pink</option>
                                <option value="grey">Grey</option>
                                <option value="red">Red</option>
                            </select>
                        </td>
                        <td>
                            <select name="fuel" id="fuel">
                                <option value="petrol">Petrol</option>
                                <option value="diesel">Diesel</option>
                                <option value="electic">Electric</option>
                            </select>
                        </td>
                        <td>
                            <input type="number" placeholder="Enter Mileage" name="mileage" id="mileage">
                        </td>
                    </tr>
                    <tr>
                        <td id="create-form-label">Transmission</td>
                        <td id="create-form-label">Category</td>
                        <td id="create-form-label">Price</td>
                    </tr>
                    <tr>
                        <td>
                            <select name="transmission" id="transmission">
                                <option value="automatic">Automatic</option>
                                <option value="manual">Manual</option>
                            </select>
                        </td>
                        <td>
                            <select name="category" id="category">
                                <option value="sedan">Sedan</option>
                                <option value="coupe">Coupe</option>
                                <option value="wagoon">Wagoon</option>
                                <option value="cabriolet">Cabriolet</option>
                            </select>
                        </td>
                        <td>
                            <input type="number" placeholder="Enter Car Price" name="price" id="price">
                        </td>
                    </tr>
                </tbody>
            </table>
            <table id="listing-description">
                <tbody>
                    <tr>
                        <td id="create-form-label">Description</td>
                    </tr>
                    <tr>
                        <td>
                            <textarea type="text" placeholder="Enter Description" name="description" id="description"></textarea>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p id="create-form-headers"><i class="fa-solid fa-camera-retro" id="create-form-icon"></i>Images</p>
            <hr>
            <table id="listing-images">
                <tbody>
                    <tr>
                        <td>
                            <input type="file" name="image1" id="image1">
                        </td>
                        <td>
                            <input type="file" name="image2" id="image2">
                        </td>
                        <td>
                            <input type="file" name="image3" id="image3">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="file" name="image4" id="image4">
                        </td>
                        <td>
                            <input type="file" name="image5" id="image5">
                        </td>
                        <td>
                            <input type="file" name="image6" id="image6">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="file" name="image7" id="image7">
                        </td>
                        <td>
                            <input type="file" name="image8" id="image8">
                        </td>
                        <td>
                            <input type="file" name="image9" id="image9">
                        </td>
                    </tr>
                </tbody>
            </table>
            
            <p id="create-form-headers"><i class="fa-regular fa-address-card" id="create-form-icon"></i>Contact details</p>
            <hr>
            <table id="listing-contact-info">
                <tbody>
                    <tr>
                        <td id="create-form-label">Contact Person</td>
                        <td id="create-form-label">Telephone</td>
                        <td id="create-form-label">Region</td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" placeholder="Enter your name" name="seller" id="seller">
                        </td>
                        <td>
                            <input type="text" placeholder="Enter your telephone number" name="telephone" id="telephone">
                        </td>
                        <td>
                            <select name="region" id="region">
                                <option value="sofia">Sofia</option>
                                <option value="plovdiv">Plovdiv</option>
                                <option value="shumen">Shumen</option>
                                <option value="burgas">Burgas</option>
                                <option value="varna">Varna</option>
                                <option value="ruse">Ruse</option>
                                <option value="haskovo">Haskovo</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
            <input type="submit" id="create-listing-button" value="Create Listing">
        </form>
    </div>
</section>`


export async function createView (ctx) {

    ctx.render(createTemplate(onSubmit, changeCarList))

    var carsAndModels = {};
    carsAndModels['Mercedes'] = ["S250", "S280" , "S300", "S320", "S350" , "S400" , "S420", "S430", "S450", "S500", 
                                 "SL400", "SL500", "SL600",
                                 "ML280" , "ML300", "ML320", "ML350" , "ML400" , "ML420", "ML430", "ML450", "ML500",
                                 "CL230", "CL320","CL420", "CL500", "CL600",
                                 "C160", "C180","C200", "C220", "C230", "C240", "C250"];
    carsAndModels['BMW'] = ["315", "316", "318", "320", "323", "325", "328", "330", "335", 
                            "518", "520", "523", "525", "528", "530", "535", "540", 
                            "728", "730", "735", "740", 
                            "840", "850",
                            "M3", "M5", "M6",
                            "Z1", "Z3", "Z4"];

    function changeCarList() {
        var brands = document.getElementById("brand");
        var models = document.getElementById("model");
        var selCar = brands.options[brands.selectedIndex].value;

        // while (models.options.length) {
        //     models.remove(0);
        // }

        var cars = carsAndModels[selCar];
        if (cars) {
            models.length = 1
            var i;
            for (i = 0; i < cars.length; i++) {
            var car = new Option(cars[i], cars[i]);
            models.options.add(car);
            }
        }
    }
    
    async function onSubmit(event) {
        event.preventDefault()

        const missingPhotos = []

        const brand = document.getElementById('brand').value
        const model = document.getElementById('model').value
        const year = document.getElementById('year').value
        const mileage = document.getElementById('mileage').value
        const color = document.getElementById('color').value
        const fuel = document.getElementById('fuel').value
        const transmission = document.getElementById('transmission').value
        const price = document.getElementById('price').value
        const description = document.getElementById('description').value
        const category = document.getElementById('category').value
        const image1 = document.getElementById('image1').files[0]
        const imageUrl1 = (typeof image1 === 'undefined') ? (missingPhotos.push('photo1 missing') && 'photo1 missing') : image1.name 
        const image2 = document.getElementById('image2').files[0]
        const imageUrl2 = (typeof image2 === 'undefined') ? (missingPhotos.push('photo2 missing') && 'photo2 missing') : image2.name 
        const image3 = document.getElementById('image3').files[0]
        const imageUrl3 = (typeof image3 === 'undefined') ? (missingPhotos.push('photo3 missing') && 'photo3 missing') : image3.name 
        const image4 = document.getElementById('image4').files[0]
        const imageUrl4 = (typeof image4 === 'undefined') ? (missingPhotos.push('photo4 missing') && 'photo4 missing') : image4.name 
        const image5 = document.getElementById('image5').files[0]
        const imageUrl5 = (typeof image5 === 'undefined') ? (missingPhotos.push('photo5 missing') && 'photo5 missing') : image5.name 
        const image6 = document.getElementById('image6').files[0]
        const imageUrl6 = (typeof image6 === 'undefined') ? (missingPhotos.push('photo6 missing') && 'phot6 missing') : image6.name 
        const image7 = document.getElementById('image7').files[0]
        const imageUrl7 = (typeof image7 === 'undefined') ? (missingPhotos.push('photo7 missing') && 'photo7 missing') : image7.name 
        const image8 = document.getElementById('image8').files[0]
        const imageUrl8 = (typeof image8 === 'undefined') ? (missingPhotos.push('photo8 missing') && 'photo8 missing') : image8.name 
        const image9 = document.getElementById('image9').files[0]
        const imageUrl9 = (typeof image9 === 'undefined') ? (missingPhotos.push('photo9 missing') && 'photo9 missing') : image9.name 
        const seller = document.getElementById('seller').value
        const telephone = document.getElementById('telephone').value
        const region = document.getElementById('region').value

        const formData = new FormData()
        formData.append('brand', brand)
        formData.append('model', model)
        formData.append('year', year)
        formData.append('mileage', mileage)
        formData.append('color', color)
        formData.append('fuel', fuel)
        formData.append('transmission', transmission)
        formData.append('price', price)
        formData.append('description', description)
        formData.append('category', category)
        formData.append('image1', image1)
        formData.append('imageUrl1', imageUrl1)
        formData.append('image2', image2)
        formData.append('imageUrl2', imageUrl2)
        formData.append('image3', image3)
        formData.append('imageUrl3', imageUrl3)
        formData.append('image4', image4)
        formData.append('imageUrl4', imageUrl4)
        formData.append('image5', image5)
        formData.append('imageUrl5', imageUrl5)
        formData.append('image6', image6)
        formData.append('imageUrl6', imageUrl6)
        formData.append('image7', image7)
        formData.append('imageUrl7', imageUrl7)
        formData.append('image8', image8)
        formData.append('imageUrl8', imageUrl8)
        formData.append('image9', image9)
        formData.append('imageUrl9', imageUrl9)
        formData.append('seller', seller)
        formData.append('telephone', telephone)
        formData.append('region', region)

        // for (var x = 0; x < image1.length; x++) {
        //     formData.append("image1[]", image1[x]);
        // }

        try {
            if (!brand || !model || !description || !year || !price || !color || !mileage || !fuel || !transmission || !seller || !telephone || !region) {
                throw new Error('All fields are required!');
            }

            if (missingPhotos.length > 6) {
                throw new Error('At least 3 photos are required!');
            }

            if (isNaN(year) || isNaN(price) || isNaN(mileage)) {
                throw new Error('Year, price and mileage must be numbers!');
            }

            if (year < 0 || price < 0 || mileage < 0) {
                throw new Error('Year, price and mileage must be positive numbers!');
            }

        await create(formData);

        event.target.reset();

        ctx.page.redirect('/listings');

        } catch (error) {
            alert(error.message);
        }
    }
}