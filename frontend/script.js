async function removeBackground() {
  const fileInput = document.getElementById('upload');
  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('https://bg-remover-backend-oqgc.onrender.com/remove_bg', {
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

// async function uploadImage() {
//   const input = document.getElementById("imageInput");
//   const file = input.files[0];
//   if (!file) {
//     alert("Please select an image!");
//     return;
//   }

//   const formData = new FormData();
//   formData.append("file", file);

//   const response = await fetch("https://bg-remover-backend-oqgc.onrender.com/remove_bg", {
//     method: "POST",
//     body: formData,
//   });

//   if (!response.ok) {
//     alert("Failed to remove background");
//     return;
//   }

//   const blob = await response.blob();
//   const url = URL.createObjectURL(blob);

//   document.getElementById("output").innerHTML = `
//     <h3>Result:</h3>
//     <img src="${url}" alt="Processed Image" />
//     <a href="${url}" download="bg_removed.png">Download</a>
//   `;
// }
