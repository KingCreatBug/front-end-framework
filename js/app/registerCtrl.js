app.controller("registerCtrl", function ($rootScope, $scope) {
    $scope.register = function () {
        $rootScope.students.push(angular.copy($scope.studentR));
        $scope.studentR = {};
        $scope.repassword = "";
        Swal.fire({
            icon: "success",
            title: "Logged in successfully!",
            text: "Go back to the main page!",
            showConfirmButton: false,
            closeOnClickOutside: false,
            allowOutsideClick: false,
            timer: 1600,
        });
        window.location.href = "#!index";
    };
});
