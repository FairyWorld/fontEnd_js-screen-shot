import {
  customToolbarType,
  mouseEventType,
  screenShotType,
  userToolbarType
} from "@/lib/type/ComponentType";

let enableWebRtc = true;
// electron环境下使用webrtc需要自己传入屏幕流
let screenFlow: MediaStream | null = null;

// 数据初始化标识
let initStatus = false;

// 画布宽高
let canvasWidth = 0;
let canvasHeight = 0;

// 展示截屏图片至容器
let showScreenData = false;
let screenShotDom: null | HTMLElement = null;
let destroyContainer = true;

// 蒙层颜色
const maskColor = { r: 0, g: 0, b: 0, a: 0.6 };
let writeBase64 = true;
let cutBoxBdColor = "#2CABFF";
// 最大可撤销次数
let maxUndoNum = 15;
// 是否使用等比例箭头
let useRatioArrow = false;
// 开启图片自适应
let imgAutoFit = false;
// 自定义传入图片尺寸
let useCustomImgSize = false;
let customImgSize = { w: 0, h: 0 };
// 调用者定义的工具栏数据
let userToolbar: Array<customToolbarType> = [];
let h2cCrossImgLoadErrFn: screenShotType["h2cImgLoadErrCallback"] | null = null;
let saveCallback: ((code: number, msg: string) => void) | null = null;
let saveImgTitle: string | null = null;
let canvasEvents: mouseEventType | null = null;

export default class PlugInParameters {
  constructor() {
    // 标识为true时则初始化数据
    if (initStatus) {
      enableWebRtc = true;
      canvasWidth = 0;
      canvasHeight = 0;
      cutBoxBdColor = "#2CABFF";
      showScreenData = false;
      writeBase64 = true;
      screenFlow = null;
      // 初始化完成设置其值为false
      initStatus = false;
      screenShotDom = null;
      saveCallback = null;
      maxUndoNum = 15;
      useRatioArrow = false;
      imgAutoFit = false;
      saveImgTitle = null;
      destroyContainer = true;
      userToolbar = [];
      h2cCrossImgLoadErrFn = null;
    }
  }

  // 设置数据初始化标识
  public setInitStatus(status: boolean) {
    initStatus = status;
  }

  // 获取数据初始化标识
  public getInitStatus() {
    return initStatus;
  }

  // 获取webrtc启用状态
  public getWebRtcStatus() {
    return enableWebRtc;
  }

  // 设置webrtc启用状态
  public setWebRtcStatus(status: boolean) {
    enableWebRtc = status;
  }

  public setScreenShotDom(dom: HTMLElement) {
    screenShotDom = dom;
  }

  public getCutBoxBdColor() {
    return cutBoxBdColor;
  }

  public setCutBoxBdColor(color: string) {
    cutBoxBdColor = color;
  }

  public getScreenShotDom() {
    return screenShotDom;
  }

  // 获取屏幕流
  public getScreenFlow() {
    return screenFlow;
  }

  // 设置屏幕流
  public setScreenFlow(stream: MediaStream) {
    screenFlow = stream;
  }

  // 获取画布宽高
  public getCanvasSize() {
    return { canvasWidth: canvasWidth, canvasHeight: canvasHeight };
  }

  // 设置画布宽高
  public setCanvasSize(width: number, height: number) {
    canvasWidth = width;
    canvasHeight = height;
  }

  // 获取展示图片至容器的状态
  public getShowScreenDataStatus() {
    return showScreenData;
  }

  // 设置展示图片至容器的状态
  public setShowScreenDataStatus(status: boolean) {
    showScreenData = status;
  }

  // 设置蒙层颜色
  public setMaskColor(color: { r: number; g: number; b: number; a: number }) {
    maskColor.r = color.r;
    maskColor.g = color.g;
    maskColor.b = color.b;
    maskColor.a = color.a;
  }

  public getMaskColor() {
    return maskColor;
  }

  // 设置截图数据的写入状态
  public setWriteImgState(state: boolean) {
    writeBase64 = state;
  }
  public getWriteImgState() {
    return writeBase64;
  }

  public setSaveCallback(saveFn: (code: number, msg: string) => void) {
    saveCallback = saveFn;
  }

  public getSaveCallback() {
    return saveCallback;
  }

  public setMaxUndoNum(num: number) {
    maxUndoNum = num;
  }

  public getMaxUndoNum() {
    return maxUndoNum;
  }

  public setRatioArrow(state: boolean) {
    useRatioArrow = state;
  }

  public getRatioArrow() {
    return useRatioArrow;
  }

  public setImgAutoFit(state: boolean) {
    imgAutoFit = state;
  }

  public getImgAutoFit() {
    return imgAutoFit;
  }

  public setUseCustomImgSize(
    state: boolean,
    sizeInfo?: { w: number; h: number }
  ) {
    if (state && sizeInfo) {
      useCustomImgSize = true;
      customImgSize = sizeInfo;
    }
  }

  public getCustomImgSize() {
    return {
      useCustomImgSize,
      customImgSize
    };
  }

  public setSaveImgTitle(title: string) {
    saveImgTitle = title;
  }

  public getSaveImgTitle() {
    return saveImgTitle;
  }

  public setDestroyContainerState(state: boolean) {
    destroyContainer = state;
  }

  public getDestroyContainerState() {
    return destroyContainer;
  }

  public setUserToolbar(toolbar: Array<userToolbarType>) {
    const toolbarData: Array<customToolbarType> = [];
    for (let i = 0; i < toolbar.length; i++) {
      const item = toolbar[i];
      // 自定义工具栏id从100开始
      toolbarData.push({ ...item, id: 100 + (i + 1) });
    }
    userToolbar = toolbarData;
  }

  public getUserToolbar() {
    return userToolbar;
  }

  public setH2cCrossImgLoadErrFn(fn: screenShotType["h2cImgLoadErrCallback"]) {
    h2cCrossImgLoadErrFn = fn;
  }

  public getH2cCrossImgLoadErrFn() {
    return h2cCrossImgLoadErrFn;
  }

  public setCanvasEvents(event: mouseEventType) {
    canvasEvents = event;
  }
  public getCanvasEvents() {
    return canvasEvents;
  }
}
