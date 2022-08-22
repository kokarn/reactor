const mainForm = document.querySelector('form');
const helperLink = document.querySelector('a');

let uid = window.data.uid || 'Not set';

if(uid === 'undefined'){
    uid = 'Not set';
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#id-wrapper').innerHTML = uid;

    if(uid !== 'Not set'){
        document.querySelector('[name="uid"]').value = uid;
    }
}, false);

mainForm.addEventListener('submit', (event) => {
    event.preventDefault();

    window.electronAPI.setUid(document.querySelector('[name="uid"]').value);
});

helperLink.addEventListener('click', (event) => {
    event.preventDefault();

    let state = helperLink.innerHTML;

    if(state === 'Ok, got it'){
        helperLink.innerHTML = 'Show me how to get my uid';
        document.querySelector('img').classList.toggle('hide');
        window.electronAPI.hideHelper();
    } else {
        helperLink.innerHTML = 'Ok, got it';
        document.querySelector('img').classList.toggle('hide');
        window.electronAPI.showHelper();
    }

});