const myTable = document.querySelector(".myTable");
const tbody = myTable.tBodies[0];
const firstRow = myTable.rows[0];
const firstRowCells = firstRow.cells;

for (let row of myTable.tBodies[0].rows){
    let sn = row.cells[0].innerText;
    let name = row.cells[1].innerText;
    let roll = row.cells[2].innerText;
    let marks = row.cells[3].innerText;

    console.log(sn, name, roll, marks);
}

let rows = document.querySelectorAll(".myTable tbody tr");

rows.forEach(row => {
    row.addEventListener("click", ()=>{
        row.classList.toggle("selected");
        // row.style.backgroundColor ="#a8d8ea";
    })
})

let newRow = myTable.tBodies[0].insertRow();

newRow.insertCell(0).innerText = "4";
newRow.insertCell(1).innerText = "Sonu Kumar";
newRow.insertCell(2).innerText = "47";
newRow.insertCell(3).innerText = "84";

// myTable.tBodies[0].deleteRow


console.log(myTable.matches(".myTable"));
console.log(myTable.closest("body"));