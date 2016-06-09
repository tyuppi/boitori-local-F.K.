var appKey = "2f7f81cde872870b3a9999523ed3225808d639982c9960164040315d53bc5777";
var clientKey = "f7b1ad0056482844b1d94b5acaa3d5b39b38b225ed62a47cae0dd3d6e27cfc1c";
var ncmb = new NCMB(appKey, clientKey);

///// Called when app launch
$(function () {
    $("#LoginBtn").click(onLoginBtn);
    $("#RegisterBtn").click(onRegisterBtn);
    $("#YesBtn_logout").click(onLogoutBtn);
});

//----------------------------------USER MANAGEMENT-------------------------------------//
var currentLoginUser; //現在ログイン中ユーザー

function onRegisterBtn() {
    //入力フォームからusername, password変数にセット
    var username = $("#reg_username").val();
    var password = $("#reg_password").val();

    var user = new ncmb.User();
    user.set("userName", username)
        .set("password", password);

    // 任意フィールドに値を追加 
    user.signUpByAccount()
        .then(function (user) {
            alert("新規登録に成功");
            currentLoginUser = ncmb.User.getCurrentUser();
            $.mobile.changePage('#DetailPage');
        })
        .catch(function (error) {
            alert("新規登録に失敗！次のエラー発生：" + error);
        });
}

function onLoginBtn() {
    var username = $("#login_username").val();
    var password = $("#login_password").val();
    // ユーザー名とパスワードでログイン
    ncmb.User.login(username, password)
        .then(function (user) {
            alert("ログイン成功");
            currentLoginUser = ncmb.User.getCurrentUser();
            $.mobile.changePage('#DetailPage');
        })
        .catch(function (error) {
            alert("ログイン失敗！次のエラー発生: " + error);
        });
}

function onLogoutBtn() {
    ncmb.User.logout();
    alert('ログアウト成功');
    currentLoginUser = null;
    $.mobile.changePage('#LoginPage');
}
