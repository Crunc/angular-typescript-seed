'use strict';

interface IHelloScope extends ng.IScope {

    message:string;
    foo:number;
}

export class MyController {

    constructor(private $scope:IHelloScope) {
        $scope.message = 'Hauke';
        $scope.foo = 3 * 3;
    }
}


