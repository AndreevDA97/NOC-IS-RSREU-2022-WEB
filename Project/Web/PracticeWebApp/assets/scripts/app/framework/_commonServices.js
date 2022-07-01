angular.module('app.services').service('commonFunctions', ['$http', '$q', function ($http, $q) {

    this.cloneObject = function (object) {
        if (!object) return null;
        return JSON.parse(JSON.stringify(object));
    }

    this.roundTo001 = function (value) {
        return Math.round(value * 100) / 100;
    }
    this.formatSum = function (value, minFrac) {
        return new Intl.NumberFormat("ru-RU", { minimumFractionDigits: minFrac }).format(value);
    }

    this.maxPageSize = function () {
        return 9999;
    }
    this.defaultPageSize = function () {
        return 20;
    }

    this.formatDate = function (date) {
        var dd = date.getDate();
        if (dd < 10) dd = '0' + dd;
        var mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;
        var yyyy = date.getFullYear();
        return dd + '.' + mm + '.' + yyyy;
    }
    this.parseDateStr = function (dateStr) {
        if (!dateStr) return null;
        var from = dateStr.split(".");
        return new Date(Date.UTC(from[2], from[1] - 1, from[0], 0, 0, 0));
    }

    this.getMonthName = function (index) {
        var month = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        return month[index - 1];
    }
    this.getMonthNamePrepositional = function (index) {
        var month = ['Январе', 'Феврале', 'Марте', 'Апреле', 'Мае', 'Июне',
            'Июле', 'Августе', 'Сентябре', 'Октябре', 'Ноябре', 'Декабре'];
        return month[index - 1];
    }
    this.getLastDayOfMonth = function (year, month) {
        return new Date(year, month, 0).getDate();
    }

    this.getMonthsList = function () {
        let months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        let list = [];
        for (var i = 0; i < months.length; i++) {
            list.push({ Id: months[i], Name: this.getMonthName(months[i]) });
        }
        return list;
    }

    // инициализация компонентов полей для ввода
    this.refreshEditorStyles = function (selector) {
        if (selector) selector += ' '; else selector = '';
        // выпадающий список
        $(selector + 'select').selectpicker('refresh');
        // всплывающие подсказки
        $(selector + 'a').tooltip();
        $(selector + 'span').tooltip();
        //$(selector + 'button').tooltip();
        $(selector + '[data-toggle="tooltip"]').tooltip();
        // поле выбора даты
        $(selector + '.datepicker').datepicker('remove');
        $(selector + '.datepicker').datepicker({
            format: 'dd.mm.yyyy',
            autoclose: true,
        });
        $(selector + '.datepicker').inputmask('99.99.9999', { placeholder: '-' });
        var datepicker = $(selector + '.datepicker').datepicker('update');
        $(selector + '.datepicker-months').datepicker('remove');
        $(selector + '.datepicker-months').datepicker({
            format: 'mm.yyyy',
            autoclose: true,
            minViewMode: 1,
            maxViewMode: 2,
            //viewMode: 'months',
            //minViewMode: 'months',
        });
        var datepickerMonths = $(selector + '.datepicker-months').datepicker('update');
        // запрет вызова события открытия окна
        //datepicker.unbind('show.bs.modal');
        //datepickerMonths.unbind('show.bs.modal');
        //datepicker.on('show.bs.modal', function (event) { event.stopPropagation(); });
        //datepickerMonths.on('show.bs.modal', function (event) { event.stopPropagation(); });
        // поле с заданной маской для ввода
        $(selector + '.curency').inputmask({ mask: '[-][9{10}][.]99', greedy: false, placeholder: '' });
        $(selector + '.accuracy3').inputmask({ mask: '[-][9{10}][.]999', greedy: false, placeholder: '' });
        //$(selector + '.mask-curency').inputmask({ mask: '[9{10}][.]99', greedy: false, placeholder: ' ' });
        $(selector + '.mask-phone').inputmask({ mask: '+7-999-999-99-99', placeholder: ' ' });
        // формат ввода с точкой
        //$('.curency').unbind('keyup');
        //$('.curency').keyup(function () {
        //    if ($(this).val() && $(this).val().indexOf(",")) {
        //        $(this).val($(this).val().replace(/[,]/g, "."))
        //            .trigger('change'); // update scope
        //    }
        //});
        // перетаскиваемые элементы в интерфейсе
        //$(selector + '.ui-draggable').draggable();
        //$(selector + '.ui-resizable').resizable();
    }
    // регистрация сворачивающихся блоков на странице
    this.registerCollapseAccordion = function (selector) {
        if (selector) selector += ' '; else selector = '';
        $(selector + '.div-collapse-light').unbind('show.bs.collapse hide.bs.collapse');
        $(selector + '.div-collapse-light').on('show.bs.collapse hide.bs.collapse',
            function (event) {
                var panelBody = $(event.target);
                var spanElement = panelBody.parent().children('.div-collapse-head')
                    .children('span.glyphicon-chevron-up, span.glyphicon-chevron-down');
                if (spanElement) {
                    spanElement.removeClass();
                    spanElement.addClass(event.type == 'show'
                        ? 'glyphicon glyphicon-chevron-up'
                        : 'glyphicon glyphicon-chevron-down');
                }
            }
        );
    }
    // регистрация сворачивающихся панелей на странице
    this.registerCollapsePanels = function (selector) {
        if (selector) selector += ' '; else selector = '';
        $(selector + '.panel').unbind('show.bs.collapse hide.bs.collapse');
        $(selector + '.panel').on('show.bs.collapse hide.bs.collapse',
            function (event) {
                var panelBody = $(event.target);
                var spanElement = panelBody.parent().children('.panel-heading')
                    .children('span.glyphicon-chevron-up, span.glyphicon-chevron-down');
                if (spanElement) {
                    spanElement.removeClass();
                    spanElement.addClass(event.type == 'show'
                        ? 'glyphicon glyphicon-chevron-up'
                        : 'glyphicon glyphicon-chevron-down');
                }
            }
        );
    }
    // исправление от неполного затемнения фона модального окна
    this.registerFixModalBackdrop = function (modal) {
        if (!modal) return;
        $(modal).unbind('scroll');
        $(modal + ' .div-collapse-light').unbind('shown.bs.collapse hidden.bs.collapse');
        $(modal + ' .panel').unbind('shown.bs.collapse hidden.bs.collapse');
        $(modal).on('scroll', fixModalBackdrop);
        $(modal + ' .div-collapse-light').on('shown.bs.collapse hidden.bs.collapse', fixModalBackdrop);
        $(modal + ' .panel').on('shown.bs.collapse hidden.bs.collapse', fixModalBackdrop);
        function fixModalBackdrop() { $(modal).data('bs.modal').handleUpdate(); }
    }

    this.resetOrder = function (columnIndex, columns, getModel, orderNames) {
        orderNames.forEach(function (item) {
            getModel[item] = 0;
        });
        for (var i = 0; i < columns.length; i++) {
            if ((columns[i].orderType != undefined) && (i != columnIndex))
                columns[i].orderType = 0;
        }
        getModel.PageNumber = 1;
    }
    this.setOrder = function (columnIndex, columns, getModel, orderNames, newValue) {
        this.resetOrder(columnIndex, columns, getModel, orderNames);
        getModel[orderNames[columnIndex]] = newValue;
    }

    this.utf8ToBase64 = function (str) {
        return window.btoa(unescape(encodeURIComponent(str)));
    }
    this.base64ToUtf8 = function (str) {
        return decodeURIComponent(escape(window.atob(str)));
    }
    this.executeDownloadFile = executeDownloadFile;
    function executeDownloadFile (data, filename, contentType) {
        var success = false;
        try {
            // Try using msSaveBlob if supported
            //console.log("Trying saveBlob method ...");
            var blob = new Blob([data], { type: contentType });
            if (navigator.msSaveBlob)
                navigator.msSaveBlob(blob, filename);
            else {
                // Try using other saveBlob implementations, if available
                var saveBlob = navigator.webkitSaveBlob || navigator.mozSaveBlob || navigator.saveBlob;
                if (saveBlob === undefined) throw "Not supported";
                saveBlob(blob, filename);
            }
            //console.log("saveBlob succeeded");
            success = true;
        } catch (ex) {
            console.log("saveBlob method failed with the following exception:");
            console.log(ex);
        }

        if (!success) {
            // Get the blob url creator
            var urlCreator = window.URL || window.webkitURL || window.mozURL || window.msURL;
            if (urlCreator) {
                // Try to use a download link
                var link = document.createElement('a');
                if ('download' in link) {
                    // Try to simulate a click
                    try {
                        // Prepare a blob URL
                        //console.log("Trying download link method with simulated click ...");
                        var blob = new Blob([data], { type: contentType });
                        var url = urlCreator.createObjectURL(blob);
                        link.setAttribute('href', url);

                        // Set the download attribute (Supported in Chrome 14+ / Firefox 20+)
                        link.setAttribute("download", filename);

                        // Simulate clicking the download link
                        var event = document.createEvent('MouseEvents');
                        event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
                        link.dispatchEvent(event);
                        //console.log("Download link method with simulated click succeeded");
                        success = true;

                    } catch (ex) {
                        console.log("Download link method with simulated click failed with the following exception:");
                        console.log(ex);
                    }
                }

                if (!success) {
                    // Fallback to window.location method
                    try {
                        // Prepare a blob URL
                        // Use application/octet-stream when using window.location to force download
                        //console.log("Trying download link method with window.location ...");
                        var blob = new Blob([data], { type: 'application/octet-stream' });
                        var url = urlCreator.createObjectURL(blob);
                        window.location = url;
                        //console.log("Download link method with window.location succeeded");
                        success = true;
                    } catch (ex) {
                        console.log("Download link method with window.location failed with the following exception:");
                        console.log(ex);
                    }
                }

            }
        }

        if (!success) {
            // Fallback to window.open method
            console.log("No methods worked for saving the arraybuffer, using last resort window.open");
            window.open(httpPath, '_blank', '');
        }
    }
    this.downloadFile = function (httpPath, successCallBack, errorCallBack, object, sendingData, isPost) {
        var deferred = $q.defer();
        // Use an arraybuffer
        let promise = isPost
            ? $http.post(httpPath, sendingData, { responseType: 'arraybuffer' })
            : $http.get(httpPath, { responseType: 'arraybuffer', params: sendingData });

        promise.success(function (data, status, headers) {

            // Get the headers
            headers = headers();

            // Get the filename from the x-filename header or default to "download.bin"
            var filename = decodeURIComponent(headers['x-filename']) || 'download.bin';

            // Determine the content type from the header or default to "application/octet-stream"
            var contentType = headers['content-type'] || 'application/octet-stream';

            // Execute download the file in the browser
            executeDownloadFile(data, filename, contentType);

            if (successCallBack)
                successCallBack(object);

            deferred.resolve(object);
        })
        .error(function (data, status) {
            console.log("Request failed with status: " + status);
            let response;
            if ('TextDecoder' in window) {
                // Decode as UTF-8
                var dataView = new DataView(data);
                var decoder = new TextDecoder('utf8');
                response = JSON.parse(decoder.decode(dataView));
            } else {
                // Fallback decode as ASCII
                var decodedString = String.fromCharCode.apply(null, new Uint8Array(data));
                response = JSON.parse(decodedString);
            }
            let errorMessage = response.Message ? response.Message : '';
            // Optionally write the error out to scope
            //$scope.errorDetails = "Request failed with status: " + status;
            if (errorCallBack)
                errorCallBack("Ошибка загрузки файла: (" + status + ") " + errorMessage, object);

            deferred.reject({ message: "Ошибка загрузки файла: (" + status + ") " + errorMessage, data: object });
        });
        return deferred.promise;
    };

    this.timeUnit = {
        Year: { Id: 1, Name: 'Год' },
        Quarter: { Id: 2, Name: 'Квартал' },
        Month: { Id: 3, Name: 'Месяц' },
        Week: { Id: 4, Name: 'Неделя' },
        Day: { Id: 5, Name: 'День' },
    };
}]);

angular.module('app.services').service('appTypeService', ['appType', function(appType) {
    this.getAppType = function () { return appType; }
}]);

angular.module('app.services').service('$universalService', ['$http', function($http) {
        this.prefix = '';

        this.setPrefix = function (prefix) {
            this.prefix = prefix;
        };
        this.getPrefix = function () {
            return this.prefix;
        };

        this.getRequest = function(url, data) {
            return $http.get(this.prefix + url, data);
        };

        this.postRequest = function(url, data) {
            return $http.post(this.prefix + url, data);
        };

        this.putRequest = function(url, data) {
            return $http({
                method: 'PUT',
                url: this.prefix + url,
                data: data,
                headers: { 'Content-Type': 'application/json' }
            });
        };
        this.deleteRequest = function(url, id) {
            return $http({
                method: 'DELETE',
                url: this.prefix + url,
                data: { Parameter: id },
                headers: { 'Content-Type': 'application/json' }
            });
        };
        this.deleteObjectRequest = function(url, data) {
            return $http({
                method: 'DELETE',
                url: this.prefix + url,
                data: data,
                headers: { 'Content-Type': 'application/json' }
            });
        };
    }
]);
angular.module('app.services').service('$configService', ['$http', function ($http) {

    this.setValue = function (name,value) {
        this[name] = value;
    };
}
]);

angular.module('app.services').service('menuService', ['commonFunctions', function (commonFunctions) {

    this.refreshLastPathItem = function (menuPath, menuItem, prefix) {
        if (menuPath) {
            if (menuPath.length > 0) {
                menuPath.pop();
            }
            var newItem = commonFunctions.cloneObject(menuItem);
            newItem.ngclick = menuItem.ngclick;
            newItem.href = '';
            newItem.active = true;
            if (prefix)
                newItem.caption = prefix + newItem.caption;
            menuPath.push(newItem);
        }
    }

    this.addToPath = function (menuPath, menuItem) {
        if (menuPath) {
            for (var i = 0; i < menuPath.length; i++) {
                menuPath[i].active = false;
            }
            menuPath.push(menuItem);
        }
    }

    this.setActiveItem = function (menu, menuItem) {
        if (menu && menu.length > 0) {
            for (var i = 0; i < menu.length; i++) {
                menu[i].active = menu[i] == menuItem;
                if (menu[i].subItems) {
                    for (var j = 0; j < menu[i].subItems.length; j++) {
                        menu[i].subItems[j].active = menu[i].subItems[j] == menuItem;
                        if (menu[i].subItems[j].active)
                            menu[i].expanded = menu[i].expanded || true;
                    }
                }
            }
        } else {
            menu = [];
        }
    }

    this.getItemIndexByName = function (menu, name) {
        if (menu && menu.length > 0) {
            for (var i = 0; i < menu.length; i++) {
                if (menu[i].name == name) {
                    return i;
                }
            }
        }
        return null;
    }

    this.getItemByName = function (menu, name) {
        if (menu && menu.length > 0) {
            for (var i = 0; i < menu.length; i++) {
                if (menu[i].name == name) {
                    return menu[i];
                }
                if (menu[i].subItems) {
                    for (var j = 0; j < menu[i].subItems.length; j++) {
                        if (menu[i].subItems[j].name == name) {
                            return menu[i].subItems[j];
                        }
                    }
                }
            }
        }
        return null;
    }

    this.refreshHrefs = function (menu, rootUrl) {
        if (!rootUrl) return null;
        if (menu && menu.length > 0) {
            for (var i = 0; i < menu.length; i++) {
                menu[i].href = rootUrl;
                if (menu[i].name) {
                    menu[i].href += '?page=' + menu[i].name;
                }
            }
        }
        return null;
    }


}]);