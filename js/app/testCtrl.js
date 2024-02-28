app.controller(
    "testCtrl",
    function ($scope, $interval, $http, $routeParams, $rootScope) {
        $rootScope.subjects.forEach((ar) => {
            if (ar.Id == $routeParams.id) {
                $scope.subject = angular.copy(ar);
                return;
            }
        });
        $http
            .get("db/Quizs/" + $routeParams.id + ".js")
            .then(function (response) {
                $scope.questions = response.data;
            });
        $scope.testMark = 0;
        $scope.indexQ = 0;
        $scope.timer = 900;
        $scope.elem = [];

        $scope.move = function (x) {
            $scope.indexQ = x;
        };
        $scope.mark = function () {
            if (
                $scope.questions[$scope.indexQ].AnswerId ==
                $scope.elem[$scope.indexQ].answer
            ) {
                Swal.fire({
                    icon: "success",
                    title: "Congratulations on making the right choice!",
                    text:
                        "You get credit " +
                        $scope.questions[$scope.indexQ].Marks +
                        " point",
                    showConfirmButton: false,
                    timer: 1200,
                });
                $scope.testMark += $scope.questions[$scope.indexQ].Marks;
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Sorry! you chose the wrong answer.",
                    showConfirmButton: false,
                    timer: 1200,
                });
            }
        };
        $scope.finish = function () {
            Swal.fire({
                title: "Are you sure?",
                text: "You really want to finish the test!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Có",
                cancelButtonText: "Không",
            }).then((result) => {
                if (result.value) {
                    $scope.timer = 3;
                    Swal.fire({
                        title: "End of test",
                        text: "The test will end in 3 seconds",
                        icon: "success",
                        showConfirmButton: false,
                        closeOnClickOutside: false,
                        allowOutsideClick: false,
                        timer: 4000,
                    });
                }
            });
        };

        var stop = $interval(function () {
            if ($scope.timer > 0) {
                $scope.timer -= 1;
            } else if ($scope.timer == 0) {
                $rootScope.student.marks = (
                    parseInt($rootScope.student.marks) + $scope.testMark
                ).toString();
                $rootScope.students[$rootScope.indexStudent] = angular.copy(
                    $rootScope.student
                );
                window.location.href = "#!viewtest/" + $scope.subject.Id;
                $interval.cancel(stop);
            }
        }, 1000);
    }
);
