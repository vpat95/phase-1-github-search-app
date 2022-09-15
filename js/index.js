document.addEventListener('DOMContentLoaded', () => {

    switchButton()

    document.querySelector('#switch').addEventListener('click', () => {

        const button = document.querySelector('#switch')
        if (button.innerText === 'Search Repos') {
            button.innerText = 'Search Users'

        }
        else {
            button.innerText = 'Search Repos'
        }
    })

    document.querySelector('#github-form').addEventListener('submit', (e) => {
        e.preventDefault()
        const but = document.querySelector('button')
        if (but.innerText === 'Search Repos') {
            getUserKeyword(e.target.search.value)
        }
        else {
            getRepoKeyword(e.target.search.value)
        }
    })
})

function getUserKeyword(user) {
    fetch(`https://api.github.com/search/users?q=${user}`, {
        method: 'GET',
        headers: {
            "Accept": "application/vnd.github.v3+json"
        }
    })
        .then(res => res.json())
        .then(userData => renderUser(userData.items))
}

function getRepoKeyword(repo) {
    fetch(`https://api.github.com/search/repositories?q=${repo}`, {
        method: 'GET',
        headers: {
            "Accept": "application/vnd.github.v3+json"
        }
    })
        .then(res => res.json())
        .then(repos => renderRepo(repos.items))
}

function getRepo(reposURL) {
    fetch(`${reposURL}`, {
        method: 'GET',
        headers: {
            "Accept": "application/vnd.github.v3+json"
        }
    })
        .then(res => res.json())
        .then(repos => renderRepo(repos))
}

function renderUser(obj) {
    obj.forEach(element => {
        const userName = document.createElement('li')
        userName.addEventListener('click', () => {
            const del = document.querySelector('#repos-list')
            del.innerHTML = ""
            getRepo(element.repos_url)
        })
        userName.innerText = `User Name: ${element.login}`

        const avatar = document.createElement('img')
        avatar.src = element.avatar_url
        avatar.width = "100"
        userName.appendChild(avatar)

        const profile = document.createElement('a')
        profile.innerText = 'Visit Profile'
        profile.setAttribute('href', `${element.url}`)
        userName.appendChild(profile)

        document.querySelector('#user-list').appendChild(userName)
    });
}

function renderRepo(obj) {
    obj.forEach(item => {
        const repoName = document.createElement('li')
        repoName.innerText = `Repository Name: ${item.name}`

        const description = document.createElement('p')
        description.innerText = `Description: ${item.description}`
        repoName.appendChild(description)

        const link = document.createElement('p')
        link.innerText = `URL: ${item.url}`
        repoName.appendChild(link)

        document.querySelector('#repos-list').appendChild(repoName)
    })
}

function switchButton() {
    const switchButton = document.createElement('button')
    switchButton.id = "switch"
    switchButton.textContent = "Search Repos"
    const cont = document.querySelector('#github-container')
    document.querySelector('#main').insertBefore(switchButton, cont)
}

