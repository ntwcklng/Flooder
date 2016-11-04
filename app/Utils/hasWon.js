export default function hasWon(grid, color) {
    function flatten(arr) {
        return [].concat(...arr)
    }
    function deepFlatten(arr) {
      return flatten(arr.map(x=> Array.isArray(x) ? deepFlatten(x) : x))}
    function checkColor(elem) {
        return elem === color;
    }
    const newGrid = deepFlatten(grid);
    if (newGrid.every(checkColor)) return true;
}
