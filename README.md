# Ameba
Ameba is a flexible entity with TypeScript


## Example

```typescript
import Ameba from 'ameba';

interface Test {
  name: string,
  age: number
}

let test: Ameba<Test> = Ameba.create<Test>({name: 'foo', age: 2});
console.log(test.props.age);  // => 2
test.props.age = 3
console.log(test.props.age);  // => 3

test.valueChanges
  .subscribe((val: any) => {
    console.log(val);
  });
```
