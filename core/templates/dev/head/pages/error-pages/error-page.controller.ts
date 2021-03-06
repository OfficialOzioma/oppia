// Copyright 2016 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Controllers for the error page.
 */

require('pages/OppiaFooterDirective.ts');

require('domain/utilities/UrlInterpolationService.ts');
require('services/PageTitleService.ts');

oppia.controller('Error', [
  '$scope', 'PageTitleService', 'UrlInterpolationService',
  function(
      $scope, PageTitleService, UrlInterpolationService) {
    $scope.oopsMintImgUrl = UrlInterpolationService.getStaticImageUrl(
      '/general/oops_mint.png');

    $scope.statusCode = GLOBALS.status_code;

    PageTitleService.setPageTitle('Error ' + $scope.statusCode + ' - Oppia');
  }
]);
