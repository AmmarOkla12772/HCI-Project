let db;

const request = indexedDB.open("LibrariaDB", 1);

request.onerror = () => console.error("❌ DB failed to open");
request.onsuccess = () => {
    db = request.result;
    console.log("✅ DB opened successfully");
};

request.onupgradeneeded = (e) => {
    db = e.target.result;

    if (!db.objectStoreNames.contains("borrowed_books")) {
        db.createObjectStore("borrowed_books", { keyPath: "id" });
    }

    if (!db.objectStoreNames.contains("borrow_requests")) {
        db.createObjectStore("borrow_requests", { keyPath: "id" });
    }
};
