import { html } from '../../node_modules/lit-html/lit-html.js';
import { getCarById, deleteListing } from '../api/services.js';
import { listingPhotosTemplate } from './common/listingPhotosTemplate.js';
import { createOnChoiceModal } from '../modal-onChoice.js'

const detailsTemplate = (car, isOwner, listingPhotos, onDelete, previousPhoto, nextPhoto) => html `
<div id="full-screen-details">
    <section id="listing-photos">
        <div class="slideshow-container">
            ${listingPhotos.map(listingPhotosTemplate)}
            <a class="prev" @click=${previousPhoto}>&#10094;</a>
            <a class="next" @click=${nextPhoto}>&#10095;</a>
        </div>
    </section>

    <section id="listing-details">
        <h1>${car.brand} ${car.model}</h1>
        <p id="listing-info-headers"><i class="fa-solid fa-circle-info" id="listing-info-icon"></i>Listing information</p>
        <hr>
        <div class="details-info">
            <div id="listing-general-main-info">
                <ul class="listing-props">
                    <li><span>Brand:</span>${car.brand}</li>
                    <li><span>Model:</span>${car.model}</li>
                    <li><span>Year:</span>${car.year}</li>
                    <li><span>Mileage:</span>${car.mileage} km</li>
                </ul>
                <ul class="listing-props2">
                    <li><span>Category:</span>${car.category}</li>
                    <li><span>Color:</span>${car.color}</li>
                    <li><span>Fuel Type:</span>${car.fuel}</li>

                    <li><span>Transmission:</span>${car.transmission}</li>
                </ul>
            </div>
            <p id="listing-info-headers"><i class="fa-solid fa-money-check-dollar" id="listing-info-icon"></i>Price</p>
            <hr>
            <ul class="listing-props">
                <li><span>${car.price} $</span></li>
            </ul>
            <p id="listing-info-headers"><i class="fa-solid fa-list" id="listing-info-icon"></i>Description</p>
            <hr>
            <p class="description-para">${car.description}</p>
            <p id="listing-info-headers"><i class="fa-regular fa-address-card" id="listing-info-icon"></i>Contact details</p>
            <hr>
            <div id="listing-general-contact">
                <ul class="listing-props3">
                    <li><span>Name:</span>${car.seller}</li>
                    <li><span>Telephone:</span>${car.telephone}</li>
                    <li><span>Region:</span>${car.region}</li>
                </ul>
                ${isOwner ? html`<div class="listings-buttons">
                <a href=${`/edit/${car._id}`} class="button-list">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" class="button-list">Delete</a>
                </div>` : ''}
            </div>
        </div>
    </section>
</div>
`

export async function detailsView (ctx) {
    const userId = sessionStorage.getItem('userId')
    const carId = ctx.params.id
    const car = await getCarById(carId)
    const isOwner = userId === car._ownerId

    const listingPhotos = []
    Object.entries(car).forEach(entry => {
        const [key, value] = entry;
        if (key.includes('imageUrl')){
            if (value.includes('.jpg')) {
                listingPhotos.push(value)
            };
        };
    });


    ctx.render(detailsTemplate(car, isOwner, listingPhotos, onDelete, previousPhoto, nextPhoto))

//-------------------SLIDES CHANGING FUNCTION---------------------

    var slideIndex = 1;


    function previousPhoto() {
        let n = -1
        showPhoto(slideIndex += n)
    }

    function nextPhoto() {
        let n = 1
        showPhoto(slideIndex += n)
    }



    function showPhoto(n) {
        var i;
        var x = document.getElementsByClassName("listing-slides");
        if (n > x.length) {
            slideIndex = 1
        }
        if (n < 1) {
            slideIndex = x.length
        }
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";  
        }
        x[slideIndex-1].style.display = "block";  
    }

//-------------------DELETE FUNCTION---------------------

    async function onDelete() {

        createOnChoiceModal('Are you sure you want to delete this listing?', onChoice)
        async function onChoice (confirmed) {
        if (confirmed) {
            await deleteListing(carId, listingPhotos);
            ctx.page.redirect('/listings');
            }
        }
    }
}