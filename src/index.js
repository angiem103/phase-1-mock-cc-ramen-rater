document.addEventListener('DOMContentLoaded', () => {
    ramenMenu = document.querySelector('#ramen-menu')
    fetch('http://localhost:3000/ramens')
    .then(res => res.json())
    .then(ramens => {
        ramenImages(ramens)
    })
})

function ramenImages(ramens) {
    ramens.forEach(ramen => {
        let img = document.createElement('img')
        img.src = ramen.image
        img.setAttribute('id', ramen.id)
        ramenMenu.appendChild(img)

        img.addEventListener('click', (e) =>{
            getRamen(e.target.id)
            
        })
 })
}

function getRamen (id) {
    fetch(`http://localhost:3000/ramens/${id}`)
    .then(res => res.json())
    .then(ramen => {
        renderRamen(ramen)
    })
}

function renderRamen(ramen) {
    const image = document.querySelector('.detail-image')
    const h2 = document.querySelector('.name')
    const h3 = document.querySelector('.restaurant')
    const ramenRating = document.querySelector('#rating-display')
    console.log(ramenRating)
    const ramenComment = document.querySelector('#comment-display')
    ramenRating.textContent = ramen.rating
    ramenComment.textContent = ramen.comment
    image.src = ramen.image
    image.alt = ramen.name
    h2.textContent = ramen.name
    h3.textContent = ramen.restaurant
    const form = document.querySelector('#new-ramen')
    form.dataset.id = ramen.id
}

function submitRamen() {
    const form = document.querySelector('#new-ramen')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const newRating = document.querySelector('#new-rating').value
        //console.log(newRating)
        const newComment = document.querySelector('#new-comment').value
        const imgSource = document.querySelector('#new-image').value
        const ramenObj = {
            id: parseInt(form.dataset.id),
            rating: newRating,
            comment: newComment,
            image: imgSource
        }

        submitRamen(ramenObj)
        //console.log(ramenObj)
        const div = document.querySelector('#ramen-menu')
        newImage = document.createElement('img')
        newImage.src = imgSource
        div.append(newImage)

        e.target.reset()
        renderRamen(ramenObj)

    })
}

submitRamen()