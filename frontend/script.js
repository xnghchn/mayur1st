const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('upload');
const browseLink = document.getElementById('browse');
const spinner = document.getElementById('spinner');

browseLink.addEventListener('click', () => fileInput.click());

dropArea.addEventListener('dragover', e => {
  e.preventDefault();
  dropArea.style.background = '#e0f7ff';
});

dropArea.addEventListener('dragleave', () => {
  dropArea.style.background = '#fafafa';
});

dropArea.addEventListener('drop', e => {
  e.preventDefault();
  dropArea.style.background = '#fafafa';
  fileInput.files = e.dataTransfer.files;
});

async function removeBackground() {
  const file = fileInput.files[0];
  if (!file) {
    alert("Please select or drop an image first.");
    return;
  }

  const formData = new FormData();
  formData.append('file', file);

  spinner.style.display = 'block';

  const response = await fetch("https://bg-remover-backend-oqgc.onrender.com/remove-bg", {
    method: 'POST',
    body: formData
  });

  const blob = await response.blob();
  const img = document.getElementById('preview');
  const downloadBtn = document.getElementById('downloadBtn');
  const objectUrl = URL.createObjectURL(blob);

  spinner.style.display = 'none';
  img.src = objectUrl;
  downloadBtn.style.display = 'inline-block';
  downloadBtn.onclick = () => {
    const a = document.createElement('a');
    a.href = objectUrl;
    a.download = 'no-background.png';
    a.click();
  };
}
