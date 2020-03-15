// inizio configurazione pwa

const alertBox = document.getElementById("updateNotification");
const updateButton = document.getElementById("updateButton");

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('sw.js').then(function (registration) {
      //check if page was loaded via service worker
      if (!navigator.serviceWorker.controller) {
        return;
      }

      // if updated service worker is waiting
      if (registration.waiting) {
        console.log("sw waiting")
        updateReady(registration.waiting);
      }
      //if service worker is installing
      if (registration.installing) {
        //track installing
        console.log("sw installing")
        trackInstalling(registration.installing);
        return;
      }

      //listen for service worker update
      registration.addEventListener('updatefound', function () {
        console.log("updatefound")
        trackInstalling(registration.installing);
      })

      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function (err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

function trackInstalling(worker) {
  worker.addEventListener('statechange', function () {
    if (worker.state == 'installed') {
      updateReady(worker);
    }
  })
}

function updateReady(worker) {
  alertBox.style.display = "block";
  updateButton.addEventListener('click', function () {
    worker.postMessage({
      action: 'skipWaiting'
    });

  });
}


navigator.serviceWorker.addEventListener("controllerchange", function () {
  window.location.reload();
})

// fine configurazione pwa

var video = document.querySelector("#videoElement");

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({
      video: true
    })
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (err0r) {
      console.log("Something went wrong!");
    });
}