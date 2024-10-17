// Sample data for courses
const courses = [
    {
        title: "Web Development Bootcamp",
        instructor: "John Doe",
        description: "Learn the basics of web development.",
        category: "web-development",
        level: "beginner",
        image: "images/course1.png",
    },
    {
        title: "Advanced Data Science",
        instructor: "Jane Smith",
        description: "Deep dive into data science techniques.",
        category: "data-science",
        level: "advanced",
        image: "images/course2.jpg",
    },
    {
        title: "Advanced Digital Marketing",
        instructor: "John Doe",
        description: "Weave your way through advanced learning of digital marketing.",
        category: "digital-marketing",
        level: "advanced",
        image: "images/course3.jpg"
    }
];

let displayedCourses = 0;
const coursesToDisplay = 3; // Number of courses to show at a time

function displayCourses() {
    const catalog = document.getElementById('courseCatalog');
    const end = displayedCourses + coursesToDisplay;
    const coursesToShow = courses.slice(displayedCourses, end);

    coursesToShow.forEach(course => {
        const card = document.createElement('div');
        card.className = "col-md-4 mb-4";
        card.innerHTML = `
            <div class="card">
                <img src="${course.image}" class="card-img-top" alt="${course.title}">
                <div class="card-body">
                    <h5 class="card-title">${course.title}</h5>
                    <p class="card-text">${course.description}</p>
                    <p class="card-text"><small class="text-muted">Instructor: ${course.instructor}</small></p>
                </div>
            </div>
        `;
        catalog.appendChild(card);
    });

    displayedCourses = end;
}

// Load more functionality
document.getElementById('loadMore').addEventListener('click', () => {
    displayCourses();
});

// Filtering functionality
document.getElementById('categoryFilter').addEventListener('change', filterCourses);
document.getElementById('levelFilter').addEventListener('change', filterCourses);
document.getElementById('searchBar').addEventListener('input', filterCourses);

function filterCourses() {
    const category = document.getElementById('categoryFilter').value;
    const level = document.getElementById('levelFilter').value;
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();

    // Clear existing displayed courses
    displayedCourses = 0;
    document.getElementById('courseCatalog').innerHTML = '';

    const filteredCourses = courses.filter(course => {
        return (
            (category === '' || course.category === category) &&
            (level === '' || course.level === level) &&
            (searchTerm === '' || course.title.toLowerCase().includes(searchTerm))
        );
    });

    // Display filtered courses
    filteredCourses.forEach(course => {
        const card = document.createElement('div');
        card.className = "col-md-4 mb-4";
        card.innerHTML = `
            <div class="card">
                <img src="${course.image}" class="card-img-top" alt="${course.title}">
                <div class="card-body">
                    <h5 class="card-title">${course.title}</h5>
                    <p class="card-text">${course.description}</p>
                    <p class="card-text"><small class="text-muted">Instructor: ${course.instructor}</small></p>
                </div>
            </div>
        `;
        document.getElementById('courseCatalog').appendChild(card);
    });

    // Reset displayed courses
    displayedCourses = Math.min(filteredCourses.length, coursesToDisplay);
}

// Initial load
displayCourses();
