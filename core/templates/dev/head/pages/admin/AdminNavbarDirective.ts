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
 * @fileoverview Directive for the navigation bar in the admin panel.
 */

require('domain/utilities/UrlInterpolationService.ts');
require('pages/admin/AdminRouterService.ts');
require('services/UserService.ts');

oppia.directive('adminNavbar', [
  'AdminRouterService', 'UrlInterpolationService', 'ADMIN_TAB_URLS',
  'LOGOUT_URL', 'PROFILE_URL_TEMPLATE',
  function(
      AdminRouterService, UrlInterpolationService, ADMIN_TAB_URLS,
      LOGOUT_URL, PROFILE_URL_TEMPLATE) {
    return {
      restrict: 'E',
      scope: {},
      bindToController: {
        getUserEmail: '&userEmail'
      },
      templateUrl: UrlInterpolationService.getDirectiveTemplateUrl(
        '/pages/admin/' +
        'admin_navbar_directive.html'),
      controllerAs: '$ctrl',
      controller: ['UserService', function(UserService) {
        var ctrl = this;
        ctrl.ADMIN_TAB_URLS = ADMIN_TAB_URLS;
        ctrl.showTab = AdminRouterService.showTab;
        ctrl.isActivitiesTabOpen = AdminRouterService.isActivitiesTabOpen;
        ctrl.isJobsTabOpen = AdminRouterService.isJobsTabOpen;
        ctrl.isConfigTabOpen = AdminRouterService.isConfigTabOpen;
        ctrl.isRolesTabOpen = AdminRouterService.isRolesTabOpen;
        ctrl.isMiscTabOpen = AdminRouterService.isMiscTabOpen;

        UserService.getProfileImageDataUrlAsync().then(function(dataUrl) {
          ctrl.profilePictureDataUrl = dataUrl;
        });

        ctrl.username = '';
        ctrl.isModerator = null;
        ctrl.isSuperAdmin = null;
        ctrl.profileUrl = '';
        UserService.getUserInfoAsync().then(function(userInfo) {
          ctrl.username = userInfo.getUsername();
          ctrl.isModerator = userInfo.isModerator();
          ctrl.isSuperAdmin = userInfo.isSuperAdmin();

          ctrl.profileUrl = (
            UrlInterpolationService.interpolateUrl(PROFILE_URL_TEMPLATE, {
              username: ctrl.username
            })
          );
        });

        ctrl.logoWhiteImgUrl = UrlInterpolationService.getStaticImageUrl(
          '/logo/288x128_logo_white.png');

        ctrl.logoutUrl = LOGOUT_URL;

        ctrl.profileDropdownIsActive = false;
        ctrl.onMouseoverProfilePictureOrDropdown = function(evt) {
          angular.element(evt.currentTarget).parent().addClass('open');
          ctrl.profileDropdownIsActive = true;
        };

        ctrl.onMouseoutProfilePictureOrDropdown = function(evt) {
          angular.element(evt.currentTarget).parent().removeClass('open');
          ctrl.profileDropdownIsActive = false;
        };
      }]
    };
  }
]);
