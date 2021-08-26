(function () {
    if (!('indexedDB' in window)) {
        console.warn('IndexedDB not supported')
        return
    }

    let db;
    let dbReq = indexedDB.open('dbf', 1);
    dbReq.onupgradeneeded = function (event) {
        // Set the db variable to our database so we can use it
        db = event.target.result;

        // Create an object store named paintings. Object stores
        // in databases are where data are stored.
        let paintings = db.createObjectStore('paintings', {
            keyPath: 'id',
            autoIncrement: false
        });
        paintings.createIndex("painterName", "painter", {
            unique: false
        })
    }

    dbReq.onerror = function (event) {
        alert('error opening database ' + event.target.errorCode);
    }

    dbReq.onsuccess = function (event) {
        db = event.target.result;

        // Add paintings
        addPaintings(db, data);

        // Once the database is ready, display the notes we already have!
        getAndDisplayPaintings(db);
    }
})();

function addPainting(db, painting) {
    let tx = db.transaction(['paintings'], 'readwrite');
    let store = tx.objectStore('paintings');

    let query = store.add(painting);

    query.onsuccess = function (event) {
        console.log(event)
    }
    query.onerror = function (event) {
        console.log(event.target.errorCode);
    }

    tx.oncomplete = function () {

    }
}

function addPaintings(db, paintings, callback) {
    let tx = db.transaction(['paintings'], 'readwrite');
    let store = tx.objectStore('paintings');

    paintings.forEach(painting => {
        console.log(painting.id)
        let query = store.add(painting);

        query.onsuccess = function (event) {
            console.log(event)
        }
        query.onerror = function (event) {
            console.log(event.target.errorCode);
        }
    });

    tx.oncomplete = function () {
        db.close();
    }
}

function getAndDisplayPaintings(db) {
    let tx = db.transaction(['paintings'], 'readonly');
    let store = tx.objectStore('paintings');

    // Create a cursor request to get all items in the store, which 
    // we collect in the allPaintings array
    let req = store.openCursor();
    let allPaintings = [];

    req.onsuccess = function (event) {
        // The result of req.onsuccess in openCursor requests is an IDBCursor
        let cursor = event.target.result;

        if (cursor) {
            // If the cursor isn't null, we got an item. Add it to the
            // the paintings array and have the cursor continue!
            allPaintings.push(cursor.value);
            cursor.continue();
        } else {
            // If we have a null cursor, it means we've gotten
            // all the items in the store, so display the paintings we got.
            displayPaintings(allPaintings);
        }
    }

    req.onerror = function (event) {
        alert('error in cursor request ' + event.target.errorCode);
    }
}

function displayPaintings(paintings) {
    console.log(document.getElementById('paintings').innerHTML)
    if (document.getElementById('paintings').innerHTML === '') {
        let listHTML = '<ul>';
        for (let i = 0; i < paintings.length; i++) {
            let painting = paintings[i];
            listHTML += '<li>' +
                painting.title + '</li>';
        }

        document.getElementById('paintings').innerHTML = listHTML;
    }
}

function getJsonArray(json) {
    let array = [];
    for (var key in json) {
        if (json.hasOwnProperty(key)) {
            let item = json[key];
            array.push({
                title: item.title,
                filename: item.filename,
                position: item.position,
                price: item.price,
                painter: item.painter,
                height: item.height,
                width: item.width,
                frameHeight: item.frameHeight,
                frameWidth: item.frameWidth,
                sold: item.sold
            });
        }
    }
}

const data = [{
    id: 1,
    title: "Cabin in the Laurentians",
    filename: "(A-1) CABIN IN THE LAURENTIANS 20X24, OIL $750 FR 26X30.jpg",
    position: 1,
    price: "$750.00",
    painter: "Arja",
    height: 20,
    width: 24,
    frameHeight: 26,
    frameWidth: 30,
    sold: "no"
}, {
    id: 2,
    title: "Fall Reflections",
    filename: "(A-2) FALL REFLECTIONS 18X24, OIL $750 24X30 FR.jpg",
    position: 2,
    price: "$750.00",
    painter: "Arja",
    height: 18,
    width: 24,
    frameHeight: 24,
    frameWidth: 30,
    sold: "no"
}]

// const arjaPaintings = [];
// const joePaintings = [];
// const miscPaintings = [];