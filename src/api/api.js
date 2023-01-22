import { Octokit } from "octokit"
import axios from "axios"


const octokit = new Octokit({
    auth: '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'
})


const Commit = async () => {
    const temp = await octokit.request('GET /repos/{owner}/{repo}/commits{?sha,path,author,since,until,per_page,page}', {
        owner: 'AlecTufenkjian',
        repo: 'map-my-business'
    })
    let logins = []
    const commits = temp.data;
    console.log(commits)
    for (let i = 0; i < commits.length; i++) {
        console.log(commits[i].author.login)
        if (!logins.includes(commits[i].author.login)) {
            logins.push(commits[i].author.login)
        }

    }
    console.log(logins)
    let allUsers = []

    for (let j = 0; j < logins.length; j++) {
        const eachUser = await octokit.request('GET /users/{username}', {
            username: logins[j]
        })
        allUsers.push(eachUser.data);
    }
    for (let z = 0; z < allUsers.length; z++) {
        if (allUsers[z].location != null) {

            let strArr = allUsers[z].location.split(" ");
            console.log(strArr)
            let str = ""
            for (let s = 0; s < strArr.length; s++) {
                if (s == s.length - 1) {
                    str = str + strArr[s];
                }
                else {
                    str = str + strArr[s] + "+"
                }
            }
            let coord = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${str}&key=AIzaSyBhll2fXJ6qdqAJlBfBHv4g5y30vdM1IqY`)
            console.log(coord.data.results[0].geometry.location)
            allUsers[z].coord = coord.data.results[0].geometry.location;
        }
        else{
            allUsers[z].coord = {};
        }
    }
    let allSent = []
    allUsers.forEach((user) => {
        allSent.push({"username": user.login,"Name": user.name,"location" : user.location,"email" : user.email,"coord" : user.coord})
    })
    return allSent
}
const noOfUsers = async () => {
    const temp = await octokit.request('GET /repos/{owner}/{repo}/commits{?sha,path,author,since,until,per_page,page}', {
        owner: 'mubashir494',
        repo: 'SOEN341_Team_Project'
    })

}
export default Commit;