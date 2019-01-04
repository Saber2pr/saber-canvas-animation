export * from './core/saber-ts-launch-browser-npm'
import { schedule } from 'saber-interval'
import { Canvas, Node, Label } from 'saber-canvas'
import { Observable } from 'saber-observable'

let canvas = new Canvas('test', 400, 400)
  .draw(new Node(400, 400))
  .draw(new Label('Canvas动画测试').setPosition(150, 200))

const createNodeObservable = (color: string, x: number, y: number) => {
  let observer = new Observable(
    new Node(50, 50).setColor(color).setPosition(x, y)
  )
  observer.subscribe(n => canvas.draw(n))
  return observer
}

const action = (node: Node): ((dx, dy) => Node) => {
  canvas.clear(node)
  return (dx, dy) => {
    let next = node.setPosition(node.x + dx, node.y + dy)
    canvas.draw(next)
    return next
  }
}

let observer0 = createNodeObservable('red', 0, 0)
let observer1 = createNodeObservable('green', 350, 0)
let observer2 = createNodeObservable('yellow', 0, 350)
let observer3 = createNodeObservable('blue', 350, 350)

schedule(() => {
  if (observer0.pull().x > 400) {
    observer0.pipe(node => action(node)(-350, 0))
    observer1.pipe(node => action(node)(0, -350))
    observer2.pipe(node => action(node)(0, 350))
    observer3.pipe(node => action(node)(350, 0))
  } else {
    observer0.pipe(node => action(node)(2, 0))
    observer1.pipe(node => action(node)(0, 2))
    observer2.pipe(node => action(node)(0, -2))
    observer3.pipe(node => action(node)(-2, 0))
  }
}, 2)
