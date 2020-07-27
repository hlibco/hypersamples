// just enough to get rid of the red squiggles
declare module '@hyperapp/http'
declare module '@hyperapp/time'
declare module '@hyperapp/events'

declare module 'hyperapp' {
  // A Hyperapp application instance has an initial state and a base view.
  // It must also be mounted over an available DOM element.
  type App<S, P, D> = Readonly<{
    init: Initiator<S, P, D>
    view: View
    node: Node
    subscriptions?: Subscription
    middleware?: Middleware
  }>

  // Initially, a state is set with any effects to run, or an action is taken.
  type Initiator<S, P, D> =
    | State<S>
    | [State<S>, ...EffectDescriptor<D>[]]
    | Action<S, P, D>

  // A view builds a virtual DOM node representation of the application state.
  type View = <S>(state: State<S>) => VDOM

  // Application state is accessible in every view, action, and subscription.
  type State<S> = S

  // A subscription is a set of recurring effects.
  type Subscription = <S>(state: State<S>) => Subscriber[]

  // A subscriber reacts to subscription updates.
  type Subscriber = boolean | void | Effect | Unsubscribe

  // A subscriber ideally provides a function that cancels itself properly.
  type Unsubscribe = () => void

  // Middleware allows for custom processing during dispatching.
  type Middleware = (dispatch: Dispatch) => Dispatch

  // ---------------------------------------------------------------------------

  // A dispatched action handles an event in the context of the current state.
  type Dispatch = <S, P, D>(action: Action<S, P, D>, props?: Payload<P>) => void

  // An action transforms existing state while possibly invoking effects and it
  // can be wrapped by another action.
  type Action<S, P, D> =
    | [Action<S, P, D>, Payload<P>]
    | ((
        state: State<S>,
        props?: Payload<P>
      ) => State<S> | [State<S>, ...EffectDescriptor<D>[]] | Action<S, P, D>)

  // A payload is data external to state that is given to a dispatched action.
  type Payload<P> = P

  // An effect descriptor describes how an effect should be invoked.
  // A function that creates this is called an effect constructor.
  type EffectDescriptor<D> = [Effect, EffectData<D>]

  // An effect is where side effects and any additional dispatching occur.
  type Effect = <D>(dispatch: Dispatch, props?: EffectData<D>) => void

  // An effect is generally given additional data.
  type EffectData<D> = D

  // ---------------------------------------------------------------------------

  // A virtual DOM node represents an actual DOM element.
  type VDOM = {
    readonly type: string
    readonly props: PropList
    readonly children: VNode[]
    node: MaybeNode
    readonly tag?: Tag
    readonly key: Key
    memo?: PropList
  }

  // Virtual DOM properties will often correspond to HTML attributes.
  type Prop =
    | bigint
    | boolean
    | null
    | number
    | string
    | symbol
    | undefined
    | Function
    | ClassProp
    | StyleProp
  type PropList = Readonly<
    ElementCreationOptions & {
      [k: string]: Prop
      class?: ClassProp
      key?: Key
      style?: StyleProp
    }
  >

  // A key can uniquely associate a virtual DOM node with a certain DOM element.
  type Key = null | string | undefined

  // The `class` property represents an HTML class attribute string.
  type ClassProp = string | Record<string, boolean> | ClassProp[] | boolean

  // The `style` property represents inline CSS.
  type StyleProp = Record<string, null | number | string>

  // A virtual node is a convenience layer over a virtual DOM node.
  type VNode = null | undefined | boolean | VDOM

  // Actual DOM nodes will be manipulated depending on how property patching goes.
  type MaybeNode = null | undefined | Node

  // A virtual DOM node's tag has metadata relevant to it. Virtual DOM nodes are
  // tagged by their type to assist rendering.
  type Tag = VDOMNodeType | View

  // These are based on actual DOM node types:
  // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
  const enum VDOMNodeType {
    SSR = 1,
    Text = 3
  }

  // ---------------------------------------------------------------------------

  // The `app` function initiates a Hyperapp application. `app` along with effects
  // should be the only places you need to worry about side effects.
  // function app<S, P, D>(props: App<S, P, D>): Dispatch
  function app(props: any): Dispatch

  // The `h` function builds a virtual DOM node.
  function h(
    type: string,
    props: PropList,
    children?: VNode | readonly VNode[]
  ): VDOM

  // The `memo` function stores a view along with properties for it.
  function memo(view: View, props: PropList): Partial<VDOM>

  // The `text` function creates a virtual DOM node representing plain text.
  function text(value: string | number, node?: Node): VDOM
}
