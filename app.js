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
});

// real time listener. if db changes get them or remove 
db.collection('cafes').orderBy('city').onSnapshot(snapshot =>{
    let changes=snapshot.docChanges();
    // console.log(changes);
    changes.forEach(change => {
        //  console.log(change.doc.data());
        if(change.type == 'added'){
            renderCafe(change.doc)
        } else if(change.type == 'removed'){
            let li = cafeList.querySelector('[data-id=' + change.doc.id +']');
            cafeList.removeChild(li);
        }
    });

})