What is React
A library for writing UI components declaratively as opposed to imperatively (e.g. typical DOM/jQuery manipulation)
Virtual DOM borrows from graphics engine/video games to batch up/diff DOM manipulations for high performance rendering
One way data flow through a hierarchy of views as opposed to more common event-driven MVC data binding.
Components?
Encapsulation at conceptual level,  couples HTML, JS and sometimes CSS. Sorta like the V & C of MVC, or a Backbone view coupled with it’s template.
JSX is a preprocessor to write HTML-ish code in your components
State: Data that changes over time. Clearly describe your state as a hash and UI automatically updates to reflect this state machine.
Props: More or less the equivalent to options passed into a Backbone view. Initial configuration for a component.
Show & Tell Favorites App
Demo Backbone app
Explain MVC + event structure (two collections tied together with events)
Show Backbone + splash React
At it’s simplest it can fit as a tiny component inside a larger evented system
Not ideal, but okay to bind to events in `componentDidMount`
React from the ground up
Step 1. Start with the DOM in `render`
Step 2. Write some initial state (what changes over time—list of kittens does!)
Step 3. Adding more state (favorites change as you click around)
Step 4. Move shared state up the hierarchy (favorites). Pass callbacks via props to children (onFavorite).
Testing components
Because components are self-contained and React’s Virtual DOM removes a lot of need to touch DOM APIs, tests can be as easy as passing in props + state and a
sserting against the output HTML.
Nod to Jest
Explain browserify + run mocha
Demo Writer
Explain hierarchy (List -> SectionTool + SectionContainer -> SectionText
Sections data changes at any point and the whole hierarchy re-renders
Show Scribe integration in SectonText

React Wins
Reduces boilerplate and book keeping of complex evented systems. Unidirectional flow is often easier to reason about.
Essentially able to write as if you only had one template that re-rendered on every change with the comfort of knowing it’ll be performant b/c of the Virtual DOM. 
Reusability and composability b/c of highly cohesive components
Simple to start with but also powerful at scale
Rendering on the server to optimize page load
Thank you
