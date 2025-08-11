document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.getElementById("loginBtn");
    if (loginBtn) {
        loginBtn.addEventListener("click", function () {
            alert("Login feature coming in… never!");
        });
    }

    const upvoteBtn = document.getElementById("upvoteBtn");
    if (upvoteBtn) {
        upvoteBtn.addEventListener("click", function () {
            alert("You upvoted this post! (Not really)");
        });
    }
});
