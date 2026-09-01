'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}



// ---------------------------------------------------------------------------
// PROJECT DETAIL MODAL
// ---------------------------------------------------------------------------
// Clicking a project card now opens an in-page detail modal instead of
// redirecting to GitHub. Descriptions live here, keyed by the card's
// data-project-id. (Text-to-SQL is sourced from its README; the others are
// drafted from the project title/category — edit any of them freely.)

const projectData = {

  "text-to-sql": {
    title: "Text-to-SQL with Clarification Engine",
    category: "NLP",
    image: "./assets/images/project-12.png",
    repo: "https://github.com/KislayTinker/text-to-sql-clarification-engine",
    tags: ["Python", "FastAPI", "Streamlit", "Groq LLM", "SQLite", "SQLAlchemy", "pytest", "GitHub Actions"],
    description: `
      <p>An LLM-powered system that turns plain-English questions into validated SQL and runs them against a live database — with a twist most text-to-SQL tools skip: it detects when a question is <em>ambiguous</em> and asks a clarifying question before generating any query.</p>
      <p>The pipeline reflects the database schema at runtime, uses a Groq-hosted LLM to interpret intent against that schema, and only proceeds once the request is unambiguous. Generated SQL passes through a safety validator that permits <strong>SELECT-only</strong> statements before execution, and the results are summarized back to the user in natural language.</p>
      <p>Built with FastAPI (API layer), Streamlit (UI), SQLite + SQLAlchemy (schema reflection) and sqlparse (validation), with a pytest suite and GitHub Actions CI. It demonstrates practical LLM orchestration, guardrails, and multi-turn conversational design.</p>
    `
  },

  "distributed-kv": {
    title: "Distributed Key-Value Store",
    category: "Systems",
    image: "./assets/images/project-9.png",
    repo: "https://github.com/KislayTinker/Distributed-Key-Value-Store",
    tags: ["Distributed Systems", "Key-Value Store", "Replication", "Concurrency", "Networking"],
    description: `
      <p>A networked key-value storage system built to explore the core challenges of distributed systems — storing and retrieving data across multiple nodes rather than a single machine.</p>
      <p>The project works through concepts such as client–server communication, distributing data across nodes, replication for durability, and keeping data consistent when multiple clients read and write concurrently.</p>
      <p>It's a systems-focused build that demonstrates an understanding of networking, concurrency, and the classic trade-offs — consistency, availability, and fault tolerance — that sit behind real-world distributed databases.</p>
    `
  },

  "resume-ai": {
    title: "Resume-AI Personalized Chatbot",
    category: "NLP",
    image: "./assets/images/project-7.png",
    repo: "https://github.com/KislayTinker/Resume-AI-Chatbot",
    tags: ["NLP", "LLM", "Chatbot", "Retrieval-Augmented", "Python"],
    description: `
      <p>A conversational assistant that answers questions about a candidate's résumé and background — letting a recruiter or visitor "chat with the resume" instead of reading it top to bottom.</p>
      <p>It grounds a large language model in the candidate's actual resume content so answers stay accurate and personalized, using a retrieval-augmented approach to pull the most relevant experience, skills, or projects for each question.</p>
      <p>The project shows applied LLM/NLP skills — prompt design, grounding responses in a knowledge source, and packaging it all into an interactive chatbot.</p>
    `
  },

  "satellite": {
    title: "Satellite Image Classification & Enhancement",
    category: "ML / AI",
    image: "./assets/images/project-8.png",
    repo: "https://github.com/KislayTinker/satellite-image-classification",
    tags: ["Computer Vision", "Deep Learning", "Image Classification", "Python"],
    description: `
      <p>A computer-vision project that classifies satellite / remote-sensing imagery into land-use or terrain categories, paired with an image-enhancement step that improves visual quality before analysis.</p>
      <p>The classification side uses deep-learning models trained to recognize patterns in aerial imagery, while the enhancement side applies techniques to sharpen, denoise, or upscale images so features are easier to distinguish.</p>
      <p>It combines two useful CV capabilities — recognition and enhancement — and demonstrates hands-on experience with image data, model training, and evaluation.</p>
    `
  },

  "trade-recon": {
    title: "Trade Reconciliation & Exception Reporting",
    category: "Data Analytics",
    image: "./assets/images/project-11.png",
    repo: "https://github.com/KislayTinker/Trade-Reconciliation-System",
    tags: ["Data Analytics", "Reconciliation", "Exception Reporting", "Python"],
    description: `
      <p>A data-analytics tool aimed at a common financial-operations problem: reconciling trade records across different sources and automatically flagging the mismatches ("exceptions") that need human review.</p>
      <p>It compares datasets to find breaks — missing trades, quantity or price discrepancies, and other inconsistencies — then produces exception reports that clearly summarize what doesn't match and why.</p>
      <p>The project mirrors real back-office / fintech workflows and demonstrates data cleaning, comparison logic, and clear reporting of results.</p>
    `
  },

  "stock-pred": {
    title: "Stock Price Prediction System",
    category: "ML / AI",
    image: "./assets/images/project-3.jpg",
    repo: "https://github.com/KislayTinker/Stock-Price-Prediction",
    tags: ["Machine Learning", "Time Series", "Forecasting", "Python"],
    description: `
      <p>A machine-learning system that forecasts future stock prices from historical market data, framing price movement as a time-series prediction problem.</p>
      <p>It ingests historical price data, engineers features, trains predictive models, and visualizes predicted versus actual prices to gauge how closely the model tracks real movements.</p>
      <p>The project demonstrates the end-to-end ML workflow — data acquisition, feature engineering, model training, and evaluation — applied to financial time series.</p>
    `
  },

  "reddit-sentiment": {
    title: "Reddit Sentiment Analysis System",
    category: "NLP",
    image: "./assets/images/project-2.png",
    repo: null,
    tags: ["NLP", "Sentiment Analysis", "Text Classification", "Python"],
    description: `
      <p>An NLP system that gauges public sentiment on Reddit — collecting posts and comments about a topic and classifying the overall mood as positive, negative, or neutral.</p>
      <p>It processes raw social-media text (cleaning, tokenizing, and normalizing), applies sentiment classification, and aggregates the results to show how opinion trends across a discussion or topic.</p>
      <p>The project demonstrates text preprocessing, sentiment analysis, and turning noisy social data into interpretable insight.</p>
    `
  },

  "drowsiness": {
    title: "Real-Time Driver Drowsiness Detection",
    category: "ML / AI",
    image: "./assets/images/project-10.png",
    repo: "https://github.com/KislayTinker/Drowsiness-Detection",
    tags: ["Computer Vision", "Real-Time", "Facial Analysis", "Python"],
    description: `
      <p>A real-time computer-vision system that monitors a driver through a webcam and raises an alert when it detects signs of drowsiness — a safety application aimed at preventing fatigue-related accidents.</p>
      <p>It analyzes the live video feed to track facial cues (typically eye state and blink/closure patterns) and triggers a warning the moment those cues suggest the driver is nodding off.</p>
      <p>The project demonstrates real-time video processing, facial analysis, and building a responsive alerting loop — applied computer vision with a clear, practical use case.</p>
    `
  },

  "course-rec": {
    title: "Hybrid Course Recommendation System",
    category: "ML / AI",
    image: "./assets/images/project-1.jpg",
    repo: "https://github.com/KislayTinker/Courses-Recommendation-System",
    tags: ["Recommender Systems", "Collaborative Filtering", "Content-Based", "Python"],
    description: `
      <p>A recommender system that suggests online courses to learners using a <em>hybrid</em> approach — blending two recommendation strategies to give better suggestions than either could alone.</p>
      <p>It combines content-based filtering (matching courses to a learner's interests and course attributes) with collaborative filtering (learning from patterns across many users) to balance personalization with discovery.</p>
      <p>The project demonstrates recommender-system fundamentals, similarity and scoring techniques, and the reasoning behind hybrid models.</p>
    `
  },

  "superstore": {
    title: "Retail Superstore Sales Analytics",
    category: "Data Analytics",
    image: "./assets/images/project-5.png",
    repo: "https://github.com/KislayTinker/Super-Store-Sales",
    tags: ["Data Analytics", "EDA", "Visualization", "Python"],
    description: `
      <p>An exploratory data-analytics project on retail "superstore" sales data, digging into what actually drives sales and profit across products, regions, and customer segments.</p>
      <p>It cleans and explores the dataset, then surfaces trends and insights — top and underperforming categories, regional performance, and profitability patterns — through analysis and visualizations.</p>
      <p>The project demonstrates the analytics workflow end to end: data cleaning, exploratory analysis, visualization, and translating raw numbers into business-relevant insight.</p>
    `
  },

  "collegebot": {
    title: "College AI Assistant (Multilingual)",
    category: "NLP",
    image: "./assets/images/project-4.png",
    repo: "https://github.com/KislayTinker/CollegeBot",
    tags: ["NLP", "Chatbot", "Multilingual", "Python"],
    description: `
      <p>A multilingual chatbot that answers college / campus questions — admissions, courses, facilities, and general FAQs — so students can get instant answers in whichever language they're most comfortable with.</p>
      <p>It interprets a user's question across multiple languages and responds conversationally with the relevant college information, instead of making them dig through a website.</p>
      <p>The project demonstrates conversational NLP, multilingual handling, and designing an assistant around a real, everyday user need.</p>
    `
  },

  "search-engine": {
    title: "In-Memory Search Engine (Java)",
    category: "Systems",
    image: "./assets/images/project-6.png",
    repo: "https://github.com/KislayTinker/In-Memory-Search-Engine",
    tags: ["Java", "Data Structures", "Inverted Index", "Search"],
    description: `
      <p>A search engine implemented in Java that indexes a collection of documents in memory and returns fast, ranked results for keyword queries — built from the ground up rather than relying on a search library.</p>
      <p>It's organized around an inverted index (mapping terms to the documents that contain them) so lookups stay fast, with ranking to order results by relevance.</p>
      <p>The project demonstrates core CS fundamentals — data structures, indexing, and search/ranking algorithms — implemented efficiently in Java.</p>
    `
  }

};

// project modal elements
const projectItems = document.querySelectorAll("[data-project-item]");
const projectModalContainer = document.querySelector("[data-project-modal-container]");
const projectModalCloseBtn = document.querySelector("[data-project-modal-close-btn]");
const projectOverlay = document.querySelector("[data-project-overlay]");
const projectModalImg = document.querySelector("[data-project-modal-img]");
const projectModalTitle = document.querySelector("[data-project-modal-title]");
const projectModalCategory = document.querySelector("[data-project-modal-category]");
const projectModalText = document.querySelector("[data-project-modal-text]");
const projectModalTags = document.querySelector("[data-project-modal-tags]");
const projectModalLink = document.querySelector("[data-project-modal-link]");

const openProjectModal = function (id) {
  const data = projectData[id];
  if (!data || !projectModalContainer) return;

  projectModalImg.src = data.image;
  projectModalImg.alt = data.title;
  projectModalTitle.innerHTML = data.title;
  projectModalCategory.innerHTML = data.category;
  projectModalText.innerHTML = data.description;

  // tech tags
  projectModalTags.innerHTML = "";
  if (data.tags && data.tags.length) {
    data.tags.forEach(function (tag) {
      const li = document.createElement("li");
      li.className = "project-modal-tag";
      li.textContent = tag;
      projectModalTags.appendChild(li);
    });
    projectModalTags.style.display = "";
  } else {
    projectModalTags.style.display = "none";
  }

  // "View on GitHub" button is currently commented out in index.html, so this
  // element may be absent — guard against it. (Re-enabling the HTML reactivates this.)
  if (projectModalLink) {
    if (data.repo) {
      projectModalLink.href = data.repo;
      projectModalLink.style.display = "";
    } else {
      projectModalLink.removeAttribute("href");
      projectModalLink.style.display = "none";
    }
  }

  projectModalContainer.classList.add("active");
  projectOverlay.classList.add("active");
};

const closeProjectModal = function () {
  if (!projectModalContainer) return;
  projectModalContainer.classList.remove("active");
  projectOverlay.classList.remove("active");
};

// open on click / keyboard (cards are role="button")
for (let i = 0; i < projectItems.length; i++) {
  projectItems[i].addEventListener("click", function (e) {
    e.preventDefault();
    openProjectModal(this.dataset.projectId);
  });
  projectItems[i].addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openProjectModal(this.dataset.projectId);
    }
  });
}

if (projectModalCloseBtn) projectModalCloseBtn.addEventListener("click", closeProjectModal);
if (projectOverlay) projectOverlay.addEventListener("click", closeProjectModal);

// close on Escape
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeProjectModal();
});
