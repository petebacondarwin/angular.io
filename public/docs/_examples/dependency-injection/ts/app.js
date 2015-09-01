var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// #docregion
// #docregion import
var angular2_1 = require('angular2/angular2');
// Why doesn't the component work when I import the service
// rather than defining it in the same file
//import * as NameService from './nameService';
// #enddocregion
var NameService = (function () {
    function NameService() {
    }
    NameService.prototype.getName = function () {
        return "Angular 2";
    };
    return NameService;
})();
// #docregion class-w-annotations
var AppComponent = (function () {
    function AppComponent(nameService) {
        this.name = nameService.getName();
    }
    AppComponent = __decorate([
        angular2_1.Component({
            selector: 'my-app',
            bindings: [NameService]
        }),
        angular2_1.View({
            template: '<h1 id="output">Favourite framework: {{ name }}</h1>'
        }), 
        __metadata('design:paramtypes', [NameService])
    ], AppComponent);
    return AppComponent;
})();
// #enddocregion
// #enddocregion
// #docregion bootstrap
angular2_1.bootstrap(AppComponent);
// #enddocregion
// #enddocregion
//# sourceMappingURL=app.js.map