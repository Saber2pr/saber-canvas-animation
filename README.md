# saber-canvas-animation

> use Observable mod!

> pipe?

> just so easy!

```ts
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
```

> > [click here to view](https://saber2pr.github.io/saber-canvas-animation/)
