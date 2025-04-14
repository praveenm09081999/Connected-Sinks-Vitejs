const visited = new Set();
const flow = new Set();

function getNextElements(grid, connections) {
  const elements = [];
  for (const [x, y] of connections) {
    if (
      y >= 0 &&
      y < grid.length &&
      x >= 0 &&
      x < grid[0].length &&
      grid[y][x] !== " "
    ) {
      elements.push([grid[y][x], [x, y]]);
    }
  }
  return elements;
}

function sortSinkFromVisited(sinks, grid) {
  const visitedSinks = Array.from(sinks)
    .filter(([x, y]) => visited.has(`${x},${y}`))
    .map(([x, y]) => grid[y][x]);
  return [...visitedSinks]
    .sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    })
    .join("");
}

const allConnect = (x, y) =>
  new Set([
    [x + 1, y],
    [x - 1, y],
    [x, y + 1],
    [x, y - 1],
  ]);
const horizontal = (x, y) =>
  new Set([
    [x + 1, y],
    [x - 1, y],
  ]);
const vertical = (x, y) =>
  new Set([
    [x, y + 1],
    [x, y - 1],
  ]);
const upsideL = (x, y) =>
  new Set([
    [x + 1, y],
    [x, y - 1],
  ]);
const mirroredUpsideL = (x, y) =>
  new Set([
    [x - 1, y],
    [x, y - 1],
  ]);
const lConnect = (x, y) =>
  new Set([
    [x + 1, y],
    [x, y + 1],
  ]);
const mirroredL = (x, y) =>
  new Set([
    [x - 1, y],
    [x, y + 1],
  ]);
const rightsideT = (x, y) =>
  new Set([
    [x, y + 1],
    [x, y - 1],
    [x + 1, y],
  ]);
const leftsideT = (x, y) =>
  new Set([
    [x, y + 1],
    [x, y - 1],
    [x - 1, y],
  ]);
const teesideT = (x, y) =>
  new Set([
    [x + 1, y],
    [x, y - 1],
    [x - 1, y],
  ]);
const upsideT = (x, y) =>
  new Set([
    [x + 1, y],
    [x, y + 1],
    [x - 1, y],
  ]);

function getConnections(cell) {
  if (/[A-Z]/.test(cell)) return allConnect;
  const map = {
    "═": horizontal,
    "║": vertical,
    "╔": upsideL,
    "╗": mirroredUpsideL,
    "╚": lConnect,
    "╝": mirroredL,
    "╠": rightsideT,
    "╣": leftsideT,
    "╦": teesideT,
    "╩": upsideT,
    "*": allConnect,
  };
  return map[cell];
}

function branchFromCurrentElement(currElement, grid, sinks) {
  const [x, y] = currElement;
  const connections = getConnections(grid[y][x])(x, y);
  const nextElements = getNextElements(grid, connections);
  for (const [char, [nx, ny]] of nextElements) {
    const nextConnections = getConnections(char)(nx, ny);
    const currentKey = `${x},${y}`;
    if ([...nextConnections].some(([cx, cy]) => cx === x && cy === y)) {
      if (!visited.has(currentKey)) visited.add(currentKey);
      const flowKey = `${x},${y},${nx},${ny}`;
      if (!flow.has(flowKey)) {
        flow.add(flowKey);
        branchFromCurrentElement([nx, ny], grid, sinks);
      }
    }
  }
}

function findConnectedSinks(grid) {
  let sourcePos = [];
  const sinks = new Set();

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      const cell = grid[y][x];
      if (cell === "*") {
        sourcePos.push([x, y]);
      } else if (/[A-Z]/.test(cell)) {
        sinks.add([x, y].toString());
      }
    }
  }

  for (let i = 0; sourcePos.length > 0 && i < sourcePos.length; i++) {
    branchFromCurrentElement(sourcePos[i], grid, sinks);
  }

  const sinkCoords = Array.from(sinks).map((s) => s.split(",").map(Number));
  return sortSinkFromVisited(sinkCoords, grid);
}

function determineConnectedSinks(grid) {
  visited.clear();
  flow.clear();
  return findConnectedSinks(grid);
}

export default determineConnectedSinks;
