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

//Window Resize
window.onresize = () => {
    if(window.innerWidth > 650 && isSideNavOpen) closeSideNav();
    
    if(window.innerWidth > 650) resetSideNav();

    if(window.innerWidth > 500) {
        for(nav of document.getElementsByClassName("navbar-collapse")) {
            nav.style.height = "";
            navExpanded = false;
        }
    }
    
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

    //Create hamburger button
    if(document.getElementsByClassName("navbar-collapse").length > 0) {
        let button = document.createElement("button");
        button.id = "toggleTopNavBtn";
        button.classList.add("btn");

        let container = document.createElement("div");

        let menuBar1 = document.createElement("div");
        let menuBar2 = document.createElement("div");
        let menuBar3 = document.createElement("div");
        menuBar1.classList.add("menu-bar");
        menuBar2.classList.add("menu-bar");
        menuBar2.classList.add("mid");
        menuBar3.classList.add("menu-bar");
        container.appendChild(menuBar1);
        container.appendChild(menuBar2);
        container.appendChild(menuBar3);

        button.appendChild(container);
        button.addEventListener("click", toggleTopNav);
        let nav = document.getElementsByTagName("nav")[0];
        nav.insertBefore(button, nav.children[2]);
    }

    //add arrow on drop down nav btns 
    for(dropdownToggleBtn of document.getElementsByClassName("dropdown-toggle")) {
        dropdownToggleBtn.innerHTML = dropdownToggleBtn.innerHTML + " &#9660"; 
        dropdownToggleBtn.addEventListener("click", () => {toggleDropdownMenu(dropdownToggleBtn);});
    }

    //add close btn to closable alerts
    for(alert of document.getElementsByClassName("alert-closable")) {
        let closeBtn = document.createElement("button");
        closeBtn.classList.add("close");
        closeBtn.innerHTML = "&#10006;";
        closeBtn.addEventListener("click", event => {closeAlert(event.target.parentNode)});
        alert.appendChild(closeBtn);
    }

    //add close event listener to modal
    for(modalCloseBtn of document.getElementsByClassName("modal-close")) {
        modalCloseBtn.addEventListener("click", event => {closeModal(event.target.parentNode.parentNode)});
    }

    //add open modal event listener to correct buttons
    for(btn of document.querySelectorAll('[data-toggle="modal"]')) {
        btn.addEventListener("click", event => {showModal(document.getElementById(event.target.dataset.target));});
    }

});

const showModal = modal => {
    modal.style.display = "block";
}
const closeModal = modal => {
    modal.style.display = "none";
}
const closeAlert = alert => {
    alert.style.opacity = "0";
    setTimeout(() => {alert.style.display = "none";}, 300);
    
}

const toggleDropdownMenu = btn => {
    let parent = btn.parentNode;
    let menu = parent.getElementsByClassName("dropdown-menu")[0];
    console.log(menu);
    if(menu.style.display == "block") {
        menu.style.display = "none";
    }
    else {
        menu.style.display = "block";
    }
}

//Top Nav Bar

let navExpanded = false;

//toggles whether the mobile view nav bar is expanded or not
const toggleTopNav = evt => {
    for(nav of document.getElementsByClassName("navbar-collapse")) {
        if(nav.style.height == "auto") {
            nav.style.height = "0";
            navExpanded = false;
        }
        else{
            nav.style.height = "auto";
            navExpanded = true;
        }
    }
}