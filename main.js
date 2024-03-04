import { heroData, plantCollection } from "./data.js";


const hero = document.getElementById('hero-carousel')
const plantContainer = document.getElementById('plant-collection-body')
const collectionPrevBtn = document.getElementById('collection-prev')
const collectionNextBtn = document.getElementById('collection-next')



const prevItem = (container,item,number) => {
    const width = item.clientWidth
    container.scrollBy({ left: -width*number, behavior: "smooth" })
}
const nextItem=(container,item,number)=>{
    const width = document.getElementById('collection-item').clientWidth
    container.scrollBy({ left: width*number, behavior: "smooth" })
}


heroData.forEach((item) => {
    const image = document.createElement('img')
    image.setAttribute('src', item.img)
    image.classList.add('hero-img')
    hero.appendChild(image)
})

plantCollection.forEach(item => {
    const div = document.createElement('div')
    div.setAttribute('id', "collection-item")
    div.classList.add('collection-card')
    const img = document.createElement('img')
    img.setAttribute('src', item.img)
    const h4 = document.createElement('h4')
    h4.innerText = item.title
    div.appendChild(img)
    div.appendChild(h4)
    plantContainer.appendChild(div)
})

collectionNextBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const item=document.getElementById('collection-item')
    nextItem(plantContainer,item,1)
})
collectionPrevBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const item=document.getElementById('collection-item')
    prevItem(plantContainer,item,1)
})

