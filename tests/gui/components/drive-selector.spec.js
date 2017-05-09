'use strict';

const _ = require('lodash');
const m = require('mochainon');
const angular = require('angular');
require('angular-mocks');

describe('Browser: DriveSelector', function() {

  beforeEach(angular.mock.module(
    require('../../../lib/gui/components/drive-selector/drive-selector')
  ));

  describe('DriveSelectorController', function() {

    let $controller;
    let $rootScope;
    let $q;
    let $uibModalInstance;
    let DrivesModel;
    let SelectionStateModel;
    let WarningModalService;
    let AnalyticsService;

    let controller;

    beforeEach(angular.mock.inject(function(
      _$controller_,
      _$rootScope_,
      _$q_,
      _DrivesModel_,
      _SelectionStateModel_,
      _WarningModalService_,
      _AnalyticsService_
    ) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      $q = _$q_;
      $uibModalInstance = {};
      DrivesModel = _DrivesModel_;
      SelectionStateModel = _SelectionStateModel_;
      WarningModalService = _WarningModalService_;
      AnalyticsService = _AnalyticsService_;
    }));

    beforeEach(() => {
      controller = $controller('DriveSelectorController', {
        $scope: $rootScope.$new(),
        $q,
        $uibModalInstance,
        DrivesModel,
        SelectionStateModel,
        WarningModalService,
        AnalyticsService
      });
    });

    describe('.memoizeImmutableListReference()', function() {

      it('constant true should return memoized true', function() {
        const memoizedConstTrue = controller.memoizeImmutableListReference(_.constant(true));
        m.chai.expect(memoizedConstTrue()).to.be.true;
      });

      it('should reflect state changes', function() {
        let a = false;
        const memoizedStateA = controller.memoizeImmutableListReference(() => {
          return a;
        });

        a = true;

        m.chai.expect(memoizedStateA()).to.be.true;
      });

      it('should reflect different arguments', function() {
        const memoizedStateA = controller.memoizeImmutableListReference(_.identity);

        m.chai.expect(memoizedStateA(false)).to.be.false;
        m.chai.expect(memoizedStateA(true)).to.be.true;
      });

      it('should handle equal angular objects with different hashes', function() {
        const memoizedStateA = controller.memoizeImmutableListReference(_.identity);
        const angularObjectA = {
          $$hashKey: 1,
          keyA: true
        };
        const angularObjectB = {
          $$hashKey: 2,
          keyA: true
        };

        m.chai.expect(memoizedStateA(angularObjectA)).to.equal(angularObjectA);
        m.chai.expect(memoizedStateA(angularObjectB)).to.equal(angularObjectA);
      });

    });

  });

});
