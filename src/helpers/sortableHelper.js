export function isMouseBeyond(mousePos, elementPos, elementSize) {
  let breakPoint = 0;
  let mouseOverlap = mousePos - elementPos;

  return mouseOverlap > breakPoint;
}