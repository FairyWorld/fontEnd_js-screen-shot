// 裁剪框节点事件定义
export type cutOutBoxBorder = {
  x: number;
  y: number;
  width: number;
  height: number;
  index: number; // 样式
  option: number; // 操作
};

// 鼠标起始位置坐标
export type movePositionType = {
  moveStartX: number;
  moveStartY: number;
};

// 裁剪框位置参数
export type positionInfoType = {
  startX: number;
  startY: number;
  width: number;
  height: number;
};

export type textInfoType = {
  positionX: number;
  positionY: number;
  color: string;
  size: number;
};

// 裁剪框缩放时所返回的数据类型
export type zoomCutOutBoxReturnType = {
  tempStartX: number;
  tempStartY: number;
  tempWidth: number;
  tempHeight: number;
};

// 工具栏的展示位置
export type toolPositionValType = "left" | "right" | "center";

export type hideBarInfoType = {
  state: boolean;
  color?: string;
  fillWidth?: number;
  fillHeight?: number;
  fillState?: boolean;
};

// 绘制裁剪框所返回的数据类型
export type drawCutOutBoxReturnType = {
  startX: number;
  startY: number;
  width: number;
  height: number;
};

export type toolIcoType = {
  [key: string]: boolean | undefined;
  square?: boolean;
  round?: boolean;
  rightTop?: boolean;
  brush?: boolean;
  mosaicPen?: boolean;
  text?: boolean;
  separateLine?: boolean;
  save?: boolean;
  undo?: boolean;
  confirm?: boolean;
};

export type mouseEventType = {
  mouseDownFn: (event: MouseEvent | TouchEvent) => void;
  mouseMoveFn: (event: MouseEvent | TouchEvent) => void;
  mouseUpFn: () => void;
};

// 截图工具栏图标数据类型
export type toolbarType = {
  id: number;
  title: string;
  icon?: string;
  activeIcon?: string;
  clickFn?: () => void;
};
export type crcEventType = { state: boolean; handleFn?: () => void };

// 用户自定义的工具栏图标数据类型
export type userToolbarType = {
  title: string;
  icon: string;
  activeIcon: string;
  clickFn: () => void;
};
export type customToolbarType = userToolbarType & { id: number };

export type userToolbarFnType = (canvasInfo: {
  screenShotCanvas: CanvasRenderingContext2D;
  screenShotController: HTMLCanvasElement;
  ScreenShotImageController: HTMLCanvasElement;
  currentInfo: { toolName: string; toolId: number };
}) => void; // 用户自定义工具栏点击事件

export type screenShotType = {
  enableWebRtc?: boolean; // 是否启用webrtc，默认是启用状态
  screenFlow?: MediaStream; // 设备提供的屏幕流数据(用于electron环境下自己传入的视频流数据)
  level?: number; // 截图容器层级
  canvasWidth?: number; // 截图画布宽度
  canvasHeight?: number; // 截图画布高度
  completeCallback?: (imgInfo: {
    base64: string;
    cutInfo: positionInfoType;
  }) => void; // 工具栏截图确认回调
  closeCallback?: () => void; // 工具栏关闭回调
  h2cImgLoadErrCallback?: (err: Event & { imgUrl: string }) => void; // html2canvas跨域图片加载失败回调
  triggerCallback?: (res: {
    code: number;
    msg: string;
    displaySurface: string | null;
    displayLabel: string | null;
  }) => void; // html2canvas截图响应回调
  cancelCallback?: (res: {
    code: number;
    msg: string;
    errorInfo: string;
  }) => void; // webrtc截图未授权回调
  saveCallback?: (code: number, msg: string) => void; // 保存截图回调
  position?: { top?: number; left?: number }; // 截图容器位置
  clickCutFullScreen?: boolean; // 单击截全屏启用状态, 默认值为false
  hiddenToolIco?: toolIcoType; // 需要隐藏的工具栏图标
  showScreenData?: boolean; // 展示截屏图片至容器，默认值为false
  imgSrc?: string; // 截图内容，默认为false
  loadCrossImg?: boolean; // 加载跨域图片状态
  proxyUrl?: string; // 代理服务器地址
  useCORS?: boolean; // 是否启用跨域
  screenShotDom?: HTMLElement | HTMLDivElement | HTMLCanvasElement; // 需要进行截图的容器
  cropBoxInfo?: { x: number; y: number; w: number; h: number }; // 是否加载默认的裁剪框
  wrcReplyTime?: number; // webrtc捕捉屏幕响应时间，默认为500ms
  wrcImgPosition?: { x: number; y: number; w: number; h: number }; // webrtc模式下是否需要对图像进行裁剪
  noScroll?: boolean; // 截图容器是否可滚动，默认为true
  maskColor?: { r: number; g: number; b: number; a: number }; // 蒙层颜色
  toolPosition?: toolPositionValType; // 工具栏显示位置，默认为居中
  writeBase64?: boolean; // 是否将截图内容写入剪切板
  hiddenScrollBar?: hideBarInfoType; // 是否隐藏滚动条
  wrcWindowMode?: boolean; // 是否启用窗口截图模式，默认为当前标签页截图
  customRightClickEvent?: crcEventType; // 是否自定义容器的右键点击事件
  cutBoxBdColor?: string; // 裁剪区域边框像素点颜色
  maxUndoNum?: number; // 最大可撤销次数
  useRatioArrow?: boolean; // 是否使用等比例箭头, 默认为false(递增变粗的箭头)
  imgAutoFit?: boolean; // 是否开启图片自适应, 默认为false(用户自定义了截图内容的情况下使用)
  useCustomImgSize?: boolean; // 自定义图片尺寸, 默认为false(手动传入图片内容时，是否需要自定义其宽高)
  customImgSize?: { w: number; h: number }; // 自定义图片尺寸
  saveImgTitle?: string; // 保存图片时的文件名
  destroyContainer?: boolean; // 确认截图时是否销毁容器
  userToolbar?: Array<userToolbarType>; // 用户自定义的工具栏图标
  canvasEvents?: mouseEventType; // 截图画布的事件监听
};
