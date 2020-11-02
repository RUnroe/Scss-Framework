let isSideNavOpen = false;

let sideNavToggleCollection = document.getElementsByClassName("side-nav-toggle");
for(sideNavToggle of sideNavToggleCollection) {
    sideNavToggle.addEventListener("click", () => {
        console.log("Clicked");
        if(isSideNavOpen) closeSideNav();
        else openSideNav();
    });
}

const closeSideNav = () => {
    isSideNavOpen = false;
    let screen = document.getElementById("nav-screen");
    document.body.removeChild(screen);
    for(sideNav of document.getElementsByClassName("side-nav")) {
        sideNav.style.display = "none";
    }
}

const openSideNav = () => {
    isSideNavOpen = true;
    for(sideNav of document.getElementsByClassName("side-nav")) {
        sideNav.style.display = "block";
    }

    let screen = document.createElement("div");
    screen.className = "close-nav-screen";
    screen.id = "nav-screen";
    screen.addEventListener("click", closeSideNav);
    document.body.appendChild(screen);
}

const resetSideNav = () => {
    for(sideNav of document.getElementsByClassName("side-nav")) {
        sideNav.style.display = "";
        sideNav.style.width = "12em";
        sideNav.style.maxWidth = "100%";
    }
}

window.onresize = () => {
    if(window.innerWidth > 650 && isSideNavOpen) closeSideNav();
    
    if(window.innerWidth > 650) resetSideNav();
    
}





//Window on load
document.addEventListener("DOMContentLoaded", () => {
    //Closes side nav bar (for mobile) upon clicking a link
    for(sideNav of document.getElementsByClassName("side-nav")) {
        for(link of sideNav.children) {
            link.addEventListener("click", () => {
                if(window.innerWidth <= 650) closeSideNav();
            });
        }
    }

    if(document.getElementsByClassName("navbar-collapse").length > 0) {
        let button = document.createElement("button");
        button.id = "toggleTopNavBtn";
        button.classList.add("btn");
        button.classList.add("btn-light");
        for(nav of document.getElementsByTagName("nav")) {
            nav.insertBefore(button, nav.children[2]);
        }
        
    }
});