import page from '../node_modules/page/page.mjs'
import { render } from '../node_modules/lit-html/lit-html.js';

import { home } from './views/home.js';
import { registerView } from './views/register.js';
import { loginView } from './views/login.js';
import { logout } from './api/services.js';
import { listingsView } from './views/listings.js';
import { profileView } from './views/profile.js';
import { createView } from './views/create.js';
import { editView } from './views/edit.js';
import { detailsView } from './views/details.js';
import { averagePricesView } from './views/average.js';

const main = document.querySelector('main')

page('/', decorateContext, home)
page('/login', decorateContext, loginView)
page('/register', decorateContext, registerView)
page('/listings', decorateContext, listingsView)
page('/profile', decorateContext, profileView)
page('/create', decorateContext, createView)
page('/edit/:id', decorateContext, editView)
page('/details/:id', decorateContext, detailsView)
page('/average', decorateContext, averagePricesView)

setUserNav();
page.start()

document.getElementById('logoutBtn').addEventListener('click', async () => {
    await logout();
    setUserNav();
    page.redirect('/');
});

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
}

function setUserNav() {
    const username = sessionStorage.getItem('username');
    if (username != null) {
        document.getElementById('welcomeMessage').textContent = `Welcome, ${username}`;
        document.getElementById('profile').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('profile').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}