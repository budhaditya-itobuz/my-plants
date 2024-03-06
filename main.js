import { heroData, plantCollection, testimonyData } from "./data.js";

const hero = document.getElementById("hero-carousel");
const plantContainer = document.getElementById("plant-collection-body");
const collectionPrevBtn = document.getElementById("collection-prev");
const collectionNextBtn = document.getElementById("collection-next");
const heroPrevBtn = document.getElementById("hero-prev");
const heroNextBtn = document.getElementById("hero-next");
const testimonyContainer = document.getElementById('testimony-box');
const progressBar=document.getElementById('hero-progress')
const heroCurrItem=document.getElementById('curr-item')
const heroTotalItem=document.getElementById('total-item')



const prevItem = (container, item, number, length,extraWidth=0) => {
    const width = item.clientWidth + 40+extraWidth;
    container.scrollBy({ left: -width * number, behavior: "smooth" });

    const docViewLeft = container.scrollLeft;
    const elemLeft = item.offsetLeft;
    console.log(docViewLeft)
    console.log(docViewLeft, elemLeft);
    if (docViewLeft - elemLeft < 100)
        container.scrollBy({ left: 120000 * number, behavior: "smooth" });
};

const nextItem = (container, item, number, length,extraWidth=0) => {
    const width = item.clientWidth + 40+extraWidth;
    container.scrollBy({ left: width * number, behavior: "smooth" });

    const docViewRight = container.scrollLeft + container.clientWidth;
    if (Math.abs(docViewRight - item.clientWidth * length) < item.clientWidth/2)
        container.scrollBy({ left: -120000 * number, behavior: "smooth" });
};

const isScrolledIntoView = (container, item) => {
    const docViewLeft = container.scrollLeft;
    const docViewRight = docViewLeft + container.clientWidth;

    const elemLeft = item.offsetLeft;
    const elemRight = item.offsetLeft + item.clientWidth;

    return elemRight <= docViewRight && elemLeft >= docViewLeft;
};

const heroShow = () => {
    const heroItems = document.querySelectorAll(".hero-img");

    heroItems.forEach((item) => {
        item.classList.remove("hero-img-active");
    });

    heroItems.forEach((item,index) => {
        if (isScrolledIntoView(hero, item))
        {
            heroCurrItem.innerText=index+1
            progressBar.style=`width:${(index+1)/heroItems.length*100}%`
            item.classList.add("hero-img-active");
        }
    });
};

heroTotalItem.innerText=heroData.length

heroData.forEach((item, index) => {
    const div = document.createElement("div");
    const image = document.createElement("img");
    image.setAttribute("src", item.img);
    div.appendChild(image);
    div.classList.add("hero-img");
    div.setAttribute("id", "hero" + index);
    hero.appendChild(div);
});
heroShow()

plantCollection.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("collection-card");
    const img = document.createElement("img");
    img.setAttribute("src", item.img);
    const h4 = document.createElement("h4");
    h4.innerText = item.title;
    div.appendChild(img);
    div.appendChild(h4);
    div.setAttribute("id", "collectionItem" + index);
    plantContainer.appendChild(div);
});

testimonyData.forEach((item,index)=>{
    const card =document.createElement('div')
    card.classList.add('testimony-card')
    const profileImg=document.createElement('img')
    profileImg.setAttribute('src',item.img)
    profileImg.classList.add('testimony-profile')

    const frontQuote=document.createElement('img')
    frontQuote.setAttribute('src',"./images/testimony/front-quote.svg")
    const frontQuoteDiv=document.createElement('div')
    frontQuoteDiv.classList.add('front-quote')
    frontQuoteDiv.appendChild(frontQuote)

    const backQuote=document.createElement('img')
    backQuote.setAttribute('src',"./images/testimony/back-quote.svg")
    const backQuoteDiv=document.createElement('div')
    backQuoteDiv.classList.add('back-quote')
    backQuoteDiv.appendChild(backQuote)

    const h4=document.createElement('h4')
    h4.innerText=item.text

    card.appendChild(profileImg)
    card.appendChild(frontQuoteDiv)
    card.appendChild(h4)
    card.appendChild(backQuoteDiv)
    testimonyContainer.appendChild(card)
    if(index!== testimonyData.length-1)
    {
        const button =document.createElement('div')
        button.classList.add('testimony-play')
        const play=document.createElement('img')
        play.setAttribute('src','./images/components/arrow-right.svg')
        button.appendChild(play)
        testimonyContainer.appendChild(button)
    }

})


setInterval(()=>{
    const item=document.querySelectorAll('.testimony-card')[0]
    const extraWidth=document.querySelectorAll('.testimony-play')[0].clientWidth+40
    nextItem(testimonyContainer,item,1,testimonyData.length,extraWidth)
    console.log('hello')
},2000)

collectionNextBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const item = document.querySelectorAll(".collection-card")[0];
    nextItem(plantContainer, item, 1, plantCollection.length);
});
collectionPrevBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const item = document.querySelectorAll(".collection-card")[0];
    prevItem(plantContainer, item, 1, plantCollection.length);
});

heroPrevBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const item = document.querySelectorAll(".hero-img")[0];
    prevItem(hero, item, 1, heroData.length);
});

heroNextBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const item = document.querySelectorAll(".hero-img")[0];
    nextItem(hero, item, 1, heroData.length);
});

hero.addEventListener("scroll", (e) => {
    heroShow();
});
