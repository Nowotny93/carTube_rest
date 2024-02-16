import { html } from '../../../node_modules/lit-html/lit-html.js';

export const listingPhotosTemplate = (photo) => html `
<div class="listing-slides fade">
    <img src="/images/${photo}">
</div>
`

