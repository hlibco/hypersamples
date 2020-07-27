import { preventDefault } from '@hyperapp/events'
import { h } from 'hyperapp'
import html from 'hyperlit'
import { Heading } from '../components/heading'
import { CheckedCircle, Circle } from '../components/icons'
import { Layout } from '../components/layout'
import { State } from '../state'

// The ToDo view
export function ToDoPage(s: State) {
  const page = () =>
    h('div', { class: 'todo-sample' }, [
      Heading(
        'To-do List',
        'This is a common To-do list with an option to Undo checked items.'
      ),
      Container(s)
    ])

  return Layout(s, page)
}

function Container(s: State) {
  return html`<form class="todo-form" onsubmit=${preventDefault(FormSubmit)}>
    <input type="text" name="todo" placeholder="Type a new todo" />
    <button type="submit">Add</button>
    <button class="secondary" onclick=${preventDefault(ClearCompleted)}>
      Clear completed
    </button>
    <button class="secondary" onclick=${preventDefault(ClearAll)}>
      Clear all
    </button>
    <hr />
    ${s.pageTodo.items.map((item, idx) => Item(item, idx))}
  </form>`
}

function FormSubmit(s: State, e: any): State {
  const inp = e?.target?.elements?.namedItem('todo')
  if (!inp || inp.value.trim() === '') {
    return s
  }

  const item = {
    title: inp.value.trim(),
    done: false
  }
  inp.value = ''

  return {
    ...s,
    pageTodo: {
      items: [...s.pageTodo.items, item]
    }
  }
}

function ClearCompleted(s: State) {
  const items = [...s.pageTodo.items].filter((item) => item.done === false)

  return {
    ...s,
    pageTodo: {
      items
    }
  }
}

function ClearAll(s: State) {
  return {
    ...s,
    pageTodo: {
      items: []
    }
  }
}

function Item({ title, done }, idx) {
  return html` <div class=${{ 'todo-item': true, 'todo-item--done': done }}>
    ${done &&
    html`<span onclick=${(state) => Undo(state, idx)}
      >${CheckedCircle()}</span
    >`}
    ${!done &&
    html`<span onclick=${(state) => Complete(state, idx)}>${Circle()}</span>`}
    ${title}
  </div>`
}

function Complete(s: State, idx: number) {
  const items = [...s.pageTodo.items]
  items[idx].done = true

  return {
    ...s,
    pageTodo: {
      items
    }
  }
}

function Undo(s: State, idx: number) {
  const items = [...s.pageTodo.items]
  items[idx].done = false

  return {
    ...s,
    pageTodo: {
      items
    }
  }
}
