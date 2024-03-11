//ON LOAD PAGE SETUP
window.onload = function () {
  setUpComputedSizeUpdateForVisuals();
};

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

  const cardImage = document.querySelector(".caseCardCover");
  const newCardImageWidth =
    getComputedStyle(cardImage).getPropertyValue("width");
  cssDocument.style.setProperty("--visualCardComputedWidth", newCardImageWidth);
}
