async function removeBackground() {
  const fileInput = document.getElementById('upload');
  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append('file', file);

 const response = await fetch('https://http://0.0.0.0:8000/remove-bg', {


    method: 'POST',
    body: formData
  });

  const blob = await response.blob();
  const img = document.getElementById('preview');
  const downloadBtn = document.getElementById('downloadBtn');
  const objectUrl = URL.createObjectURL(blob);

  img.src = objectUrl;
  downloadBtn.style.display = 'inline-block';
  downloadBtn.onclick = () => {
    const a = document.createElement('a');
    a.href = objectUrl;
    a.download = 'no-background.png';
    a.click();
  }
}
