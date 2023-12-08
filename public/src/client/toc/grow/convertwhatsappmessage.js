function convertToWhatsAppMessage(htmlCode) {
    // create a temporary div element to hold the HTML code
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlCode;
  
    // get all the paragraphs, strong and emphasis tags
    const paragraphs = tempDiv.getElementsByTagName('p');
    const strongTags = tempDiv.getElementsByTagName('strong');
    const emphasisTags = tempDiv.getElementsByTagName('em');
  
    // create the WhatsApp message variable
    let message = '';
  
    // iterate over the paragraphs and append their inner text to the message variable
    for (let i = 0; i < paragraphs.length; i++) {
      message += paragraphs[i].innerText + '\n\n';
    }
  
    // iterate over the strong tags and append their inner text to the message variable with an asterisk on either side
    for (let i = 0; i < strongTags.length; i++) {
      message += '*' + strongTags[i].innerText + '*\n\n';
    }
  
    // iterate over the emphasis tags and append their inner text to the message variable with an underscore on either side
    for (let i = 0; i < emphasisTags.length; i++) {
      message += '_' + emphasisTags[i].innerText + '_\n\n';
    }
  
    // get the ordered and unordered lists
    const orderedList = tempDiv.getElementsByTagName('ol')[0];
    const unorderedList = tempDiv.getElementsByTagName('ul')[0];
  
    // if there is an ordered list, iterate over its list items and append their inner text to the message variable with a number and period in front
    if (orderedList) {
      const listItems = orderedList.getElementsByTagName('li');
      for (let i = 0; i < listItems.length; i++) {
        message += (i + 1) + '. ' + listItems[i].innerText + '\n';
      }
      message += '\n';
    }
  
    // if there is an unordered list, iterate over its list items and append their inner text to the message variable with a bullet in front
    if (unorderedList) {
      const listItems = unorderedList.getElementsByTagName('li');
      for (let i = 0; i < listItems.length; i++) {
        message += '\u2022 ' + listItems[i].innerText + '\n';
      }
      message += '\n';
    }
  
    // get the link if present and add it to the message with a description if available
    const link = tempDiv.getElementsByTagName('a')[0];
    if (link) {
      const linkText = link.innerText || link.href;
      const linkHref = link.href;
      message += linkText + ': ' + linkHref + '\n';
    }
  
    return whatsappMessage;
}
