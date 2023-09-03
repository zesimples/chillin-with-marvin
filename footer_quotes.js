// Footer Quotes
const footerQuotes = {
  weatherForecast: [
    '"Portugal? Gonna live it up down ol\’ South America way, eh Mikey?"',
    '"Does it disturb anyone else that ‘The Los Angeles Angels’ baseball team translates directly to ‘The The Angels Angels’?”',
    '"Weather forecasts are humanity\'s humble attempt to understand the grand orchestra of nature."',
  ],
  jokeTeller: [
    '"I\'m not saying I\'m the smartest AI, but have you seen the alternative?"',
    '“Before you marry a person, you should first make them use a computer with slow Internet to see who they really are.”',
    '"A great joke-teller has the power to dissolve barriers and unite people in the universal language of laughter."',
  ],
  musicPlayer: [
    '"Courage is not having the strength to go on; it is going on when you don\'t have the strength.”',
    '"I\’m not superstitious, but I am a little stitious.”',
    '"Music is the language of the soul, a bridge between the spiritual and the mundane that everyone can cross."'
  ],
};

const footerQuotesElement = document.getElementById("footerQuotes");
// const menuItems = document.querySelectorAll(".navButton");


// (funciona desta forma, caso o mapa nao de)
// menuItems.forEach((menuItem) => {
//   menuItem.addEventListener("click", () => {
//     const randomIndex = Math.floor(Math.random() * footerQuotes.length);
//     const randomQuote = footerQuotes[randomIndex];
//     footerQuotesElement.innerHTML = randomQuote;
//   });
// });

menuItems.forEach((menuItem) => {
  menuItem.addEventListener("click", () => {
    const buttonId = menuItem.getAttribute("href").substring(1);
    const quotes = footerQuotes[buttonId];
    if (quotes) {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const randomQuote = quotes[randomIndex];
      footerQuotesElement.innerHTML = randomQuote;
    }
  });
});
  
  
  