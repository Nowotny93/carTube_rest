import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../api/services.js';
import { createWarningModal } from '../modal-warning.js'

const loginTemplate = (onSubmit) => html`
<section>
    <div id="login-form">
        <form action="#" method="post" @submit=${onSubmit}>
            <h1 id="login-form-headers"><i class="fa-solid fa-right-to-bracket" id="login-form-icon"></i>Login</h1>

            <hr>

            <p id="login-form-label">Username</p>
            <input id="login-input-field" placeholder="Enter Username" name="username" type="text">

            <p id="login-form-label">Password</p>
            <input id="login-input-field" type="password" placeholder="Enter Password" name="password">
            
            <input type="submit" id="login-button" value="Login">
        </form>
        <div id="login-register-link">
            <p>Dont have an account?
                <a href="/register">Register</a>
            </p>
        </div>
    </div>
</section>
`

export async function loginView (ctx) {
    ctx.render(loginTemplate(onSubmit))

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target)
        const username = formData.get('username').trim()
        const password = formData.get('password').trim()

        try{
            if (!username || !password) {
                // throw new Error('All fields are required!')
                createWarningModal('All fields are required!')
            }
    
            await login(username, password)
            ctx.setUserNav();
            ctx.page.redirect('/listings');
        } catch (err) {
            alert(err.message)
        }

    }
}