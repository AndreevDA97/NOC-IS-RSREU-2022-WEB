angular.module('app.directives')
    .directive('fileUpload', ['$http', '$parse', 'Upload', '$q', '$filter',
    function ($http, $parse, Upload, $q, $filter) {
        var viewTemplate = "";
        viewTemplate += "<div>";
        viewTemplate += "    <alert ng-show=\"error\" type=\"danger\" close=\"error = null\">{{error}}<\/alert>";
        viewTemplate += "    <div class=\"list-group\">";
        viewTemplate += "        <div class=\"drop-box\" ngf-drop=\"addFiles2List($files)\" ngf-multiple=\"multiple\" ngf-select=\"addFiles2List($files)\">";
        viewTemplate += "            <div style=\"text-align: center;\">";
        viewTemplate += "                <div>";
        viewTemplate += "                    <img style=\"cursor: pointer;\" src=\"data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAFI0lEQVR4Xu2bXWgcRRzAZ\/Zub\/cuCdHepdFSCQpiEVQEPyrRQv0Aq9gERASffLGgxUhB0OolqPeRCC0pVlRExTeRgmjTkiel0FosUo34YPMkTY217e3dJbnv3ZnxP5c7uB5Jdnbd9Tbc7kvI7cx\/5\/+b\/8d8YtTlD+5y\/ZEPwLcACwT6Di7vCAWVKcTQY5Ik9Vqoalr02nty3Rqj8cqrWlI9alrBoQLCLsCVV4LKTxhL\/Q59+zoxTQCx8apBCBvJpdWTbnynXaYwgOh49VsJSyNuNaoJYGBCZ5TSAqH6I\/l075xb32vKFQcQr644bfatyrUC4L8zRheLBfJgeTqy6CYEYQC8Z9xsSDuAVQjs14wm70If4YJb3\/Y0gDoESk5k5pVRdAwTNyB4HgBX2qDsaC4ZGutaAFxxSsmYG+lxU1hAIygSN9LjpgGwagXOp8dNBcCN9LjpADidHr0DIBPs4\/ke5gJXJCmw1SziO5UePQMAJgB7cyl1JhqvjiLMPpVwYMAMghPp0TMAGGEXMkX5IXQE580Ud\/K9ZwA0fHueUfaGdnn5B\/TFwIqTiq4ny1MA7CjcnEPYqcvr+ABEybk9GxRtR3s53wIaS2l2AfouIErOdwGXV4REO8KPAW0E\/CDoB8HVDRW7j3BlPwj6QdDdfQG7JuwHQT8I+kFQOJCv5WbClf0s4GeB\/zcLwC7QHCyOfkMRPV0r0PnSYkQDEya9Q4WoLAfvgK36YYzxs5lk6H67GcSTK0Kw3H2KEBrPTUZ+\/C+Kidb1TAygjJYZoWPZtPo5rNSxvv3L0dCNoReggU\/C\/3fD4t1gXSmGrsDr3xhDs1qx+hWa7s+KKuvZIAinQXLMIHu0ycg5tI9FoltrcWjsa2DmkY2UA2hFeD+tXbiaRsduKdsB0XEL4D2PDLKbK9\/\/Zv42ORCZwQF8pxVlCGO\/k3JpZOnQDX9aqeeJGEAM46VsOvxZXXlZPYNx4GarStQ9g9K\/9Ur5YasQOmoBPOBlksqjaB8Kxwb0nzfq+bXOELWD4paQvSQ\/gL7EFVGIHQVAiD6cTUXOwn5gGvz94EaNFgHQsIQEQJ3wPACe57Op0L2r0V5ZMAt4ogD4IQqtWBkSzQ4dswBC6UQ2qST40VjYDv\/ArMdEAXA5cJ7oFThP9LGZzI4GQZ0au\/PJ8KlYvHISS4GnzBprBQCk1ZlMQtlrJrOjAIrLtW2lIz2XY\/HqJSxJ280aawkApQsQB4bMZHYUwLU\/ggocfqzB4egaHMCWm421u8LTOluFlFgDAIrXAQT56c+uBVAuVQYLh\/qudq0LGLqxKzcZPh0br5yA0d\/TZuZqMQYcBxcQOtovnAZhsFI0y9VmSrS+p4S+raWUNKTB\/ZAGPzSrawkAIS9nUuonZjItBUHw1eMQrJ4RESpSBo7Cn88kQvehA0tbor3qAlzG6HFkJMjoiq6HhpamcE6kHcIW4MaVGarrO\/ksEG6jJAAAnwKv+4haAAyw3oEB1rsiyluyAF64DiGgvA83Jx53wh0oI99rCeUJ9Nxf6pYdg+cCGN+1XsNFANSH179c3Ilmb6+6AkBUqJ1y\/a\/nb5XV8BkYFG2zU59fsTFKdDh\/OHzRSn1hF7Ai1G5ZDiEQjny3kSWsJZv3PK2QUavKW3YBu4pZqvciU2Pba2+Bmx0wu6QFvb5CGTqcPb8wZcXsW9vjKQu4DhTPDj3K87D0vQcWQu+Bdzc13v8Df+fgRtWsTpSvRaP9ep3gXQCWzMZ+4a4H8C+dDf9f4+kHSgAAAABJRU5ErkJggg==\" \/>";
        viewTemplate += "                <\/div>";
        viewTemplate += "                <div ng-show=\"caption\">";
        viewTemplate += "                    {{caption}}";
        viewTemplate += "                <\/div>";
        viewTemplate += "                <div ng-show=\"!caption\">";
        viewTemplate += "                    Для добавления файлов перетащите или кликните сюда";
        viewTemplate += "                <\/div>";
        viewTemplate += "            <\/div>";
        viewTemplate += "        <\/div>";
        viewTemplate += "        <table class=\"table\" ng-show=\"selectedFiles.length > 0\">";
        viewTemplate += "            <thead style=\"border-top: 0px !important\">";
        viewTemplate += "                <tr>";
        viewTemplate += "                    <th style=\"background-color: white\" width=\"50%\">Название файла<\/th>";
        viewTemplate += "                    <th style=\"background-color: white\">Размер<\/th>";
        viewTemplate += "                    <th ng-hide=\"hideProgressBar\" style=\"background-color: white\">Прогресс<\/th>";
        viewTemplate += "                    <th ng-show=\"displayStatus\" style=\"background-color: white\">Статус<\/th>";
        viewTemplate += "                    <th ng-show=\"canUploadSingleFile||canAbort||canDelete\" style=\"background-color: white\">Действия<\/th>";
        viewTemplate += "                <\/tr>";
        viewTemplate += "            <\/thead>";
        viewTemplate += "            <tbody>";
        viewTemplate += "                <tr ng-repeat=\"f in selectedFiles\">";
        viewTemplate += "                    <td><strong ng-bind=\"f.name\"><\/strong><\/td>";
        viewTemplate += "                    <td ng-bind=\"f.size | bytes\"><\/td>";
        viewTemplate += "                    <td ng-hide=\"hideProgressBar\">";
        viewTemplate += "                        <div class=\"progress\" style=\"margin-bottom: 0;\">";
        viewTemplate += "                            <div class=\"progress-bar\" ng-class=\"{";
        viewTemplate += "                          'progress-bar-info progress-bar-striped active': f.$promise.$$state.status == 0,";
        viewTemplate += "                          'progress-bar-success': f.$promise.$$state.status == 1,";
        viewTemplate += "                          'progress-bar-danger': f.$promise.$$state.status == 2,}\" role=\"progressbar\" style=\"width:{{f.progress}}%;\">{{f.progress}}%<\/div>";
        viewTemplate += "                        <\/div>";
        viewTemplate += "                    <\/td>";
        viewTemplate += "                    <td ng-show=\"displayStatus\" class=\"text-center\">";
        viewTemplate += "                        <span ng-show=\"!f.$promise\">Ожидает загрузки<\/span>";
        viewTemplate += "                        <span ng-show=\"f.$promise.$$state.status == 0\">Загружается<\/span>";
        viewTemplate += "                        <span ng-show=\"f.$promise.$$state.status == 1\">Загружено<\/span>";
        viewTemplate += "                        <span ng-show=\"f.$promise.$$state.status == 2\">Ошибка загрузки<\/span>";
        viewTemplate += "                    <\/td>";
        viewTemplate += "                    <td ng-show=\"canUploadSingleFile||canAbort||canDelete\">";
        viewTemplate += "                        <button ng-show=\"canUploadSingleFile\" type=\"button\" class=\"btn btn-success btn-xs\" ng-click=\"upload(f)\" ng-disabled=\"f.$promise.$$state.status == 0 || f.$promise.$$state.status == 1\">";
        viewTemplate += "                            <span class=\"glyphicon glyphicon-upload\"><\/span> Загрузить";
        viewTemplate += "                        <\/button>";
        viewTemplate += "                        <button ng-show=\"canAbort\" type=\"button\" class=\"btn btn-warning btn-xs\" ng-click=\"abortUploading(f)\" ng-disabled=\"f.$promise.$$state.status != 0\">";
        viewTemplate += "                            <span class=\"glyphicon glyphicon-ban-circle\"><\/span> Отменить";
        viewTemplate += "                        <\/button>";
        viewTemplate += "                        <button ng-show=\"canDelete\" type=\"button\" class=\"btn btn-danger btn-xs\" ng-click=\"deleteFileFromList($index)\" ng-disabled=\"f.$promise.$$state.status == 0 || f.$promise.$$state.status == 1\">";
        viewTemplate += "                            <span class=\"glyphicon glyphicon-trash\"><\/span> Удалить";
        viewTemplate += "                        <\/button>";
        viewTemplate += "                    <\/td>";
        viewTemplate += "                <\/tr>";
        viewTemplate += "            <\/tbody>";
        viewTemplate += "        <\/table>";
        viewTemplate += "";
        viewTemplate += "";
        viewTemplate += "    <\/div>";
        viewTemplate += "<\/div>";
        return {
            //templateUrl: './assets/scripts/app/common/directives/file-upload.html',
            template: viewTemplate,
            restrict: 'EA',
            replace: true,
            scope: {
                saveUrl: '@',
                multiple: '@',
                canDelete: '@',
                canAbort: '@',
                canUploadSingleFile: '@',
                hideProgressBar: '@',
                displayStatus: '@',
                callbackSuccess: '=',
                callbackError: '=',
                additionalFormData: '=',
                broadcastName: '@',
                loadPromise: '=',
                clearAfterSuccess: '@',
                uploadRightAway: '@',
                multiUpload: '@',
                maxSize: '@',
                caption: '@'
            },
            link: function (scope, element, attrs) {
                //test-init
                scope.selectedFiles = [];
                scope.error = "";
                scope.check = function () {
                    console.log(scope.selectedFiles);
                };

                //добавление файлов в список
                scope.addFiles2List = function (files) {
                    scope.error = "";
                    if (!scope.selectedFiles || !files) return;
                    if (!scope.multiple && scope.selectedFiles.length >= 1) {
                        scope.selectedFiles[0] = files[0];
                        //scope.error = 'Разрешена загрузка только отдого файла';
                        return;
                    }

                    files.forEach(function (addingFile, index) {
                        if (scope.maxSize && addingFile.size > scope.maxSize * 1000) {
                            scope.error += "Превышен максимальный размер файла (" + $filter('bytes')(scope.maxSize * 1000) + ") Файл: " + addingFile.name + "(" + $filter('bytes')(addingFile.size) + ")";
                            files.splice(index, 1);
                        }
                    });

                    //проверка на добаление одинаковых файлов
                    var duplicatedFiles = [];
                    scope.selectedFiles.forEach(function(fileFromList) {
                        files.forEach(function(addingFile) {
                            if (angular.equals(fileFromList, addingFile))
                                duplicatedFiles.push(addingFile);
                        });
                    });
                    if (duplicatedFiles.length > 0) {
                        scope.error = 'Загрузка дубликатов файлов запрещена. Следующие файлы не были загружены:' +
                                      duplicatedFiles.map(function (file) { return file.name; }).join(',');
                        return;
                    }
                    scope.selectedFiles = scope.selectedFiles.concat(files)
                    if (scope.uploadRightAway) {
                        for (var i = scope.selectedFiles.length - files.length ; i < scope.selectedFiles.length; i++) {
                            scope.upload(scope.selectedFiles[i]);
                        }
                    }
                }

                scope.deleteFileFromList = function (index) {
                    scope.selectedFiles.splice(index, 1);
                }

                scope.startUpload = function () {
                    scope.error = null;
                    if (!scope.selectedFiles && scope.selectedFiles.length < 0)
                        return;
                    var allPromises = null;
                    $q.when(scope.selectedFiles.forEach(function (file) {
                        if (!file.$promise || file.$promise.$$state.status == 2) {
                            scope.upload(file);
                        }
                    })).then(function () {
                        //if (!angular.isFunction(scope.callbackSucces)) return;
                        allPromises = scope.selectedFiles.map(function (f) { return f.$promise });
                        scope.loadPromise = $q.all(allPromises).then(scope.callbackSuccess, scope.callbackError).then(function () {
                            if (scope.clearAfterSuccess)
                                scope.selectedFiles = [];
                        });
                    });
                }

                scope.startMultiUpload = function () {
                    scope.loadPromise = scope.upload(null).$promise.then(scope.callbackSuccess, scope.callbackError).then(function () {
                        if (scope.clearAfterSuccess)
                            scope.selectedFiles = [];
                    });;
                };

                scope.$on(scope.broadcastName, function (event, data) {
                    if (scope.multiUpload)
                        scope.startMultiUpload();
                    else
                        scope.startUpload();
                });

                scope.abortUploading = function (file) {
                    file.$promise.abort();
                }

                scope.upload = function (file) {
                    if (file) {
                        var data = { file: file };
                        if (scope.additionalFormData) {
                            var data = angular.copy(scope.additionalFormData);
                            data.file = file;
                        }
                        file.$promise = Upload.upload({
                            url: scope.saveUrl,
                            data: data,
                        })
                        file.$promise.then(function (resp) {
                            // file is uploaded successfully
                            //console.log('file ' + resp.config.data.file.name + 'is uploaded successfully. Response: ' + resp.data);
                        }, function (resp) {
                            scope.error = JSON.stringify(resp.data);
                            //file.progress = 0;
                            // handle error
                        }, function (evt) {
                            // progress notify
                            file.progress = parseInt(100.0 * evt.loaded / evt.total);
                        });
                        return file.$promise;
                    }
                    else {//multiupload
                        if (scope.additionalFormData) {
                            var data = angular.copy(scope.additionalFormData);
                            data.file = scope.selectedFiles;
                        }
                        var upload = {
                            $promise: Upload.upload({
                                url: scope.saveUrl,
                                data: data,
                                arrayKey: ''
                            })
                        }
                        upload.$promise.then(function (resp) {
                            // file is uploaded successfully
                            //console.log('file ' + resp.config.data.file.name + 'is uploaded successfully. Response: ' + resp.data);
                        }, function (resp) {
                            scope.error = JSON.stringify(resp.data);
                            //file.progress = 0;
                            // handle error
                        }, function (evt) {
                            // progress notify
                            upload.progress = parseInt(100.0 * evt.loaded / evt.total);
                        });
                        return upload;
                    }
                    
                };
            }
        };
}]);