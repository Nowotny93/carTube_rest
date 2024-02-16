import { html } from '../../node_modules/lit-html/lit-html.js';
import { search } from '../api/services.js';
import { listingTemplate } from './common/listingTemplate.js';

const homeTemplate = (data, onSubmit, changeCarList) => html`
${data.length != 0 ? data.map(listingTemplate) : html`
<div class="home-backround">
    <img src="https://cdn.skoda-storyboard.com/2018/02/Gear_levers.jpg" id="backround-picture" />
    <section>
        <div id="search-container">
            <form method="POST" enctype="multipart/form-data" @submit=${onSubmit}>
                <p id="search-form-headers"><i class="fa-solid fa-magnifying-glass" id="search-form-icon"></i>Search listing by</p>
                <hr>
                <table id="listing-main-infrmation" style="margin: auto">
                    <tbody>
                        <tr>
                            <td id="search-form-label">Brand</td>
                            <td id="search-form-label">Model</td>
                            <td id="search-form-label">Year</td>
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
                                <input type="number" placeholder="Enter Car Year" name="year" id="year" >
                            </td>
                        </tr>
                        <tr>
                            <td id="search-form-label">Color</td>
                            <td id="search-form-label">Fuel Type</td>
                            <td id="search-form-label">Region</td>
                        </tr>
                        <tr>
                            <td>
                                <select name="color" id="color">
                                    <option value="" selected="selected">Select color</option>
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
                                    <option value="" selected="selected">Select fuel type</option>
                                    <option value="petrol">Petrol</option>
                                    <option value="diesel">Diesel</option>
                                    <option value="electic">Electric</option>
                                </select>
                            </td>
                            <td>
                                <select name="region" id="region">
                                    <option value="" selected="selected">Select region</option>
                                    <option value="Sofia">Sofia</option>
                                    <option value="Plovdiv">Plovdiv</option>
                                    <option value="Shumen">Shumen</option>
                                    <option value="Burgas">Burgas</option>
                                    <option value="Varna">Varna</option>
                                    <option value="Ruse">Ruse</option>
                                    <option value="Haskovo">Haskovo</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td id="search-form-label">Transmission</td>
                            <td id="search-form-label">Category</td>
                            <td id="search-form-label">Maximum Price</td>
                        </tr>
                        <tr>
                            <td>
                                <select name="transmission" id="transmission">
                                    <option value="" selected="selected">Select transmission type</option>
                                    <option value="automatic">Automatic</option>
                                    <option value="manual">Manual</option>
                                </select>
                            </td>
                            <td>
                                <select name="category" id="category">
                                    <option value="" selected="selected">Select category</option>
                                    <option value="sedan">Sedan</option>
                                    <option value="coupe">Coupe</option>
                                    <option value="wagoon">Wagoon</option>
                                    <option value="cabriolet">Cabriolet</option>
                                </select>
                            </td>
                            <td>
                                <input type="number" placeholder="Enter Max Price" name="maxPrice" id="maxPrice">
                            </td>
                        </tr>
                    </tbody>
                </table>
                <input type="submit" id="search-listing-button" value="Search">
            </form>
        </div>
    </section>
</div>
`}
`

let counter = 0

export async function home(ctx) {

    const searchData = (ctx.querystring).split('&')
    const brand = !searchData ? undefined : (searchData[0]).split('=')[1]
    if (brand) {
        const model = (searchData[1]).split('=')[1] === '' ? undefined : (searchData[1]).split('=')[1]
        const year = (searchData[2]).split('=')[1] === '' || (searchData[2]).split('=')[1] == 0 ? undefined : (searchData[2]).split('=')[1]
        const color = (searchData[3]).split('=')[1] === '' ? undefined : (searchData[3]).split('=')[1]
        const fuel = (searchData[4]).split('=')[1] === '' ? undefined : (searchData[4]).split('=')[1]
        const region = (searchData[5]).split('=')[1] === '' ? undefined : (searchData[5]).split('=')[1]
        const transmission = (searchData[6]).split('=')[1] === '' ? undefined : (searchData[6]).split('=')[1]
        const category = (searchData[7]).split('=')[1] === '' ? undefined : (searchData[7]).split('=')[1]
        const maxPrice = (searchData[8]).split('=')[1] === '' || (searchData[8]).split('=')[1] == 0 ? undefined : (searchData[8]).split('=')[1]
        const cars = await search(brand, model, year, color, fuel, region, transmission, category, maxPrice)

        if (cars.length == 0 && counter >= 1) {
            alert('No such listings by the requested parameters')
        }
        ctx.render(homeTemplate(cars, onSubmit, changeCarList))
    } else {
        const cars = []
        ctx.render(homeTemplate(cars, onSubmit, changeCarList))
    }

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
        counter += 1
        const brand = document.getElementById('brand').value
        const model = document.getElementById('model').value
        const year = Number(document.getElementById('year').value)
        const color = document.getElementById('color').value
        const fuel = document.getElementById('fuel').value
        const region = document.getElementById('region').value
        const transmission = document.getElementById('transmission').value
        const category = document.getElementById('category').value
        const maxPrice = Number(document.getElementById('maxPrice').value)

        try {
            if (!brand) {
                throw new Error('Brand is required!');
            }
        event.target.reset();
        ctx.page.redirect(`/?brand=${brand}&model=${model}&year=${year}&color=${color}&fuel=${fuel}&region=${region}&transmission=${transmission}&category=${category}&maxPrice=${maxPrice}`)
        } catch (err) {
            alert(err.message);
        }
    }
}