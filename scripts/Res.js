//ON LOAD PAGE SETUP
window.onload = function () {
  addListenersForToc();
  setUpComputedSizeUpdateForVisuals();
  addListenersForVideos();
};

// DYNAMIC TOC
function addListenersForToc() {
  const sections = document.querySelectorAll("section");
  const tocListItems = document.querySelectorAll(
    ".caseToc ul li:not(.backlink) a"
  );
  const summarySection = document.getElementById("summary");
  const summarySectionBottomY =
    summarySection.offsetTop + summarySection.offsetHeight;
  const toc = document.querySelector(".caseToc");
  var tocIsHovered = false;
  var autoscrollActive = false;
  var timer = null;
  var lastClickedItem = null;

  tocListItems.forEach((clickedItem) => {
    clickedItem.addEventListener("click", () => {
      lastClickedItem = clickedItem;
      autoscrollActive = true;
      tocListItems.forEach((item) => {
        item.classList.remove("activeTocItem");
      });
      clickedItem.classList.add("activeTocItem");
    });
  });

  window.addEventListener("scroll", () => {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      if (autoscrollActive == true) {
        updateActiveTocItem(sections, tocListItems);
        autoscrollActive = false;
      }
    }, 50);

    if (scrollY >= summarySectionBottomY) {
      if (tocIsHovered == false) {
        toc.style.opacity = "0.5";
      }
    } else {
      toc.style.opacity = "1";
    }

    toc.addEventListener("mouseover", () => {
      tocIsHovered = true;
      if (scrollY >= summarySectionBottomY) {
        toc.style.opacity = "1";
      }
    });
    toc.addEventListener("mouseout", () => {
      tocIsHovered = false;
      if (scrollY >= summarySectionBottomY) {
        toc.style.opacity = "0.5";
      }
    });

    let current = "";

    if (autoscrollActive == false) {
      updateActiveTocItem(sections, tocListItems);
    }
  });
}

function updateActiveTocItem(sections, tocListItems) {
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - window.innerHeight / 4;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  tocListItems.forEach((a) => {
    a.classList.remove("activeTocItem");
    if (a.classList.contains(current)) {
      a.classList.add("activeTocItem");
    }
  });
}

//UPDATE COMPUTED SIZE OF VISUALS USED FOR NEGATIVE-MARGIN SHADOW COMPENSATION
function setUpComputedSizeUpdateForVisuals() {
  updateComputedSizeForVisuals();
  window.addEventListener(
    "resize",
    function (event) {
      updateComputedSizeForVisuals();
    },
    true
  );
}
function updateComputedSizeForVisuals() {
  var cssDocument = document.querySelector(":root");

  const defaultVisualBlock = document.querySelector(".kassaVideo");
  const newdefaultBlockWidth =
    getComputedStyle(defaultVisualBlock).getPropertyValue("width");
  cssDocument.style.setProperty("--visualComputedWidth", newdefaultBlockWidth);

  const wideVisualBlock = document.querySelector(".kassaWideVideo");
  const newWideBlockWidth =
    getComputedStyle(wideVisualBlock).getPropertyValue("width");
  cssDocument.style.setProperty("--visualWideComputedWidth", newWideBlockWidth);
}

//SHOW VIDEO CONTROLS ON CLICK
function addListenersForVideos() {
  const videoIds = [
    "res-1-video",
    "res-2-video",
    "res-3-video",
    "res-4-video",
    "res-5-video",
    "res-6-video",
    "res-7-video",
  ];
  for (var i = 0; i < videoIds.length; i++) {
    const video = document.getElementById(videoIds[i]);
    video.addEventListener(
      "click",
      () => {
        setTimeout(() => {
          video.setAttribute("controls", "true");
          const isVideoPlaying =
            video.currentTime > 0 &&
            !video.paused &&
            !video.ended &&
            video.readyState > 2;
          if (isVideoPlaying === false) {
            video.play();
          }
        }, 50);
      },
      { once: true }
    );
  }
}
