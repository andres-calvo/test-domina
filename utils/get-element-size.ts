function getElementSize(domElement: Element, prop: "width" | "height") {
  return parseInt(getComputedStyle(domElement)[prop].split("px")[0])
}
export default getElementSize
