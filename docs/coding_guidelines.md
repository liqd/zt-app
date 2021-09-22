## // indentation
tab size is two spaces.

## // code style
Most of our coding rules are checked by our linter. Just to highlight
some special rules or which can not be caught by linters.

**Our ifs are stroustrup brace styles**
```javascript
if (foo) {
  bar();
}
else {
  baz();
}
```

**Our components are functions**
```javascript
const MyComponent = () => {
  // some logic
  return <SomeJSX />
};
```

**Named exports/imports, not default exports/imports**
```javascript
export const MyComponent = () => {};
...
import { MyComponent } from './path';
```

**Fragmenting with <>**
```javascript
<>
  <View />
  <View />
</>
```

**Buttons over Touchables (wherever possible)**
We prefer to use `Buttons` in case of button actions and style them to our needs.
That way we preserve a11y. In other cases we need to use `Touchables`, for instance
to make bigger areas such as tiles and images and text areas pressable.
The `Buttons` we use are react-elements buttons in most cases, so a third party button element, which has the a11y stuff built in.

## // design patterns and rules for refactoring
**Stateless/Stateful**
When should we use functional components and when should we use class components? Technically it is fine to use both interchangeably in React. But somehow it feels unnecessarily random.

So wouldn't it be nice to have a pattern which we follow (most of the time)? In this case the proposal is separating components into two different types.

- Functional components (stateless)
- Container components (stateful)

Functional components:

“Dumb components are also called ‘presentational’ components because their only responsibility is to present something to the DOM. Once that is done, the component is done with it. No keeping tabs on it, no checking in once in a while to see how things are going. Nope. Put the info on the page and move on.”

Container components:

“Smart components (or container components) on the other hand have a different responsibility. Because they have the burden of being smart, they are the ones that keep track of state and care about how the app works. Using the container design pattern, the container components are separated from the presentational components and each handles their own side of things. The container components do the heavy lifting and pass the data down to the presentational components as props.”

Source of excerpts: https://medium.com/@thejasonfile/dumb-components-and-smart-components-e7b33a698d43

**Single Responsability**
Sometimes it happens, that developers write complex functions, components and classes that do a lot of different things.
These code bases are hard to maintain. Bugs are harder to find and to be fixed.
That is why we stick to this principle and keep the responsability of functions, components and classes as less as possible.

**DRY - Don't Repeat Yourself**
If it happens, that we find similar or same functionality in more than one spot, we should keep consolidating them.
That helps in case of modification in future. We then only have to adjust the code in one spot.

**Conditional Rendering**
With this pattern we can reduce the amount of components to be calculated and rendered.
Only render elements if they are visible at the moment.

**Separating Logic and Rendering**
In the rendering method/return we only include conditional logic that relates to the presentation.
Processing logic (data fetching, mutating etc.) happens in the function body. Not in JSX.

**Tests**
Recently we added the testing framework jest, which will be used to write render tests (snapshots).
Gradually more and more tests should be added to reach the minimum coverage amount.

**To be discussed**
Note: should have a policy of adding FIXME anywhere we find repeated code if we don't have time for a refactor in that moment?

Also just as a comment I saw this as problem with styles alot, i'm not sure how to fix that other then make everything in tiny components, is there another way? can we have a utilities style sheet that can be imported into other style sheets or something? maybe we can consider this for next sprint
