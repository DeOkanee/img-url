async function uploadImage() {
    const formData = new FormData();
    formData.append('image', document.querySelector('#imageInput').files[0]);
  
    try {
      const response = await fetch('https://img-url-converter.vercel.app/upload', {
        method: 'POST',
        body: formData
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      document.querySelector('#url').textContent = data.url;
      document.querySelector('#url').innerHTML = `<img src="${data.url}" alt="Uploaded Image" />`;
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  document.querySelector('#uploadButton').addEventListener('click', uploadImage);
  