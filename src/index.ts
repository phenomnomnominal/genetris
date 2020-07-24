import { ok } from 'assert';
import { range } from './utils';

import { Genetic } from './genetics';
import { AISerialised } from './ai';
import { CELL_COLOURS } from './grid';

import * as Worker from './tetris.worker';

import './styles.scss';

const POPULATION_SIZE = 36;
const MIN_WIDTH = 60;
const TETRIS_GENES = 10;

const FINISHED = '#009';
const COLOURS = [null, '#F22', '#2F2', '#22F', '#FF2', '#F2F', '#2FF', '#FFF'];

type CanvasSize = {
  width: number;
  height: number;
  block: number;
};

type GenetrisRenderContext = {
  state: AISerialised | null;
  $canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  canvasSize: CanvasSize;
};

const $ = document.getElementById.bind(document);
const $container = $('genetris-canvas-container');
const $generationCount = $('genetris-info-generation');
const $chromosomeIndex = $('genetris-info-chromosome');
const $chromosomeScore = $('genetris-info-score');
const $chromosomeMaximising = $('genetris-info-maximising');
const $chromosomeMinimising = $('genetris-info-minimising');
const $focusCanvas = $('genetris-focus-canvas') as HTMLCanvasElement;
const $toggleButton = $('genetris-run-toggle') as HTMLButtonElement;
const $speedRange = $('genetris-speed-range') as HTMLInputElement;

ok($container);
ok($generationCount);
ok($chromosomeIndex);
ok($chromosomeScore);
ok($chromosomeMaximising);
ok($chromosomeMinimising);
ok($toggleButton);
ok($speedRange);
ok($focusCanvas);

const canvasSize: CanvasSize = getCanvasSize($container.clientWidth);
const focusCanvasSize: CanvasSize = {
  width: canvasSize.width * 3,
  height: canvasSize.height * 3,
  block: canvasSize.block * 3,
};

let focusIndex = 0;
const focusRenderContext: GenetrisRenderContext = {
  state: null,
  $canvas: $focusCanvas,
  context: $focusCanvas.getContext('2d') as CanvasRenderingContext2D,
  canvasSize: focusCanvasSize,
};

const renderContexts: Array<GenetrisRenderContext> = [];
range(0, POPULATION_SIZE).forEach(() => {
  const $canvas = document.createElement('canvas');
  $canvas.tabIndex = 0;
  $canvas.classList.add('genetris__canvas');
  $container.appendChild($canvas);
  const context = $canvas.getContext('2d');
  ok(context);
  renderContexts.push({
    state: null,
    $canvas,
    context,
    canvasSize,
  });
});

resizeContexts(renderContexts);
resizeContexts([focusRenderContext]);

addFocusHandlers(renderContexts);

const WEIGHT_NAME_MAPPING = [
  'creating blockers',
  'height',
  'creating holes',
  'touching other blocks',
  'touching the floor',
  'touching the wall',
  'clearing one line',
  'clearing two lines',
  'clearing three lines',
  'clearing four lines',
];

const genetris = new Genetic({
  mutationRate: 0.5,
  numberOfGenes: TETRIS_GENES,
  populationSize: POPULATION_SIZE,
  // HACK: Not sure how to get this working properly with worker-loader:
  // eslint-disable-next-line
  // @ts-ignore
  work: () => new Worker() as Worker,
  onProgress: (index: number, state: AISerialised) => {
    renderContexts[index].state = state;
    if (index === focusIndex) {
      updateFocus(state);
    }
    update(renderContexts[index]);
  },
  onComplete: (generation: number) => {
    $generationCount.innerHTML = `${generation}`;
    renderContexts.forEach((renderContext) => clear(renderContext));
  },
});

let running = true;
$toggleButton.addEventListener('click', () => {
  running = !running;
  $toggleButton.innerHTML = running ? 'Pause' : 'Resume';
  running ? void genetris.resume() : void genetris.pause();
});

$speedRange.addEventListener('change', (e: Event) => {
  const { value, max } = e.currentTarget as HTMLInputElement;
  void genetris.setTimeout(parseFloat(max) - parseFloat(value));
});

void genetris.setTimeout(parseFloat($speedRange.value));
void genetris.run();

function getCanvasSize(width: number): CanvasSize {
  const numberAcross = Math.floor(width / MIN_WIDTH);
  const canvasWidth = Math.floor(width / numberAcross);

  const canvasSize = {
    width: canvasWidth,
    height: (canvasWidth / 10) * 20,
    block: canvasWidth / 10,
  };

  return canvasSize;
}

function resizeContexts(renderContexts: Array<GenetrisRenderContext>): void {
  renderContexts.forEach((context) =>
    resizeContext(context, context.canvasSize)
  );
  renderContexts.forEach((_, canvasIndex) =>
    update(renderContexts[canvasIndex])
  );
}

function resizeContext(
  renderContext: GenetrisRenderContext,
  canvasSize: CanvasSize
): void {
  const { $canvas } = renderContext;
  $canvas.width = canvasSize.width;
  $canvas.style.width = `${$canvas.width}px;`;
  $canvas.height = canvasSize.height;
  $canvas.style.height = `${$canvas.height}px;`;
}

function update(renderContext: GenetrisRenderContext): void {
  const { state } = renderContext;
  if (!state) {
    return;
  }
  draw(renderContext);
}

function draw(renderContext: GenetrisRenderContext) {
  const { state, context, canvasSize } = renderContext;
  const { block } = canvasSize;
  ok(state);
  clear(renderContext);
  state.grid.rows.forEach((row, x) => {
    row.forEach((column, y) => {
      if (CELL_COLOURS.includes(column)) {
        const fillStyle = !state.finished ? COLOURS[column] : FINISHED;
        context.fillStyle = fillStyle as string;
        context.fillRect(y * block + 1, x * block + 1, block - 2, block - 2);
      }
    });
  });
}

function clear(renderContext: GenetrisRenderContext): void {
  const { context, canvasSize } = renderContext;
  const { width, height } = canvasSize;
  context.clearRect(0, 0, width, height);
  context.fillStyle = 'transparent';
  context.fillRect(0, 0, width, height);
}

function addFocusHandlers(renderContexts: Array<GenetrisRenderContext>): void {
  renderContexts.forEach(addFocusHandler);
}

function addFocusHandler(
  renderContext: GenetrisRenderContext,
  index: number
): void {
  renderContext.$canvas.addEventListener('focus', () => {
    focusIndex = index;
    ok($chromosomeIndex);
    $chromosomeIndex.innerText = `${index + 1}`;
    const renderContext = renderContexts[focusIndex];
    updateFocus(renderContext.state);
    renderContexts.forEach((renderContext) => {
      const { $canvas } = renderContext;
      $canvas.classList.remove('genetris__canvas--focus');
    });
    const { $canvas } = renderContext;
    $canvas.classList.add('genetris__canvas--focus');
  });
}

function updateFocus(state: AISerialised | null): void {
  focusRenderContext.state = state;
  ok($chromosomeScore);
  if (state) {
    const formatter = new Intl.NumberFormat();
    const { score } = state.gameState;
    $chromosomeScore.innerText = formatter
      ? formatter.format(score)
      : `${score}`;
    const maxWeight = Math.max(...state.weights);
    const minWeight = Math.min(...state.weights);
    ok($chromosomeMaximising);
    $chromosomeMaximising.innerHTML =
      WEIGHT_NAME_MAPPING[state.weights.indexOf(maxWeight)];
    ok($chromosomeMinimising);
    $chromosomeMinimising.innerHTML =
      WEIGHT_NAME_MAPPING[state.weights.indexOf(minWeight)];
  }
  update(focusRenderContext);
}
