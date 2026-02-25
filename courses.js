let coursesData = []; //empty array to store courses from the xml

function loadCourses() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "courses.xml", true); //AJAX request to the get request 

    xhr.onload = function() {
        if (this.status === 200) {
            const xml = this.responseXML;
            const courses = xml.getElementsByTagName("course"); //Get the all xml data in the course element
            coursesData = [];

            for (let i = 0; i < courses.length; i++) { //for loop for the each course
                const course = courses[i];
                
                coursesData.push({ //store data to the coursesData Array
                    level: course.getAttribute("level"),
                    code: course.getElementsByTagName("code")[0].textContent,
                    name: course.getElementsByTagName("name")[0].textContent,
                    duration: course.getElementsByTagName("duration")[0].textContent,
                    entry: course.getElementsByTagName("entry")[0].textContent,
                    description: course.getElementsByTagName("description")[0].textContent
                });
            }

            displayCourses(coursesData); // Display Courses
        }
    };

    xhr.send();
}

// function to clear the container and create course card dynamically
function displayCourses(courses) { 
    const container = document.getElementById("coursesContainer");
    container.innerHTML = ""; //clear old data

    courses.forEach(course => {
//create card for course
        const card = document.createElement("div");
        card.classList.add("course-page-card");
        card.setAttribute("data-level", course.level); //stores level as a custom attribute

//insert the course information
// put backticks to insert dynamic data
        card.innerHTML = ` 
            <span class="code">${course.code}</span>
            <h3>${course.name}</h3>
            <p>${course.description}</p>
            <p><strong>Duration:</strong> ${course.duration}</p>
            <p><strong>Entry:</strong> ${course.entry}</p>
        `;

        // Click to go to details page
        card.addEventListener("click", function() {
            window.location.href = "course-details.html?code=" + course.code;
        });

        container.appendChild(card);
    });
}
// filter courses
function filterCourses() {
    const selectedLevel = document.getElementById("levelFilter").value; //slecting a level

    if (selectedLevel === "All") { //if all slected then show everything
        displayCourses(coursesData);
    } else {
        const filtered = coursesData.filter(c => c.level === selectedLevel); //else filter level
        displayCourses(filtered);
    }
}

window.onload = loadCourses; //auto loading when the page reload
