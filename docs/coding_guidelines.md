## // indentation
tab size is two spaces.

## // code style
Most of our coding rules are checked by our linter. Just to highlight
some special rules or which can not be caught by linters.

**Our ifs are 1 True brace style**
```javascript
if (foo) {
  bar();
} else {
  baz();
}
```
NOTE: Ternary can be used in simple cases i.e. 1 line or for conditional rendering

**Our components are functional**
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
to make bigger areas such as tiles and images and text areas pressable, in this
case additional attributes must be added to ensure a11y, `accessibilityRole="button"` ect.
we have implemented `eslint-plugin-react-native-a11y` to assist with this.
The `Buttons` we use are react-elements buttons in most cases, so a third party
button element, which has the a11y built in.

## // design patterns and rules for refactoring
**Stateless/Stateful**
Following the evolution of React, only functional components should be used.

**Single Responsibility**
Complex functions, components and classes are hard to maintain and bugs are harder to find and to be fixed.
So as much as possible we should stick to this principle and keep the responsibility of functions, components
and classes as simple as possible.

**DRY - Don't Repeat Yourself**
We should attempt to consolidate similar functions as much as possible so long as it does not
increase the complexity too much. This ensures consistent behaviour and means we only need to
change/update functions once, not in multiple places.

**Conditional Rendering**
With this pattern we can reduce the amount of components to be calculated and rendered.
Only render elements if they are visible at the moment.

**Separating Logic and Rendering**
In the rendering method/return we only include conditional logic that relates to the presentation.
Processing logic (data fetching, mutating etc.) happens in the function body. Not in JSX.

**Tests**
We added the testing framework jest, which will be used to write render tests (snapshots) and unit tests.
Gradually more and more tests should be added to reach the minimum coverage amount.
