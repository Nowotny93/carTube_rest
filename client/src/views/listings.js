import { html } from '../../node_modules/lit-html/lit-html.js';
import { listingTemplate } from './common/listingTemplate.js';
import { getListings } from '../api/services.js';

const listingsTemplate = (data) => html` 
    ${data.length != 0 ? data.map(listingTemplate) : html`<p class="no-cars">No cars in database.</p>`}
`;

export async function listingsView (ctx) {
    const data = await getListings()
    ctx.render(listingsTemplate(data))
}