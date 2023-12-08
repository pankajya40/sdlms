const getFile = selector => new Promise((resolve, reject) => {
    const file = $(selector)[0].files[0]
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve({
        data: reader.result.replace(/^data\:[A-Za-z0-9\/]+\;base64\,/, ""), 
        type: reader.result.match(/^data\:([A-Za-z0-9\/]+)\;base64\,/)[1],
        name: file.name,
        originalFilename: file.name,
        headers: {"content-type": reader.result.match(/^data\:([A-Za-z0-9\/]+)\;base64\,/)[1]}
    });
    reader.onerror = error => reject(error);
});
