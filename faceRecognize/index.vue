<template>
  <div>
    <input
        hidden
        type="file"
        @change="setImage"
        accept="image/*"
        ref="pickImage"
    >

    <!--  图片/视频 捕获区  -->
    <div class="detectBox">
      <img
        v-show="!trackVideoFaces && !trackCameraFaces"
        :src="base64"
        alt=""
        width="500"
        ref="img"
        id="myImg"
        @load="detectFactory"
      >

      <video
        v-if="trackVideoFaces"
        width="500"
        ref="video"
        id="myVideo"
        muted
        playsinline
        preload
        loop
        @durationchange="$refs.video.play()"
        @play="videoStatus = 1"
        @pause="videoStatus = 0"
      >
        <source src="./media/shylock.mp4" type="video/mp4">
        抱歉，您的浏览器不支持嵌入式视频。
      </video>

      <video
        v-if="trackCameraFaces"
        @loadedmetadata=""
        ref="video"
        id="myVideo"
        autoplay
        muted
        playsinline
        @play="videoStatus = 1"
        @pause="videoStatus = 0"
      />

      <canvas ref="canvas" />
    </div>

    <section v-show="trackVideoFaces || trackCameraFaces" class="timer">
      <p>平均检测时长：{{ time }}</p>
      <p>fps：{{ fps > 200 ? '200+' : fps }}</p>
    </section>

    <!-- 已录入人脸 -->
    <section class="faceCompare" v-show="detectList.includes('Recognition')">
      <h2>已录入人脸</h2>
      <div class="referenceImgs">
        <p>
          <img src="./images/卷福.jpg" alt="夏洛克·福尔摩斯">
          <span>夏洛克·福尔摩斯</span>
        </p>

        <p>
          <img src="./images/华生.png" alt="约翰·H·华生">
          <span>约翰·H·华生</span>
      </p>
      </div>
    </section>

    <!-- 相似度比较 -->
    <section class="similarity" v-show="showSimilar">
      <h2>相似度比较</h2>
      <div class="referenceImgs">
        <p>
          <img src="./images/卷福.jpg" alt="夏洛克·福尔摩斯" id="reference">
          <span>夏洛克·福尔摩斯</span>
        </p>

        <p>
          <img :src="base64" alt="" id="toCompare" @load="compareFaces">
          <span>相似度：</span>
          <span :class="{ danger: similarity < 50 }">{{ similarity }}%</span>
        </p>
      </div>
    </section>

    <cube-checkbox-group v-model="detectList" @input="detectFactory">
      <cube-checkbox option="Recognition"><i>人脸识别</i></cube-checkbox>
      <cube-checkbox option="Expression"><i>表情</i></cube-checkbox>
      <cube-checkbox option="AgeAndGender"><i>年龄性别</i></cube-checkbox>
    </cube-checkbox-group>

    <cube-checkbox-group v-model="optionList" @input="detectFactory">
      <cube-checkbox option="showBorder"><i>显示人脸边界</i></cube-checkbox>
      <cube-checkbox option="showMark"><i>显示人脸标记点</i></cube-checkbox>
    </cube-checkbox-group>

    <cube-switch v-model="showSimilar">
      人脸相似度比较
    </cube-switch>

    <cube-switch v-model="trackVideoFaces" :disabled="trackCameraFaces">
      视频人脸追踪
    </cube-switch>

    <cube-switch v-model="trackCameraFaces" :disabled="trackVideoFaces">
      摄像头人脸追踪
    </cube-switch>

    <cube-button
        :outline="true"
        :primary="true"
        :inline="true"
        class="button"
        @click="$refs.pickImage.click()"
    >
      选择图片
    </cube-button>

    <cube-button
        :outline="true"
        :primary="true"
        :inline="true"
        class="button"
        @click="showConfiguration"
    >
      配置
    </cube-button>
  </div>
</template>

<script>
import * as faceapi from 'face-api.js';

export default {
  name: 'index',
  data() {
    return {
      base64: '',
      similarity: 0,           // 相似度
      detectList: [],          // 检测项
      optionList: [],          // 辅助项
      showSimilar: false,      // 人脸相似度比较
      trackVideoFaces: false,  // 视频人脸追踪
      trackCameraFaces: false, // 摄像头人脸追踪
      videoStream: '',         // 摄像头视频流
      videoStatus: 0,          // 0：暂停，1：播放
      genderTranslator: {
        male:   '男',
        female: '女'
      },
      expressionTranslator: {
        neutral:   '正常',
        happy:     '开心',
        sad:       '伤心',
        angry:     '生气',
        fearful:   '害怕',
        disgusted: '恶心',
        surprised: '惊喜',
      },
      // 检测类型
      detectTypes: [
        'AgeAndGender', //  年龄性别
        'Expression',   //  表情
        'Face',         //  人脸
      ],
      faces: [], // 录入的人脸描述

      cascadeData: [
        {
          value: 'SSD',
          text: 'SSD',
          children: [
            { text: '0.1', value: 0.1 },
            { text: '0.2', value: 0.2 },
            { text: '0.3', value: 0.3 },
            { text: '0.4', value: 0.4 },
            { text: '0.5', value: 0.5 },
            { text: '0.6', value: 0.6 },
            { text: '0.7', value: 0.7 },
            { text: '0.8', value: 0.8 },
            { text: '0.9', value: 0.9 },
          ]
        },
        {
          value: 'Tiny',
          text: 'Tiny',
          children: [
            { text: '0.1', value: 0.1, children: [{ text: '128', value: 128 }, { text: '160', value: 160 }, { text: '224', value: 224 }, { text: '320', value: 320 }, { text: '416', value: 416 }, { text: '512', value: 512 }, { text: '608', value: 608 }] },
            { text: '0.2', value: 0.2, children: [{ text: '128', value: 128 }, { text: '160', value: 160 }, { text: '224', value: 224 }, { text: '320', value: 320 }, { text: '416', value: 416 }, { text: '512', value: 512 }, { text: '608', value: 608 }] },
            { text: '0.3', value: 0.3, children: [{ text: '128', value: 128 }, { text: '160', value: 160 }, { text: '224', value: 224 }, { text: '320', value: 320 }, { text: '416', value: 416 }, { text: '512', value: 512 }, { text: '608', value: 608 }] },
            { text: '0.4', value: 0.4, children: [{ text: '128', value: 128 }, { text: '160', value: 160 }, { text: '224', value: 224 }, { text: '320', value: 320 }, { text: '416', value: 416 }, { text: '512', value: 512 }, { text: '608', value: 608 }] },
            { text: '0.5', value: 0.5, children: [{ text: '128', value: 128 }, { text: '160', value: 160 }, { text: '224', value: 224 }, { text: '320', value: 320 }, { text: '416', value: 416 }, { text: '512', value: 512 }, { text: '608', value: 608 }] },
            { text: '0.6', value: 0.6, children: [{ text: '128', value: 128 }, { text: '160', value: 160 }, { text: '224', value: 224 }, { text: '320', value: 320 }, { text: '416', value: 416 }, { text: '512', value: 512 }, { text: '608', value: 608 }] },
            { text: '0.7', value: 0.7, children: [{ text: '128', value: 128 }, { text: '160', value: 160 }, { text: '224', value: 224 }, { text: '320', value: 320 }, { text: '416', value: 416 }, { text: '512', value: 512 }, { text: '608', value: 608 }] },
            { text: '0.8', value: 0.8, children: [{ text: '128', value: 128 }, { text: '160', value: 160 }, { text: '224', value: 224 }, { text: '320', value: 320 }, { text: '416', value: 416 }, { text: '512', value: 512 }, { text: '608', value: 608 }] },
            { text: '0.9', value: 0.9, children: [{ text: '128', value: 128 }, { text: '160', value: 160 }, { text: '224', value: 224 }, { text: '320', value: 320 }, { text: '416', value: 416 }, { text: '512', value: 512 }, { text: '608', value: 608 }] },
          ]
        }
      ],
      selectedIndex: [1, 4, 3],
      selectedValue: ['Tiny', 0.5, 320],

      count: 0,
      forwardTimes: [],
      time: '',
      fps: ''
    }
  },
  methods: {
    /**
     * remind
     *
     * const input = await faceapi.fetchImage(uri);
     * */

    // 设置页面图片
    async setImage(e) {
      const files = e.target.files;

      // 从Blob中创建一个HTMLImageElement
      const img = await faceapi.bufferToImage(files[0]);
      this.base64 = img.src;
    },

    /**
     * @description 录入人脸数据
     *
     * 大脸照、黑白照可能识别不出来，可以修改配置，降低人脸的置信度
     * */
    async entryFaces() {
      const imgs = document.querySelectorAll('.faceCompare img');

      for (const img of imgs) {
        /** 注意：这里不能传options，不然会报错 */
        const singleResult = await faceapi
            .detectSingleFace(img)
            .withFaceLandmarks()
            .withFaceDescriptor()
        ;

        this.faces = [
          ...this.faces,
          new faceapi.LabeledFaceDescriptors(
              img.alt,
              [singleResult.descriptor]
          )
        ]
      }
    },

    /**
     * @desc 自定义文本描绘框
     *
     * @param {object}  box     - 盒子位置大小
     * @param {object}  options - 配置项
     * */
    drawLabelBox(box, options) {
      const { canvas } = this.$refs;

      // 绘制框 + 绘制文本
      const _box = { x: 50, y: 50, width: 100, height: 100 }
      const drawOptions = {
        label: 'Hello I am a box!', // 框的描述文字，只能整单行文字
        lineWidth: 2,               // 边框宽度
        boxColor: 'red',            // 边框颜色，默认蓝色
        drawLabelOptions: {
          anchorPosition: 'TOP_LEFT',            // [TOP_LEFT | TOP_RIGHT | BOTTOM_LEFT | BOTTOM_RIGHT]
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // label文字块的背景颜色
          fontColor: 'purple',                   // label文字颜色
          fontSize:  16,                         // label文字大小
          padding: 15                            // label文字的padding
        }
      }
      const drawAreaBox = new faceapi.draw.DrawBox(box || _box, options || drawOptions);
      drawAreaBox.draw(canvas);
    },


    /**
     * @desc 自定义文本字段
     *
     * @param {array}  texts   - 多行文字
     * @param {object} pos     - 文本位置
     * @param {object} options - 配置项
     * */
    drawTexts(texts, pos, options) {
      const { canvas } = this.$refs;

      // 绘制多行文本块
      const text = [
        'This is a textline!',
        'This is another textline!'
      ]
      const anchor = { x: 200, y: 200 };         // 相对于canvas的位置
      const drawOptions  = {
        // backgroundColor: 'rgba(0, 0, 0, 0.5)', // 文字块的背景颜色
        // fontColor: 'purple',                   // 文字颜色
        // fontSize:  16,                         // 文字大小
        // padding: 15                            // 文字的padding
      }

      const drawTextBox = new faceapi.draw.DrawTextField(texts || text, pos || anchor, options || drawOptions)
      drawTextBox.draw(canvas)
    },

    async detectFactory() {
      const { detectList, optionList, faces, base64, trackVideoFaces, trackCameraFaces, videoStatus } = this;
      const { img, video, canvas } = this.$refs;
      const input = trackVideoFaces || trackCameraFaces ? 'myVideo' : 'myImg'
      const ts = Date.now();

      if ((input === 'myImg' && !base64) || (input === 'myVideo' && !videoStatus)) {
        return;
      }

      let displaySize;

      if (input === 'myImg') {
        displaySize = {
          width: img.width,
          height: img.height
        }
      }
      else {
        displaySize = faceapi.matchDimensions(canvas, video, true);
      }

      // 准备画布，没有这一步方框位置会偏移
      faceapi.matchDimensions(canvas, displaySize);

      const options = this.getFaceDetectorOptions();

      // 绘制人脸识别结果
      if (detectList.includes('Recognition')) {
        const detections = await faceapi
            .detectAllFaces(input, options)
            .withFaceLandmarks()
            .withFaceDescriptors()
        ;

        // 调整检测到的盒子和地标的大小，以防显示的图像与原始图像大小不同
        const resizedDetections = faceapi.resizeResults(detections, displaySize);

        // 脸部比对的参考对象
        const faceMatcher = new faceapi.FaceMatcher(faces || []);

        resizedDetections.forEach(fd => {
          const { descriptor, detection: { box } } = fd;

          const bestMatch = faceMatcher.findBestMatch(descriptor)

          // 自定义输出边界盒子
          this.drawLabelBox(box, {
            label: bestMatch._label
          })
        })
      }

      // 绘制脸部表情
      if (detectList.includes('Expression')) {
        const detections = await faceapi
                .detectAllFaces(input, options)
                .withFaceLandmarks()
                .withFaceExpressions();

        // 调整检测到的盒子和地标的大小，以防显示的图像与原始图像大小不同
        const resizedResults = faceapi.resizeResults(detections, displaySize);


        // 绘制文本框，显示最大可能性的表情
        // const minProbability = 0.05;
        // faceapi.draw.drawFaceExpressions(canvas, resizedResults, minProbability);


        // 自定义输出表情识别结果
        const _this = this;
        resizedResults.forEach(result => {
          const { expressions } = result;

          const maxProbability  = Math.max(...Object.values(expressions));
          const expression = Object.entries(expressions).find(([key, value]) => value === maxProbability)[0];

          this.drawTexts(
                  [
                    `${_this.expressionTranslator[expression]} (${Math.round(faceapi.utils.round(maxProbability) * 100)}%)`,
                  ],
                  result.detection.box.bottomLeft
          )
        })
      }

      // 绘制性别年龄
      if (detectList.includes('AgeAndGender')) {
        const detections = await faceapi
                .detectAllFaces(input, options)
                .withFaceLandmarks()
                .withAgeAndGender();

        // 调整检测到的盒子和地标的大小，以防显示的图像与原始图像大小不同
        const resizedResults = faceapi.resizeResults(detections, displaySize);

        // 输出年龄、性别、年龄可能性
        const _this = this;
        resizedResults.forEach(result => {
          const { age, gender, genderProbability } = result;

          this.drawTexts(
                  [
                    `${_this.genderTranslator[gender]} (${faceapi.utils.round(genderProbability) * 100}%)`,
                    `${faceapi.utils.round(age, 0)} 岁 `
                  ],
                  result.detection.box.bottomLeft
          )
        })
      }

      // 绘制脸部边界
      if (optionList.includes('showBorder')) {
        const detections = await faceapi
            .detectAllFaces(input, options);

        // 调整检测到的盒子和地标的大小，以防显示的图像与原始图像大小不同
        const resizedDetections = faceapi.resizeResults(detections, displaySize);

        // 绘制方框
        // faceapi.draw.drawDetections(canvas, resizedDetections);

        // 自定义输出边界盒子
        resizedDetections.forEach(result => {
          const { box, _score } = result;

          this.drawLabelBox(box, {
            label: `可信度${Math.round(_score * 100)}%`
          })
        })
      }

      // 绘制脸部标记点
      if (optionList.includes('showMark')) {
        const detections = await faceapi
            .detectAllFaces(input, options)
            .withFaceLandmarks()

        // 调整检测到的盒子和地标的大小，以防显示的图像与原始图像大小不同
        const resizedResults = faceapi.resizeResults(detections, displaySize);

        // 将标记点绘制到画布中
        faceapi.draw.drawFaceLandmarks(canvas, resizedResults);
      }

      if (videoStatus) {
        this.updateTimeStats(Date.now() - ts);

        setTimeout(() => {
          window.requestAnimationFrame(this.detectFactory);
        })
      }
    },

    // 比较相似度
    async compareFaces() {
      const detection1 = await faceapi.detectSingleFace('reference').withFaceLandmarks().withFaceDescriptor();
      const detection2 = await faceapi.detectSingleFace('toCompare').withFaceLandmarks().withFaceDescriptor();

      if (detection1 && detection2) {
        this.similarity = Math.round(faceapi.utils.round(1 - faceapi.euclideanDistance(detection1.descriptor, detection2.descriptor)) * 100);
      } else {
        this.similarity = 0;
      }
    },

    // 计算平均花费时长和FPS
    updateTimeStats(timeInMs) {
      this.forwardTimes = [timeInMs].concat(this.forwardTimes).slice(0, 30);
      const avgTimeInMs = this.forwardTimes.reduce((total, t) => total + t) / this.forwardTimes.length;

      this.time = `${Math.round(avgTimeInMs)} ms`;
      this.fps = `${faceapi.utils.round(1000 / avgTimeInMs)}`
    },

    // 配置人脸检测器参数
    getFaceDetectorOptions() {
      const { selectedValue } = this;

      return selectedValue[0] === 'SSD'
          ? new faceapi.SsdMobilenetv1Options({
            minConfidence: selectedValue[1]
          })
          /**
           * @param inputSize?: number
               处理图像的大小，越小越快
               在检测较小的人脸时， 必须被32整除
               常见的大小有128、160、224、320、416、512、608 ,
               用于通过网络摄像头进行人脸跟踪我建议使用较小尺寸的，例如128、160
               用于检测较小的人脸使用较大尺寸的，例如512、608
               默认值： 416
             *  @param scoreThreshold?: number
               最小置信阈值
               默认值:0.5
           *
           * @desc inputSize和scoreThreshold的不同配置，都会影响返回结果的数量
           * */
          : new faceapi.TinyFaceDetectorOptions({
            scoreThreshold: selectedValue[1],
            inputSize: selectedValue[2]
          })
    },

    // 打开人脸检测器配置菜单
    showConfiguration() {
      const { cascadeData, selectedIndex } = this;

      this.$createCascadePicker({
        title: '人脸检测器配置',
        data: cascadeData,
        selectedIndex,
        onSelect: this.selectHandle,
      }).show();
    },

    // 人脸检测器配置项改变
    selectHandle(values, indexs, texts) {
      const { trackVideoFaces , trackCameraFaces } = this;

      this.selectedIndex = indexs;
      this.selectedValue = values;

      // 图片检测，重新加载检测函数，视频不需要（播放时会一直重复调用）
      if (!trackVideoFaces && !trackCameraFaces) {
        this.detectFactory();
      }
    },

    // 获取媒体设备列表
    getMediaDevices() {
      if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        this.$createToast({
          txt: '不支持 enumerateDevices() .',
          type: 'txt'
        }).show();

        return;
      }

      navigator.mediaDevices.enumerateDevices()
          .then(devices => {
            const cameras = devices
                .filter(item => item.kind === 'videoinput')
                .map((item, index) => ({ text: `摄像头${index + 1}`, value: item.deviceId }));

            if (cameras.length) {
              this.$createPicker({
                title: '摄像头列表',
                data: [cameras],
                onSelect: this.getVideoStream,
                onCancel: () => this.trackCameraFaces = false
              }).show()
            }
            else {
              this.$createToast({
                txt: '未找到网络摄像头',
                type: 'txt'
              }).show();
            }
          })
          .catch(err => {
            console.log(err)
          })
    },

    // 请求媒体设备，获取视频流
    getVideoStream(deviceId) {
      const { video } = this.$refs;
      const _this = this;

      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          sourceId: deviceId[0]
        }
      })
      .then(function(stream) {
        video.srcObject = stream;
        window.requestAnimationFrame(_this.detectFactory);
      })
      .catch(function(err) {
        _this.$createToast({
          txt: '摄像头调用失败',
          type: 'txt'
        }).show();
      })
    },

    // 加载模型
    init() {
      const toast = this.$createToast({
        txt: '模型加载中...',
        mask: true
      })

      toast.show();

      // 加载训练好的模型
      // ageGenderNet:          年龄、性别识别模型，大约420KB
      // faceExpressionNet:     人脸表情识别模型，识别表情,开心，沮丧，普通，大约310KB
      // faceLandmark68Net：    68个点人脸地标检测模型（默认模型），大约350KB
      // faceLandmark68TinyNet：68个点人脸地标检测模型（小模型），大约80KB
      // faceRecognitionNet:    人脸识别模型，可以比较任意两个人脸的相似性，大约6.2MB
      // ssdMobilenetv1：       SSD 移动网络 V1，大约5.4MB，准确的最高，推理时间最慢
      // tinyFaceDetector:      微型人脸检测器（实时人脸检测器），与 SSD Mobilenet V1 人脸检测器相比，它速度更快、体积更小且资源消耗更少，但在检测小人脸方面的表现略逊一筹。移动和网络友好
      // mtcnn                  大约2MB
      // tinyYolov2             识别身体轮廓的算法，不知道怎么用
      Promise.all([
        faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
        faceapi.nets.faceLandmark68TinyNet.loadFromUri('./models'),
        faceapi.nets.ssdMobilenetv1.loadFromUri('./models'),
        faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
        faceapi.nets.mtcnn.loadFromUri('./models'),
        faceapi.nets.faceExpressionNet.loadFromUri('./models'),
        faceapi.nets.ageGenderNet.loadFromUri('./models'),
        // faceapi.nets.tinyYolov.loadFromUri('./models')
      ])
          .then((res) => {
            this.entryFaces();
            toast.hide();
          })
    },
  },
  watch: {
    videoStatus(newValue) {
      if (newValue) {
        window.requestAnimationFrame(this.detectFactory);
      }
    },

    // 开启视频人脸追踪后，获取摄像头列表
    trackCameraFaces(newValue) {
      if (newValue) {
        this.getMediaDevices();
      }
    }
  },
  mounted () {
    this.init();
  }
}
</script>

<style lang="less" scoped>
  /* 图片/视频 捕获区 */
  .detectBox {
    position: relative;
    min-height: 200px;

    img, video {
      width: 100%;
    }

    canvas {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  /* 美化样式 */
  .router_view {
    background: #efeff4;
    text-align: left;
    .plr(10);
    height: 100vh;
    overflow: auto;
  }

  .button {
    .mr(15);
    .mt(20);
  }

  .cube-checkbox-group {
    background: #fff;
    padding: 15px;


    /deep/ .cube-checkbox-wrap {
      line-height: 32px !important;
    }
  }

  .cube-switch {
    margin-top: 10px;
    font-size: 14px;
    background-color: #fff;
    padding: 5px;
    color: var(--C7);
    font-style: italic;
  }

  .faceCompare, .similarity {
    .shadow(0px 2px 6px 0px rgba(0, 0, 0, 0.5));
    background-color: #fff;
    padding: 5px;
    margin: 10px 0;
    box-sizing: border-box;


    h2 {
      font-size: 16px;
      margin-bottom: 5px;
    }

    .referenceImgs {
      display: flex;
      justify-content: flex-start;
      text-align: center;

      img {
        width: 100px;
        height: 140px;
        margin-right: 10px;
        display: block;
      }
      span {
        font-size: 12px;
      }
    }
  }

  .danger {
    color: red;
  }

  .timer {
    font-size: 14px;
    line-height: 20px;
    background-color: #fff;
    padding: 5px;
    margin: 10px 0;
    box-sizing: border-box;
  }
</style>