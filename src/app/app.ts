/// <reference path="../../typings/tsd.d.ts"/>

'use strict';

import 'angular';
import {MyController} from './controller/MyController.ts';

module app {
    angular.module('app', [])
        .controller('MyController', MyController);
}