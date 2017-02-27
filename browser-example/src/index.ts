import { Emitter } from 'typed-rx-emitter'

type Messages = {
  DECREMENT: number
  INCREMENT: number
}

const emitter = new Emitter<Messages>()

let counter = 0
updateView(counter)

emitter
  .on('DECREMENT')
  .subscribe(_ => {
    log('Action: DECREMENT')
    updateModel(counter - _)
  })

emitter
  .on('INCREMENT')
  .subscribe(_ => {
    log('Emit: INCREMENT')
    updateModel(counter + _)
  })

function log(message: string) {
  const el = document.querySelector('#log') !
  const time = new Date
  el.innerHTML = '[' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds() + ']'
    + ' ' + message + '<br />' + el.innerHTML
}

function updateModel(value: number) {
  counter = value
  updateView(counter)
}

function updateView(value: number) {
  document.querySelector('#counter')!.innerHTML = 'Value: ' + value
}

document.querySelector('#decrement')!.addEventListener('click', () => emitter.emit('DECREMENT', 1))
document.querySelector('#increment')!.addEventListener('click', () => emitter.emit('INCREMENT', 1))
