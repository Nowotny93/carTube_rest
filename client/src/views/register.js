import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/services.js';

const registerTemplate = (onSubmit) => html `
<section >
    <div id="register-form">
        <form @submit=${onSubmit}>
            <h1 id="register-form-headers"><i class="fa-solid fa-address-card" id="register-form-icon"></i>Register</h1>

            <hr>

            <p id="register-form-label">Username</p>
            <input id="register-input-field" type="text" placeholder="Enter Username" name="username" required>

            <p id="register-form-label">Password</p>
            <input id="register-input-field" type="password" placeholder="Enter Password" name="password" required>

            <p id="register-form-label">Repeat Password</p>
            <input id="register-input-field" type="password" placeholder="Repeat Password" name="repeatPass" required>


            <input type="submit" id="register-button" value="Register">
        </form>
        <div id="register-login-link">
            <p>Already have an account?
                <a href="/login">Login</a>
            </p>
        </div>
    </div>
</section>
`

export async function registerView(ctx) {
    ctx.render(registerTemplate(onSubmit))

    async function onSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.target)
        const username = formData.get('username').trim()
        const password = formData.get('password').trim()
        const repeatPass = formData.get('repeatPass').trim()

        try{
            if (!username || !password) {
                throw new Error('All fields are required!');
            }

            if (password != repeatPass) {
                throw new Error('Passwords don\'t match!');
            }

            await register(username, password)
            ctx.setUserNav();
            ctx.page.redirect('/listings');
        } catch (error) {
            alert(error.message);
        }
    }
}