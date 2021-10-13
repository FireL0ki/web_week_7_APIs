let animals = ['Giraffe', 'Elephant', 'Yak']

// classic call back function
animals.forEach( function(animal) {
    console.log(animal, index)
})

// error notation version, more concise, don't need the word function
animals.forEach( (animal, index) => {
    console.log(animal, index)
})

// even more concise
animals.forEach( (animal, index) => console.log(animal,index) )

// more versions-- use the version that makes sense to you
animals.forEach( function(animal) {
    console.log(animal)
})

animals.forEach( animal => console.log(animal) )