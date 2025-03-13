async function fetchPiDigits() {
  try {
    const response = await fetch('https://api.pi.delivery/v1/pi?start=0&numberOfDigits=1000');
    const data = await response.json();
    const piDigits = data.content;
    const piString = piDigits.slice(0, 1) + '.' + piDigits.slice(1);

    const marquee = document.createElement('marquee');
    marquee.id = 'pi-marquee';
    marquee.setAttribute('scrollamount', '2');
    marquee.setAttribute('direction', 'left');
    marquee.textContent = piString;

    document.body.insertBefore(marquee, document.body.lastChild); // Add at top
  } catch (error) {
    console.error('Error fetching Pi digits:', error);
  }
}

fetchPiDigits();
