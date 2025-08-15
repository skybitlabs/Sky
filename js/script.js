// Navigation functionality
document.addEventListener("DOMContentLoaded", () => {
  const navHeader = document.getElementById("navHeader")
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const mobileMenu = document.getElementById("mobileMenu")
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")

  // Sticky navigation on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
      navHeader.classList.add("scrolled")
    } else {
      navHeader.classList.remove("scrolled")
    }
  })

  // Mobile menu toggle
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("active")

      // Animate hamburger lines
      const hamburgerLines = mobileMenuBtn.querySelectorAll(".hamburger-line")
      hamburgerLines.forEach((line, index) => {
        if (mobileMenu.classList.contains("active")) {
          if (index === 0) line.style.transform = "rotate(45deg) translate(5px, 5px)"
          if (index === 1) line.style.opacity = "0"
          if (index === 2) line.style.transform = "rotate(-45deg) translate(7px, -6px)"
        } else {
          line.style.transform = "none"
          line.style.opacity = "1"
        }
      })
    })

    // Close mobile menu when clicking on links
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active")
        const hamburgerLines = mobileMenuBtn.querySelectorAll(".hamburger-line")
        hamburgerLines.forEach((line) => {
          line.style.transform = "none"
          line.style.opacity = "1"
        })
      })
    })

    // Close mobile menu when clicking outside
    mobileMenu.addEventListener("click", (e) => {
      if (e.target === mobileMenu) {
        mobileMenu.classList.remove("active")
        const hamburgerLines = mobileMenuBtn.querySelectorAll(".hamburger-line")
        hamburgerLines.forEach((line) => {
          line.style.transform = "none"
          line.style.opacity = "1"
        })
      }
    })
  }

  // Testimonials carousel
  const testimonialsTrack = document.getElementById("testimonialsTrack")
  const testimonialCards = document.querySelectorAll(".testimonial-card")
  const prevBtn = document.getElementById("prevBtn")
  const nextBtn = document.getElementById("nextBtn")
  const dotsContainer = document.getElementById("dotsContainer")
  const dots = document.querySelectorAll(".dot")

  let currentSlide = 0
  let isAutoplay = true
  let autoplayInterval
  const testimonialCardsArray = Array.from(testimonialCards)
  const dotsArray = Array.from(dots)

  function updateTestimonials() {
    // Update cards
    testimonialCardsArray.forEach((card, index) => {
      card.classList.toggle("active", index === currentSlide)
    })

    // Update dots
    dotsArray.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide)
    })

    // Update track position
    if (testimonialsTrack) {
      testimonialsTrack.style.transform = `translateX(-${currentSlide * 100}%)`
    }
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonialCardsArray.length
    updateTestimonials()
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + testimonialCardsArray.length) % testimonialCardsArray.length
    updateTestimonials()
  }

  function startAutoplay() {
    if (isAutoplay) {
      autoplayInterval = setInterval(nextSlide, 5000)
    }
  }

  function stopAutoplay() {
    isAutoplay = false
    clearInterval(autoplayInterval)
  }

  // Event listeners
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      stopAutoplay()
      nextSlide()
    })
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      stopAutoplay()
      prevSlide()
    })
  }

  // Dot navigation
  dotsArray.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      stopAutoplay()
      currentSlide = index
      updateTestimonials()
    })
  })

  // Start autoplay
  if (testimonialCardsArray.length > 0) {
    startAutoplay()
  }

  // Pause autoplay when hovering over testimonials
  const testimonialsSection = document.querySelector(".testimonials-container")
  if (testimonialsSection) {
    testimonialsSection.addEventListener("mouseenter", () => {
      clearInterval(autoplayInterval)
    })

    testimonialsSection.addEventListener("mouseleave", () => {
      if (isAutoplay) {
        startAutoplay()
      }
    })
  }

  // Scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)

  // Observe all sections for scroll animations
  const sections = document.querySelectorAll("section")
  sections.forEach((section) => {
    section.classList.add("fade-in")
    observer.observe(section)
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        const offsetTop = target.offsetTop - 80 // Account for fixed header
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // Pause animations on hover for sliding elements
  const slidingElements = document.querySelectorAll(".featured-logos-track, .portfolio-sliding-track")
  slidingElements.forEach((element) => {
    element.addEventListener("mouseenter", function () {
      this.style.animationPlayState = "paused"
    })

    element.addEventListener("mouseleave", function () {
      this.style.animationPlayState = "running"
    })
  })

  // Initialize page animations
  setTimeout(() => {
    const heroContent = document.querySelector(".hero-content")
    const heroImage = document.querySelector(".hero-image")

    if (heroContent) heroContent.style.animation = "fadeInUp 0.9s ease 0.2s forwards"
    if (heroImage) heroImage.style.animation = "fadeInUp 0.9s ease 0.5s forwards"
  }, 100)

  // Form handling
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()
      // Add your form submission logic here
      alert("Thank you for your message! We'll get back to you soon.")
      contactForm.reset()
    })
  }

  // Add loading states for images
  const images = document.querySelectorAll("img")
  images.forEach((img) => {
    img.addEventListener("load", function () {
      this.style.opacity = "1"
    })

    img.addEventListener("error", function () {
      this.style.opacity = "0.5"
      console.log("Image failed to load:", this.src)
    })
  })

  // Performance optimization: Lazy loading for images
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          if (img.dataset.src) {
            img.src = img.dataset.src
            img.removeAttribute("data-src")
            imageObserver.unobserve(img)
          }
        }
      })
    })

    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img)
    })
  }

  // Add click tracking for analytics (placeholder)
  document.querySelectorAll(".btn, .contact-card, .featured-logo-item").forEach((element) => {
    element.addEventListener("click", function () {
      const elementType = this.classList.contains("btn")
        ? "button"
        : this.classList.contains("contact-card")
          ? "contact"
          : "logo"
      console.log(`Clicked ${elementType}:`, this.textContent || this.innerHTML)
    })
  })

  // Keyboard navigation support
  document.addEventListener("keydown", (e) => {
    // ESC key closes mobile menu
    if (e.key === "Escape" && mobileMenu && mobileMenu.classList.contains("active")) {
      mobileMenu.classList.remove("active")
      const hamburgerLines = mobileMenuBtn.querySelectorAll(".hamburger-line")
      hamburgerLines.forEach((line) => {
        line.style.transform = "none"
        line.style.opacity = "1"
      })
    }

    // Arrow keys for testimonial navigation
    if (e.key === "ArrowLeft" && document.activeElement.closest(".testimonials-section")) {
      e.preventDefault()
      stopAutoplay()
      prevSlide()
    }

    if (e.key === "ArrowRight" && document.activeElement.closest(".testimonials-section")) {
      e.preventDefault()
      stopAutoplay()
      nextSlide()
    }
  })

  // Reduce motion for users who prefer it
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll("*").forEach((element) => {
      element.style.animationDuration = "0.01ms"
      element.style.animationIterationCount = "1"
      element.style.transitionDuration = "0.01ms"
    })
  }

  console.log("Sky Byte website initialized successfully")
})




