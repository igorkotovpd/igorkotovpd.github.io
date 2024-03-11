//ON LOAD PAGE SETUP
window.onload = function () {
  addListenersForToc();
  setUpComputedSizeUpdateForVisuals();
  addListenersForVideos();
  setUpSwitchesForVideopairs();
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

  const defaultVisualBlock = document.querySelector(
    '.kassaVideo:not([style*="display: none"])'
  );
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
  const tabletVideoIds = [
    "cat-1-tab-video",
    "cat-2-tab-video",
    "cat-3-tab-video",
    "cat-4-tab-video",
    "cat-5-tab-video",
    "cat-6-tab-video",
    "cat-7-tab-video",
    "cat-8-tab-video",
  ];
  const mobileVideoIds = [
    "cat-1-mob-video",
    "cat-2-mob-video",
    "cat-3-mob-video",
    "cat-4-mob-video",
    "cat-5-mob-video",
    "cat-6-mob-video",
    "cat-7-mob-video",
    "cat-8-mob-video",
  ];
  for (var i = 0; i < tabletVideoIds.length; i++) {
    const tabletVideo = document.getElementById(tabletVideoIds[i]);
    tabletVideo.addEventListener(
      "click",
      () => {
        setTimeout(() => {
          tabletVideo.setAttribute("controls", "true");
          const isVideoPlaying =
            tabletVideo.currentTime > 0 &&
            !tabletVideo.paused &&
            !tabletVideo.ended &&
            tabletVideo.readyState > 2;
          if (isVideoPlaying === false) {
            tabletVideo.play();
          }
        }, 50);
      },
      { once: true }
    );
  }
  for (var i = 0; i < mobileVideoIds.length; i++) {
    const mobileVideo = document.getElementById(mobileVideoIds[i]);
    mobileVideo.addEventListener(
      "click",
      () => {
        setTimeout(() => {
          mobileVideo.setAttribute("controls", "true");
          const isVideoPlaying =
            mobileVideo.currentTime > 0 &&
            !mobileVideo.paused &&
            !mobileVideo.ended &&
            mobileVideo.readyState > 2;
          if (isVideoPlaying === false) {
            mobileVideo.play();
          }
        }, 50);
      },
      { once: true }
    );
  }
  //Add listener for the last video
  const adaptivityVideo = document.getElementById("cat-9-video");
  adaptivityVideo.addEventListener(
    "click",
    () => {
      setTimeout(() => {
        adaptivityVideo.setAttribute("controls", "true");
        const isVideoPlaying =
          adaptivityVideo.currentTime > 0 &&
          !adaptivityVideo.paused &&
          !adaptivityVideo.ended &&
          adaptivityVideo.readyState > 2;
        if (isVideoPlaying === false) {
          adaptivityVideo.play();
        }
      }, 50);
    },
    { once: true }
  );
}

//VIDEO ORIENTATION SWITCHES
function setUpSwitchesForVideopairs() {
  const switchToTabletButtonsIds = [
    "cat-1-tab-switch",
    "cat-2-tab-switch",
    "cat-3-tab-switch",
    "cat-4-tab-switch",
    "cat-5-tab-switch",
    "cat-6-tab-switch",
    "cat-7-tab-switch",
    "cat-8-tab-switch",
  ];
  const switchToMobileButtonsIds = [
    "cat-1-mob-switch",
    "cat-2-mob-switch",
    "cat-3-mob-switch",
    "cat-4-mob-switch",
    "cat-5-mob-switch",
    "cat-6-mob-switch",
    "cat-7-mob-switch",
    "cat-8-mob-switch",
  ];
  const tabletVideoIds = [
    "cat-1-tab-video",
    "cat-2-tab-video",
    "cat-3-tab-video",
    "cat-4-tab-video",
    "cat-5-tab-video",
    "cat-6-tab-video",
    "cat-7-tab-video",
    "cat-8-tab-video",
  ];
  const mobileVideoIds = [
    "cat-1-mob-video",
    "cat-2-mob-video",
    "cat-3-mob-video",
    "cat-4-mob-video",
    "cat-5-mob-video",
    "cat-6-mob-video",
    "cat-7-mob-video",
    "cat-8-mob-video",
  ];
  for (var i = 0; i < switchToTabletButtonsIds.length; i++) {
    setUpSwitchesForVideopair(
      switchToTabletButtonsIds[i],
      switchToMobileButtonsIds[i],
      tabletVideoIds[i],
      mobileVideoIds[i]
    );
  }
}
function setUpSwitchesForVideopair(
  switchToTabletButtonId,
  switchToMobileButtonId,
  tabletVideoId,
  mobileVideoId
) {
  const switchToTabletButton = document.getElementById(switchToTabletButtonId);
  const switchToMobileButton = document.getElementById(switchToMobileButtonId);
  const tabletVideo = document.getElementById(tabletVideoId);
  const mobileVideo = document.getElementById(mobileVideoId);
  switchToTabletButton.addEventListener("click", () => {
    if (switchToTabletButton.classList.contains("inactive")) {
      switchToTabletButton.classList.remove("inactive");
      switchToTabletButton.classList.add("active");
      switchToMobileButton.classList.remove("active");
      switchToMobileButton.classList.add("inactive");
      mobileVideo.style.display = "none";
      tabletVideo.style.display = "block";
    } else {
      switchToTabletButton.classList.add("inactive");
      switchToTabletButton.classList.remove("active");
      switchToMobileButton.classList.add("active");
      switchToMobileButton.classList.remove("inactive");
      tabletVideo.style.display = "none";
      mobileVideo.style.display = "block";
    }
  });
  switchToMobileButton.addEventListener("click", () => {
    if (switchToMobileButton.classList.contains("inactive")) {
      switchToMobileButton.classList.remove("inactive");
      switchToMobileButton.classList.add("active");
      switchToTabletButton.classList.remove("active");
      switchToTabletButton.classList.add("inactive");
      tabletVideo.style.display = "none";
      mobileVideo.style.display = "block";
    } else {
      switchToMobileButton.classList.add("inactive");
      switchToMobileButton.classList.remove("active");
      switchToTabletButton.classList.add("active");
      switchToTabletButton.classList.remove("inactive");
      mobileVideo.style.display = "none";
      tabletVideo.style.display = "block";
    }
  });
}
