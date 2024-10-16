import PlugInParameters from "@/lib/main-entrance/PlugInParameters";

export function drawCrossImg(html: Document) {
  const promises: Promise<string>[] = [];
  const imageNodes = html.querySelectorAll("img");
  const plugInParameters = new PlugInParameters();
  imageNodes.forEach(element => {
    const href = element.getAttribute("src");
    if (!href) return;
    if (href && href.startsWith("base64")) return;
    const promise = new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = `${href}&time=${+new Date().getTime()}`;
      img.onload = function() {
        const width = element.width;
        const height = element.height;
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx: any = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        const base64 = canvas?.toDataURL();
        element.setAttribute("src", base64);
        resolve("转换成功");
      };
      img.onerror = function(err) {
        const h2cCrossImgLoadErrFn = plugInParameters?.getH2cCrossImgLoadErrFn();
        if (h2cCrossImgLoadErrFn && typeof err != "string") {
          h2cCrossImgLoadErrFn({
            ...err,
            imgUrl: href
          });
        }
        // 跨域图片加载失败时，此处不做处理
        resolve(true);
      };
      if (href !== null) {
        img.src = href;
      }
    });
    promises.push(promise as Promise<string>);
  });
  return Promise.all(promises);
}
