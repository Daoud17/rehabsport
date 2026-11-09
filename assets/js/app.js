
document.addEventListener("DOMContentLoaded", () => {

    const menuToggle = document.getElementById("menuToggle");
    const primaryNav = document.getElementById("primaryNav");
    const siteHeader = document.getElementById("siteHeader");

    if (!menuToggle || !primaryNav || !siteHeader) return;

    function closeMenu() {
        menuToggle.classList.remove("is-active");
        primaryNav.classList.remove("is-open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    }

    function openMenu() {
        menuToggle.classList.add("is-active");
        primaryNav.classList.add("is-open");

        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Close navigation menu");
    }

    menuToggle.addEventListener("click", () => {
        const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close after selecting a navigation link
    primaryNav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    // Close when clicking outside the header
    document.addEventListener("click", event => {
        if (!siteHeader.contains(event.target)) {
            closeMenu();
        }
    });

    // Close with Escape
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            const wasOpen = menuToggle.getAttribute("aria-expanded") === "true";
            closeMenu();

            if (wasOpen) {
                menuToggle.focus();
            }
        }
    });

    // Reset when switching to desktop
    window.addEventListener("resize", () => {
        if (window.innerWidth > 991) {
            closeMenu();
        }
    });

});



/* =========================================
   FOOTER COPYRIGHT YEAR
========================================= */

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}



/* =========================================
   CONTACT FORM — DEMO SUBMISSION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("contactFormStatus");
    const submitButton = document.getElementById("contactSubmitBtn");

    if (!contactForm || !formStatus || !submitButton) {
        return;
    }

    /* =========================================
       HANDLE FORM SUBMISSION
    ========================================= */

    contactForm.addEventListener("submit", (event) => {

        // Prevent page reload
        event.preventDefault();

        // Validate required fields
        if (!contactForm.reportValidity()) {
            return;
        }

        // Display confirmation (demo only)
        formStatus.className = "contact-form-status success";

        formStatus.textContent =
            "Your message has been submitted successfully! " +
            "Thank you for contacting Rehab Sports Center.";

        formStatus.hidden = false;

        // Clear all form fields
        contactForm.reset();

        // Scroll to confirmation
        formStatus.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    });

    /* =========================================
       HIDE PREVIOUS SUCCESS MESSAGE
       WHEN USER STARTS A NEW MESSAGE
    ========================================= */

    contactForm.addEventListener("input", () => {
        formStatus.hidden = true;
    });

    contactForm.addEventListener("change", () => {
        formStatus.hidden = true;
    });

});




/* =========================================
   HOME PAGE — RECOVERY JOURNEY
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const journeySection = document.querySelector(".recovery-journey");

    if (!journeySection) return;

    const stepButtons = journeySection.querySelectorAll(".recovery-step");

    const counter = document.getElementById("recoveryStepCounter");
    const title = document.getElementById("recoveryStepTitle");
    const description = document.getElementById("recoveryStepDescription");
    const tagsContainer = document.getElementById("recoveryServiceTags");
    const progress = document.getElementById("recoveryProgress");

    const prevButton = document.getElementById("recoveryPrev");
    const nextButton = document.getElementById("recoveryNext");
    const panelContent = document.getElementById("recoveryPanelContent");

    /* =========================================
       SIX RECOVERY STAGES
    ========================================= */

    const recoveryStages = [

        {
            title: "Assess",
            description:
                "We begin by understanding your symptoms, movement, medical history, and personal recovery goals.",

            services: [
                "Initial Physiotherapy Consultation",
                "Movement Assessment",
                "Pain & Mobility Evaluation",
                "Recovery Goal Setting"
            ]
        },

        {
            title: "Evaluate",
            description:
                "A detailed physical evaluation helps identify movement limitations, muscle weaknesses, and factors contributing to your condition.",

            services: [
                "Muscle Strength Testing",
                "Joint Mobility Assessment",
                "Posture & Movement Analysis",
                "Sports Injury Evaluation"
            ]
        },

        {
            title: "Treat",
            description:
                "Your physiotherapy treatment is tailored to your condition, helping reduce discomfort and restore healthy movement.",

            services: [
                "Manual Therapy",
                "Therapeutic Exercise",
                "Pain Management",
                "Soft Tissue Treatment",
                "Mobility Restoration"
            ]
        },

        {
            title: "Rehabilitate",
            description:
                "Structured rehabilitation helps rebuild strength, stability, flexibility, and confidence through progressive exercises.",

            services: [
                "ACL & Knee Rehabilitation",
                "Football Injury Rehabilitation",
                "Post-Surgical Rehabilitation",
                "Strength & Conditioning",
                "Balance & Stability Training"
            ]
        },

        {
            title: "Progress",
            description:
                "We monitor your progress and adjust your rehabilitation exercises as your strength, mobility, and physical abilities improve.",

            services: [
                "Functional Movement Testing",
                "Strength Progression",
                "Mobility Reassessment",
                "Sports Performance Evaluation"
            ]
        },

        {
            title: "Return",
            description:
                "The final stage focuses on helping you return safely and confidently to daily activities, training, or competitive sports.",

            services: [
                "Return-to-Sport Rehabilitation",
                "Football Return-to-Play Preparation",
                "Injury Prevention Guidance",
                "Long-Term Exercise Planning"
            ]
        }

    ];

    let currentStep = 0;

    /* =========================================
       UPDATE ACTIVE STEP
    ========================================= */

    function updateJourney(stepIndex) {

        if (stepIndex < 0 || stepIndex >= recoveryStages.length) {
            return;
        }

        currentStep = stepIndex;

        const stage = recoveryStages[currentStep];

        // Update stage number and content
        counter.textContent = `STEP ${currentStep + 1} OF 6`;
        title.textContent = stage.title;
        description.textContent = stage.description;
        progress.textContent = `${currentStep + 1} / 6`;

        // Update service tags
        tagsContainer.replaceChildren();

        stage.services.forEach((service) => {

            const tag = document.createElement("span");

            tag.className = "recovery-service-tag";
            tag.textContent = service;

            tagsContainer.appendChild(tag);

        });

        // Update six numbered buttons
        stepButtons.forEach((button, index) => {

            const number = button.querySelector(".recovery-step-number");

            button.classList.remove("active", "completed");
            button.setAttribute(
                "aria-pressed",
                index === currentStep ? "true" : "false"
            );

            if (index < currentStep) {

                button.classList.add("completed");
                number.innerHTML =
                    '<i class="fa-solid fa-check" aria-hidden="true"></i>';

            } else {

                number.textContent = index + 1;

                if (index === currentStep) {
                    button.classList.add("active");
                }

            }

        });

        // Enable / disable arrows
        prevButton.disabled = currentStep === 0;

        nextButton.disabled =
            currentStep === recoveryStages.length - 1;

        // Replay panel entrance animation
        panelContent.style.animation = "none";
        void panelContent.offsetWidth;
        panelContent.style.animation = "";

    }

    /* =========================================
       STEP BUTTON CLICKS
    ========================================= */

    stepButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const stepIndex = Number(button.dataset.step);

            updateJourney(stepIndex);

        });

    });

    /* =========================================
       PREVIOUS / NEXT BUTTONS
    ========================================= */

    prevButton.addEventListener("click", () => {
        updateJourney(currentStep - 1);
    });

    nextButton.addEventListener("click", () => {
        updateJourney(currentStep + 1);
    });

    /* =========================================
       INITIALIZE
    ========================================= */

    updateJourney(0);

});



/* =========================================
   HOME PAGE — ANIMATED TECHNOLOGY NUMBERS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const technologySection =
        document.querySelector(".home-technology");

    if (!technologySection) return;

    const counters =
        technologySection.querySelectorAll(".home-tech-counter");

    const prefersReducedMotion =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let hasAnimated = false;

    function animateCounter(element) {

        const target = Number(element.dataset.target);
        const duration = 1400;
        const startTime = performance.now();

        if (prefersReducedMotion) {
            element.textContent = target.toLocaleString("en-US");
            return;
        }

        function updateCounter(currentTime) {

            const elapsed = currentTime - startTime;

            const progress = Math.min(
                elapsed / duration,
                1
            );

            // Ease-out animation
            const easedProgress =
                1 - Math.pow(1 - progress, 3);

            const currentValue = Math.round(
                target * easedProgress
            );

            element.textContent =
                currentValue.toLocaleString("en-US");

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent =
                    target.toLocaleString("en-US");
            }

        }

        element.textContent = "0";
        requestAnimationFrame(updateCounter);

    }

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting && !hasAnimated) {

                    hasAnimated = true;

                    counters.forEach((counter) => {
                        animateCounter(counter);
                    });

                    observer.unobserve(technologySection);

                }

            });

        },
        {
            threshold: 0.3
        }
    );

    observer.observe(technologySection);

});




/* =========================================
   SERVICES — CONSULTATION EXPANDABLE CARDS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const consultationButtons =
        document.querySelectorAll(".consultation-toggle");

    consultationButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const card = button.closest(".consultation-card");

            const detailsId =
                button.getAttribute("aria-controls");

            const details = document.getElementById(detailsId);

            if (!card || !details) return;

            const isOpen =
                button.getAttribute("aria-expanded") === "true";

            // Close other open cards
            consultationButtons.forEach((otherButton) => {

                if (otherButton === button) return;

                const otherCard =
                    otherButton.closest(".consultation-card");

                const otherDetails = document.getElementById(
                    otherButton.getAttribute("aria-controls")
                );

                otherButton.setAttribute("aria-expanded", "false");

                if (otherCard) {
                    otherCard.classList.remove("is-open");
                }

                if (otherDetails) {
                    otherDetails.hidden = true;
                }

                const otherIcon =
                    otherButton.querySelector("i");

                if (otherIcon) {
                    otherIcon.classList.remove("fa-minus");
                    otherIcon.classList.add("fa-plus");
                }

            });

            // Toggle selected card
            const shouldOpen = !isOpen;

            button.setAttribute(
                "aria-expanded",
                String(shouldOpen)
            );

            details.hidden = !shouldOpen;

            card.classList.toggle("is-open", shouldOpen);

            const icon = button.querySelector("i");

            if (icon) {
                icon.classList.toggle("fa-plus", !shouldOpen);
                icon.classList.toggle("fa-minus", shouldOpen);
            }

            button.setAttribute(
                "aria-label",
                shouldOpen
                    ? "Hide consultation details"
                    : "Show consultation details"
            );

        });

    });

});



/* =========================================
   OBJECTIVE TESTING — EXPANDABLE CARDS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const objectiveButtons =
        document.querySelectorAll(".objective-toggle");

    objectiveButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const card = button.closest(".objective-card");

            const details = document.getElementById(
                button.getAttribute("aria-controls")
            );

            if (!card || !details) return;

            const isOpen =
                button.getAttribute("aria-expanded") === "true";

            // Close other objective testing cards
            objectiveButtons.forEach((otherButton) => {

                if (otherButton === button) return;

                const otherCard =
                    otherButton.closest(".objective-card");

                const otherDetails = document.getElementById(
                    otherButton.getAttribute("aria-controls")
                );

                otherButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                if (otherCard) {
                    otherCard.classList.remove("is-open");
                }

                if (otherDetails) {
                    otherDetails.hidden = true;
                }

                const otherIcon = otherButton.querySelector("i");

                if (otherIcon) {
                    otherIcon.classList.remove("fa-minus");
                    otherIcon.classList.add("fa-plus");
                }
            });

            // Toggle selected card
            const shouldOpen = !isOpen;

            button.setAttribute(
                "aria-expanded",
                String(shouldOpen)
            );

            details.hidden = !shouldOpen;

            card.classList.toggle("is-open", shouldOpen);

            const icon = button.querySelector("i");

            if (icon) {
                icon.classList.toggle("fa-plus", !shouldOpen);
                icon.classList.toggle("fa-minus", shouldOpen);
            }

            button.setAttribute(
                "aria-label",
                shouldOpen
                    ? "Hide assessment details"
                    : "Show assessment details"
            );
        });
    });
});



/* =========================================
   IMAGING SERVICES — EXPANDABLE CARDS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const imagingButtons =
        document.querySelectorAll(".imaging-toggle");

    imagingButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const card = button.closest(".imaging-card");

            const details = document.getElementById(
                button.getAttribute("aria-controls")
            );

            if (!card || !details) return;

            const isOpen =
                button.getAttribute("aria-expanded") === "true";

            // Close other imaging cards
            imagingButtons.forEach((otherButton) => {

                if (otherButton === button) return;

                const otherCard =
                    otherButton.closest(".imaging-card");

                const otherDetails = document.getElementById(
                    otherButton.getAttribute("aria-controls")
                );

                otherButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                if (otherCard) {
                    otherCard.classList.remove("is-open");
                }

                if (otherDetails) {
                    otherDetails.hidden = true;
                }

                const otherIcon = otherButton.querySelector("i");

                if (otherIcon) {
                    otherIcon.classList.remove("fa-minus");
                    otherIcon.classList.add("fa-plus");
                }
            });

            // Toggle selected card
            const shouldOpen = !isOpen;

            button.setAttribute(
                "aria-expanded",
                String(shouldOpen)
            );

            details.hidden = !shouldOpen;

            card.classList.toggle("is-open", shouldOpen);

            const icon = button.querySelector("i");

            if (icon) {
                icon.classList.toggle("fa-plus", !shouldOpen);
                icon.classList.toggle("fa-minus", shouldOpen);
            }

            button.setAttribute(
                "aria-label",
                shouldOpen
                    ? "Hide ultrasound assessment details"
                    : "Show ultrasound assessment details"
            );
        });
    });
});




/* =========================================
   MINOR PROCEDURES — EXPANDABLE CARDS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const minorButtons =
        document.querySelectorAll(".minor-toggle");

    minorButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const card = button.closest(".minor-card");

            const details = document.getElementById(
                button.getAttribute("aria-controls")
            );

            if (!card || !details) return;

            const isOpen =
                button.getAttribute("aria-expanded") === "true";

            // Close other minor procedure cards
            minorButtons.forEach((otherButton) => {

                if (otherButton === button) return;

                const otherCard =
                    otherButton.closest(".minor-card");

                const otherDetails = document.getElementById(
                    otherButton.getAttribute("aria-controls")
                );

                otherButton.setAttribute("aria-expanded", "false");

                if (otherCard) {
                    otherCard.classList.remove("is-open");
                }

                if (otherDetails) {
                    otherDetails.hidden = true;
                }

                const otherIcon = otherButton.querySelector("i");

                if (otherIcon) {
                    otherIcon.classList.remove("fa-minus");
                    otherIcon.classList.add("fa-plus");
                }
            });

            // Toggle selected card
            const shouldOpen = !isOpen;

            button.setAttribute(
                "aria-expanded",
                String(shouldOpen)
            );

            details.hidden = !shouldOpen;

            card.classList.toggle("is-open", shouldOpen);

            const icon = button.querySelector("i");

            if (icon) {
                icon.classList.toggle("fa-plus", !shouldOpen);
                icon.classList.toggle("fa-minus", shouldOpen);
            }

            button.setAttribute(
                "aria-label",
                shouldOpen
                    ? "Hide procedure details"
                    : "Show procedure details"
            );
        });
    });
});




/* =========================================
   PERFORMANCE ASSESSMENT — EXPANDABLE CARD
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const performanceButtons =
        document.querySelectorAll(".performance-toggle");

    performanceButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const card = button.closest(".performance-card");

            const details = document.getElementById(
                button.getAttribute("aria-controls")
            );

            if (!card || !details) return;

            const isOpen =
                button.getAttribute("aria-expanded") === "true";

            const shouldOpen = !isOpen;

            button.setAttribute(
                "aria-expanded",
                String(shouldOpen)
            );

            details.hidden = !shouldOpen;

            card.classList.toggle("is-open", shouldOpen);

            const icon = button.querySelector("i");

            if (icon) {
                icon.classList.toggle("fa-plus", !shouldOpen);
                icon.classList.toggle("fa-minus", shouldOpen);
            }

            button.setAttribute(
                "aria-label",
                shouldOpen
                    ? "Hide performance assessment details"
                    : "Show performance assessment details"
            );
        });
    });
});



/* =========================================
   FOOTBALL INJURY READINESS QUIZ
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const quiz = document.querySelector(".football-quiz");
    if (!quiz) return;

    const content = document.getElementById("footballQuizContent");
    const progress = document.getElementById("footballQuizProgress");
    const counter = document.getElementById("footballQuizCounter");
    const backButton = document.getElementById("footballQuizBack");
    const nextButton = document.getElementById("footballQuizNext");
    const navigation = document.getElementById("footballQuizNavigation");

    const questions = [
        {
            title: "Did you get injured during a football match?",
            type: "options",
            options: [
                "Yes, during a match",
                "During training",
                "Another activity"
            ]
        },
        {
            title: "Which area was injured?",
            type: "options",
            options: [
                "Knee",
                "Ankle",
                "Hamstring / Thigh",
                "Another area"
            ]
        },
        {
            title: "How long ago did the injury happen?",
            type: "options",
            options: [
                "Under 6 weeks",
                "6–12 weeks",
                "3–6 months",
                "Over 6 months"
            ]
        },
        {
            title: "How confident do you feel about returning to football?",
            type: "slider"
        }
    ];

    let currentQuestion = 0;
    let answers = {};

    function renderQuestion() {

        const question = questions[currentQuestion];

        counter.textContent =
            `Question ${currentQuestion + 1} of ${questions.length}`;

        progress.style.width =
            `${((currentQuestion + 1) / questions.length) * 100}%`;

        navigation.hidden = false;
        backButton.hidden = currentQuestion === 0;
        nextButton.hidden = true;

        content.replaceChildren();

        const title = document.createElement("h4");
        title.textContent = question.title;
        content.appendChild(title);

        if (question.type === "options") {

            const optionsWrapper = document.createElement("div");
            optionsWrapper.className = "football-quiz-options";

            question.options.forEach(function (option) {

                const button = document.createElement("button");
                button.type = "button";
                button.className = "football-quiz-option";
                button.textContent = option;

                if (answers[currentQuestion] === option) {
                    button.classList.add("is-selected");
                }

                button.addEventListener("click", function () {

                    answers[currentQuestion] = option;

                    optionsWrapper
                        .querySelectorAll(".football-quiz-option")
                        .forEach(function (item) {
                            item.classList.remove("is-selected");
                        });

                    button.classList.add("is-selected");
                    nextButton.hidden = false;
                });

                optionsWrapper.appendChild(button);
            });

            content.appendChild(optionsWrapper);

            if (answers[currentQuestion] !== undefined) {
                nextButton.hidden = false;
            }

        } else {

            const slider = document.createElement("input");
            slider.type = "range";
            slider.min = "1";
            slider.max = "10";
            slider.step = "1";
            slider.value = answers[currentQuestion] ?? 5;
            slider.className = "football-quiz-slider";

            slider.setAttribute(
                "aria-label",
                "Confidence returning to football"
            );

            const labels = document.createElement("div");
            labels.className = "football-quiz-slider-labels";

            const low = document.createElement("span");
            low.textContent = "Not confident";

            const value = document.createElement("strong");
            value.className = "football-quiz-slider-value";
            value.textContent = slider.value;

            const high = document.createElement("span");
            high.textContent = "Very confident";

            slider.addEventListener("input", function () {
                answers[currentQuestion] = Number(slider.value);
                value.textContent = slider.value;
            });

            labels.append(low, value, high);
            content.append(slider, labels);

            answers[currentQuestion] = Number(slider.value);
            nextButton.hidden = false;
        }

        nextButton.innerHTML =
            currentQuestion === questions.length - 1
                ? 'View My Result <i class="fa-solid fa-arrow-right"></i>'
                : 'Next <i class="fa-solid fa-arrow-right"></i>';
    }

    function showResult() {

        progress.style.width = "100%";
        counter.textContent = "Completed";
        navigation.hidden = true;

        content.replaceChildren();

        const result = document.createElement("div");
        result.className = "football-quiz-result";

        const title = document.createElement("h4");
        title.textContent =
            "Your Next Step: Sports Physiotherapy Assessment";

        const description = document.createElement("p");

        const area = answers[1] || "sports";
        const time = answers[2] || "an unspecified period";
        const confidence = answers[3] ?? 5;

        description.textContent =
            `You selected ${area.toLowerCase()} as the affected area, ` +
            `with the injury occurring ${time.toLowerCase()} ago, ` +
            `and a confidence level of ${confidence}/10. ` +
            `These answers help you describe your recovery, but they ` +
            `cannot establish whether you are ready to return to football. ` +
            `A physiotherapy assessment can evaluate your symptoms, ` +
            `strength, movement, and sport-specific function.`;

        const actions = document.createElement("div");
        actions.className = "football-quiz-result-actions";

        const contactLink = document.createElement("a");
        contactLink.className = "football-quiz-book";
        contactLink.href = "contact.html";
        contactLink.textContent = "Contact Our Team";

        const restartButton = document.createElement("button");
        restartButton.type = "button";
        restartButton.className = "football-quiz-restart";
        restartButton.textContent = "Start Over";

        restartButton.addEventListener("click", function () {
            currentQuestion = 0;
            answers = {};
            renderQuestion();
        });

        actions.append(contactLink, restartButton);
        result.append(title, description, actions);
        content.appendChild(result);
    }

    nextButton.addEventListener("click", function () {

        if (answers[currentQuestion] === undefined) return;

        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            renderQuestion();
        } else {
            showResult();
        }
    });

    backButton.addEventListener("click", function () {
        if (currentQuestion > 0) {
            currentQuestion--;
            renderQuestion();
        }
    });

    renderQuestion();

});



/* =========================================
   REHABILITATION PROGRAM ACCORDION
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const programButtons = document.querySelectorAll(
        ".rehab-program-toggle"
    );

    programButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const card = button.closest(".rehab-program-card");
            const details = card.querySelector(".rehab-program-details");

            const isOpen =
                button.getAttribute("aria-expanded") === "true";

            // Close all other programs
            programButtons.forEach(function (otherButton) {

                otherButton.setAttribute("aria-expanded", "false");

                const otherCard = otherButton.closest(
                    ".rehab-program-card"
                );

                const otherDetails = otherCard.querySelector(
                    ".rehab-program-details"
                );

                if (otherDetails) {
                    otherDetails.hidden = true;
                }
            });

            // Open selected program if previously closed
            if (!isOpen) {
                button.setAttribute("aria-expanded", "true");
                details.hidden = false;
            }

        });

    });

});
