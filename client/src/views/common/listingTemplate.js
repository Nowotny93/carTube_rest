import { html } from '../../../node_modules/lit-html/lit-html.js';

export const listingTemplate = (listing) => html`
<section id="car-listings">
    <div class="listings">
        <table id="listings-table">
            <tbody>
                <tr>
                    <td id="listing-row">
                        <div class="listing">
                            <div class="preview">
                                <img src="/Images/${listing.imageUrl1}">
                            </div>
                            <div class="info">
                                <h2>${listing.brand} ${listing.model}</h2>
                                <hr>
                                <div class="data-info">
                                    <h3>Mileage: ${listing.mileage} km</h3>
                                    <h3>Year: ${listing.year}</h3>
                                    <h3>Price: ${listing.price} $</h3>
                                    <h3>Color: ${listing.color}</h3>
                                    <h3>Fuel Type: ${listing.fuel}</h3>
                                </div>
                            </div>
                            <div class="data-buttons">
                                <a href="/details/${listing._id}" class="button-carDetails">Details</a>
                            </div>
                        </div>
                    </td>
                    <hr>
                </tr>
            </tbody>
        </table>
    </div>
</section>`;

