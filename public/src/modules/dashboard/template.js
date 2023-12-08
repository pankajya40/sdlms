class CardTemplate {
    constructor() { }

    static Templates() {

        let cards = {

            card : function (data) {
              return `<div class="border-bottom border-left border-right product-card cursor-pointer product-card-top-border" data-id="${data.id}">
              <div class="product-card-heading">${data.assets}</div>
              <p>${data.detail}</p>
              <img class="product-card-image" src="${data.img_link}" alt="">
            </div>`
            }
        }

        return  cards;
    }
}