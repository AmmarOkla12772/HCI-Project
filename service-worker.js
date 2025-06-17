const CACHE_NAME = "libraria-cache-v1";
const OFFLINE_URLS = [


    "components/header.html",
    "components/headerS.html",
    "components/headerL.html",
    "components/headerA.html",
    "components/footer.html",

    "index.html",
    "books.html",
    "bookdetails.html",
    "borrowhistory.html",
    "roleSelect.html",
    "student.html",
    "log in.html",
    "log in2.html",
    "log in3.html",

    "librarian.html",
    "manageResources.html",
    "manageBooks.html",
    "updateStock.html",
    "supportTickets.html",
    "ticketDetails.html",
    "ticketReply.html",
    "studentList.html",
    "sendNotification.html",

    "assets/img/51HwNMz3EuL._SL1500_ 1.png",
    "assets/img/813nURWkkbL._SL1500_ 1.png",
    "assets/img/81nmItWccYL._SL1199_ 1.png",
    "assets/img/admin.png",
    "assets/img/booking requests.png",
    "assets/img/BOOKS.png",
    "assets/img/catalogue.png",
    "assets/img/chess.png",
    "assets/img/coding.png",
    "assets/img/COMPUTERS.png",
    "assets/img/EBOOKS.png",
    "assets/img/freepik-minimalist-linear-library-book-logo-20250526074542nwFt.png",
    "assets/img/Group 2.png",
    "assets/img/ICON.png",
    "assets/img/image 1.png",
    "assets/img/image 3.png",
    "assets/img/image 4.png",
    "assets/img/JOURNALS.png",
    "assets/img/librarian.png",
    "assets/img/libraryBIG.png",
    "assets/img/MAGAZINES.png",
    "assets/img/manage resources.png",
    "assets/img/OIP (3) 1.png",
    "assets/img/OIP (9) 1.png",
    "assets/img/OZYMANDIAS.png",
    "assets/img/RESEARCHPAPERS.png",
    "assets/img/settings.png",
    "assets/img/student list.png",
    "assets/img/student.png",
    "assets/img/support tickets.png",
    "assets/img/users.png",
    "assets/img/why nations fail.png",
    "assets/img/wishlist.png",



    "assets/css/styles.css",
    "assets/css/variables.css",
    "assets/css/reset.css",
    "assets/js/main.js",
    "assets/js/db.js",
    "manifest.json",

    "adminDashboard.html",
    "manageCatalogue.html",
    "addResource.html",
    "userList.html",
    "addUser.html",

    "offline.html"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return Promise.all(
                OFFLINE_URLS.map(url =>
                    fetch(url).then(response => {
                        if (!response.ok) throw new Error(`Request failed for ${url}`);
                        return cache.put(url, response.clone());
                    }).catch(err => {
                        console.error("❌ Failed to cache:", url, err.message);
                    })
                )
            );
        })
    );
});

// Activate event: clean old caches
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            )
        )
    );
    self.clients.claim();
});

// Fetch event: serve cached files if offline
self.addEventListener("fetch", (event) => {
    if (event.request.method !== "GET") return;

    event.respondWith(
        caches.match(event.request).then((cached) => {
            return (
                cached ||
                fetch(event.request).catch(() =>
                    caches.match("offline.html") // optional fallback if you add offline.html
                )
            );
        })
    );
});


self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/books.html') 
    );
});