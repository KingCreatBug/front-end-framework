app.controller("loginCtrl", function ($scope, $rootScope) {
    $scope.login = function () {
        var ig = true;
        $rootScope.students.forEach((st) => {
            if (st.username == $scope.username) {
                if (st.password == $scope.password) {
                    Swal.fire({
                        icon: "success",
                        title: "Logged in successfully!",
                        text: "Go back to the main page!",
                        showConfirmButton: false,
                        closeOnClickOutside: false,
                        allowOutsideClick: false,
                        timer: 1600,
                    });
                    $rootScope.indexStudent = st.index;
                    $rootScope.student = st;
                    window.location.href = "#!index";

                    ig = false;
                    return;
                }
            }
        });
        if (ig == true) {
            Swal.fire({
                icon: "error",
                title: "Login failed!",
                text: "Please Enter again!",
            });
        }
    };
});
