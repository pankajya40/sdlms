"use strict";

/* globals define */

define("forum/sdlms/test", ["api", "sdlms/getFileFromInput"], (api) => {
    let a = {}
    
    a.init = function init() {
        /* const getFile = selector => new Promise((resolve, reject) => {
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
        }); */
        $(() => {
            $("[type='file']").change(async (e) => {
                console.log(e.target.files[0])
                console.log(await getFile(e.target))
            });
            $("button").click(async () => {
                const data = await getFile('[type="file"]')
                const res = await $.post("/tests/uploads", {file: data})
                console.log(res)
                $(`<img src="${res.url}">`).appendTo("#images").attr("src", res.url)
    
            })
        })
    }
    return a
})