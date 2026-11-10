import resumeUrl from '../assets/CV.pdf?url';

document.getElementById('resume').href = resumeUrl;

const form = document.getElementById('contact-form');
const submitButton = form.querySelector('button');
const status = document.getElementById('form-status');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    submitButton.disabled = true;
    status.textContent = 'Sending…';

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            headers: { Accept: 'application/json' },
            body: new FormData(form)
        });

        if (!response.ok) {
            status.textContent = 'The message could not be sent. Please try again or use the email link.';
            return;
        }

        form.reset();
        status.textContent = 'Message sent. Thank you.';
    } catch {
        status.textContent = 'The message could not be sent. Please try again or use the email link.';
    } finally {
        submitButton.disabled = false;
    }
});
