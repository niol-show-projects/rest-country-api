let darkMode = localStorage.getItem('darkMode');

const darkModeToggle = document.querySelector('#dark-mode-toggle');
const text = document.getElementById('dark-mode-text');

const enableDarkMode = () =>{
    document.body.classList.add('darkmode')
    localStorage.setItem('darkMode', 'enabled')
    darkModeToggle.src = '/rest-countries-api-with-color-theme-switcher-master/moon-fill-white.svg'
    text.innerText = 'Dark Mode'
}

const disableDarkMode = () =>{
    document.body.classList.remove('darkmode')
    localStorage.setItem('darkMode', 'null')
    darkModeToggle.src= '/rest-countries-api-with-color-theme-switcher-master/moon.svg'
    text.innerText = 'Light Mode'
}
if (darkMode === 'enabled'){
    enableDarkMode();
}
darkModeToggle.addEventListener('click', ()=>{
    darkMode = localStorage.getItem('darkMode')
    //alert('clicked')
    if(darkMode !== 'enabled'){
        enableDarkMode();
        //alert('darkmode')
    }else{
        disableDarkMode();
    }
})