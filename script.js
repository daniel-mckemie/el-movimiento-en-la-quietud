let audioContext;
let canvasControl;
let scene;
let audioElements = [];
let soundSources = [];
let sourceIds = [
  'sourceAButton',
  'sourceBButton',
  'sourceCButton',
  'sourceDButton',
  // 'sourceEButton',
]

let dimensions = {
  small: {
    width: 1.5,
    height: 2.4,
    depth: 1.3,
  },
  medium: {
    width: 4,
    height: 3.2,
    depth: 3.9,
  },
  large: {
    width: 8,
    height: 3.4,
    depth: 9,
  },
  huge: {
    width: 20,
    height: 10,
    depth: 20,
  },
};
let materials = {
  brick: {
    left: 'brick-bare',
    right: 'brick-bare',
    up: 'brick-bare',
    down: 'wood-panel',
    front: 'brick-bare',
    back: 'brick-bare',
  },
  curtains: {
    left: 'curtain-heavy',
    right: 'curtain-heavy',
    up: 'wood-panel',
    down: 'wood-panel',
    front: 'curtain-heavy',
    back: 'curtain-heavy',
  },
  marble: {
    left: 'marble',
    right: 'marble',
    up: 'marble',
    down: 'marble',
    front: 'marble',
    back: 'marble',
  },
  outside: {
    left: 'transparent',
    right: 'transparent',
    up: 'transparent',
    down: 'grass',
    front: 'transparent',
    back: 'transparent',
  },
};
let dimensionSelection = 'small';
let materialSelection = 'brick';
let audioReady = false;

// Disable keyboard play/pause
navigator.mediaSession.setActionHandler('pause', function () {});
navigator.mediaSession.setActionHandler('play', function () {});

/**
 * @private
 */
function selectRoomProperties() {
  if (!audioReady)
    return;

  dimensionSelection =
    document.getElementById('roomDimensionsSelect').value;
  materialSelection =
    document.getElementById('roomMaterialsSelect').value;
  scene.setRoomProperties(dimensions[dimensionSelection],
    materials[materialSelection]);
  canvasControl.invokeCallback();
}

/**
 * @param {Object} elements
 * @private
 */
function updatePositions(elements) {
  if (!audioReady)
    return;

  for (let i = 0; i < elements.length; i++) {
    let x = (elements[i].x - 0.5) * dimensions[dimensionSelection].width / 2;
    let y = 0;
    let z = (elements[i].y - 0.5) * dimensions[dimensionSelection].depth / 2;
    if (i < elements.length - 1) {
      soundSources[i].setPosition(x, y, z);
    } else {
      scene.setListenerPosition(x, y, z);
    }
  }
}



/**
 * @private
 */
function initAudio() {
  audioContext = new(window.AudioContext || window.webkitAudioContext);



  const audioSources = [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    ''
  ];
  // let audioSources = [];
  let audioElementSources = [];



  for (let i = 0; i < audioSources.length; i++) {
    audioElements[i] = document.createElement('audio');
    audioElements[i].src = audioSources[i];
    audioElements[i].crossOrigin = 'anonymous';
    audioElements[i].load();
    // audioElements[i].loop = true;
    audioElementSources[i] =
      audioContext.createMediaElementSource(audioElements[i]);
  }


  // Initialize scene and create Source(s).
  scene = new ResonanceAudio(audioContext, {
    ambisonicOrder: 1,
  });
  for (let i = 0; i < audioSources.length; i++) {
    soundSources[i] = scene.createSource();
    audioElementSources[i].connect(soundSources[i].input);
  }
  scene.output.connect(audioContext.destination);

  audioReady = true;
}



let onLoad = function () {
  let playButton = document.getElementById('playButton');
  let aboutButton = document.getElementById('aboutButton');
  function randomStart() {
    let randomNumber = Math.floor(Math.random() * 2);
    if (randomNumber == 0) {            
      return macroForm('cdmx');
    } else {
      return macroForm('berlin');
    }    
  }

  playButton.addEventListener('click', function () {
    if (!audioReady) {
      initAudio();
      randomStart();
      playButton.style.visibility = 'hidden';
      aboutButton.style.visibility = 'hidden';
      window.scrollTo(0, 0);
      document.getElementsByTagName('html')[0].style.overflow = 'hidden';
      document.getElementsByTagName('body')[0].style.overflow = 'hidden';
      document.getElementsByTagName('body')[0].style.position = 'fixed';
      document.getElementsByClassName('container')[0].style.position = 'fixed'




    }
  })

  document.getElementById('room-row').style.visibility = 'hidden';
  document.getElementById('roomDimensionsSelect').addEventListener(
    'change',
    function (event) {
      selectRoomProperties();
    });

  document.getElementById('sourceAIcon').style.visibility = 'hidden';
  document.getElementById('sourceBIcon').style.visibility = 'hidden';
  document.getElementById('sourceCIcon').style.visibility = 'hidden';
  document.getElementById('sourceDIcon').style.visibility = 'hidden';
  document.getElementById('sourceEIcon').style.visibility = 'hidden';
  document.getElementById('sourceFIcon').style.visibility = 'hidden';
  document.getElementById('sourceGIcon').style.visibility = 'hidden';
  document.getElementById('sourceHIcon').style.visibility = 'hidden';
  document.getElementById('listenerIcon').style.visibility = 'hidden';


  document.getElementById('roomMaterialsSelect').addEventListener(
    'change',
    function (event) {
      selectRoomProperties();
    });


  let canvas = document.getElementById('canvas');
  let elements = [{
      icon: 'sourceAIcon',
      x: 0.25,
      y: 0.25,
      radius: 0.04,
      alpha: 0,
      clickable: true,
    },
    {
      icon: 'sourceBIcon',
      x: 0.75,
      y: 0.25,
      radius: 0.04,
      alpha: 0,
      clickable: true,
    },
    {
      icon: 'sourceCIcon',
      x: 0.25,
      y: 0.75,
      radius: 0.04,
      alpha: 0,
      clickable: true,
    },
    {
      icon: 'sourceDIcon',
      x: 0.50,
      y: 0.75,
      radius: 0.04,
      alpha: 0,
      clickable: true,
    },
    {
      icon: 'sourceEIcon',
      x: 0,
      y: 0,
      radius: 0.04,
      alpha: 0,
      clickable: true,
    },
    {
      icon: 'sourceFIcon',
      x: 1,
      y: 0,
      radius: 0.04,
      alpha: 0,
      clickable: true,
    },
    {
      icon: 'sourceGIcon',
      x: 0,
      y: 0,
      radius: 0.04,
      alpha: 0,
      clickable: true,
    },
    {
      icon: 'sourceHIcon',
      x: 1,
      y: 0,
      radius: 0.04,
      alpha: 0,
      clickable: true,
    },
    {
      icon: 'listenerIcon',
      x: 0.5,
      y: 0.5,
      radius: 0.04,
      alpha: 0.75,
      clickable: true,
    },
  ];
  canvasControl = new CanvasControl(canvas, elements, updatePositions);
  selectRoomProperties();

  const canvasElements = [
    canvasControl._elements[0],
    canvasControl._elements[1],
    canvasControl._elements[2],
    canvasControl._elements[3],
    canvasControl._elements[4],
    canvasControl._elements[5],
    canvasControl._elements[6],
    canvasControl._elements[7]
  ];

  canvasElements[4].x = 0.9;
  canvasElements[4].y = 0.5;

  canvasElements[5].x = 0.1;
  canvasElements[5].y = 0.5;

  canvasElements[6].x = 0.9;
  canvasElements[6].y = 0.5;

  canvasElements[7].x = 0.1;
  canvasElements[7].y = 0.5;


  // Global form functionality
  let berlinFullBlocks = [
    berlinSDBlock1,
    berlinSDBlock2,
    berlinMusBlock1,
    berlinMusBlock2,

  ];
  let cdmxFullBlocks = [
    cdmxSDBlock1,
    cdmxSDBlock2,
    cdmxMusBlock1,
    cdmxMusBlock2
  ];

  function checkBerlinFullBlocks() {
    if (berlinFullBlocks.length == 0) {      
      const newBerlinBlocks = [
        berlinSDBlock1,
        berlinSDBlock2,
        berlinMusBlock1,
        berlinMusBlock2,        
      ];
      berlinFullBlocks = newBerlinBlocks;

    }
  }

  function checkCDMXFullBlocks() {
    if (cdmxFullBlocks.length == 0) {      
      const newCDMXBlocks = [
        cdmxSDBlock1,
        cdmxSDBlock2,
        cdmxMusBlock1,
        cdmxMusBlock2
      ];
      cdmxFullBlocks = newCDMXBlocks;
    }
  }

  function macroForm(destination) {
    if (destination == 'cdmx') {
      checkCDMXFullBlocks();
      let pickBlock = Math.floor(Math.random() * cdmxFullBlocks.length);
      cdmxFullBlocks[pickBlock]();
      cdmxFullBlocks.splice(pickBlock, 1);

    } else if (destination == 'berlin') {
      checkBerlinFullBlocks();
      let pickBlock = Math.floor(Math.random() * berlinFullBlocks.length);
      berlinFullBlocks[pickBlock]();
      berlinFullBlocks.splice(pickBlock, 1);

    }
  }

  // Transition Processes
  berlinBlocksL = [
    'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/Berlin-CDMX/Berlin-CDMX_TBlock1/Berlin-CDMX_TBlock.L.wav',
    'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/Berlin-CDMX/Berlin-CDMX_TBlock2/Berlin-CDMX_TBlock2.L.wav',
    'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/Berlin-CDMX/Berlin-CDMX_TBlock3/Berlin-CDMX_TBlock3.L.wav',
    'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/Berlin-CDMX/Berlin-CDMX_TBlock4/Berlin-CDMX_TBlock4.L.wav',
    'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/Berlin-CDMX/Berlin-CDMX_TBlock5/Berlin-CDMX_TBlock5.L.wav',
    'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/Berlin-CDMX/Berlin-CDMX_TBlock6/Berlin-CDMX_TBlock6.L.wav',


  ];

  berlinBlocksR = [
    'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/Berlin-CDMX/Berlin-CDMX_TBlock1/Berlin-CDMX_TBlock.R.wav',
    'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/Berlin-CDMX/Berlin-CDMX_TBlock2/Berlin-CDMX_TBlock2.R.wav',
    'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/Berlin-CDMX/Berlin-CDMX_TBlock3/Berlin-CDMX_TBlock3.R.wav',
    'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/Berlin-CDMX/Berlin-CDMX_TBlock4/Berlin-CDMX_TBlock4.R.wav',
    'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/Berlin-CDMX/Berlin-CDMX_TBlock5/Berlin-CDMX_TBlock5.R.wav',
    'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/Berlin-CDMX/Berlin-CDMX_TBlock6/Berlin-CDMX_TBlock6.R.wav'
  ];


  function refillBerlinBlocks() {
    if (berlinBlocksL.length == 0) {
      // Re-up the array if exhausted
      newBerlinBlocksL = [
        'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/Berlin-CDMX/Berlin-CDMX_TBlock1/Berlin-CDMX_TBlock.L.wav',
        'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/Berlin-CDMX/Berlin-CDMX_TBlock2/Berlin-CDMX_TBlock2.L.wav',
        'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/Berlin-CDMX/Berlin-CDMX_TBlock3/Berlin-CDMX_TBlock3.L.wav',
        'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/Berlin-CDMX/Berlin-CDMX_TBlock4/Berlin-CDMX_TBlock4.L.wav',
        'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/Berlin-CDMX/Berlin-CDMX_TBlock5/Berlin-CDMX_TBlock5.L.wav',
        'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/Berlin-CDMX/Berlin-CDMX_TBlock6/Berlin-CDMX_TBlock6.L.wav',
      ];


      newBerlinBlocksR = [
        'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/Berlin-CDMX/Berlin-CDMX_TBlock1/Berlin-CDMX_TBlock.R.wav',
        'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/Berlin-CDMX/Berlin-CDMX_TBlock2/Berlin-CDMX_TBlock2.R.wav',
        'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/Berlin-CDMX/Berlin-CDMX_TBlock3/Berlin-CDMX_TBlock3.R.wav',
        'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/Berlin-CDMX/Berlin-CDMX_TBlock4/Berlin-CDMX_TBlock4.R.wav',
        'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/Berlin-CDMX/Berlin-CDMX_TBlock5/Berlin-CDMX_TBlock5.R.wav',
        'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/Berlin-CDMX/Berlin-CDMX_TBlock6/Berlin-CDMX_TBlock6.R.wav'
      ];

      berlinBlocksL = newBerlinBlocksL;
      berlinBlocksR = newBerlinBlocksR;
    }
  }

  function toCDMX() {
    refillBerlinBlocks();

    let pickBlock = Math.floor(Math.random() * berlinBlocksL.length);

    audioElements[6].src = berlinBlocksL[pickBlock];
    audioElements[7].src = berlinBlocksR[pickBlock];
    audioElements[6].load();
    audioElements[7].load();    
    fadeInAudioFunction(audioElements[6]);
    fadeInAudioFunction(audioElements[7]);

    berlinBlocksL.splice(pickBlock, 1);
    berlinBlocksR.splice(pickBlock, 1);


    switch (audioElements[6].src) {
      case 'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/Berlin-CDMX/Berlin-CDMX_TBlock1/Berlin-CDMX_TBlock.L.wav':
        setTimeout(() => {
          macroForm('cdmx');
        }, 45000);
        setTimeout(() => {
          fadeOutAudioFunction(audioElements[6]);
          fadeOutAudioFunction(audioElements[7]);
        }, 46000);
        break;
      case 'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/Berlin-CDMX/Berlin-CDMX_TBlock2/Berlin-CDMX_TBlock2.L.wav':
        setTimeout(() => {
          macroForm('cdmx');
        }, 58000);
        setTimeout(() => {
          fadeOutAudioFunction(audioElements[6]);
          fadeOutAudioFunction(audioElements[7]);
        }, 59000);
        break;
      case 'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/Berlin-CDMX/Berlin-CDMX_TBlock3/Berlin-CDMX_TBlock3.L.wav':
        setTimeout(() => {
          macroForm('cdmx');
        }, 48000);
        setTimeout(() => {
          fadeOutAudioFunction(audioElements[6]);
          fadeOutAudioFunction(audioElements[7]);
        }, 49000);
        break;
      case 'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/Berlin-CDMX/Berlin-CDMX_TBlock4/Berlin-CDMX_TBlock4.L.wav':
        setTimeout(() => {
          macroForm('cdmx');
        }, 64000);
        setTimeout(() => {
          fadeOutAudioFunction(audioElements[6]);
          fadeOutAudioFunction(audioElements[7]);
        }, 65000);
        break;
      case 'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/Berlin-CDMX/Berlin-CDMX_TBlock5/Berlin-CDMX_TBlock5.L.wav':
        setTimeout(() => {
          macroForm('cdmx');
        }, 64000);
        setTimeout(() => {
          fadeOutAudioFunction(audioElements[6]);
          fadeOutAudioFunction(audioElements[7]);
        }, 65000);
        break;
      case 'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/Berlin-CDMX/Berlin-CDMX_TBlock6/Berlin-CDMX_TBlock6.L.wav':
        setTimeout(() => {
          macroForm('cdmx');
        }, 54000);
        setTimeout(() => {
          fadeOutAudioFunction(audioElements[6]);
          fadeOutAudioFunction(audioElements[7]);
        }, 55000);
        break;
      default:
        break;
    }



  }

  cdmxBlocksL = [
    'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/CDMX-Berlin/CDMX-Berlin_TBlock1/CDMX-Berlin_TBlock1.L.wav',
    'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/CDMX-Berlin/CDMX-Berlin_TBlock2/CDMX-Berlin_TBlock2.L.wav',
    'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/CDMX-Berlin/CDMX-Berlin_TBlock3/CDMX-Berlin_TBlock3.L.wav',
    'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/CDMX-Berlin/CDMX-Berlin_TBlock4/CDMX-Berlin_TBlock4.L.wav',
    'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/CDMX-Berlin/CDMX-Berlin_TBlock5/CDMX-Berlin_TBlock5.L.wav',
    'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/CDMX-Berlin/CDMX-Berlin_TBlock6/CDMX-Berlin_TBlock6.L.wav'
  ];

  cdmxBlocksR = [
    'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/CDMX-Berlin/CDMX-Berlin_TBlock1/CDMX-Berlin_TBlock1.R.wav',
    'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/CDMX-Berlin/CDMX-Berlin_TBlock2/CDMX-Berlin_TBlock2.R.wav',
    'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/CDMX-Berlin/CDMX-Berlin_TBlock3/CDMX-Berlin_TBlock3.R.wav',
    'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/CDMX-Berlin/CDMX-Berlin_TBlock4/CDMX-Berlin_TBlock4.R.wav',
    'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/CDMX-Berlin/CDMX-Berlin_TBlock5/CDMX-Berlin_TBlock5.R.wav',
    'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/CDMX-Berlin/CDMX-Berlin_TBlock6/CDMX-Berlin_TBlock6.R.wav'
  ];

  function refillCDMXBlocks() {
    if (cdmxBlocksL.length == 0) {
      // Re-up the array if exhausted
      newCDMXBlocksL = [
        'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/CDMX-Berlin/CDMX-Berlin_TBlock1/CDMX-Berlin_TBlock1.L.wav',
        'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/CDMX-Berlin/CDMX-Berlin_TBlock2/CDMX-Berlin_TBlock2.L.wav',
        'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/CDMX-Berlin/CDMX-Berlin_TBlock3/CDMX-Berlin_TBlock3.L.wav',
        'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/CDMX-Berlin/CDMX-Berlin_TBlock4/CDMX-Berlin_TBlock4.L.wav',
        'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/CDMX-Berlin/CDMX-Berlin_TBlock5/CDMX-Berlin_TBlock5.L.wav',
        'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/CDMX-Berlin/CDMX-Berlin_TBlock6/CDMX-Berlin_TBlock6.L.wav'
      ];

      newCDMXBlocksR = [
        'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/CDMX-Berlin/CDMX-Berlin_TBlock1/CDMX-Berlin_TBlock1.R.wav',
        'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/CDMX-Berlin/CDMX-Berlin_TBlock2/CDMX-Berlin_TBlock2.R.wav',
        'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/CDMX-Berlin/CDMX-Berlin_TBlock3/CDMX-Berlin_TBlock3.R.wav',
        'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/CDMX-Berlin/CDMX-Berlin_TBlock4/CDMX-Berlin_TBlock4.R.wav',
        'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/CDMX-Berlin/CDMX-Berlin_TBlock5/CDMX-Berlin_TBlock5.R.wav',
        'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/CDMX-Berlin/CDMX-Berlin_TBlock6/CDMX-Berlin_TBlock6.R.wav'
      ];
      cdmxBlocksL = newCDMXBlocksL;
      cdmxBlocksR = newCDMXBlocksR;
    }
  }

  function toBerlin() {
    refillCDMXBlocks();

    let pickBlock = Math.floor(Math.random() * cdmxBlocksL.length);

    audioElements[6].src = cdmxBlocksL[pickBlock];
    audioElements[7].src = cdmxBlocksR[pickBlock];
    audioElements[6].load();
    audioElements[7].load();
    fadeInAudioFunction(audioElements[6]);
    fadeInAudioFunction(audioElements[7]);
    cdmxBlocksL.splice(pickBlock, 1);
    cdmxBlocksR.splice(pickBlock, 1);


    switch (audioElements[6].src) {
      case 'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/CDMX-Berlin/CDMX-Berlin_TBlock1/CDMX-Berlin_TBlock1.L.wav':
        setTimeout(() => {
          macroForm('berlin');
        }, 56000);
        setTimeout(() => {
          fadeOutAudioFunction(audioElements[6]);
          fadeOutAudioFunction(audioElements[7]);
        }, 57000);
        break;
      case 'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/CDMX-Berlin/CDMX-Berlin_TBlock2/CDMX-Berlin_TBlock2.L.wav':
        setTimeout(() => {
          macroForm('berlin');
        }, 36000);
        setTimeout(() => {
          fadeOutAudioFunction(audioElements[6]);
          fadeOutAudioFunction(audioElements[7]);
        }, 37000);
        break;
      case 'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/CDMX-Berlin/CDMX-Berlin_TBlock3/CDMX-Berlin_TBlock3.L.wav':
        setTimeout(() => {
          macroForm('berlin');
        }, 48000);
        setTimeout(() => {
          fadeOutAudioFunction(audioElements[6]);
          fadeOutAudioFunction(audioElements[7]);
        }, 49000);
        break;
      case 'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/CDMX-Berlin/CDMX-Berlin_TBlock4/CDMX-Berlin_TBlock4.L.wav':
        setTimeout(() => {
          macroForm('berlin');
        }, 57000);
        setTimeout(() => {
          fadeOutAudioFunction(audioElements[6]);
          fadeOutAudioFunction(audioElements[7]);
        }, 58000);
        break;
      case 'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/CDMX-Berlin/CDMX-Berlin_TBlock5/CDMX-Berlin_TBlock5.L.wav':
        setTimeout(() => {
          macroForm('berlin');
        }, 63000);
        setTimeout(() => {
          fadeOutAudioFunction(audioElements[6]);
          fadeOutAudioFunction(audioElements[7]);
        }, 64000);
        break;
      case 'https://el-movimiento.s3.amazonaws.com/Transition_Blocks/CDMX-Berlin/CDMX-Berlin_TBlock6/CDMX-Berlin_TBlock6.L.wav':
        setTimeout(() => {
          macroForm('berlin');
        }, 56000);
        setTimeout(() => {
          fadeOutAudioFunction(audioElements[6]);
          fadeOutAudioFunction(audioElements[7]);
        }, 60000);
        break;
      default:
        break;
    }


  }



  // Audio fade functions 
  function fadeInElementFunction(elem) {
    let fadeInTimer = setInterval(fadeIn, 20);

    function fadeIn() {
      if (elem.alpha >= 0.98) {
        stopFadeIn();
      } else {
        elem.alpha += 0.01;
        canvasControl.draw()
      }

      function stopFadeIn() {
        clearInterval(fadeInTimer);
      }
    }
  }

  function fadeInAudioFunction(elem) {
    elem.pause();
    elem.currentTime = 0;
    elem.volume = 0;
    let fadeInTimer = setInterval(fadeIn, 20);
    elem.play();

    function fadeIn() {
      if (elem.volume >= 0.98) {
        elem.volume = 1;
        stopFadeIn();
      } else {
        elem.volume += 0.01;
      }

      function stopFadeIn() {
        clearInterval(fadeInTimer);
      }
    }
  }

  function fadeOutElementFunction(elem) {


    let fadeOutTimer = setInterval(fadeOut, 20);

    function fadeOut() {
      if (elem.alpha <= 0.01) {
        stopFadeOut();
      } else {
        elem.alpha -= 0.01;
        canvasControl.draw()
      }
    }

    function stopFadeOut() {
      clearInterval(fadeOutTimer);
    }
  }

  function fadeOutAudioFunction(elem) {

    let fadeOutTimer = setInterval(fadeOut, 20);

    function fadeOut() {
      if (elem.volume <= 0.01) {
        elem.volume = 0;
        elem.currentTime = 0;
        elem.pause();
        stopFadeOut();
      } else {
        elem.volume -= 0.01;
      }
    }

    function stopFadeOut() {
      clearInterval(fadeOutTimer);
    }
  }

  function fadeAllOut(destinationBlock) {
    setTimeout(() => {
      fadeOutElementFunction(canvasElements[0]);
      fadeOutElementFunction(canvasElements[1]);
      fadeOutElementFunction(canvasElements[2]);
      fadeOutElementFunction(canvasElements[3]);
      fadeOutAudioFunction(audioElements[0]);
      fadeOutAudioFunction(audioElements[1]);
      fadeOutAudioFunction(audioElements[2]);
      fadeOutAudioFunction(audioElements[3]);
      fadeOutAudioFunction(audioElements[4]);
      fadeOutAudioFunction(audioElements[5]);
    }, 1000);

    if (destinationBlock == 'cdmx') {
      toCDMX();
    } else {
      toBerlin();
    }


  }


  // Berlin_SDBlock1 DATA
  baseFilesBerlin_SDBlock1 = [
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_Base/Berlin_SDBlock1_Base.L.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_Base/Berlin_SDBlock1_Base.R.wav'
  ];
  glitches = [
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_Glitches/Berlin_SDBlock1_Glitch1.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_Glitches/Berlin_SDBlock1_Glitch2.wav'
  ];
  reverses = [
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_Reverses/Berlin_SDBlock1_Reverse1.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_Reverses/Berlin_SDBlock1_Reverse2.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_Reverses/Berlin_SDBlock1_Reverse3.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_Reverses/Berlin_SDBlock1_Reverse4.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_Reverses/Berlin_SDBlock1_Reverse5.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_Reverses/Berlin_SDBlock1_Reverse6.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_Reverses/Berlin_SDBlock1_Reverse7.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_Reverses/Berlin_SDBlock1_Reverse8.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_Reverses/Berlin_SDBlock1_Reverse9.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_Reverses/Berlin_SDBlock1_Reverse10.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_Reverses/Berlin_SDBlock1_Reverse11.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_Reverses/Berlin_SDBlock1_Reverse12.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_Reverses/Berlin_SDBlock1_Reverse13.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_Reverses/Berlin_SDBlock1_Reverse14.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_Reverses/Berlin_SDBlock1_Reverse15.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_Reverses/Berlin_SDBlock1_Reverse16.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_Reverses/Berlin_SDBlock1_Reverse17.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_Reverses/Berlin_SDBlock1_Reverse18.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_Reverses/Berlin_SDBlock1_Reverse19.wav',
  ];
  reversesVerb = [
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_ReversesVerb/Berlin_SDBlock1_ReverseVerb1.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_ReversesVerb/Berlin_SDBlock1_ReverseVerb2.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_ReversesVerb/Berlin_SDBlock1_ReverseVerb3.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_ReversesVerb/Berlin_SDBlock1_ReverseVerb4.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_ReversesVerb/Berlin_SDBlock1_ReverseVerb5.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_ReversesVerb/Berlin_SDBlock1_ReverseVerb6.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_ReversesVerb/Berlin_SDBlock1_ReverseVerb7.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_ReversesVerb/Berlin_SDBlock1_ReverseVerb8.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_ReversesVerb/Berlin_SDBlock1_ReverseVerb9.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_ReversesVerb/Berlin_SDBlock1_ReverseVerb10.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_ReversesVerb/Berlin_SDBlock1_ReverseVerb11.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_ReversesVerb/Berlin_SDBlock1_ReverseVerb12.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_ReversesVerb/Berlin_SDBlock1_ReverseVerb13.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_ReversesVerb/Berlin_SDBlock1_ReverseVerb14.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_ReversesVerb/Berlin_SDBlock1_ReverseVerb15.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_ReversesVerb/Berlin_SDBlock1_ReverseVerb16.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_ReversesVerb/Berlin_SDBlock1_ReverseVerb17.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_ReversesVerb/Berlin_SDBlock1_ReverseVerb18.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_ReversesVerb/Berlin_SDBlock1_ReverseVerb19.wav',
  ];

  // COMPLETE
  function berlinSDBlock1() {
    function checkReversesArray() {
      if (reverses.length == 0) {
        // Re-up the array if exhausted
        reverses = [
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_Reverses/Berlin_SDBlock1_Reverse1.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_Reverses/Berlin_SDBlock1_Reverse2.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_Reverses/Berlin_SDBlock1_Reverse3.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_Reverses/Berlin_SDBlock1_Reverse4.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_Reverses/Berlin_SDBlock1_Reverse5.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_Reverses/Berlin_SDBlock1_Reverse6.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_Reverses/Berlin_SDBlock1_Reverse7.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_Reverses/Berlin_SDBlock1_Reverse8.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_Reverses/Berlin_SDBlock1_Reverse9.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_Reverses/Berlin_SDBlock1_Reverse10.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_Reverses/Berlin_SDBlock1_Reverse11.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_Reverses/Berlin_SDBlock1_Reverse12.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_Reverses/Berlin_SDBlock1_Reverse13.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_Reverses/Berlin_SDBlock1_Reverse14.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_Reverses/Berlin_SDBlock1_Reverse15.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_Reverses/Berlin_SDBlock1_Reverse16.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_Reverses/Berlin_SDBlock1_Reverse17.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_Reverses/Berlin_SDBlock1_Reverse18.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_Reverses/Berlin_SDBlock1_Reverse19.wav',
        ];
      }
    }

    function checkReversesVerbArray() {
      if (reversesVerb.length == 0) {
        // Re-up the array if exhausted
        reversesVerb = [
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_ReversesVerb/Berlin_SDBlock1_ReverseVerb1.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_ReversesVerb/Berlin_SDBlock1_ReverseVerb2.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_ReversesVerb/Berlin_SDBlock1_ReverseVerb3.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_ReversesVerb/Berlin_SDBlock1_ReverseVerb4.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_ReversesVerb/Berlin_SDBlock1_ReverseVerb5.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_ReversesVerb/Berlin_SDBlock1_ReverseVerb6.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_ReversesVerb/Berlin_SDBlock1_ReverseVerb7.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_ReversesVerb/Berlin_SDBlock1_ReverseVerb8.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_ReversesVerb/Berlin_SDBlock1_ReverseVerb9.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_ReversesVerb/Berlin_SDBlock1_ReverseVerb10.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_ReversesVerb/Berlin_SDBlock1_ReverseVerb11.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_ReversesVerb/Berlin_SDBlock1_ReverseVerb12.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_ReversesVerb/Berlin_SDBlock1_ReverseVerb13.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_ReversesVerb/Berlin_SDBlock1_ReverseVerb14.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_ReversesVerb/Berlin_SDBlock1_ReverseVerb15.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_ReversesVerb/Berlin_SDBlock1_ReverseVerb16.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_ReversesVerb/Berlin_SDBlock1_ReverseVerb17.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_ReversesVerb/Berlin_SDBlock1_ReverseVerb18.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock1/Berlin_SDBlock1_ReversesVerb/Berlin_SDBlock1_ReverseVerb19.wav',
        ];
      }
    }





    function part1() {
      audioElements[4].src = baseFilesBerlin_SDBlock1[0];
      audioElements[5].src = baseFilesBerlin_SDBlock1[1];
      audioElements[4].load();
      audioElements[5].load();
      fadeInAudioFunction(audioElements[4]);
      fadeInAudioFunction(audioElements[5]);
    }

    function part2() {

      canvasElements[0].x = Math.random();
      canvasElements[0].y = Math.random();
      fadeInElementFunction(canvasElements[0]);

      canvasElements[1].x = Math.random();
      canvasElements[1].y = Math.random();
      fadeInElementFunction(canvasElements[1]);

      canvasElements[2].x = Math.random();
      canvasElements[2].y = Math.random();
      fadeInElementFunction(canvasElements[2]);

      canvasElements[3].x = Math.random();
      canvasElements[3].y = Math.random();
      fadeInElementFunction(canvasElements[3]);


      audioElements[0].src = glitches[0];
      audioElements[0].load();
      audioElements[0].volume = 0;


      audioElements[1].src = glitches[1];
      audioElements[1].load();
      audioElements[1].volume = 0;

      let pickBlock2 = Math.floor(Math.random() * reverses.length);
      audioElements[2].src = reverses[pickBlock2];
      audioElements[2].load();
      audioElements[2].volume = 0;
      reverses.splice(pickBlock2, 1);
      checkReversesArray();


      let pickBlock3 = Math.floor(Math.random() * reverses.length);
      audioElements[3].src = reverses[pickBlock3];
      audioElements[3].volume = 0;
      reverses.splice(pickBlock3, 1);
      checkReversesArray();

    }

    // Glitch Firing
    let randomNumberFire1;
    let randomNumberFire2;
    let randomNumberFire3;
    let randomNumberFire4;
    let randomNumberLength1;
    let randomNumberLength2;
    let glitchEvents1Timer;
    let glitchEvents2Timer;
    let glitchEvents3Timer;
    let glitchEvents4Timer;

    function startFireGlitches() {
      glitchEvents1Timer = setInterval(fireGlitch1, 1000);
      glitchEvents2Timer = setInterval(fireGlitch2, 1000);
      glitchEvents3Timer = setInterval(fireGlitch3, 1000);
      glitchEvents4Timer = setInterval(fireGlitch4, 1000);
    }

    function fireGlitch1() {
      if (randomNumberFire1 < 8 && audioElements[0].volume == 0 && audioElements[0].readyState >= 2 && counter < 150) {
        audioElements[0].volume = 1;
        setTimeout(() => {
          audioElements[0].volume = 0
        }, randomNumberLength1); // RANDOMIZE THIS NUMBER
      } else if (randomNumberFire1 < 6 && audioElements[0].volume == 0 && audioElements[0].readyState >= 2) {
        audioElements[0].volume = 1;
        audioElements[0].onended = pickNewReverseVerb(audioElements[0]);
      }
    }

    function fireGlitch2() {
      if (randomNumberFire2 < 8 && audioElements[1].volume == 0 && audioElements[1].readyState >= 2 && counter < 150) {
        audioElements[1].volume = 1;
        setTimeout(() => {
          audioElements[1].volume = 0
        }, randomNumberLength2); // RANDOMIZE THIS NUMBER
      } else if (randomNumberFire2 < 6 && audioElements[1].volume == 0 && audioElements[1].readyState >= 2) {
        audioElements[1].volume = 1;
        audioElements[1].onended = pickNewReverseVerb(audioElements[1]);
      }
    }

    function fireGlitch3() {
      if (randomNumberFire3 < 3 && audioElements[2].volume == 0 && audioElements[2].readyState >= 2 && counter < 150) {
        audioElements[2].volume = 1;
        audioElements[2].onended = pickNewReverseVerb(audioElements[2]);
      } else if (randomNumberFire3 < 6 && audioElements[2].volume == 0 && audioElements[2].readyState >= 2) {
        audioElements[2].volume = 1;
        audioElements[2].onended = pickNewReverseVerb(audioElements[2]);
      }
    }

    function fireGlitch4() {
      if (randomNumberFire4 < 3 && audioElements[3].volume == 0 && audioElements[3].readyState >= 2 && counter < 150) {
        audioElements[3].volume = 1;
        audioElements[3].onended = pickNewReverseVerb(audioElements[3]);
      } else if (randomNumberFire4 < 6 && audioElements[3].volume == 0 && audioElements[3].readyState >= 2) {
        audioElements[3].volume = 1;
        audioElements[3].onended = pickNewReverseVerb(audioElements[3]);
      }
    }

    function stopFireGlitches() {
      clearInterval(glitchEvents1Timer);
      clearInterval(glitchEvents2Timer);
      clearInterval(glitchEvents3Timer);
      clearInterval(glitchEvents4Timer);
    }


    function pickNewReverseVerb(elem) {
      let pickBlock = Math.floor(Math.random() * reversesVerb.length);
      elem.src = reversesVerb[pickBlock];
      elem.load();
      reversesVerb.splice(pickBlock, 1);
      elem.play();
      checkReversesVerbArray();      

    }

    let counter = 0;
    let counterSystemTimer = setInterval(counterSystem, 1000);

    function counterSystem() {
      randomNumberFire1 = Math.floor(Math.random() * 60);
      randomNumberFire2 = Math.floor(Math.random() * 60);
      randomNumberFire3 = Math.floor(Math.random() * 60);
      randomNumberFire4 = Math.floor(Math.random() * 60);
      randomNumberLength1 = Math.floor(Math.random() * 3000) + 1000;
      randomNumberLength2 = Math.floor(Math.random() * 3000) + 1000;
      counter++
      if (counter == 1) {
        part1();
      }
      if (counter == 33) { // 33
        part2();
        audioElements[0].play();
        audioElements[1].play();
        audioElements[2].play();
        audioElements[3].play();
        startFireGlitches();
      }
      if (counter == 150) {
        stopFireGlitches();
        fadeAllOut('cdmx');
        stopSystem();
      }

      function stopSystem() {
        clearInterval(counterSystemTimer);
      }
    }

  }
  



  baseFilesBerlin_SDBlock2 = [
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock2/Berlin_SDBlock2_Base/Berlin_SDBlock2_Base.L.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock2/Berlin_SDBlock2_Base/Berlin_SDBlock2_Base.R.wav'
  ];

  overDubs = [
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock2/Berlin_SDBlock2_Overdubs/Berlin_SDBlock2_Overdubs.L.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock2/Berlin_SDBlock2_Overdubs/Berlin_SDBlock2_Overdubs.R.wav'
  ];

  randomMelody = [
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock2/Berlin_SDBlock2_Instruments/Berlin_SDBlock2_RandomMelody.wav'
  ];

  randomChords = [
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock2/Berlin_SDBlock2_Instruments/Berlin_SDBlock2_RandomChords1.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_SDBlock2/Berlin_SDBlock2_Instruments/Berlin_SDBlock2_RandomChords2.wav'
  ];
  
  // COMPLETE without EFFECTS
  function berlinSDBlock2() {

    function part1() {
      audioElements[4].src = baseFilesBerlin_SDBlock2[0];
      audioElements[5].src = baseFilesBerlin_SDBlock2[1];
      audioElements[4].load();
      audioElements[5].load();
      fadeInAudioFunction(audioElements[4]);
      fadeInAudioFunction(audioElements[5]);

      audioElements[0].src = overDubs[0];
      audioElements[0].load();
      audioElements[0].volume = 1;


      audioElements[1].src = overDubs[1];
      audioElements[1].load();
      audioElements[1].volume = 1;

      audioElements[2].src = randomMelody[0];
      audioElements[2].load();
      audioElements[2].volume = 1;
    }

    function part2() {

      canvasElements[0].x = 0.25;
      canvasElements[0].y = 0.5;
      fadeInElementFunction(canvasElements[0]);

      canvasElements[1].x = 0.75;
      canvasElements[1].y = 0.5;
      fadeInElementFunction(canvasElements[1]);
    }

    let randomNumberFire1;
    let randomNumberFire2;

    let randomNumberLength1;
    let randomNumberLength2;
    let glitchEvents1Timer;
    let glitchEvents2Timer;

    function startDubVerbs() {
      glitchEvents1Timer = setInterval(fireDubVerbs, 1000);
    }

    function fireDubVerbs() {
      if (randomNumberFire1 < 11 && audioElements[0].volume == 0 && audioElements[0].readyState >= 2) {
        audioElements[0].volume = 1;
        setTimeout(() => {
          audioElements[0].volume = 0
        }, 4000);
      } else if (randomNumberFire1 < 11 && audioElements[1].volume == 0 && audioElements[1].readyState >= 2) {
        audioElements[1].volume = 1;
        setTimeout(() => {
          audioElements[1].volume = 0
        }, 4000);
      }
    }


    function startRandomMelodyVerbs() {
      glitchEvents2Timer = setInterval(fireRandomMelodyVerbs, 1000);
    }

    function fireRandomMelodyVerbs() {
      if (randomNumberFire2 < 7 && audioElements[2].volume == 0 && audioElements[1].readyState >= 2) {
        audioElements[2].volume = 1;
        setTimeout(() => {
          audioElements[2].volume = 0
        }, randomNumberLength1); // RANDOMIZE THIS NUMBER        
        fadeOutElementFunction(canvasElements[0]);
        fadeOutElementFunction(canvasElements[1]);
      }
    }

    function part4() {
      canvasElements[2].x = 0.5;
      canvasElements[2].y = 0.75;
      fadeInElementFunction(canvasElements[2]);

    }

    function part4point5() {
      audioElements[0].src = randomChords[0];
      audioElements[0].load();
      audioElements[0].volume = 1;

      audioElements[1].src = randomChords[1];
      audioElements[1].load();
      audioElements[1].volume = 1;
    }

    function part5() {
      
      canvasElements[0].x = 0.35
      canvasElements[0].y = 0.25
      fadeInElementFunction(canvasElements[0]);

      canvasElements[1].x = 0.65
      canvasElements[1].y = 0.25
      fadeInElementFunction(canvasElements[1]);

      audioElements[0].play();
      audioElements[1].play();
    }

    function part6() {
      fadeOutElementFunction(canvasElements[2]);
      fadeOutAudioFunction(audioElements[2]);
    }





    function stopDubVerbs() {
      audioElements[0].volume = 1;
      audioElements[1].volume = 1;
      clearInterval(glitchEvents1Timer);      
    }
    function stopRandomMelodyVerbs() {
      audioElements[0].volume = 1;
      audioElements[1].volume = 1;
      clearInterval(glitchEvents2Timer);      
    }


    let counter = 0;
    let counterSystemTimer = setInterval(counterSystem, 1000);

    function counterSystem() {
      randomNumberFire1 = Math.floor(Math.random() * 60);
      randomNumberFire2 = Math.floor(Math.random() * 60);
      randomNumberLength1 = Math.floor(Math.random() * 2000) + 5000;
      randomNumberLength2 = Math.floor(Math.random() * 2000) + 3000;
      counter++
      if (counter == 1) {
        part1();
      }
      if (counter == 4) { // 62
        part2();
        audioElements[0].play();
        audioElements[1].play();
        startDubVerbs();
      }
      if (counter == 62) { // 62    
        stopDubVerbs();
        fadeOutElementFunction(canvasElements[0]);
        fadeOutElementFunction(canvasElements[1]);
        startRandomMelodyVerbs();        

      }
      if (counter == 64) {
        audioElements[2].play();
        part4();
      }
      if (counter == 90) {
        part4point5();
      }
      if (counter == 104) {        
        part5();
        startDubVerbs();        

      }
      if (counter == 136) {
        stopRandomMelodyVerbs();
        part6();

      }
      if (counter == 183) {
        stopDubVerbs();        
        fadeAllOut('cdmx');
        stopSystem();

      }


      function stopSystem() {
        clearInterval(counterSystemTimer);
      }
    }

  }


  // Berlin MusBlock1 DATA
  baseFilesBerlin_MusBlock1 = [
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock1/Berlin_MusBlock1_Base/Berlin_MusBlock1_Base.L.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock1/Berlin_MusBlock1_Base/Berlin_MusBlock1_Base.R.wav'
  ];

  berlinBassSynth = [
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock1/Berlin_MusBlock1_BassSynth/Berlin_MusBlock1_BassSynth.wav'
  ];

  berlinBeat = [
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock1/Berlin_MusBlock1_Beat/Berlin_MusBlock1_Beat.wav'
  ];

  berlinVoices = [
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock1/Berlin_MusBlock1_Voices/Berlin_MusBlock1_Voices_BackL.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock1/Berlin_MusBlock1_Voices/Berlin_MusBlock1_Voices_BackR.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock1/Berlin_MusBlock1_Voices/Berlin_MusBlock1_Voices_FrontL.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock1/Berlin_MusBlock1_Voices/Berlin_MusBlock1_Voices_FrontR.wav'
  ];



  // COMPLETE
  function berlinMusBlock1() {    

    function part1() {
      audioElements[4].src = baseFilesBerlin_MusBlock1[0];
      audioElements[5].src = baseFilesBerlin_MusBlock1[1];
      audioElements[4].load();
      audioElements[5].load();
      fadeInAudioFunction(audioElements[4]);
      fadeInAudioFunction(audioElements[5]);


    }

    function part2() {
      canvasElements[0].x = 0.5
      canvasElements[0].y = 0.2
      fadeInElementFunction(canvasElements[0]);
      audioElements[0].src = berlinBeat[0];
      audioElements[0].load();
      audioElements[0].volume = 1;
      fadeInAudioFunction(audioElements[0]);

      
    }

    function part2point5() {
      canvasElements[1].x = Math.random();
      canvasElements[1].y = Math.random();
      fadeInElementFunction(canvasElements[1]);
      audioElements[1].src = berlinBassSynth[0];
      audioElements[1].load();
      audioElements[1].volume = 1;
      fadeInAudioFunction(audioElements[1]);
    }
    


    // Glitch Firing
    let randomNumberFire1;
    let randomNumberFire2;

    let glitchEvents1Timer;
    let glitchEvents2Timer;

    let randomNumberLength1;
    let randomNumberLength2;



    function startSynthFires1() {
      glitchEvents1Timer = setInterval(synthFire1, 1000);      
    }

    function startSynthFires2() {
      glitchEvents2Timer = setInterval(synthFire2, 1000);
    }



    function synthFire1() {
      if (randomNumberFire1 < 18 && audioElements[0].volume == 0 && audioElements[0].readyState >= 2) {
        console.log(randomNumberLength1)
        audioElements[0].volume = 1;
        setTimeout(() => {
          audioElements[0].volume = 0; 
        }, randomNumberLength1);
      }
    }

    function synthFire2() {
      if (randomNumberFire2 < 18 && audioElements[1].volume == 0 && audioElements[1].readyState >= 2) {
        audioElements[1].volume = 1;
        setTimeout(() => {
          audioElements.volume[1];
        }, randomNumberLength2);
      }
    }


    function stopSynthFires() {
      clearInterval(glitchEvents1Timer);
      clearInterval(glitchEvents2Timer);
    }
    
    function part3() {
      fadeOutElementFunction(canvasElements[0]);
      fadeOutAudioFunction(audioElements[0]);
      fadeOutElementFunction(canvasElements[1]);
      fadeOutAudioFunction(audioElements[1]);

    }

    function part4() {      
      canvasElements[0].x = 0.15;
      canvasElements[0].y = 0.15;
      fadeInElementFunction(canvasElements[0]);
      audioElements[0].src = berlinVoices[0];
      audioElements[0].load();
      audioElements[0].volume = 0;

      canvasElements[1].x = 0.85;
      canvasElements[1].y = 0.15;
      fadeInElementFunction(canvasElements[1]);
      audioElements[1].src = berlinVoices[1];
      audioElements[1].load();
      audioElements[1].volume = 0;

      canvasElements[2].x = 0.15;
      canvasElements[2].y = 0.85;
      fadeInElementFunction(canvasElements[2]);
      audioElements[2].src = berlinVoices[2];
      audioElements[2].load();
      audioElements[2].volume = 0;

      canvasElements[3].x = 0.85;
      canvasElements[3].y = 0.85;
      fadeInElementFunction(canvasElements[3]);
      audioElements[3].src = berlinVoices[3];
      audioElements[3].load();
      audioElements[3].volume = 0;
    }

    



    let counter = 0;
    let counterSystemTimer = setInterval(counterSystem, 1000);

    function counterSystem() {
      randomNumberFire1 = Math.floor(Math.random() * 60);
      randomNumberFire2 = Math.floor(Math.random() * 60);
      randomNumberLength1 = Math.floor(Math.random() * 2000) + 2000;
      randomNumberLength2 = Math.floor(Math.random() * 2000) + 2000;
      counter++
      if (counter == 1) {
        part1();
      }
      if (counter == 38) { // 38
        part2();
        startSynthFires1();
      }
      if (counter == 57) { // 57        
        part2point5();
        startSynthFires2();
      }
      if (counter == 100) { // 85           
        part3();
        stopSynthFires();               
      }
      if (counter == 110) {
        part4();
      }      
      if (counter == 125) {
        audioElements[0].currentTime = 0;
        audioElements[1].currentTime = 0;
        audioElements[2].currentTime = 0;
        audioElements[3].currentTime = 0;
        audioElements[0].volume = 1;
        audioElements[1].volume = 1;
        audioElements[2].volume = 1;
        audioElements[3].volume = 1;
        audioElements[0].play();
        audioElements[1].play();
        audioElements[2].play();
        audioElements[3].play();
      }
      if (counter == 303) {
        fadeAllOut('cdmx');
        stopSystem();
      }
    }

    function stopSystem() {
      clearInterval(counterSystemTimer);
    }
  }

  



  // Berlin MUSBlock2 DATA
  baseFilesBerlin_MusBlock2 = [
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock2/Berlin_MusBlock2_Base/Berlin_MusBlock2_Base.L.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock2/Berlin_MusBlock2_Base/Berlin_MusBlock2_Base.R.wav'

  ];
  berlinInstruments = [
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock2/Berlin_MusBlock2_Instruments/Berlin_MusBlock2_Guitar.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock2/Berlin_MusBlock2_Instruments/Berlin_MusBlock2_Piano.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock2/Berlin_MusBlock2_Instruments/Berlin_MusBlock2_Vibes.wav'

  ];
  berlinBellOverdubs = [
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock2/Berlin_MusBlock2_BellOverdubs/Berlin_MusBlock2_BellOverdubs.L.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock2/Berlin_MusBlock2_BellOverdubs/Berlin_MusBlock2_BellOverdubs.R.wav'

  ];

  berlinBottles = [
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock2/Belrin_MusBlock2_Bottles/Berlin_MusBlock_Bottle1.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock2/Belrin_MusBlock2_Bottles/Berlin_MusBlock_Bottle2.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock2/Belrin_MusBlock2_Bottles/Berlin_MusBlock_Bottle3.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock2/Belrin_MusBlock2_Bottles/Berlin_MusBlock_Bottle4.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock2/Belrin_MusBlock2_Bottles/Berlin_MusBlock_Bottle5.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock2/Belrin_MusBlock2_Bottles/Berlin_MusBlock_Bottle6.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock2/Belrin_MusBlock2_Bottles/Berlin_MusBlock_Bottle7.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock2/Belrin_MusBlock2_Bottles/Berlin_MusBlock_Bottle8.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock2/Belrin_MusBlock2_Bottles/Berlin_MusBlock_Bottle9.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock2/Belrin_MusBlock2_Bottles/Berlin_MusBlock_Bottle10.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock2/Belrin_MusBlock2_Bottles/Berlin_MusBlock_Bottle11.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock2/Belrin_MusBlock2_Bottles/Berlin_MusBlock_Bottle12.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock2/Belrin_MusBlock2_Bottles/Berlin_MusBlock_Bottle13.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock2/Belrin_MusBlock2_Bottles/Berlin_MusBlock_Bottle14.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock2/Belrin_MusBlock2_Bottles/Berlin_MusBlock_Bottle15.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock2/Belrin_MusBlock2_Bottles/Berlin_MusBlock_Bottle16.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock2/Belrin_MusBlock2_Bottles/Berlin_MusBlock_Bottle17.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock2/Belrin_MusBlock2_Bottles/Berlin_MusBlock_Bottle18.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock2/Belrin_MusBlock2_Bottles/Berlin_MusBlock_Bottle19.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock2/Belrin_MusBlock2_Bottles/Berlin_MusBlock_Bottle20.wav',
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock2/Belrin_MusBlock2_Bottles/Berlin_MusBlock_Bottle21.wav',        
    'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock2/Belrin_MusBlock2_Bottles/Berlin_MusBlock_Bottle22.wav'


  ];
  


  // COMPLETE
  function berlinMusBlock2() {
    function checkBottlesArray() {
      if (berlinBottles.length == 0) {
        // Re-up the array if exhausted
        berlinBottles = [
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock2/Belrin_MusBlock2_Bottles/Berlin_MusBlock_Bottle1.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock2/Belrin_MusBlock2_Bottles/Berlin_MusBlock_Bottle2.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock2/Belrin_MusBlock2_Bottles/Berlin_MusBlock_Bottle3.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock2/Belrin_MusBlock2_Bottles/Berlin_MusBlock_Bottle4.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock2/Belrin_MusBlock2_Bottles/Berlin_MusBlock_Bottle5.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock2/Belrin_MusBlock2_Bottles/Berlin_MusBlock_Bottle6.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock2/Belrin_MusBlock2_Bottles/Berlin_MusBlock_Bottle7.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock2/Belrin_MusBlock2_Bottles/Berlin_MusBlock_Bottle8.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock2/Belrin_MusBlock2_Bottles/Berlin_MusBlock_Bottle9.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock2/Belrin_MusBlock2_Bottles/Berlin_MusBlock_Bottle10.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock2/Belrin_MusBlock2_Bottles/Berlin_MusBlock_Bottle11.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock2/Belrin_MusBlock2_Bottles/Berlin_MusBlock_Bottle12.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock2/Belrin_MusBlock2_Bottles/Berlin_MusBlock_Bottle13.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock2/Belrin_MusBlock2_Bottles/Berlin_MusBlock_Bottle14.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock2/Belrin_MusBlock2_Bottles/Berlin_MusBlock_Bottle15.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock2/Belrin_MusBlock2_Bottles/Berlin_MusBlock_Bottle16.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock2/Belrin_MusBlock2_Bottles/Berlin_MusBlock_Bottle17.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock2/Belrin_MusBlock2_Bottles/Berlin_MusBlock_Bottle18.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock2/Belrin_MusBlock2_Bottles/Berlin_MusBlock_Bottle19.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock2/Belrin_MusBlock2_Bottles/Berlin_MusBlock_Bottle20.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock2/Belrin_MusBlock2_Bottles/Berlin_MusBlock_Bottle21.wav',
          'https://el-movimiento.s3.amazonaws.com/Berlin/Berlin_MusBlock2/Belrin_MusBlock2_Bottles/Berlin_MusBlock_Bottle22.wav'
        ];
      }
    }
    function part1() {
      audioElements[4].src = baseFilesBerlin_MusBlock2[0];
      audioElements[5].src = baseFilesBerlin_MusBlock2[1];
      audioElements[4].load();
      audioElements[5].load();
      fadeInAudioFunction(audioElements[4]);
      fadeInAudioFunction(audioElements[5]);

      
    }

    function part2() {
      canvasElements[0].x = Math.random();
      canvasElements[0].y = Math.random();
      fadeInElementFunction(canvasElements[0]);
      audioElements[0].src = berlinBottles[0];
      audioElements[0].load();
      audioElements[0].volume = 1;
      fadeInAudioFunction(audioElements[0]);

      canvasElements[1].x = Math.random();
      canvasElements[1].y = Math.random();
      fadeInElementFunction(canvasElements[1]);
      audioElements[1].src = berlinBottles[1];
      audioElements[1].load();
      audioElements[1].volume = 1;
      fadeInAudioFunction(audioElements[1]);
    }

    function part3() {
      fadeOutElementFunction(canvasElements[0]);
      fadeOutElementFunction(canvasElements[1]);
      fadeOutAudioFunction(audioElements[0]);
      fadeOutAudioFunction(audioElements[1]);

      canvasElements[2].x = 0.25;
      canvasElements[2].y = 0.5;
      fadeInElementFunction(canvasElements[2]);
      audioElements[2].src = berlinBellOverdubs[0];
      audioElements[2].load();
      audioElements[2].volume = 1;
      fadeInAudioFunction(audioElements[2]);

      canvasElements[3].x = 0.75;
      canvasElements[3].y = 0.5;
      fadeInElementFunction(canvasElements[3]);
      audioElements[3].src = berlinBellOverdubs[1];
      audioElements[3].load();
      audioElements[3].volume = 1;
      fadeInAudioFunction(audioElements[3]);
    }


    // Glitch Firing
    let randomNumberFire1;
    let randomNumberFire2;

    let glitchEvents1Timer;
    let glitchEvents2Timer;



    function startBottles() {
      glitchEvents1Timer = setInterval(bottleFire1, 1000);
      glitchEvents2Timer = setInterval(bottleFire2, 1000);
    }



    function bottleFire1() {
      if (randomNumberFire1 < 22 && audioElements[0].volume == 0 && audioElements[0].readyState >= 2) {
        audioElements[0].volume = 1;
        audioElements[0].onended = pickNewBottles(audioElements[0]);
      }
    }

    function bottleFire2() {
      if (randomNumberFire2 < 22 && audioElements[1].volume == 0 && audioElements[1].readyState >= 2) {
        audioElements[1].volume = 1;
        audioElements[1].onended = pickNewBottles(audioElements[1]);
      }
    }


    function stopBottles() {
      clearInterval(glitchEvents1Timer);
      clearInterval(glitchEvents2Timer);
    }




    function pickNewBottles(elem) {
      elem.volume = 0;
      let pickBlock = Math.floor(Math.random() * berlinBottles.length);
      elem.src = berlinBottles[pickBlock];
      elem.load();
      berlinBottles.splice(pickBlock, 1);
      checkBottlesArray();
    }


    function part4() {
      fadeOutAudioFunction(audioElements[0]);
      fadeOutAudioFunction(audioElements[1]);
      fadeOutAudioFunction(audioElements[2]);
      canvasElements[0].x = 0.2;
      canvasElements[0].y = 0.5;
      fadeInElementFunction(canvasElements[0]);
      audioElements[0].src = berlinInstruments[0];
      audioElements[0].load();
      audioElements[0].volume = 0;


      canvasElements[1].x = 0.5;
      canvasElements[1].y = 0.3;
      fadeInElementFunction(canvasElements[1]);
      audioElements[1].src = berlinInstruments[1];
      audioElements[1].load();
      audioElements[1].volume = 0;

      canvasElements[2].x = 0.8;
      canvasElements[2].y = 0.5;
      fadeInElementFunction(canvasElements[2]);
      audioElements[2].src = berlinInstruments[2];
      audioElements[2].load();
      audioElements[2].volume = 0;

    }



    let counter = 0;
    let counterSystemTimer = setInterval(counterSystem, 1000);

    function counterSystem() {
      randomNumberFire1 = Math.floor(Math.random() * 60);
      randomNumberFire2 = Math.floor(Math.random() * 60);
      randomNumberLength1 = Math.floor(Math.random() * 2000) + 5000;
      randomNumberLength2 = Math.floor(Math.random() * 2000) + 3000;
      counter++
      if (counter == 1) {
        part1();
      }
      if (counter == 33) { // 33
        part2();
        startBottles();
      }
      if (counter == 85) { // 85           
        fadeOutElementFunction(canvasElements[0]);
        fadeOutElementFunction(canvasElements[1]);
        part3();
      }
      if (counter == 90) {
        stopBottles();
      }
      if (counter == 120) {
        part4();
      }
      if (counter == 123) {        
        audioElements[0].currentTime = 0;
        audioElements[1].currentTime = 0;
        audioElements[2].currentTime = 0;
        audioElements[0].volume = 1;
        audioElements[1].volume = 1;
        audioElements[2].volume = 1;
        audioElements[0].play();
        audioElements[1].play();
        audioElements[2].play();
      }
      if (counter == 322) {
        fadeAllOut('cdmx');
        stopSystem();
      }
    }
    function stopSystem() {
      clearInterval(counterSystemTimer);
    }

  }










  // CDMX_SDBlock1 DATA
  baseFilesCDMX_SDBlock1 = [
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Base/CDMX_SDBlock1_Base.L.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Base/CDMX_SDBlock1_Base.R.wav'
  ];
  outside = [
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Outside/CDMX_SDBlock1_Outside1.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Outside/CDMX_SDBlock1_Outside2.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Outside/CDMX_SDBlock1_Outside3.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Outside/CDMX_SDBlock1_Outside4.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Outside/CDMX_SDBlock1_Outside5.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Outside/CDMX_SDBlock1_Outside6.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Outside/CDMX_SDBlock1_Outside7.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Outside/CDMX_SDBlock1_Outside8.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Outside/CDMX_SDBlock1_Outside9.wav',
  ];
  voices = [
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Voices/CDMX_SDBlock1_Voices1.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Voices/CDMX_SDBlock1_Voices2.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Voices/CDMX_SDBlock1_Voices5.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Voices/CDMX_SDBlock1_Voices6.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Voices/CDMX_SDBlock1_Voices7.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Voices/CDMX_SDBlock1_Voices8.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Voices/CDMX_SDBlock1_Voices9.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Voices/CDMX_SDBlock1_Voices10.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Voices/CDMX_SDBlock1_Voices11.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Voices/CDMX_SDBlock1_Voices12.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Voices/CDMX_SDBlock1_Voices13.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Voices/CDMX_SDBlock1_Voices14.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Voices/CDMX_SDBlock1_Voices15.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Voices/CDMX_SDBlock1_Voices16.wav'
  ]
  objects = [
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Objects/CDMX_SDBlock1_Objects1.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Objects/CDMX_SDBlock1_Objects2.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Objects/CDMX_SDBlock1_Objects3.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Objects/CDMX_SDBlock1_Objects4.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Objects/CDMX_SDBlock1_Objects6.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Objects/CDMX_SDBlock1_Objects7.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Objects/CDMX_SDBlock1_Objects8.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Objects/CDMX_SDBlock1_Objects9.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Objects/CDMX_SDBlock1_Objects10.wav'
  ];



  // COMPLETE
  function cdmxSDBlock1() {
    function checkOutsideArray() {
      if (outside.length == 0) {
        // Re-up the array if exhausted
        outside = [
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Outside/CDMX_SDBlock1_Outside1.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Outside/CDMX_SDBlock1_Outside2.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Outside/CDMX_SDBlock1_Outside3.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Outside/CDMX_SDBlock1_Outside4.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Outside/CDMX_SDBlock1_Outside5.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Outside/CDMX_SDBlock1_Outside6.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Outside/CDMX_SDBlock1_Outside7.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Outside/CDMX_SDBlock1_Outside8.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Outside/CDMX_SDBlock1_Outside9.wav',
        ];
      }
    }

    function checkVoicesArray() {
      if (voices.length == 0) {
        // Re-up the array if exhausted
        voices = [
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Voices/CDMX_SDBlock1_Voices1.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Voices/CDMX_SDBlock1_Voices2.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Voices/CDMX_SDBlock1_Voices5.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Voices/CDMX_SDBlock1_Voices6.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Voices/CDMX_SDBlock1_Voices7.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Voices/CDMX_SDBlock1_Voices8.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Voices/CDMX_SDBlock1_Voices9.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Voices/CDMX_SDBlock1_Voices10.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Voices/CDMX_SDBlock1_Voices11.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Voices/CDMX_SDBlock1_Voices12.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Voices/CDMX_SDBlock1_Voices13.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Voices/CDMX_SDBlock1_Voices14.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Voices/CDMX_SDBlock1_Voices15.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Voices/CDMX_SDBlock1_Voices16.wav'
        ];
      }
    }

    function checkObjectsArray() {
      if (objects.length == 0) {
        // Re-up the array if exhausted
        objects = [
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Objects/CDMX_SDBlock1_Objects1.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Objects/CDMX_SDBlock1_Objects2.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Objects/CDMX_SDBlock1_Objects3.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Objects/CDMX_SDBlock1_Objects4.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Objects/CDMX_SDBlock1_Objects6.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Objects/CDMX_SDBlock1_Objects7.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Objects/CDMX_SDBlock1_Objects8.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Objects/CDMX_SDBlock1_Objects9.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock1/CDMX_SDBlock1_Objects/CDMX_SDBlock1_Objects10.wav'
        ];
      }
    }


    function part1() {
      audioElements[4].src = baseFilesCDMX_SDBlock1[0];
      audioElements[5].src = baseFilesCDMX_SDBlock1[1];
      audioElements[4].load();
      audioElements[5].load();
      fadeInAudioFunction(audioElements[4]);
      fadeInAudioFunction(audioElements[5]);


    }

    function part2() {

      canvasElements[0].x = Math.random();
      canvasElements[0].y = Math.random();

      canvasElements[1].x = Math.random();
      canvasElements[1].y = Math.random();
      fadeInElementFunction(canvasElements[1]);

      canvasElements[2].x = Math.random();
      canvasElements[2].y = Math.random();
      fadeInElementFunction(canvasElements[2]);

      let pickBlock0 = Math.floor(Math.random() * outside.length);
      audioElements[0].src = objects[pickBlock0];
      audioElements[0].load();
      audioElements[0].volume = 0;
      outside.splice(pickBlock0, 1);
      checkOutsideArray();

      let pickBlock1 = Math.floor(Math.random() * voices.length);
      audioElements[1].src = voices[pickBlock1];
      audioElements[1].load();
      audioElements[1].volume = 0;
      voices.splice(pickBlock1, 1);
      checkVoicesArray();


      let pickBlock2 = Math.floor(Math.random() * objects.length);
      audioElements[2].src = objects[pickBlock2];
      audioElements[2].load();
      audioElements[2].volume = 0;
      objects.splice(pickBlock2, 1);
      checkObjectsArray();

    }

    // Glitch Firing
    let randomNumberFire1;
    let randomNumberFire2;
    let randomNumberFire3;


    let glitchEvents1Timer;
    let glitchEvents2Timer;
    let glitchEvents3Timer;


    function startFireGlitches() {
      glitchEvents2Timer = setInterval(fireGlitch2, 1000);
      glitchEvents3Timer = setInterval(fireGlitch3, 1000);
    }

    function startOutsides() {
      glitchEvents1Timer = setInterval(fireGlitch1, 1000);
    }

    function fireGlitch1() {
      if (randomNumberFire1 < 12 && audioElements[0].volume == 0 && audioElements[0].readyState >= 2) {
        audioElements[0].volume = 1;
        audioElements[0].onended = pickNewOutsides(audioElements[0]);
      }
    }

    function fireGlitch2() {
      if (randomNumberFire2 < 6 && audioElements[1].volume == 0 && audioElements[1].readyState >= 2) {
        audioElements[1].volume = 1;
        audioElements[1].onended = pickNewVoices(audioElements[1]);
      }
    }

    function fireGlitch3() {
      if (randomNumberFire3 < 6 && audioElements[2].volume == 0 && audioElements[2].readyState >= 2) {
        audioElements[2].volume = 1;
        audioElements[2].onended = pickNewObjects(audioElements[2]);
      }
    }

    function stopFireGlitches() {
      clearInterval(glitchEvents2Timer);
      clearInterval(glitchEvents3Timer);
    }

    function stopOutsides() {
      clearInterval(glitchEvents1Timer);
    }


    function pickNewVoices(elem) {
      elem.volume = 0;
      let pickBlock = Math.floor(Math.random() * voices.length);
      elem.src = voices[pickBlock];
      elem.load();
      voices.splice(pickBlock, 1);
      checkVoicesArray();
    }

    function pickNewObjects(elem) {
      elem.volume = 0;
      let pickBlock = Math.floor(Math.random() * objects.length);
      elem.src = objects[pickBlock];
      elem.load();
      objects.splice(pickBlock, 1);
      checkObjectsArray();
    }

    function pickNewOutsides(elem) {
      elem.volume = 0;
      let pickBlock = Math.floor(Math.random() * outside.length);
      elem.src = outside[pickBlock];
      elem.load();
      outside.splice(pickBlock, 1);
      checkOutsideArray();
    }

    let counter = 0;
    let counterSystemTimer = setInterval(counterSystem, 1000);

    function counterSystem() {
      randomNumberFire1 = Math.floor(Math.random() * 60);
      randomNumberFire2 = Math.floor(Math.random() * 60);
      randomNumberFire3 = Math.floor(Math.random() * 60);
      counter++
      if (counter == 1) {
        part1();
      }
      if (counter == 25) { // 25
        part2();
        audioElements[0].play();
        audioElements[1].play();
        audioElements[2].play();
        startFireGlitches();
      }
      if (counter == 113) { // 113
        fadeInElementFunction(canvasElements[0]);
        stopFireGlitches();
        startOutsides();
        fadeOutElementFunction(canvasElements[1]);
        fadeOutElementFunction(canvasElements[2]);
      }
      if (counter == 160) { // 160
        stopOutsides();
        fadeAllOut('berlin');
        stopSystem();
      }

      function stopSystem() {
        clearInterval(counterSystemTimer);
      }
    }
  }

  // CDMX SDBlock2 DATA
  baseFilesCDMX_SDBlock2 = [
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock2/CDMX_SDBlock2_Base.L.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock2/CDMX_SDBlock2_Base.R.wav',
  ];
  cdmx_SDBlock2Files = [
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock2/CDMX_SDBlock2_Buzzing.wav', // BUZZING       
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_SDBlock2/CDMX_SDBlock2_Construction.wav', // CONSTRUCTION     
  ];


  // COMPLETE
  function cdmxSDBlock2() {
    function part1() {
      audioElements[4].src = baseFilesCDMX_SDBlock2[0];
      audioElements[5].src = baseFilesCDMX_SDBlock2[1];
      audioElements[4].load();
      audioElements[5].load();
      fadeInAudioFunction(audioElements[4]);
      fadeInAudioFunction(audioElements[5]);

      audioElements[2].src = cdmx_SDBlock2Files[0];
      audioElements[3].src = cdmx_SDBlock2Files[1];

      audioElements[2].load();
      audioElements[3].load();



    }

    function part2() {



      canvasElements[2].x = 0.3
      canvasElements[2].y = 0.5
      fadeInElementFunction(canvasElements[2]);



    }

    function part3() {


      canvasElements[3].x = 0.7
      canvasElements[3].y = 0.5
      fadeInElementFunction(canvasElements[3]);
    }

    let counter = 0;
    let counterSystemTimer = setInterval(counterSystem, 1000);

    function counterSystem() {
      counter++
      if (counter == 1) {
        part1();
      }
      if (counter == 50) { // 25
        part2();
        audioElements[2].play();
      }
      if (counter == 114) { // 113
        part3();
        audioElements[3].play();
      }
      if (counter == 276) { // 160        
        fadeAllOut('berlin');
        stopSystem();
      }

      function stopSystem() {
        clearInterval(counterSystemTimer);
      }
    }





  }



  // cdmxMusBlock1 DATA
  baseFilesCDMX_MusBlock1 = [
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_Musblock1_Base/CDMX_Musblock1_Base.L.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_Musblock1_Base/CDMX_Musblock1_Base.R.wav'

  ]

  cdmxMusBlock1_Sticks = [
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_Sticks/CDMX_MusBlock1_Sticks1.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_Sticks/CDMX_MusBlock1_Sticks2.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_Sticks/CDMX_MusBlock1_Sticks3.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_Sticks/CDMX_MusBlock1_Sticks4.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_Sticks/CDMX_MusBlock1_Sticks5.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_Sticks/CDMX_MusBlock1_Sticks6.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_Sticks/CDMX_MusBlock1_Sticks7.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_Sticks/CDMX_MusBlock1_Sticks8.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_Sticks/CDMX_MusBlock1_Sticks9.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_Sticks/CDMX_MusBlock1_Sticks10.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_Sticks/CDMX_MusBlock1_Sticks11.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_Sticks/CDMX_MusBlock1_Sticks12.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_Sticks/CDMX_MusBlock1_Sticks13.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_Sticks/CDMX_MusBlock1_Sticks14.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_Sticks/CDMX_MusBlock1_Sticks15.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_Sticks/CDMX_MusBlock1_Sticks16.wav'
  ];

  cdmxMusBlock1_Bows = [
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_Bows/CDMX_MusBlock1_Bows1.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_Bows/CDMX_MusBlock1_Bows2.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_Bows/CDMX_MusBlock1_Bows3.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_Bows/CDMX_MusBlock1_Bows4.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_Bows/CDMX_MusBlock1_Bows5.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_Bows/CDMX_MusBlock1_Bows6.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_Bows/CDMX_MusBlock1_Bows7.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_Bows/CDMX_MusBlock1_Bows8.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_Bows/CDMX_MusBlock1_Bows9.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_Bows/CDMX_MusBlock1_Bows10.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_Bows/CDMX_MusBlock1_Bows11.wav'

  ];

  cdmxMusBlock1_SticksRev = [
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_SticksRev/CDMX_MusBlock1_SticksRev1.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_SticksRev/CDMX_MusBlock1_SticksRev2.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_SticksRev/CDMX_MusBlock1_SticksRev3.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_SticksRev/CDMX_MusBlock1_SticksRev4.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_SticksRev/CDMX_MusBlock1_SticksRev5.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_SticksRev/CDMX_MusBlock1_SticksRev6.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_SticksRev/CDMX_MusBlock1_SticksRev7.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_SticksRev/CDMX_MusBlock1_SticksRev8.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_SticksRev/CDMX_MusBlock1_SticksRev9.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_SticksRev/CDMX_MusBlock1_SticksRev10.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_SticksRev/CDMX_MusBlock1_SticksRev11.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_SticksRev/CDMX_MusBlock1_SticksRev12.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_SticksRev/CDMX_MusBlock1_SticksRev13.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_SticksRev/CDMX_MusBlock1_SticksRev14.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_SticksRev/CDMX_MusBlock1_SticksRev15.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_SticksRev/CDMX_MusBlock1_SticksRev16.wav'

  ];

  cdmxMusBlock1_BowsRev = [
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_BowsRev/CDMX_MusBlock1_BowsRev1.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_BowsRev/CDMX_MusBlock1_BowsRev2.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_BowsRev/CDMX_MusBlock1_BowsRev3.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_BowsRev/CDMX_MusBlock1_BowsRev4.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_BowsRev/CDMX_MusBlock1_BowsRev5.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_BowsRev/CDMX_MusBlock1_BowsRev6.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_BowsRev/CDMX_MusBlock1_BowsRev7.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_BowsRev/CDMX_MusBlock1_BowsRev8.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_BowsRev/CDMX_MusBlock1_BowsRev9.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_BowsRev/CDMX_MusBlock1_BowsRev10.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_BowsRev/CDMX_MusBlock1_BowsRev11.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_BowsRev/CDMX_MusBlock1_BowsRev12.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_BowsRev/CDMX_MusBlock1_BowsRev13.wav',

  ];

  // COMPLETE
  function cdmxMusBlock1() {
    function checkSticksArray() {
      if (cdmxMusBlock1_Sticks.length == 0) {
        // Re-up the array if exhausted
        cdmxMusBlock1_Sticks = [
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_Sticks/CDMX_MusBlock1_Sticks1.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_Sticks/CDMX_MusBlock1_Sticks2.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_Sticks/CDMX_MusBlock1_Sticks3.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_Sticks/CDMX_MusBlock1_Sticks4.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_Sticks/CDMX_MusBlock1_Sticks5.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_Sticks/CDMX_MusBlock1_Sticks6.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_Sticks/CDMX_MusBlock1_Sticks7.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_Sticks/CDMX_MusBlock1_Sticks8.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_Sticks/CDMX_MusBlock1_Sticks9.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_Sticks/CDMX_MusBlock1_Sticks10.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_Sticks/CDMX_MusBlock1_Sticks11.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_Sticks/CDMX_MusBlock1_Sticks12.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_Sticks/CDMX_MusBlock1_Sticks13.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_Sticks/CDMX_MusBlock1_Sticks14.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_Sticks/CDMX_MusBlock1_Sticks15.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_Sticks/CDMX_MusBlock1_Sticks16.wav'
        ];
      }
    }

    function checkBowsArray() {
      if (cdmxMusBlock1_Bows.length == 0) {
        // Re-up the array if exhausted
        cdmxMusBlock1_Bows = [
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_Bows/CDMX_MusBlock1_Bows1.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_Bows/CDMX_MusBlock1_Bows2.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_Bows/CDMX_MusBlock1_Bows3.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_Bows/CDMX_MusBlock1_Bows4.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_Bows/CDMX_MusBlock1_Bows5.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_Bows/CDMX_MusBlock1_Bows6.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_Bows/CDMX_MusBlock1_Bows7.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_Bows/CDMX_MusBlock1_Bows8.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_Bows/CDMX_MusBlock1_Bows9.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_Bows/CDMX_MusBlock1_Bows10.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_Bows/CDMX_MusBlock1_Bows11.wav'
        ];
      }
    }

    function checkSticksRevArray() {
      if (cdmxMusBlock1_SticksRev.length == 0) {
        // Re-up the array if exhausted
        cdmxMusBlock1_SticksRev = [
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_SticksRev/CDMX_MusBlock1_SticksRev1.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_SticksRev/CDMX_MusBlock1_SticksRev2.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_SticksRev/CDMX_MusBlock1_SticksRev3.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_SticksRev/CDMX_MusBlock1_SticksRev4.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_SticksRev/CDMX_MusBlock1_SticksRev5.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_SticksRev/CDMX_MusBlock1_SticksRev6.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_SticksRev/CDMX_MusBlock1_SticksRev7.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_SticksRev/CDMX_MusBlock1_SticksRev8.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_SticksRev/CDMX_MusBlock1_SticksRev9.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_SticksRev/CDMX_MusBlock1_SticksRev10.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_SticksRev/CDMX_MusBlock1_SticksRev11.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_SticksRev/CDMX_MusBlock1_SticksRev12.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_SticksRev/CDMX_MusBlock1_SticksRev13.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_SticksRev/CDMX_MusBlock1_SticksRev14.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_SticksRev/CDMX_MusBlock1_SticksRev15.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_SticksRev/CDMX_MusBlock1_SticksRev16.wav'
        ];
      }
    }

    function checkBowsRevArray() {
      if (cdmxMusBlock1_BowsRev.length == 0) {
        // Re-up the array if exhausted
        cdmxMusBlock1_BowsRev = [
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_BowsRev/CDMX_MusBlock1_BowsRev1.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_BowsRev/CDMX_MusBlock1_BowsRev2.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_BowsRev/CDMX_MusBlock1_BowsRev3.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_BowsRev/CDMX_MusBlock1_BowsRev4.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_BowsRev/CDMX_MusBlock1_BowsRev5.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_BowsRev/CDMX_MusBlock1_BowsRev6.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_BowsRev/CDMX_MusBlock1_BowsRev7.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_BowsRev/CDMX_MusBlock1_BowsRev8.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_BowsRev/CDMX_MusBlock1_BowsRev9.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_BowsRev/CDMX_MusBlock1_BowsRev10.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_BowsRev/CDMX_MusBlock1_BowsRev11.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_BowsRev/CDMX_MusBlock1_BowsRev12.wav',
          'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock1/CDMX_MusBlock1_BowsRev/CDMX_MusBlock1_BowsRev13.wav',
        ];
      }
    }

    function part1() {
      audioElements[4].src = baseFilesCDMX_MusBlock1[0];
      audioElements[5].src = baseFilesCDMX_MusBlock1[1];
      audioElements[4].load();
      audioElements[5].load();
      fadeInAudioFunction(audioElements[4]);
      fadeInAudioFunction(audioElements[5]);


    }

    function part2() {

      canvasElements[0].x = Math.random();
      canvasElements[0].y = Math.random();

      canvasElements[1].x = Math.random();
      canvasElements[1].y = Math.random();
      fadeInElementFunction(canvasElements[1]);

      let pickBlock0 = Math.floor(Math.random() * cdmxMusBlock1_Sticks.length);
      audioElements[0].src = objects[pickBlock0];
      audioElements[0].load();
      audioElements[0].volume = 0;
      cdmxMusBlock1_Sticks.splice(pickBlock0, 1);
      checkSticksArray();

      let pickBlock1 = Math.floor(Math.random() * cdmxMusBlock1_Bows.length);
      audioElements[1].src = cdmxMusBlock1_Bows[pickBlock1];
      audioElements[1].load();
      audioElements[1].volume = 0;
      cdmxMusBlock1_Bows.splice(pickBlock1, 1);
      checkBowsArray();


    }

    // Glitch Firing
    let randomNumberFire1;
    let randomNumberFire2;
    let randomNumberFire3;
    let randomNumberFire4


    let glitchEvents1Timer;
    let glitchEvents2Timer;
    let glitchEvents3Timer;
    let glitchEvents4Timer;


    function startSticksBows() {
      glitchEvents1Timer = setInterval(startSticks, 1000);
      glitchEvents2Timer = setInterval(startBows, 1000);
    }

    function startSticksBowsReversed() {
      glitchEvents3Timer = setInterval(startSticksReversed, 1000);
      glitchEvents4Timer = setInterval(startBowsReversed, 1000);
    }

    function startSticks() {
      if (randomNumberFire1 < 12 && audioElements[0].volume == 0 && audioElements[0].readyState >= 2) {
        audioElements[0].volume = 1;
        audioElements[0].onended = pickNewSticks(audioElements[0]);
      }
    }

    function startBows() {
      if (randomNumberFire2 < 6 && audioElements[1].volume == 0 && audioElements[1].readyState >= 2) {
        audioElements[1].volume = 1;
        audioElements[1].onended = pickNewBows(audioElements[1]);
      }
    }

    function startSticksReversed() {
      if (randomNumberFire3 < 7 && audioElements[2].volume == 0 && audioElements[2].readyState >= 2) {
        audioElements[2].volume = 1;
        audioElements[2].onended = pickNewSticksRev(audioElements[2]);
      }
    }

    function startBowsReversed() {
      if (randomNumberFire4 < 10 && audioElements[2].volume == 0 && audioElements[2].readyState >= 2) {
        audioElements[3].volume = 1;
        audioElements[3].onended = pickNewBowsRev(audioElements[3]);
      }
    }

    function stopAllSticksBows() {
      clearInterval(glitchEvents1Timer);
      clearInterval(glitchEvents2Timer);
      clearInterval(glitchEvents3Timer);
      clearInterval(glitchEvents4Timer);
    }



    function pickNewSticks(elem) {
      elem.volume = 0;
      let pickBlock = Math.floor(Math.random() * cdmxMusBlock1_Sticks.length);
      elem.src = cdmxMusBlock1_Sticks[pickBlock];
      elem.load();
      cdmxMusBlock1_Sticks.splice(pickBlock, 1);
      checkSticksArray();
    }

    function pickNewBows(elem) {
      elem.volume = 0;
      let pickBlock = Math.floor(Math.random() * cdmxMusBlock1_Bows.length);
      elem.src = cdmxMusBlock1_Bows[pickBlock];
      elem.load();
      cdmxMusBlock1_Bows.splice(pickBlock, 1);
      checkBowsArray();
    }

    function pickNewSticksRev(elem) {
      elem.volume = 0;
      let pickBlock = Math.floor(Math.random() * cdmxMusBlock1_SticksRev.length);
      elem.src = cdmxMusBlock1_SticksRev[pickBlock];
      elem.load();
      cdmxMusBlock1_SticksRev.splice(pickBlock, 1);
      checkSticksRevArray();
    }

    function pickNewBowsRev(elem) {
      elem.volume = 0;
      let pickBlock = Math.floor(Math.random() * cdmxMusBlock1_BowsRev.length);
      elem.src = cdmxMusBlock1_BowsRev[pickBlock];
      elem.load();
      cdmxMusBlock1_BowsRev.splice(pickBlock, 1);
      checkBowsRevArray();
    }

    let counter = 0;
    let counterSystemTimer = setInterval(counterSystem, 1000);

    function counterSystem() {
      randomNumberFire1 = Math.floor(Math.random() * 60);
      randomNumberFire2 = Math.floor(Math.random() * 60);
      randomNumberFire3 = Math.floor(Math.random() * 60);
      randomNumberFire4 = Math.floor(Math.random() * 60);
      counter++
      if (counter == 1) {
        part1();
      }
      if (counter == 153) { // 153
        part2();
        audioElements[0].play();
        audioElements[1].play();
        startSticksBows();
      }
      if (counter == 170) { // 170        
        audioElements[2].play();
        audioElements[3].play();
        startSticksBowsReversed();

      }
      if (counter == 274) { // 274
        stopAllSticksBows();
        fadeAllOut('berlin');
        stopSystem();
      }

      function stopSystem() {
        clearInterval(counterSystemTimer);
      }
    }
  }




  // CDMX MusBlock2 DATA
  baseFilesCDMX_MusBlock2 = [
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock2/CDMX_MusBlock2_Base.L.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock2/CDMX_MusBlock2_Base.R.wav'
  ];
  cdmx_MusBlock2Files = [
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock2/CDMX_MusBlock2_VibesNoise.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock2/CDMX_MusBlock2_PianoNoise.wav',
    'https://el-movimiento.s3.amazonaws.com/CDMX/CDMX_MusBlock2/CDMX_MusBlock2_PianoTransients.wav'

  ];

  // COMPLETE
  function cdmxMusBlock2() {
    function part1() {
      audioElements[4].src = baseFilesCDMX_MusBlock2[0];
      audioElements[5].src = baseFilesCDMX_MusBlock2[1];
      audioElements[4].load();
      audioElements[5].load();
      fadeInAudioFunction(audioElements[4]);
      fadeInAudioFunction(audioElements[5]);

      audioElements[1].src = cdmx_MusBlock2Files[0];
      audioElements[2].src = cdmx_MusBlock2Files[1];
      audioElements[3].src = cdmx_MusBlock2Files[2];

      audioElements[1].load();
      audioElements[2].load();
      audioElements[3].load();




    }

    function part2() {

      canvasElements[1].x = 0.5
      canvasElements[1].y = 0.1
      fadeInElementFunction(canvasElements[1]);



    }

    function part3() {
      canvasElements[2].x = 0.3
      canvasElements[2].y = 0.1
      fadeInElementFunction(canvasElements[2]);

      canvasElements[3].x = 0.7
      canvasElements[3].y = 0.1
      fadeInElementFunction(canvasElements[3]);
    }

    let counter = 0;
    let counterSystemTimer = setInterval(counterSystem, 1000);

    function counterSystem() {
      counter++
      if (counter == 1) {
        part1();
      }
      if (counter == 122) { // 25
        part2();
        audioElements[1].play();
      }
      if (counter == 142) { // 113
        part3();
        audioElements[2].play();
        audioElements[3].play();
      }
      if (counter == 276) { // 160        
        fadeAllOut('berlin');
        stopSystem();
      }

      function stopSystem() {
        clearInterval(counterSystemTimer);
      }
    }

  }






};


window.addEventListener('load', onLoad);