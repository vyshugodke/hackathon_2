let username = document.querySelector("#username")
let search = document.querySelector("#search")

search.addEventListener('click', function() {
    let name = username.value
    git_data(name)


})

let git_data = async(name) => {
    try {
        let response = await fetch(`https://api.github.com/users/${name}/repos?per_page=5&sort=created:asc`)
        let data = await response.json()
        console.log(data)
        paintData(data);
    } catch (err) {
        alert(err)
    }
}

function paintData(data) {
    let cont = document.querySelector(".containers")
    let div1 = document.createElement('div')
    let img = document.createElement("img")
    img.classList.add("img-fluid")
    img.setAttribute("id", "avatar")
    img.setAttribute("src", data[0].owner.avatar_url);
    div1.appendChild(img)

    let profile = document.createElement("a")
    profile.setAttribute("href", data[0].owner.html_url)
    profile.innerText = "GITHUB PROFILE"

    let repolist = document.createElement("div2")
    repolist.classList.add("repolist")
    let heading = document.createElement("h2");
    heading.setAttribute("id", "heading")
    heading.innerText = "REPO DETAILS"
    repolist.append(heading)

    for (var i = 0; i < 5; i++) {
        let repo = document.createElement("div");
        repo.setAttribute("id", `repo-${i}`)

        repo.innerHTML = "<span>REPO NAME : </span>" + data[i].name;

        let repovisit = document.createElement("a")
        repovisit.setAttribute("href", data[i].clone_url)
        repovisit.innerText = "VIEW REPOSITORY"
        repolist.append(repo, repovisit);
    }

    cont.append(div1, profile, repolist)
    document.body.appendChild(cont)
}