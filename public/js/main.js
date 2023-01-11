function onSubmit(event) {
    event.preventDefault()

    // reset DOM elements
    document.querySelector('#message').textContent = ''
    document.querySelector('#image').src = ''

    const prompt = document.querySelector('#prompt').value
    const size = document.querySelector('#size').value

    if (prompt === '') {
        alert('Please add a prompt')
        return
    }

    // console.log(prompt, size)
    generateImageRequest(prompt, size)
}

async function generateImageRequest(prompt, size) {
    try {

        showSpinner()

        const response = await fetch('/openai/generateimage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt,
                size
            })
        })

        if (!response.ok) {
            removeSpinner()
            throw new Error("Image could not be generated")
        }

        const data = await response.json()
        // console.log(data)

        const imageUrl = data.imageUrl
        document.querySelector('#image').src = imageUrl
        
        removeSpinner()

    } catch (error) {
        document.querySelector('#message').textContent = error
    }
}

function showSpinner() {
    document.querySelector('.spinner').classList.add('show')
}

function removeSpinner() {
    document.querySelector('.spinner').classList.remove('show')
}



document.querySelector('#image-form').addEventListener('submit', onSubmit)