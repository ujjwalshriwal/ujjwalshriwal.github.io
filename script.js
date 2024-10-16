function smoothScroll() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

function startLoad() {
  let counterElem = document.querySelector(".counter");
  let currVal = 0;

  function updateCounter() {
    if (currVal === 100) {
      counterElem.style.pointerEvents = "none";
      document.querySelector(".loader").style.pointerEvents = "none";
      document.querySelector(".overlay").style.pointerEvents = "none";
      return;
    }

    currVal += Math.floor(Math.random() * 10) + 1;

    if (currVal > 100) {
      currVal = 100;
    }

    counterElem.textContent = currVal;

    let delay = Math.floor(Math.random() * 200) + 50;

    setTimeout(updateCounter, delay);
  }

  updateCounter();
}

function loaderAnimation() {
  var tl = gsap.timeline();
  const text = new SplitType("#hmp2-section1 h2");

  tl.to(".counter", 0.25, {
    delay: 3.5,
    opacity: 0,
  });

  tl.to(".bar", 1.5, {
    height: 0,
    stagger: {
      amount: 0.5,
    },
    ease: "power4.inOut",
  });

  // tl.from(['#hmp1-section2 a', '#hmp1-section3 a', '#hmp1-section4 a'],{
  //   x: "-100%",
  //   duration:0.3,
  //   opacity: 0,
  //   stagger: .03,
  //   ease: "SlowMo.easeOut"
  // })

  tl.from(".char", {
    y: "100%",
    stagger: 0.08,
    duration: 1,
    opacity: 0,
    ease: "back.out(1.7)",
  });

  tl.from(".text-reveal-type3", {
    y: "100%",
    duration: 0.7,
    opacity: 0,
    ease: "SlowMo.easeOut",
  });

  //  gsap.registerPlugin(scrollTrigger);
  //   tl.to("#abp2-left p", {
  //     backgroundPositionX: "0%",
  //     backgroundSize: "100%",
  //     stagger: 1,
  //     scrollTrigger: {
  //       trigger: "#abp2-left p",
  //       scroller: "#about-page",
  //       scrub: true,
  //       start: "top center",
  //       end: "bottom top",
  //       // markers: true
  //     },
  //   });
}

function scrollToAbout() {
  var section = document.querySelector("#about-page");
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
    });
  }
}

function scrollToWorks() {
  var section = document.querySelector("#works-page");
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
    });
  }
}

function cursorFollower() {
  const cursorInner = document.querySelector("[data-cursor-inner]");
  const cursorOuter = document.querySelector("[data-cursor-outer]");

  window.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorInner.style.left = `${posX}px`;
    cursorInner.style.top = `${posY}px`;

    cursorOuter.animate(
      {
        left: `${posX}px`,
        top: `${posY}px`,
      },
      { duration: 500, fill: "forwards" }
    );
  });
}

function getCurrentTime() {
  let time = document.getElementById("current-time");
  setInterval(() => {
    let d = new Date();
    time.innerHTML = d.toLocaleTimeString();
  });
}

function worksPageAnimation() {

  const elements = document.querySelectorAll(".element");
  const movingVideo = document.querySelector("#video");
  const worksPage = document.querySelector("#works-page");

  elements.forEach(function (elem) {
    elem.addEventListener("mouseenter", function () {
      let videoSource = elem.getAttribute("data-video");
      let height = elem.getAttribute("data-height");
      let width = elem.getAttribute("data-width");
      movingVideo.src = videoSource;
      movingVideo.style.height = height;
      movingVideo.style.width = width;
      movingVideo.muted = true;
      movingVideo.load();
      movingVideo.play();
    });

    worksPage.addEventListener("mouseleave", function () {
      movingVideo.pause();
      movingVideo.currentTime = 0;
      // movingVideo.style.backgroundImage = "none";
      movingVideo.style.height = "0";
      movingVideo.style.width = "0";
    });
  });

  // const elements = document.querySelectorAll(".element");
  // const movingImage = document.querySelector("#image");
  // const worksPage = document.querySelector("#works-page");

  // elements.forEach(function (elem) {
  //   elem.addEventListener("mouseenter", function () {
      
  //     let image = elem.getAttribute("data-image");
  //     let height = elem.getAttribute("data-height");
  //     let width = elem.getAttribute("data-width");
  //     movingImage.style.backgroundImage = `url(${image})`;
  //     movingImage.style.height = height;
  //     movingImage.style.width = width;
  //     movingImage.style.backgroundSize = "cover";
  //     movingImage.style.backgroundPosition = "center";
  //     // console.log("hello");
  //   });

  //   worksPage.addEventListener("mouseleave", function () {
  //     movingImage.style.backgroundImage = "none";
  //     movingImage.style.height = "0";
  //     movingImage.style.width = "0";
  //     // console.log("bye");
  //   });

    document.addEventListener("DOMContentLoaded", function () {
      document.addEventListener("mousemove", function (event) {
        const worksPageElement = document.getElementById("works-page");

        const rect = worksPageElement.getBoundingClientRect();
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        if (
          mouseX >= rect.left &&
          mouseX <= rect.right &&
          mouseY >= rect.top &&
          mouseY <= rect.bottom
        ) {
          movingVideo.style.left = `${event.x - 150}px`;
          movingVideo.style.top = `${event.y - 100}px`;
          // movingImage.style.backgroundImage = `url(${image})`;
          // console.log("hey");
        }
      });
    });
  };


smoothScroll();
startLoad();
loaderAnimation();
cursorFollower();
getCurrentTime();
// worksPageAnimation();
