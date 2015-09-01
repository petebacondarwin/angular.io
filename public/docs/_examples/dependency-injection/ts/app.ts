// #docregion
// #docregion import
import {Component, View, bootstrap} from 'angular2/angular2';
import {NameService} from './nameService';

// Why doesn't the component work when I import the service
// rather than defining it in the same file
//import * as NameService from './nameService';
// #enddocregion

// #docregion class-w-annotations
@Component({
  selector: 'my-app',
  bindings: [NameService]
})
@View({
  template: '<h1 id="output">Favourite framework: {{ name }}</h1>'
})
// #docregion class
class AppComponent {
  name: String
  constructor(nameService: NameService) {
    this.name = nameService.getName();
  }
}
// #enddocregion
// #enddocregion

// #docregion bootstrap
bootstrap(AppComponent);
// #enddocregion
// #enddocregion
