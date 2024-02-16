import {html, render} from '../node_modules/lit-html/lit-html.js'

const modalOnChoiceTemplate = (msg, onChoice) => html `
<div id="modal">
    <p>${msg}</p>
    <button id="modal-button" @click=${() => onChoice(true)}>OK</button>
    <button id="modal-button" @click=${() => onChoice(false)}>Cancel</button>
</div>`

const overlay = document.createElement('div')
overlay.id = 'overlay'

export function createOnChoiceModal(msg, callback) {
    render(modalOnChoiceTemplate(msg, onChoice), overlay)
    document.body.appendChild(overlay)

    function onChoice(choice) {
        clearModal()
        callback(choice)
    }
}

function clearModal () {
    overlay.remove()
}