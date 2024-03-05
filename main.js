import { heroData, plantCollection } from "./data.js";


const hero = document.getElementById('hero-carousel')
const plantContainer = document.getElementById('plant-collection-body')
const collectionPrevBtn = document.getElementById('collection-prev')
const collectionNextBtn = document.getElementById('collection-next')
const heroPrevBtn=document.getElementById('hero-prev')
const heroNextBtn=document.getElementById('hero-next')




const prevItem = (container, item, number) => {
    const width = item.clientWidth
    container.scrollBy({ left: -width * number, behavior: "smooth" })
}
const nextItem = (container, item, number) => {
    const width = item.clientWidth
    container.scrollBy({ left: width * number, behavior: "smooth" })
}

const isScrolledIntoView = (container, item) => {
    
    const docViewLeft = container.scrollLeft;
    const docViewRight = docViewLeft + container.clientWidth;
    
    const elemLeft = item.offsetLeft;
    const elemRight = item.offsetLeft +item.clientWidth
    console.log(docViewLeft,docViewRight,elemLeft,elemRight)

    return ((elemRight <= docViewRight) && (elemLeft >= docViewLeft))
}


heroData.forEach((item, index) => {
    const div=document.createElement('div')
    const image = document.createElement('img')
    image.setAttribute('src', item.img)
    div.appendChild(image)
    div.classList.add('hero-img')
    div.setAttribute('id', 'hero' + index)
    hero.appendChild(div)
})


const heroShow=()=>{

    const heroItems = document.querySelectorAll('.hero-img')
    
        heroItems.forEach((item)=>{
            item.classList.remove('hero-img-active')
        })
    
        heroItems.forEach((item)=>{
            console.log(item)
            if(isScrolledIntoView(hero,item))
            item.classList.add('hero-img-active')
        })
}

plantCollection.forEach((item, index) => {
    const div = document.createElement('div')
    div.classList.add('collection-card')
    const img = document.createElement('img')
    img.setAttribute('src', item.img)
    const h4 = document.createElement('h4')
    h4.innerText = item.title
    div.appendChild(img)
    div.appendChild(h4)
    div.setAttribute('id', "collectionItem" + index)
    plantContainer.appendChild(div)
})

collectionNextBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const item = document.querySelectorAll('.collection-card')[0]
    nextItem(plantContainer, item, 1)
})
collectionPrevBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const item = document.querySelectorAll('.collection-card')[0]
    prevItem(plantContainer, item, 1)
})

heroPrevBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    const item = document.querySelectorAll('.hero-img')[0]
    prevItem(hero,item,1)
})

heroNextBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    const item = document.querySelectorAll('.hero-img')[0]
    nextItem(hero,item,1)
})

hero.addEventListener('scroll', (e) => {
    heroShow()
})









