console.log('test')
const apps = [
    'Red Dead Redemption',
    'Uber',
    'Tinder',
    'Craigslist',
    'Twitter',
    'To do list',
    'Calculator',
   'News app',
    'Vine',
    'Foursquare',
    'Video editing app',
    'Spotify',
    'Pinterest',
    'Keyboard',
    ]
    
const descriptions = [
    'Swimmers',
    'Construction workers',
    'Wrestlers',
    'Programmers',
    'Dogs',
    'Attending movies',
    'Dog owners',
    'Wedding planners',
    'Sports starts',
    'Watching sports',
    'Firemen',
    'Scientists',
    'Debt collectors',
    'Movers',
    'Moving furniture',
    'Shoeshopping',
    'Bird watching',
    'Attending weddings',
    'Musicians',
    'Mechanics',
    'Dog walkers',
    'foodies',
    ]

const generateButton = document.getElementById('generateButton')
console.log(generateButton)
generateButton.addEventListener('click', () => {
    // program to get a random item from an array

    function getRandomItem(arr) {

    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);

    // get random item
    const item = arr[randomIndex];

    return item;
}
    const randomApp = getRandomItem(apps);
    console.log(randomApp)
    const randomDescription = getRandomItem(descriptions);
    console.log(randomDescription)
    const message = `The ${randomApp} for ${randomDescription}`
    const generatedIdea = document.getElementById('generatedIdea')
    generatedIdea.innerText = message
})

const saveIdea = document.getElementById('saveIdea')
saveIdea.addEventListener('click', async () => {
    const response = await fetch('/api/ideas/', {
        method: 'POST',
        body: JSON.stringify({ description: 'Twitter for Farmers' }),
        headers: { 'Content-Type': 'application/json' },
        
      });
      console.log(response)
})