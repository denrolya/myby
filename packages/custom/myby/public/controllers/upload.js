'use strict';

/* jshint -W098 */
angular
    .module('mean.myby')
    .controller('UploadController', UploadController);

UploadController.$inject = ['$scope', 'Global', 'Transactions', 'Upload', '$timeout'];
function UploadController($scope, Global, Transactions, Upload, $timeout) {
    var vm = this;

    vm.files; vm.errFile; vm.log = '';

    vm.uploadFiles = uploadFiles;

    $scope.$watch('vm.files', function (nv, ov) {
        vm.uploadFiles(vm.files);
    });

    function uploadFiles(files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                if (!file.$error) {
                    file.upload = Upload.upload({
                        url: 'api/transactions/upload',
                        method: 'POST',
                        file: file,
                        data: {
                            file: file
                        },
                    }).progress(function (evt) {
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        vm.log = 'progress: ' + progressPercentage + '% ' +
                            evt.config.data.file.name + '\n' + vm.log;
                    }).success(function (data, status, headers, config) {
                        $timeout(function () {
                            vm.log = 'file: ' + config.data.file.name + ', Response: ' + JSON.stringify(data) + '\n' + vm.log;
                        });
                    });
                }
            }
        };
    }
}