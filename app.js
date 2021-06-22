const formElem = document.querySelector('form');
const userInp = document.querySelectorAll("input")
const results = document.querySelector("#results")

formElem.addEventListener('submit', (e) => {
  e.preventDefault();
  async function fetchData(){
    const res = await fetch(`https://api.github.com/users/${userInp[0].value}/repos`);
     const result = await res.json();
     result.sort((a, b) => b.pushed_at.localeCompare(a.pushed_at));
     console.log(result);
    if(!res.ok){}
    else{
      results.innerHTML = ""
      result.forEach(element => {
        let date = new Date(element.pushed_at)
        let today =  new Date()
        let months = today.getMonth() - date.getMonth() + 
        (12 * (today.getFullYear() - date.getFullYear()))
        const result = document.createElement("div")
        result.className = "result"
        result.onclick = ()=>{window.open(`${element.clone_url}`)}
        result.onmouseover = ()=>{result.classList.toggle("resultHover")}
        result.onmouseout = ()=>{result.classList.toggle("resultHover")}
        result.innerHTML = `
        <h3>${element.name}</h4>
        <p>${element.description}</p>
        <p>${months} months ago</p>
        `
        results.append(result)
      })
    }
  }
  if(userInp[0].value.length == 0){}
  else{
    fetchData()
  }});

// description
// name
// homepage
// pushed_at