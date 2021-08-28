document.querySelector("#tr_phase2_ShoppingBg").click();
const body = document.body;

function scrollEvent(body) {
  const images = document.querySelectorAll(".kas-newpb-product-image");
  const imageSrcArr = Array.from(images).map((el) => {
    return el.src;
  });
  const numberOfItems = document.querySelector(".number-items").textContent;
  const subTotal = document.querySelector(".subtotal").textContent;
  let bottomTenPercentHeight = body.scrollHeight - body.scrollHeight * 0.1;
  let totalHeight = window.innerHeight + window.pageYOffset;
  let wunderkindRef = document.querySelector(".wk-overlay");
  if (totalHeight >= bottomTenPercentHeight) {
    if (wunderkindRef === null) {
      generateOverlay(body, numberOfItems, subTotal, images, imageSrcArr);
      return;
    } else {
      wunderkindRef.style.display = "flex";
      generateAttr(document.querySelector(".wk-overlay-content"), imageSrcArr, numberOfItems, subTotal);
      return;
    }
  }
}

function generateOverlay(body, numberOfItems, subTotal, images, imageSrcArr) {
  const overlayContainer = document.createElement("div");
  overlayContainer.className = "wk-overlay";
  const overlayHero = document.createElement("div");
  overlayHero.className = "wk-hero";
  const closeBtn = document.createElement("button");
  closeBtn.className = "wk-close-overlay";
  const kohlsHeadImg = document.createElement("img");
  kohlsHeadImg.className = "wk-kohls-img";
  const overlayContent = document.createElement("div");
  overlayContent.className = "wk-overlay-content";

  generateAttr(overlayContainer);
  generateAttr(overlayHero);
  generateAttr(closeBtn);
  generateAttr(kohlsHeadImg);
  generateAttr(overlayContent, imageSrcArr, numberOfItems, subTotal);

  overlayHero.appendChild(closeBtn);
  overlayHero.appendChild(kohlsHeadImg);
  overlayHero.appendChild(overlayContent);
  overlayContainer.appendChild(overlayHero);
  body.appendChild(overlayContainer);
  return;
}

function generateAttr(el, imageSrcArr, numberOfItems, subTotal) {
  switch (el.className) {
    case "wk-overlay":
      el.style.backgroundColor = "rgba(0,0,0, 0.8)";
      el.style.position = "fixed";
      el.style.top = "0%";
      el.style.left = "0%";
      el.style.right = "0%";
      el.style.bottom = "0%";
      el.style.zIndex = "999999";
      el.style.display = "flex";
      el.style.alignItems = "center";
      el.style.justifyContent = "center";
      el.style.boxShadow = "0 1px 3px 0 rgb(102,102,102 / 30%)";
      break;
    case "wk-hero":
      el.style.width = "500px";
      el.style.backgroundColor = "rgba(250,250,250,0.95)";
      el.style.margin = "0 auto";
      el.style.position = "relative";
      el.style.padding = "1rem";
      el.style.display = "flex";
      el.style.flexDirection = "column";
      break;
    case "wk-close-overlay":
      el.innerText = "X";
      el.style.position = "absolute";
      el.style.right = "0";
      el.style.top = "0";
      el.style.padding = "0.8rem";
      el.style.fontSize = "2rem";
      el.style.backgroundColor = "rgba(0,0,0,0)";
      el.onclick = () => (el.parentNode.parentNode.style.display = "none");
      break;
    case "wk-kohls-img":
      el.src = "/onlineopinionV5/waypoint_logo.png";
      el.alt = "Kohls";
      el.style.marginTop = "0.5rem";
      el.style.borderBottom = "1px solid #ccc";
      break;
    case "wk-overlay-content":
      let cartInfo =
        `<div style='width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; margin-top: 0.5rem'>
          <h2 style='font-size: 1rem'>Cart Info</h2>
            <div style='width: 60%; display: flex; align-items: center; justify-content: space-between; margin: 0.5rem 0rem'>
              <p style='font-size: 0.8rem'>Total: ${subTotal}</p>
              <p style='font-size:0.8rem'>Number of Items: ${numberOfItems}</p>
            </div>
          <a href='/checkout/shopping_cart.jsp' style='font-size: 0.8rem'>View Cart</span></a>
        </div> ` +
        "<div class='overlay-products__container' style='display: flex; overflow: scroll;align-items: center;gap: 10px 10px;width: 100%; margin-top: 1rem'>" +
        imageSrcArr.map((s) => `<img style="height:130px; margin-bottom: 1rem;" src=${s}>`).join("") +
        "</div>";

      el.innerHTML = cartInfo;
      el.style.display = "flex";
      el.style.flexDirection = "column";
      el.style.width = "100%";
      el.style.marginBottom = "0.5rem";
      break;
    default:
      return;
  }
}

window.addEventListener("scroll", () => scrollEvent(body));
