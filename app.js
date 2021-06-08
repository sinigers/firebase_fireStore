const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

//create elment and render cafe
function renderCafe(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);

    cafeList.appendChild(li);

    // delete data
    cross.addEventListener('click', (ev) =>{
        ev.stopPropagation();
        //fing individual id of documnet and delete it
        let id = ev.target.parentElement.getAttribute('data-id');
        db.collection('cafes').doc(id).delete();
    })
}

// get  data from collection and creat snapshot
// orderBy sorts info by condition alphabeticaly. first Capital letters - lower.
// If add query/where/ and ordering/orederBy/ - somethimes fire base give error. Should create index in FBase from browser console
db.collection('cafes').orderBy('city').get().then((snapshot) => {
    // console.log(snapshot.docs);
    snapshot.docs.forEach(doc =>{
        // console.log(doc.data());
        renderCafe(doc);
    })
}); 
// then()- when information is geted from db

// saving data
form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    db.collection('cafes').add({
        name:form.name.value,
        city:form.city.value
    });
    // clear form fealds
    form.name.value='';
    form.city.value='';
})