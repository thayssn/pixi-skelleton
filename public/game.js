const append = (child) => { document.body.appendChild(child); };
const {
  Application, loader, Sprite, SpriteUtilites, utils, Rectangle,
} = PIXI;

const { TextureCache } = utils;

const {
  renderer, view, stage, ticker,
} = new Application();

renderer.view.style.display = 'block';
renderer.resize(window.innerWidth, window.innerHeight);

let skelleton;

function keyboard(...values) {
  const key = {
    values,
    isDown: false,
    isUp: true,
    press: undefined,
    release: undefined,
    downHandler(e) {
      if (this.values.includes(e.key)) {
        e.preventDefault();
        if (this.isUp && this.press) this.press();
        this.isDown = true;
        this.isUp = false;
      }
    },
    upHandler(e) {
      if (this.values.includes(e.key)) {
        e.preventDefault();
        if (this.isDown && this.release) this.release();
        this.idDown = false;
        this.isUp = true;
      }
    },
  };

  window.addEventListener('keydown', (e) => { key.downHandler(e); }, false);
  window.addEventListener('keyup', (e) => { key.upHandler(e); }, false);

  return key;
}

function play() {
  skelleton.x += skelleton.vx;
  skelleton.y += skelleton.vy;
}

const gameLoop = () => {
  play();
};

function setup() {
  const skelletonTexture = TextureCache['skelleton.png'];

  const upFrame = new Rectangle(0, 0, 64, 64);
  const downFrame = new Rectangle(0, 128, 64, 64);
  const leftFrame = new Rectangle(0, 64, 64, 64);
  const rightFrame = new Rectangle(0, 192, 64, 64);

  skelletonTexture.frame = downFrame;

  skelleton = new Sprite(skelletonTexture);

  skelleton.position.set(window.innerWidth / 2, window.innerHeight / 2);
  skelleton.anchor.x = 0.5;
  skelleton.anchor.y = 0.5;
  skelleton.vx = 0;
  skelleton.vy = 0;


  stage.addChild(skelleton);

  const up = keyboard('ArrowUp', 'w', '8');
  const down = keyboard('ArrowDown', 's', '4');
  const left = keyboard('ArrowLeft', 'a', '6');
  const right = keyboard('ArrowRight', 'd', '2');

  const yRelease = () => {
    skelleton.vy = 0;
  };

  const xRelease = () => {
    skelleton.vx = 0;
  };

  up.press = () => {
    skelleton.vy = -2;
    skelletonTexture.frame = upFrame;
  };

  up.release = yRelease;

  down.press = () => {
    skelleton.vy = 2;
    skelletonTexture.frame = downFrame;
  };

  down.release = yRelease;

  left.press = () => {
    skelleton.vx = -2;
    skelletonTexture.frame = leftFrame;
  };

  left.release = xRelease;

  right.press = () => {
    skelleton.vx = 2;
    skelletonTexture.frame = rightFrame;
  };

  right.release = xRelease;

  ticker.add(() => gameLoop());
}

loader
  .add('skelleton.png')
  .load(setup);


append(view);
