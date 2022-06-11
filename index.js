const loadData = () => {
  const inputValue = document.getElementById("search-box").value;
  toggleSpinner('block')
  togglePlayerResult('none')
  document.getElementById("search-box").value = '';
  const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${inputValue}
    `;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLoadData(data.player));
};

const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
const togglePlayerResult = displayStyle => {
    document.getElementById('parent-container').style.display = displayStyle;
}

const displayLoadData = (players) => {
  const parent = document.getElementById("parent-container");
  for (const player of players) {
    console.log(player);
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="border mt-5">
                        <img width="200px" src="${player.strThumb}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h1>Name: ${player.strPlayer}</h1>
                            <div class="all-btn">
                                <button class="btn btn-danger">Delete</button>
                                <button onclick="details('${player.idPlayer}')" class="btn btn-success">Details</button>
                            </div>
                        </div>
                    </div>
        `;
    parent.appendChild(div);
  }
  toggleSpinner('none')
  togglePlayerResult('block')
};
const details = (info) => {
    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${info}`
    fetch(url)
    .then(res => res.json())
    .then(data => detailsContainer(data.players[0]))
}

const detailsContainer = (info) => {
    if(info.strGender == 'Male') {
        document.getElementById('male').style.display = 'block';
        document.getElementById('female').style.display = 'none';
    }
    else {
        document.getElementById('male').style.display = 'none';
        document.getElementById('female').style.display = 'block';
    }
    document.getElementById('details-container').innerHTML = `
        <h1>${info.strPlayer}</h1>
        <img width="200px" src="${info.strThumb}" class="card-img-top" alt="...">
    `;
}