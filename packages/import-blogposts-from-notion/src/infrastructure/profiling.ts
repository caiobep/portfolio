// import { performance } from 'node:perf_hooks'

// export class Profiler implements Disposable {
//   #startTime: number

//   constructor(private contextName: string) {
//     this.#startTime = performance.now()
//   }

//   [Symbol.dispose]() {
//     console.log(
//       `${this.contextName} took ${performance.now() - this.#startTime}ms`,
//     )
//   }
// }
