<style>
  #myChart {
    width: 50%;
    margin: 0 auto;
  }

  .select2 {
    width: calc(100% - 40px) !important;
    display: block;
    display: block;
  }

  .select2-container {
    z-index: 1000000;
  }

  .select2-selection {
    width: 100%;
  }

  /* Hide the default checkboxes */
  .hideCheckbox[type=checkbox] {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  /* Style the label with the emoji icon */
  .emoji {
    display: inline-block;
    margin-right: 10px;
    font-size: 20px;
    cursor: pointer;
    transition: all 0.3s;
    filter: grayscale(1);
    transform: scale(1.2);
  }

  /* Change the size of the icon when the checkbox is checked */
  .sizeChangeAfter[type=checkbox]:checked+label {
    transform: scale(1.2);
    border: 1px solid;
  }

  /* Style the label with the "urgent" icon */
  #urgent-label:before {
    content: "🚨";
  }

  /* Style the label with the "important" icon */
  #important-label:before {
    content: "📌";
  }

  .form-check-input:checked+.form-check-label.emoji {
    position: relative;
    width: 50px;
    text-align: center;
    filter: grayscale(0);
    border-radius: 5px;
  }

  .form-check-input:checked+.form-check-label.emoji::before {
    content: "\2713";
    position: absolute;
    top: -9px;
    left: -5px;
    font-size: 14px;
    width: 19px;
    height: 18px;
    background: #ffff;
  }

  .resize-none {
    resize: none;
  }

  .common-border-radius {
    border-radius: 20px;
  }

  .complete-task {
    text-decoration: line-through;
  }

  .owl-prev,
  .owl-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 50px;
    /* Change this value to adjust the width of the icons */
    height: 50px;
    /* Change this value to adjust the height of the icons */
    background-color: white;
    /* Change this value to adjust the background color of the icons */
    border-radius: 50%;
    z-index: 999;
  }

  .owl-prev {
    left: 0;
  }

  .owl-next {
    right: 0;
  }

  .owl-carousel {
    position: relative;
    margin: 0 auto;
    width: 80%;
    /* Change this value to adjust the width of the carousel */
  }







  .quote-carousel .item {
    margin: 0 15px;
  }

  .quote-carousel .item blockquote {
    border-left: none;
    padding: 0;
  }

  .quote-carousel .item blockquote p {
    font-size: 24px;
    font-weight: 400;
  }

  .quote-carousel .item blockquote-footer {
    font-size: 18px;
    font-weight: 300;
  }

  .quote-carousel .item blockquote:before {
    display: none;
  }
</style>