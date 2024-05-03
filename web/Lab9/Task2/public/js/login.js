let form = new SimpleForm("login_form", (userName) => {
    window.location.href = "http://localhost:3000/login/" + userName;
    document.cookie = "username=" + userName;
});
// form.form.action = '/login/' + userName
form.placeAtContext();
