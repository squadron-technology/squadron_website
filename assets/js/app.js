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
          let itemHtml = `<div class="col-lg-3 col-md-4 col-sm-6" data-aos="fade-up" data-aos-delay="100">
          <div class="features-item">
            <img loading="lazy" src="${item.icon}" style="height: 32px;width: 42px;padding: 4px;"class="img-fluid" alt="${item.title}">
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
            <a href="#">
              <span>${category.category}</span> 
              <i class="bi bi-chevron-down toggle-dropdown"></i>
            </a>
            <ul class="submenu">
        `;
        // Render services within the category
        category.services.forEach((service) => {
          const serviceSlug = convertToSlug(service.title);
          categoryMenuHTML += `<li class="">
            <a href="#${serviceSlug}">${service.title}</a></li>`;
        });
        categoryMenuHTML += `</ul></li>`;
        servicesMenu.innerHTML += categoryMenuHTML;
      });
      navmenulinks = document.querySelectorAll(".navmenu a");
      // Addming these when navigation content loaded so that it can open properly
      navmenuScrollspy();
      hideMobileNav();
      toggleMobileNav();
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
      categories.forEach((category, cIndex) => {
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
          const delay = (index + 1) * 100; // Incremental delay for animations
          const serviceHTML = `
          <div id="${serviceSlug}" style="scroll-margin-top: 120px;" class="col-xl-4 col-md-6 d-flex" data-aos="fade-up" data-aos-delay="${delay}">
            <div class="service-item position-relative">
            <h4>
                <span class="service-icon">${service.icon}</span>
                <a href="#" class="stretched-link">${service.title}</a>
            </h4>
              <p>${service.description}</p>
            </div>
          </div>
        `;
          servicesContainer.innerHTML += serviceHTML;
        });
        if (cIndex < categories.length - 1) {
          // Add the Divider section after the last category
          servicesContainer.innerHTML += ` <section class="divider section light-background"></section>`;
        }
      });
    })
    .catch((error) => console.error("Error loading services:", error));
}

// Function to fetch and display services also including top menu of services with categories
function getJobs() {
  const container = document.getElementById("jobs-container");
  // Fetch services data from JSON
  fetchData("assets/data/jobs.json")
    .then((jobs) => {
      if (jobs.length === 0) {
        container.innerHTML = `<div class="col-12"><h3 class="category-title">No Open Jobs Available</h3></div>`;
        return;
      }
      jobs.forEach((job, index) => {
        const slug = convertToSlug(job.title);
        const delay = (index + 1) * 100; // Incremental delay for animations
        const serviceHTML = `
        <div id="${slug}" class="col-xl-4 col-md-6 d-flex" data-aos="fade-up" data-aos-delay="${delay}">
          <div class="service-item position-relative">
          <h4>
              <span class="job-icon bi bi-briefcase"></span>
              <a target="_blank" href="${job.apply_link}" class="stretched-link">${job.title}</a>
          </h4>
            <p>${job.description}</p>
             <p>
              <strong>Location:</strong> ${job.location}
            </p>
             <div class="d-flex mt-2">
              <a target="_blank" href="${job.apply_link}" class="btn-apply">Apply</a>
            </div>
          </div>
        </div>
      `;
        container.innerHTML += serviceHTML;
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
          <div class="col-lg-6 col-sm-6 col-md-6">
            <div class="stats-item d-flex">
              <i class="${stat.icon} flex-shrink-0"></i>
              <div>
                <span data-purecounter-start="0" data-purecounter-end="${stat.value}" data-purecounter-duration="1" class="purecounter">${stat.value}+</span>
                <p><strong>${stat.title}</strong></p>
              </div>
            </div>
          </div>
    `;
      });
    })
    .catch((error) => console.error("Error loading Stats:", error));
}

function getFAQ() {
  const container = document.getElementById("faq-container-");
  // Fetch certificates data from JSON
  fetchData("assets/data/faq.json")
    .then((faqs) => {
      faqs.forEach((faq, index) => {
        container.innerHTML += `<div class="accordion-item mb-3">
    <h2 class="accordion-header" id="heading-${index}">
      <button style="font-weight: 500;" class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${index}" aria-expanded="false" aria-controls="collapse-${index}">
      ${faq.question}
      </button>
    </h2>
    <div id="collapse-${index}" class="accordion-collapse collapse" aria-labelledby="heading-${index}" data-bs-parent="#accordionExample">
      <div class="accordion-body">
      ${faq.answer}
      </div>
    </div>
  </div>`;
      });
    })
    .catch((error) => console.error("Error loading FAQ:", error));
}

function getCaseStudies() {
  const caseStudiesContainer = document.getElementById(
    "case-studies-container"
  );
  // Fetch case studies data from JSON
  fetchData("assets/data/case-studies.json")
    .then((caseStudies) => {
      caseStudies.forEach((caseStudy, index) => {
        let caseStudyHTML = `
           <div class="marquee-item" >
            <div class="service-item position-relative">
              <div class="img">
                <img loading="lazy" src="${caseStudy.image}" class="img-fluid" alt="${caseStudy.title}">
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
  const certificatesContainer = document.getElementById(
    "certificates-container"
  );
  // Fetch certificates data from JSON
  fetchData("assets/data/certifications.json")
    .then((certificates) => {
      certificates.forEach((certificate, index) => {
        let certificateHTML = `<div class="col-lg-2 col-md-3 portfolio-item isotope-item filter-app">
              <div class="portfolio-content text-center">
                <img loading="lazy" src="${certificate.icon}" class="img-fluid" alt="${certificate.title}">
                <div class="portfolio-info">
                  <h4>${certificate.title}</h4>
                </div>
              </div>
            </div>`;
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

// Utility function to convert a string to a slug
function convertToSlug(text) {
  return text
    .toLowerCase() // Convert to lowercase
    .replace(/^\d+/g, "") // Remove numbers from the beginning
    .replace(/\//g, "") // Remove slashes
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^a-z0-9\-]/g, ""); // Remove any non-alphanumeric characters except hyphens
}