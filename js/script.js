const url = 'https://randomuser.me/api/';
const config = '?results=';
const howManyFriend = 50 //prompt('How many friends do you want to have?:)', 12);


const endPoint = url + config + howManyFriend;

let data;

fetch(endPoint).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Request failed!');
    }, networkError => console.log(networkError.message)
).then(info => {
    data = info.results;
    runApp(data);
    return;

});

let runApp = function (data) {
    console.log(data);
    let GLOBAL_INFORMATION = data;

    const dashboard = document.getElementById('dashboard');
    const byAgeUpBtn = document.getElementById('by-age-up');
    const byAgeDownBtn = document.getElementById('by-age-down');
    const maleBtn = document.getElementById('male-btn');
    const femaleBtn = document.getElementById('female-btn');
    const resetBtn = document.getElementById('reset-btn');
    const azBtn = document.getElementById('by-name-a-z');
    const zaBtn = document.getElementById('by-name-z-a');
    const searchInput = document.getElementById('search');

    function render(userInformation) {
        let cardList = createDomElement('div', {id: 'card-list'}, dashboard);
        for (let i = 0; i < userInformation.length; i++) {
            let card = createDomElement('div', {className: 'card'}, cardList);
            let cardPhoto = createDomElement('div', {className: 'card-photo'}, card);
            let friendPhoto = createDomElement('img', {src: userInformation[i].picture.large}, cardPhoto)
            let cardMyInfo = createDomElement('div', {className: 'card-myInfo'}, card);
            let greetingMessage = createDomElement('p', {
                innerHTML: 'Hi, my name is',
                className: 'greeting-message'
            }, cardMyInfo);
            let friendName = createDomElement('h3', {innerHTML: `${userInformation[i].name.first} ${userInformation[i].name.last}`}, cardMyInfo);
            let cardIcons = createDomElement('div', {className: 'card-icons'}, card);
            let gangerIcon = createDomElement('div', {className: 'icon ' + checkGender()}, cardIcons);
            let letter = createDomElement('div', {className: 'icon letter'}, cardIcons);
            let calendar = createDomElement('div', {className: 'icon calendar'}, cardIcons);
            let age = createDomElement('p', {innerHTML: userInformation[i].dob.age}, calendar);
            let marker = createDomElement('div', {className: 'icon marker'}, cardIcons);
            let phone = createDomElement('div', {className: 'icon phone'}, cardIcons);

            function checkGender() {
                if (userInformation[i].gender == 'male') {
                    return 'gentlemen';
                } else {
                    return 'lady';
                }
            };

            function updateFriendInfo(e) {
                let myInfoCard = this.parentElement.children[1];
                let targetClass = e.target.className;
                targetClass = targetClass.split(" ").splice(-1);

                if (targetClass[0] == 'lady' || targetClass[0] == 'gentlemen') {
                    myInfoCard.children[0].innerHTML = 'Hi, my name is';
                    myInfoCard.children[1].innerHTML = `${userInformation[i].name.first} ${userInformation[i].name.last}`;
                } else if (targetClass[0] == 'letter') {
                    myInfoCard.children[0].innerHTML = 'My email address is';
                    myInfoCard.children[1].innerHTML = userInformation[i].email;
                } else if (targetClass[0] == 'calendar' || e.target.tagName == 'P') {
                    let dateOfBirthday = new Date(userInformation[i].dob.date)
                    myInfoCard.children[0].innerHTML = 'My birthday is';
                    myInfoCard.children[1].innerHTML = `${dateOfBirthday.getDate()}/${dateOfBirthday.getMonth()}/${dateOfBirthday.getFullYear()}`;
                } else if (targetClass[0] == 'marker') {
                    myInfoCard.children[0].innerHTML = 'My address is';
                    myInfoCard.children[1].innerHTML = userInformation[i].location.street;
                } else if (targetClass[0] == 'phone') {
                    myInfoCard.children[0].innerHTML = 'My phone number is  ';
                    myInfoCard.children[1].innerHTML = userInformation[i].cell;
                }

            };
            cardIcons.addEventListener('click', updateFriendInfo)
        }
        ;
    }; // render function ends
    render(data);

    function createDomElement(tagName, config, tagToAdd) {
        let tag = document.createElement(tagName);
        Object.assign(tag, config)
        tagToAdd.appendChild(tag);
        return tag;
    };

    function cleanDashboard() {
        let cards = document.getElementById('card-list');
        if (cards === null) {
            return;
        } else {
            cards.remove();

        }

    };

    function sortFormSmallToBiggerAge() {
        let infoToSort;
        infoToSort = GLOBAL_INFORMATION.slice().sort((a, b) => {
            let c = a.dob.age;
            let d = b.dob.age;
            if (c < d) {
                return -1;
            } else if (c > d) {
                return 1;
            }
            return 0;
        });
        cleanDashboard();
        render(infoToSort);
    };

    function sortFormBiggerToSmallAge() {
        let infoToSorts;
        infoToSorts = GLOBAL_INFORMATION.slice().sort((a, b) => {
            let c = a.dob.age;
            let d = b.dob.age;
            if (c > d) {
                return -1;
            } else if (c < d) {
                return 1;
            }
            return 0;
        });
        cleanDashboard();
        render(infoToSorts);
    };

    function showMaleOrFemale(e) {
        let justMan = [];
        let justGirls = [];
        if (e.target.id == 'male-btn') {
            for (let i = 0; i < GLOBAL_INFORMATION.length; i++) {
                if (GLOBAL_INFORMATION[i].gender == 'male') {
                    justMan.push(GLOBAL_INFORMATION[i]);
                }
            }
            // GLOBAL_INFORMATION = justMan;
            cleanDashboard();
            render(justMan);
        } else if (e.target.id == 'female-btn') {
            for (let i = 0; i < GLOBAL_INFORMATION.length; i++) {
                if (GLOBAL_INFORMATION[i].gender == 'female') {
                    justGirls.push(GLOBAL_INFORMATION[i]);
                }
            }
            // GLOBAL_INFORMATION = justGirls;
            cleanDashboard();
            render(justGirls);
        }

    };

    function sortFromAtoZ() {
        let infoToSorts;
        infoToSorts = GLOBAL_INFORMATION.slice().sort((a, b) => {
            let c = a.name.first;
            let d = b.name.first;
            if (c < d) {
                return -1;
            } else if (c > d) {
                return 1;
            }
            return 0;
        });
        cleanDashboard();
        render(infoToSorts);
    };

    function sortFromZtoA() {
        let infoToSorts;
        infoToSorts = GLOBAL_INFORMATION.slice().sort((a, b) => {
            let c = a.name.first;
            let d = b.name.first;
            if (c > d) {
                return -1;
            } else if (c < d) {
                return 1;
            }
            return 0;
        });
        cleanDashboard();
        render(infoToSorts);
    };

    function searchFriend(e) {
        let searchResult = [];
        let value = [];
        console.log(e.keyCode);
        if (e.keyCode <= 90 && e.keyCode >= 65) {
            value = e.srcElement.value.split('');
            console.log(value);
        }else if(e.keyCode == 8){
            value = e.srcElement.value.split('');
            console.log(value);
        }

        for (let i = 0; i < GLOBAL_INFORMATION.length; i++) {
            let name = GLOBAL_INFORMATION[i].name.first.split('');
            for (j = value.length-1; j < value.length; j++) {
                if (value[j] == name[j]) {
                    searchResult.push(GLOBAL_INFORMATION[i]);
                }
            }
        }
        GLOBAL_INFORMATION = searchResult;
        if (searchResult.length > 0) {
            cleanDashboard();
            render(searchResult);
        }
        if(value.length == 0){
            reset();
        }

    };

    function reset(e) {
        searchInput.value = '';
        GLOBAL_INFORMATION=data;
        cleanDashboard();
        render(data);
    };


    byAgeUpBtn.addEventListener('click', sortFormSmallToBiggerAge);
    byAgeDownBtn.addEventListener('click', sortFormBiggerToSmallAge);
    maleBtn.addEventListener('click', showMaleOrFemale);
    femaleBtn.addEventListener('click', showMaleOrFemale)
    azBtn.addEventListener('click', sortFromAtoZ);
    zaBtn.addEventListener('click', sortFromZtoA);
    searchInput.addEventListener('keyup', searchFriend);
    resetBtn.addEventListener('click', reset);
};
