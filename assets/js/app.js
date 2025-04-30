document.addEventListener("DOMContentLoaded", function () {
    const servicesContainer = document.getElementById("services-container");
    const servicesMenu = document.getElementById("services-list");


    // Fetch services data from JSON
    fetchData("assets/data/services.json")
      .then(categories => {
        // Sort categories by the 'order' field
        categories.sort((a, b) => a.order - b.order);
        categories.forEach(category => {
        // Convert category name to slug for IDs and links
        const categorySlug = convertToSlug(category.category);
          // Create a category title
          const categoryTitleHTML = `
            <div class="col-12" id=${categorySlug}>
              <h3 class="category-title">${category.category}</h3>
            </div>
          `;
          let categoryMenuHTML = `
            <li class="dropdown">
                <a href="#${categorySlug}"><span>${category.category}</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
                <ul>
            `
          servicesContainer.innerHTML += categoryTitleHTML;
          // Render services within the category
          category.services.forEach((service, index) => {
            const serviceSlug = convertToSlug(service.title);
            categoryMenuHTML += `<li><a href="#${serviceSlug}">${service.title}</a></li>`
            const delay = (index + 1) * 100; // Incremental delay for animations
            const serviceHTML = `
              <div id="${serviceSlug}" class="col-xl-3 col-md-6 d-flex" data-aos="fade-up" data-aos-delay="${delay}">
                <div class="service-item position-relative">
                <h4>
                    <span class="service-icon">${service.icon}</span>
                    <a href="" class="stretched-link">${service.title}</a>
                </h4>
                  <p>${service.description}</p>
                </div>
              </div>
            `;
            servicesContainer.innerHTML += serviceHTML;
          });
          categoryMenuHTML += `</ul></li>`
          servicesMenu.innerHTML += categoryMenuHTML;
        });

      })
      .catch(error => console.error("Error loading services:", error));
  });


// Common function to fetch JSON data
function fetchData(url) {
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .catch(error => {
        console.error(`Error fetching data from ${url}:`, error);
        throw error;
      });
  }

// Utility function to convert a string to lowercase and replace spaces with hyphens
function convertToSlug(text) {
    return text.toLowerCase().replace(/\s+/g, '-');
}