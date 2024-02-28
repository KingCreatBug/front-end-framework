app.controller(
    "viewtestCtrl",
    function ($scope, $routeParams, $route, $rootScope) {
        $rootScope.subjects.forEach((ar) => {
            if (ar.Id == $routeParams.id) {
                $scope.subject = angular.copy(ar);
                return;
            }
        });
        $scope.test = function () {
            if ($rootScope.student == null) {
                Swal.fire({
                    icon: "error",
                    title: "You are not logged in!",
                    text: "Please come back after logging in!",
                });
            } else {
                Swal.fire({
                    title: "Exam start?",
                    text: "You are ready!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Have! Start exam.",
                    cancelButtonText: "No",
                }).then((result) => {
                    if (result.value) {
                        window.location.href = "#!test/" + $scope.subject.Id;
                    }
                });
            }
        };
    }
);
