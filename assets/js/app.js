document.addEventListener("DOMContentLoaded", function () {
  getNavigationServices()
  getServices();
  getToolsAndTech();
  getCertificates()
  getStats()
  getCaseStudies();
  getFAQ()
});

// Function to fetch and display tools and technologies with categories
function getToolsAndTech() {
  const toolsContainer = document.getElementById("tools-container");
  // Fetch tools data from JSON
  // Convert category name to slug for IDs and links
  // Fetch services data from JSON
  fetchData("assets/data/tools-tech.json")
    .then((tools) => {
      // Sort categories by the 'order' field
      //  tools.sort((a, b) => a.order - b.order);
      tools.forEach((tool) => {
        // Convert category name to slug for IDs and links
        const slug = convertToSlug(tool.category);
        // Create a category title
        const categoryTitleHTML = `
         <div class="col-12" id=${slug}>
           <h3 class="category-title">${tool.category}</h3>
         </div>
       `;
        toolsContainer.innerHTML += categoryTitleHTML;
        // Render services within the category
        tool.items.forEach((item, index) => {
          const itemSlug = convertToSlug(item.title);
          let itemHtml = `<div class="col-lg-3 col-md-4" data-aos="fade-up" data-aos-delay="100">
          <div class="features-item">
            <img src="${item.icon}" style="height: 32px;width: 42px;"class="img-fluid" alt="${item.title}">
            <h3><a href="#${itemSlug}" class="stretched-link">${item.title}</a></h3>
          </div>
        </div> `;
          toolsContainer.innerHTML += itemHtml;
        });
      });
    })
    .catch((error) => console.error("Error loading:", error));
}

function getNavigationServices() {
  const servicesMenu = document.getElementById("services-list");
  // Fetch services data from JSON
  fetchData("assets/data/services.json")
    .then((categories) => {
      // Sort categories by the 'order' field
      categories.sort((a, b) => a.order - b.order);
      categories.forEach((category) => {
        // Convert category name to slug for IDs and links
        const categorySlug = convertToSlug(category.category);
        // Create a category title
        let categoryMenuHTML = `
        <li class="dropdown">
            <a href="#${categorySlug}"><span>${category.category}</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
            <ul>
        `;
        // Render services within the category
        category.services.forEach((service) => {
          const serviceSlug = convertToSlug(service.title);
          categoryMenuHTML += `<li><a href="#${serviceSlug}">${service.title}</a></li>`;
        });
        categoryMenuHTML += `</ul></li>`;
        servicesMenu.innerHTML += categoryMenuHTML;
      });
    })
    .catch((error) => console.error("Error loading services:", error));
}

// Function to fetch and display services also including top menu of services with categories
function getServices() {
  const servicesContainer = document.getElementById("services-container");
  // Fetch services data from JSON
  fetchData("assets/data/services.json")
    .then((categories) => {
      // Sort categories by the 'order' field
      categories.sort((a, b) => a.order - b.order);
      categories.forEach((category) => {
        // Convert category name to slug for IDs and links
        const categorySlug = convertToSlug(category.category);
        // Create a category title
        const categoryTitleHTML = `
        <div class="col-12" id=${categorySlug}>
          <h3 class="category-title">${category.category}</h3>
        </div>
      `;
        servicesContainer.innerHTML += categoryTitleHTML;
        // Render services within the category
        category.services.forEach((service, index) => {
          const serviceSlug = convertToSlug(service.title);
          // categoryMenuHTML += `<li><a href="#${serviceSlug}">${service.title}</a></li>`;
          const delay = (index + 1) * 100; // Incremental delay for animations
          const serviceHTML = `
          <div id="${serviceSlug}" class="col-xl-4 col-md-6 d-flex" data-aos="fade-up" data-aos-delay="${delay}">
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
      });
    })
    .catch((error) => console.error("Error loading services:", error));
}

function getStats() {
  const statsContainer = document.getElementById("stats-container");
   // Fetch certificates data from JSON
   fetchData("assets/data/stats.json")
   .then((stats) => {
    stats.forEach((stat, index) => {
      statsContainer.innerHTML += `
          <div class="col-lg-6">
            <div class="stats-item d-flex">
              <i class="${stat.icon} flex-shrink-0"></i>
              <div>
                <span data-purecounter-start="0" data-purecounter-end="${stat.value}" data-purecounter-duration="1" class="purecounter">${stat.value}+</span>
                <p><strong>${stat.title}</strong></p>
              </div>
            </div>
          </div>
    `
     })
    }).catch((error) => console.error("Error loading Stats:", error));
}

function getFAQ() {
  const container = document.getElementById("faq-container");
   // Fetch certificates data from JSON
   fetchData("assets/data/faq.json")
   .then((faqs) => {
    faqs.forEach((faq, index) => {
      container.innerHTML += `
        <div class="row faq-item" data-aos="fade-up" data-aos-delay="100">
          <div class="col-lg-5 d-flex">
            <i class="bi bi-question-circle"></i>
            <h4>${faq.question}</h4>
          </div>
          <div class="col-lg-7">
            <p>
            ${faq.answer}
          </div>
        </div>
    `
     })
    }).catch((error) => console.error("Error loading FAQ:", error));
}

function getCaseStudies() {
  const caseStudiesContainer = document.getElementById("case-studies-container");
  // Fetch case studies data from JSON
  fetchData("assets/data/case-studies.json")
    .then((caseStudies) => {
      caseStudies.forEach((caseStudy, index) => {
        let caseStudyHTML = `
           <div class="col-lg-6" data-aos="zoom-in" data-aos-delay="200">
            <div class="service-item position-relative">
              <div class="img">
                <img src="${caseStudy.image}" class="img-fluid" alt="${caseStudy.title}">
              </div>
              <div class="details">
                <a href="${caseStudy.link}" class="stretched-link">
                  <h3>${caseStudy.title}</h3>
                </a>
                <p>${caseStudy.description}</p>
              </div>
            </div>
          </div>`;
        caseStudiesContainer.innerHTML += caseStudyHTML;
      });
    })
    .catch((error) => console.error("Error loading case studies:", error));
}

function getCertificates() {
  const certificatesContainer = document.getElementById("certificates-container");
  // Fetch certificates data from JSON
  fetchData("assets/data/certifications.json")
    .then((certificates) => {
      certificates.forEach((certificate, index) => {
        let certificateHTML =  `<div class="col-lg-2 col-md-3 portfolio-item isotope-item filter-app">
              <div class="portfolio-content text-center">
                <img src="${certificate.icon}" class="img-fluid" alt="${certificate.title}">
                <div class="portfolio-info">
                  <h4>${certificate.title}</h4>
                  <p>${certificate.title}</p>
                </div>
              </div>
            </div>`
        certificatesContainer.innerHTML += certificateHTML;
      });
    })
    .catch((error) => console.error("Error loading certificates:", error));
}

// Common function to fetch JSON data
function fetchData(url) {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error(`Error fetching data from ${url}:`, error);
      throw error;
    });
}

// Utility function to convert a string to lowercase and replace spaces with hyphens
function convertToSlug(text) {
  return text.toLowerCase().replace(/\s+/g, "-");
}
