'use strict';

interface IHelloScope extends ng.IScope {

    message:string;
}

export class MyController {

    constructor(private $scope:IHelloScope) {
        $scope.message = 'Hauke';
    }
}


