import { html } from '../../node_modules/lit-html/lit-html.js';
import { getCarById, edit } from '../api/services.js';

const editViewTemplate = (car, onSubmit, changeCarList) => html`
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
                                <option value="Mercedes">Mercedes</option> 
                                <option value="BMW">BMW</option> 
                            </select>
                        </td>
                        <td>
                            <select name="model" id="model">
                            
                            </select>
                        </td>
                        <td>
                            <input type="number" placeholder="Enter Car Year" name="year" id="year" value=${car.year}>
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
                            <input type="number" placeholder="Enter Mileage" name="mileage" id="mileage" value=${car.mileage}>
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
                            <input type="number" placeholder="Enter Car Price" name="price" id="price" value=${car.price}>
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
                            <input type="text" placeholder="Enter your name" name="seller" id="seller" value=${car.seller}>
                        </td>
                        <td>
                            <input type="text" placeholder="Enter your telephone number" name="telephone" id="telephone" value=${car.telephone}>
                        </td>
                        <td>
                            <input type="text" placeholder="Enter region" name="region" id="region" value=${car.region}>
                        </td>
                    </tr>
                </tbody>
            </table>
            <input type="submit" id="create-listing-button" value="Edit Listing">
        </form>
    </div>
</section>
`


export async function editView (ctx) {
    const carId = ctx.params.id
    const car = await getCarById(carId)
    ctx.render(editViewTemplate(car, onSubmit, changeCarList))

    document.getElementById('brand').value = car.brand
    document.getElementById('color').value = car.color
    document.getElementById('fuel').value = car.fuel
    document.getElementById('transmission').value = car.transmission
    document.getElementById('category').value = car.category
    document.getElementById('description').value = car.description


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

    var brands = document.getElementById('brand')
    var models = document.getElementById("model");
    var selCar = brands.options[brands.selectedIndex].value;
    var cars = carsAndModels[selCar];
    if (cars) {
        models.length = 1
        var i;
        for (i = 0; i < cars.length; i++) {
        let car = new Option(cars[i], cars[i]);
        models.options.add(car);
        }
    }
    models.remove(0)
    document.getElementById("model").value = car.model

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
            let car = new Option(cars[i], cars[i]);
            models.options.add(car);
            }
        }
        models.remove(0)
    }


    async function onSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.target)
        const brand = formData.get('brand').trim();
        const model = formData.get('model').trim();
        const description = formData.get('description').trim();
        const year = formData.get('year').trim();
        // const imageUrl = formData.get('imageUrl').trim();
        const color = formData.get('color').trim();
        const mileage = formData.get('mileage').trim();
        const fuel = formData.get('fuel').trim();
        const transmission = formData.get('transmission').trim();
        const category = formData.get('category').trim()
        const price = formData.get('price').trim();
        const seller = formData.get('seller').trim();
        const telephone = formData.get('telephone').trim();
        const region = formData.get('region').trim()

        try {


            if (!description || !year || !price || !mileage || !seller || !telephone || !region) {
                throw new Error('All fields are required!');
            }

            if (isNaN(year) || isNaN(price) || isNaN(mileage)) {
                throw new Error('Year, price and mileage must be numbers!');
            }

            if (year < 0 || price < 0 || mileage < 0) {
                throw new Error('Year, price and mileage must be positive numbers!');
            }

            await edit(carId, brand, model, description, year, price, color, mileage, fuel, transmission, category, seller, telephone, region);

            event.target.reset();
            ctx.page.redirect('/details/' + car._id);
        } catch (error) {
            alert(error.message);
        }
    }
}