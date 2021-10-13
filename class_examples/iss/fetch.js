let url = 'https://api.wheretheiss.at/v1/satellites/25544'

let issLat = document.querySelector('#iss-lat')
let isslong = document.querySelector('#iss-long')
let timeIssLocationFetched = document.querySelector('#time')

let update = 10000 // 10 seconds, could do more frequently, but weighs it down, polite to 
// not do it more than neccessary
let maxFailedAttempts = 3 // added for recursive timeout code update

let issMarker
let icon = L.icon({
    iconUrl: 'iss_icon.png',
    iconSize: [50, 50],
    iconAnchor: [25, 25]
})


let map = L.map('iss-map').setView([0, 0,], 1) 

// TODO double check this- do I need to add my own access key / map?
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

iss(maxFailedAttempts) // call function one time to start -- updated to add maxFailedAttempts for recursive timeout
// setInterval(iss, update)  // removing in order to set up recursive set timeout

function iss(attempts) {  // update for recursive timeout code update

    if (attempts <= 0 ) {
        alert('Failed to contact ISS server after several attempts.')
        return
    }

    fetch(url).then( (res) => {  // make initial request to URL
        return res.json() // process response into JSON
    }).then( (issData) => {  // issData holds whatever res.json returns
        console.log(issData)  // TODO - display data on the web page

        let lat = issData.latitude
        let long = issData.longitude

        issLat.innerHTML = lat
        isslong.innerHTML = long

        // create marker if it doesn't exist
        // move marker if it does exist

        if (!issMarker) {
            // create marker
            issMarker = L.marker([lat, long], {icon: icon}).addTo(map)
        } else {
            issMarker.setLatLng([lat, long])
        }

        let now = Date()
        timeIssLocationFetched.innerHTML = `This data was fetched at ${now}`

    }).catch( (err) => {
        attempts-- // subtract one from number of attempts (attempts = attempts - 1 is the same thing)
        console.log('ERROR!', err)
    }).finally( () => {
        setTimeout(iss, update, attempts)  // added for recursive Timeout -- meaning instead of updating every 10 seconds
        // this will update 10 seconds after the last request was successful, or errored out 
        // Essentially, after the request was fully processed and done, so we are not constantly backlogging a server with requests
    })
}