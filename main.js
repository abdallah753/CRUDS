let mood = 'creat'
let ic;

let count = 0
let inpname = document.querySelector(".name input")
let inpprice = document.querySelector(".price .pric")
let inptaxes = document.querySelector(".price .taxes")
let inpads = document.querySelector(".price .ads")
let inpdis = document.querySelector(".price .discount")
let spantotal = document.querySelector(".price .total")
let inpcatig = document.querySelector(".catig input")
let inpcount = document.querySelector(".count input")
let inpsearch = document.querySelector(".search input")
let inpcreat = document.querySelector(".creat input")
let inspancount = document.querySelector(".spancount")
let tablbody = document.querySelector('table tbody')
let table = document.querySelector('.delet table')

function getTotal(){
    if(inpprice.value != ''){
        spantotal.textContent = +inpprice.value + +inptaxes.value + +inpads.value + +inpdis.value
    }
}
function clearinput(){
    inpname.value = ''
    inpprice.value = ''
    inptaxes.value = ''
    inpads.value = ''
    inpdis.value = ''
    spantotal.textContent = ''
    inpcatig.value = ''
    inpcount.value = ''
}

let namee;
if(window.localStorage.getItem('product')){
    namee = JSON.parse(window.localStorage.getItem('product'))
}else{
    namee = []
}
let id = 0
inpcreat.addEventListener('click' , (e) => {
    let obj = {
        id:id += 1,
        name:inpname.value,
        price:inpprice.value,
        taxes:inptaxes.value,
        ads:inpads.value,
        discount:inpdis.value,
        total: spantotal.textContent,
        category:inpcatig.value,
        count:inpcount.value,
    }
if(mood == 'creat'){
if(inpcount.value > 1){
        for(let i = 0 ; i < +inpcount.value ; i++){
            namee.push(obj)
            window.localStorage.setItem('product' , JSON.stringify(namee))
            count += 1
            showdata()
        }
        inspancount.innerHTML = tablbody.children.length
        clearinput()
    }else{
        namee.push(obj)
        window.localStorage.setItem('product' , JSON.stringify(namee))
        showdata()
        inspancount.innerHTML = tablbody.children.length
        clearinput()
    }
}else{
    namee[ic] = obj
    window.localStorage.setItem('product' , JSON.stringify(namee))
    showdata()
    mood = 'creat'
    inpcount.style = 'display: block;'
    inpcreat.value = "Creat"
    clearinput()
}
})

function showdata(){
    inspancount.innerHTML = namee.length
    let tr;
        if(namee.length === 0){
        tablbody.innerHTML = null
    }else{
    for(let i = 0; i < namee.length ; i++){
        tr += `
        <tr>
            <td>${namee[i].id}</td>
            <td>${namee[i].name}</td>
            <td>${namee[i].price}</td>
            <td>${namee[i].taxes}</td>
            <td>${namee[i].ads}</td>
            <td>${namee[i].discount}</td>
            <td>${namee[i].total}</td>
            <td>${namee[i].category}</td>
            <td><button onclick="update(${i})" class="updatebutton">UPDATE</button></td>
            <td><button onclick="delet(${i})" class="deletebutton">DELETE</button></td>
        </tr>`
}
tablbody.innerHTML = tr
}
}

showdata()

function delet(i){
    namee.splice(i , 1)
    window.localStorage.setItem('product' , JSON.stringify(namee))
    if(count > 0){
        inspancount.innerHTML = count -= 1
    }
    showdata()
}

let pdelet = document.querySelector('.pdelete')

pdelet.addEventListener('click' , (e) => {
    window.localStorage.clear()
    namee = []
    showdata()
})

function update(i){
    mood = 'update'
        inpcreat.value = "Update"
        inpname.value = namee[i].name
        inpprice.value = namee[i].price
        inptaxes.value = namee[i].taxes
        inpads.value = namee[i].ads
        inpdis.value = namee[i].discount
        getTotal()
        inpcatig.value = namee[i].catigory
        inpcount.style = 'display: none;'
        scroll({
            top:0,
            behavior:"smooth",
        })
        ic = i
} 

function search(){
    if(inpsearch.value != ''){
        let tr;
        for (let i = 0; i < namee.length; i++) {
            if(namee[i].category.includes(inpsearch.value)){
                tr += `
        <tr>
            <td>${namee[i].id}</td>
            <td>${namee[i].name}</td>
            <td>${namee[i].price}</td>
            <td>${namee[i].taxes}</td>
            <td>${namee[i].ads}</td>
            <td>${namee[i].discount}</td>
            <td>${namee[i].total}</td>
            <td>${namee[i].category}</td>
            <td><button onclick="update(${i})" class="updatebutton">UPDATE</button></td>
            <td><button onclick="delet(${i})" class="deletebutton">DELETE</button></td>
        </tr>`
    tablbody.innerHTML = tr
            }
        }
    }else{
        showdata()
    }
}