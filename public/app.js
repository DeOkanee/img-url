async function uploadImage() {
    const formData = new FormData();
    formData.append('image', document.querySelector('#fileInput').files[0]);

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        document.querySelector('#urlOutput').textContent = data.url;
        document.querySelector('#urlImagePreview').src = data.url;
        document.querySelector('#urlImagePreview').style.display = 'block';
    } catch (error) {
        console.error('Error:', error);
    }
}

document.querySelector('#uploadButton').addEventListener('click', uploadImage);
