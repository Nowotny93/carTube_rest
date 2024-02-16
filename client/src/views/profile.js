import { html } from '../../node_modules/lit-html/lit-html.js';
import { getUserListings } from '../api/services.js';
import { listingTemplate } from './common/listingTemplate.js';


const profileTemplate = (data) => html`

    ${data.length != 0 ? data.map(listingTemplate) : html`<p class="no-cars">You haven't listed any cars yet.</p>`}

`

export async function profileView (ctx) {
    const userId = sessionStorage.getItem('userId')
    const userListings = await getUserListings(userId)
    ctx.render(profileTemplate(userListings))
}