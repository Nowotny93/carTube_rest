import { html } from '../../node_modules/lit-html/lit-html.js';
import { average } from '../api/services.js';

const averagePricesTemplate = (avg, onSubmit, changeCarList) => html `

<section>
    <div id="average-form">
        <form method="POST" @submit=${onSubmit}>
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
                    
                </tbody>
            </table>
            <input type="submit" id="average-search-button" value="Search">
        </form>
        ${avg.length == 0 ? html `` : html `

        <p id="average-form-headers"><i class="fa-solid fa-money-check-dollar" id="average-form-icon"></i>Average Price</p>
        <hr>
        <span id="average-price-container">${avg} $  </span>
    
        <p id="average-form-headers"><i class="fa-solid fa-chart-simple" id="average-form-icon"></i>Statistics</p>
        <hr>
        <canvas id="listingsChart" style="width:100%;max-width:540px"></canvas>
        `}
    </div>
</section>`


export async function averagePricesView (ctx) {
    const searchData = (ctx.querystring).split('&')
    const brand = !searchData ? undefined : (searchData[0]).split('=')[1]
    if (brand) {
        const model = (searchData[1]).split('=')[1] === '' ? undefined : (searchData[1]).split('=')[1]
        const year = (searchData[2]).split('=')[1] === '' || (searchData[2]).split('=')[1] == 0 ? undefined : (searchData[2]).split('=')[1]
        const cars = await average(brand, model, year)
        if (cars.length == 0) {
            const avg = []
            ctx.render(averagePricesTemplate(avg, onSubmit, changeCarList))
            alert('No such listings by the requested parameters')
        } else{
            var totalPrices = 0;
            for(var i = 0; i < cars.length; i++) {
                totalPrices += cars[i].price;
            }
            var avg = totalPrices / cars.length;

            var totalListingPrices = []
            var totalListings = []
            for(var y = 0; y < cars.length; y++) {
                totalListingPrices.push(cars[y].price)
                totalListings.push(`car${y+1}`)
            }

            
            ctx.render(averagePricesTemplate(avg, onSubmit, changeCarList))

            //--------------Chart-------------//
            const xValues = totalListings
            const yValues = totalListingPrices;

            new Chart("listingsChart", {
            type: "line",
            data: {
                labels: xValues,
                datasets: [{
                fill: false,
                lineTension: 0,
                backgroundColor: "rgba(0,0,255,1.0)",
                borderColor: "rgba(0,0,255,0.1)",
                data: yValues
                }]
            },
            options: {
                legend: {display: false},
                scales: {
                yAxes: [{ticks: {min: 0, max: Math.max.apply(Math, totalListingPrices)}}],
                }
            }
            });


            //----------------------------//
        }
    } else {
        const avg = []
        ctx.render(averagePricesTemplate(avg, onSubmit, changeCarList))
    }


    var carsAndModels = {};
    carsAndModels['Mercedes'] = ["S-class", "C-class", "SL-class", "SEL-class"];
    carsAndModels['BMW'] = ["3-series", "5-series", "7-series", "8-series"];

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
        const brand = document.getElementById('brand').value
        const model = document.getElementById('model').value
        const year = Number(document.getElementById('year').value)

        try {
            if (!brand || !model || !year) {
                throw new Error('All fields are required!');
            }
        
        ctx.page.redirect(`/average?brand=${brand}&model=${model}&year=${year}`)
        } catch (err) {
            alert(err.message);
        }
    }
}