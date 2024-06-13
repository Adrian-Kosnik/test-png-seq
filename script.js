const html = document.documentElement;
const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");

let screenWidth = window.screen.width;
window.addEventListener("resize", () => {
  screenWidth = window.innerWidth;
  //console.log(`this is current viewport width - ${screenWidth}`);
});

const frameCount = 150;

const currentFrame = (index) => {
  if (screenWidth >= 1440) {
    //console.log(`./png-seq/L/LARGE_810x810-f.${index.toString()}.png`);
    return `./png-seq/L/LARGE_810x810-f.${index.toString()}.png`;
  } else if (screenWidth >= 1068) {
    //console.log(`./png-seq/M/MEDIUM_600x600-f.${index.toString()}.png`);
    return `./png-seq/M/MEDIUM_600x600-f.${index.toString()}.png`;
  } else {
    // screen width 734px
    //console.log(`./png-seq/S/SMALL_412x412-f.${index.toString()}.jpg`);
    return `./png-seq/S/SMALL_412x412-f.${index.toString()}.jpg`;
  }
};

const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i, 300);
  }
};

const img = new Image();
img.src = currentFrame(1, 300);
if (screenWidth >= 1440) {
  canvas.width = 810;
  canvas.height = 810;
} else if (screenWidth >= 1068) {
  canvas.width = 600;
  canvas.height = 600;
} else {
  canvas.width = 412;
  canvas.height = 412;
}
img.onload = function () {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(img, 0, 0);
};

const updateImage = (index) => {
  img.src = currentFrame(index, 300);
  // context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(img, 0, 0);
};

window.addEventListener("scroll", () => {
  const scrollTop = html.scrollTop;
  const maxScrollTop = html.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );

  requestAnimationFrame(() => updateImage(frameIndex + 1));
});

preloadImages();
