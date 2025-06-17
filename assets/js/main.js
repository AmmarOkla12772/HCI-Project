// Dynamic HTML loader
function loadHTML(id, url) {
    const target = document.getElementById(id);
    if (target) {
        fetch(url)
            .then(res => res.text())
            .then(data => {
                target.innerHTML = data;
            });
    }
}

// Load components on page load
window.addEventListener("DOMContentLoaded", () => {
    loadHTML("header", "components/header.html");
    loadHTML("headerS", "components/headerS.html");
    loadHTML("headerL", "components/headerL.html");
    loadHTML("headerA", "components/headerA.html");
    loadHTML("footer", "components/footer.html");
});

// Scrollable book carousel
function scrollCarouselById(id, direction) {
    const carousel = document.getElementById(id);
    const scrollAmount = 220;
    if (carousel) {
        carousel.scrollBy({
            left: direction * scrollAmount,
            behavior: "smooth"
        });
    }
}

// Search form submission
const searchForm = document.getElementById('siteSearchForm');
if (searchForm) {
    searchForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const query = document.getElementById('siteSearchInput').value.toLowerCase().trim();
        const pages = {
            'landing': 'landing.html',
            'home': 'landing.html',
            'catalogue': 'catalogue.html',
            'books': 'books.html',
            'log in': 'log in.html',
            'role select': 'role-select.html',
            'student': 'student-dashboard.html',
            'admin': 'admin-panel.html'
        };

        if (pages[query]) {
            window.location.href = pages[query];
        } else {
            alert('No matching page found.');
        }
    });
}

// Search suggestions
const input = document.getElementById('siteSearchInput');
const suggestionBox = document.getElementById('searchSuggestions');

if (input && suggestionBox) {
    const pageNames = [
        'Landing',
        'log in',
        'Catalogue',
        'Books',
        'Role Select',
        'Student',
        'Admin'
    ];

    input.addEventListener('input', () => {
        const val = input.value.toLowerCase().trim();
        suggestionBox.innerHTML = '';

        if (val.length === 0) {
            suggestionBox.style.display = 'none';
            return;
        }

        const matches = pageNames.filter(p => p.toLowerCase().includes(val));

        if (matches.length === 0) {
            suggestionBox.style.display = 'none';
            return;
        }

        matches.forEach(match => {
            const li = document.createElement('li');
            li.className = 'list-group-item list-group-item-action';
            li.textContent = match;
            li.onclick = () => {
                input.value = match;
                suggestionBox.innerHTML = '';
                suggestionBox.style.display = 'none';
            };
            suggestionBox.appendChild(li);
        });

        suggestionBox.style.display = 'block';
    });
}

// Register Service Worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("service-worker.js")
            .then((reg) => {
                console.log("✅ Service Worker registered:", reg.scope);
            })
            .catch((err) => {
                console.error("❌ Service Worker registration failed:", err);
            });
    });
}

// Notification System
document.addEventListener("DOMContentLoaded", function () {
    const notifyButton = document.getElementById('notify-btn');

    if (notifyButton) {
        notifyButton.addEventListener('click', function () {
            if (!("Notification" in window)) {
                alert("This browser doesn't support notifications");
                return;
            }

            Notification.requestPermission().then(function (permission) {
                if (permission === "granted") {
                    new Notification("Libraria Notifications Enabled", {
                        body: "You'll now receive alerts about new books and due dates",
                        icon: "/assets/img/icon-192.png"
                    });

                    notifyButton.innerHTML = "✓";
                    notifyButton.style.backgroundColor = "#28a745";
                }
            });
        });
    }
});