let i = 0;
let picSrc = document.querySelector('.select-pic');
let picName = document.querySelector('.select-name');

const selectBox = {
    items: [], //распакованный json с цветами
    container: '.select-pic',
    
    select: '#select',

    catalogUrl: 'https://raw.githubusercontent.com/polly-cloud/practice-plantShop-/main/plants.json',


    init() {
        this.items = [];
        this.getData(this.catalogUrl)
            .finally(() => {
                this._fetchPics()
                // this._render()
            })
        
        document.querySelector(this.select).addEventListener('change', evt => {
            for (let el of this.items) {
                if (evt.target.value == el.name) {
                    makepic(el);
                    goForward(el);
                    goBack(el);
                    console.log(el)
                }
            }
        });
    },

    getData(url) {
        return fetch(url)
            .then(data => data.json())
            .then((data2) => {this.items = data2})
    },

    _fetchPics() {
        let arr = [];

        this.items.forEach(item => {
            arr.push(createPics(item))
        })
        console.log(arr);
        this.items = arr;

    },
}

function makepic(el) {
    picSrc.classList.remove('invisible')
    picSrc.src = el.plantImg[0];
    picName.innerHTML = el.plant[0];

}

function goForward(el) {
    document.querySelector('.select-forward').addEventListener('click', () => {
        i++;
        if (i < el.plantImg.length) {
            
            picSrc.src = el.plantImg[i];
            picName.innerHTML = el.plant[i];
        } else {
            i = 0;
            picSrc.src = el.plantImg[i];
            picName.innerHTML = el.plant[i];
        }
    });
}

function goBack(el) {
    document.querySelector('.select-back').addEventListener('click', () => {
        i--;
        if (i < 0) {
            i = el.plantImg.length - 1;
            picSrc.src = el.plantImg[i];
            picName.innerHTML = el.plant[i];
        } else {
            picSrc.src = el.plantImg[i];
            picName.innerHTML = el.plant[i];
        }
        });
}

function createPics(item) { //selectBox.items
    return {
        name: item.name,
        plant: item.plant,
        plantImg: item.plantImg,
    }
}



selectBox.init();

