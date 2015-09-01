```
class Engine {}

class Tires {}

class Car {
    engine: Engine
    tires: Tires
    constructor() {
        this.engine = new Engine();
        this.tires = new Tires();
    }
}
```
