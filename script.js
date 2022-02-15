var qtdAlunos = 1
var qtdNotas = 4
var mediageral = 0

function verificaMedias() {
    let aluno_grafico = []
    let media_grafico = []
    let aprovado = 0
    let reprovado = 0
    let recuperacao = 0
    mediageral = 0
    for (let y = 1; y <= qtdAlunos; y = y + 1) {

        let media = 0
        let resultado = 0
        aluno_grafico.push(document.getElementById(`nome${y}`).value)
        for (let x = 1; x <= qtdNotas; x++) {
            let nota = parseFloat(document.getElementById(`nota${y}${x}`).value)
            resultado = nota + resultado
        }

        media = resultado / qtdNotas
        mediageral = media + mediageral
        document.getElementById(`media${y}`).innerText = media
        media_grafico.push(media)

        if (media >= 50) {
            document.getElementById(`situacao${y}`).innerText = "Aprovado"
            document.getElementById(`situacao${y}`).style.color = "Green"
            aprovado += 1
        }
        else if (media >= 40 && media < 50) {
            document.getElementById(`situacao${y}`).innerText = "Recuperação"
            document.getElementById(`situacao${y}`).style.color = "Orange"
            recuperacao += 1
        }
        else if (media < 40) {
            document.getElementById(`situacao${y}`).innerText = "Reprovado"
            document.getElementById(`situacao${y}`).style.color = "Red"
            reprovado += 1
        }
        document.getElementById("mediageral1").innerText = mediageral / qtdAlunos
    }
    grafico("grafico2", ["Aprovado", "Recuperação", "Reprovado"], [aprovado, recuperacao, reprovado])
}

function criarLinha() {
    if (qtdAlunos <= 10) {
        window.qtdAlunos += 1

        let row
        let row_data
        let row_data_input
        let row_data_output

        row = document.createElement('tr');
        row_data = document.createElement('TD');
        row.setAttribute("id", `linha${qtdAlunos}`);
        row_data_input = document.createElement('input');
        row_data_input.classList.add("form-control");
        row_data_input.setAttribute("id", `nome${qtdAlunos}`);
        row_data_input.type = "text"
        row_data.appendChild(row_data_input);
        row.appendChild(row_data);

        for (let x = 1; x <= qtdNotas; x++) {
            row_data = document.createElement('TD');
            row_data.setAttribute("id", `coluna${qtdAlunos}${x}`);
            row_data_input = document.createElement('input');
            row_data_input.classList.add("form-control");
            row_data_input.setAttribute("id", `nota${qtdAlunos}${x}`);
            row_data_input.type = "number"
            row_data_input.min = 0
            row_data_input.max = 100
            row_data_input.value = "0"
            row_data.appendChild(row_data_input);
            row.appendChild(row_data);
        }

        row_data = document.createElement('TD');
        row_data.setAttribute("id", `coluna_media${qtdAlunos}`);
        row_data_output = document.createElement('output');
        row_data_output.setAttribute("id", `media${qtdAlunos}`);
        row_data.appendChild(row_data_output);
        row.appendChild(row_data);

        row_data = document.createElement('TD');
        row_data_output = document.createElement('output');
        row_data_output.setAttribute("id", `situacao${qtdAlunos}`);
        row_data.appendChild(row_data_output);
        row.appendChild(row_data);

        document.getElementById('tableBody').appendChild(row);
    }
}

function deletarLinha() {
    if (qtdAlunos > 1) {
        let child = document.getElementById(`linha${qtdAlunos}`)
        document.getElementById('tableBody').removeChild(child);
        qtdAlunos -= 1
    }
}

function criarColuna() {
    if (qtdNotas < 6) {
        qtdNotas += 1

        let column
        let column_media
        let row
        let row_data
        let row_data_input

        column = document.createElement('th');
        column.setAttribute("id", `coluna0${qtdNotas}`);
        column.innerHTML = `Nota ${qtdNotas}`;

        column_media = document.getElementById('coluna_media0');
        document.getElementById('linha0').insertBefore(column, column_media)

        for (let x = 1; x <= qtdAlunos; x++) {
            row_data = document.createElement('TD');
            row_data.setAttribute("id", `coluna${x}${qtdNotas}`);
            row_data_input = document.createElement('input');
            row_data_input.classList.add("form-control");
            row_data_input.setAttribute("id", `nota${x}${qtdNotas}`);
            row_data_input.type = "number"
            row_data_input.min = 0
            row_data_input.max = 100
            row_data_input.value = "0"
            row_data.appendChild(row_data_input);
            media = document.getElementById(`coluna_media${x}`);
            console.log(media)
            console.log(row_data)
            document.getElementById(`linha${x}`).insertBefore(row_data, media)
        }

    }
}

function deletarColuna() {
    if (qtdNotas > 1) {

        for (let x = 0; x <= qtdAlunos; x++) {
            let child = document.getElementById(`coluna${x}${qtdNotas}`)
            console.log(child)
            document.getElementById(`linha${x}`).removeChild(child);

        }

        qtdNotas -= 1
    }
}

// function sortTable(n) {
//     var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
//     table = document.getElementById("myTable2");
//     switching = true;
//     // Set the sorting direction to ascending:
//     dir = "asc";
//     /* Make a loop that will continue until
//     no switching has been done: */
//     while (switching) {
//         // Start by saying: no switching is done:
//         switching = false;
//         rows = table.rows;
//         /* Loop through all table rows (except the
//         first, which contains table headers): */
//         for (i = 1; i < (rows.length - 1); i++) {
//             // Start by saying there should be no switching:
//             shouldSwitch = false;
//             /* Get the two elements you want to compare,
//             one from current row and one from the next: */
//             x = rows[i].getElementsByTagName("TD")[n];
//             y = rows[i + 1].getElementsByTagName("TD")[n];
//             /* Check if the two rows should switch place,
//             based on the direction, asc or desc: */
//             if (dir == "asc") {
//                 if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
//                     // If so, mark as a switch and break the loop:
//                     shouldSwitch = true;
//                     break;
//                 }
//             } else if (dir == "desc") {
//                 if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
//                     // If so, mark as a switch and break the loop:
//                     shouldSwitch = true;
//                     break;
//                 }
//             }
//         }
//         if (shouldSwitch) {
//             /* If a switch has been marked, make the switch
//             and mark that a switch has been done: */
//             rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
//             switching = true;
//             // Each time a switch is done, increase this count by 1:
//             switchcount++;
//         } else {
//             /* If no switching has been done AND the direction is "asc",
//             set the direction to "desc" and run the while loop again. */
//             if (switchcount == 0 && dir == "asc") {
//                 dir = "desc";
//                 switching = true;
//             }
//         }
//     }
// }


function grafico(id, x, y) {
    var barColors
    if (id == "grafico2") {
        barColors = [
            "green",
            "orange",
            "red",
        ];
    } else {
        barColors = [
            "#b91d47",
            "#00aba9",
            "#2b5797",
            "#e8c3b9",
            "#1e7145",
            "green",
            "orange",
            "red",
            "blue",
            "pink"
        ];
    }
    new Chart(id, {
        type: "pie", //doughnut line pie bar
        data: {
            labels: x,
            datasets: [
                {
                    label: 'Dataset 1',
                    data: y,
                    backgroundColor: barColors,
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Chart.js Pie Chart'
                }
            }
        },
    });
}

// function sortTable(n) {
//     var table;
//     table = document.getElementById("tableBody");
//     var rows,
//         i,
//         x,
//         y,
//         count = 0;

//     var switching = true;

//     var direction = "ascending";

//     while (switching) {
//         switching = false;

//         var rows = table.rows;

//         for (i = 0; i < rows.length - 1; i++) {
//             var Switch = false;

//             x = rows[i].getElementsByTagName("TD")[n];

//             y = rows[i + 1].getElementsByTagName("TD")[n];

//             console.log(x.childNodes[0].value.toLowerCase());

//             console.log(y.childNodes[0].value.toLowerCase());

//             if (
//                 x.childNodes[0].value.toLowerCase() >
//                 y.childNodes[0].value.toLowerCase()
//             ) {
//                 Switch = true;
//                 break;
//             }
//         }
//         if (Switch) {
//             rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
//             switching = true;
//             count++;
//         }
//     }
//     console.log(count);
// }

function ordem(ordem) {
    let dados_aluno = []
    if (qtdAlunos > 1) {
        for (let x = 1; x <= qtdAlunos; x++) {
            let aluno_notas = []
            for (let y = 1; y <= qtdNotas; y++) {
                aluno_notas.push(parseFloat(document.getElementById(`nota${x}${y}`).value))
            }
            let dados = {
                nome: document.getElementById(`nome${x}`).value,
                notas: aluno_notas,
                media: parseFloat(document.getElementById(`media${x}`).value),
                situacao: document.getElementById(`situacao${x}`).innerText
            };
            dados_aluno.push(dados)
        }
        let num = 0
        let ordemA = ''
        let ordemB = ''
        dados_aluno.sort(function (a, b) {
            if (ordem == 'crescente') {
                ordemA = a.media
                ordemB = b.media
                num = 0
            }
            else if (ordem == 'decrescente') {
                ordemA = a.media
                ordemB = b.media
                num = 2
            }
            else if (ordem == 'alfabetica') {
                ordemA = a.nome
                ordemB = b.nome
                num = 0
            }

            if (ordemA > ordemB) {
                return 1 - num;
            }
            if (ordemA < ordemB) {
                return -1 + num;
            }
            return 0;
        })
        for (let x = 1; x <= dados_aluno.length; x++) {
            document.getElementById(`nome${x}`).value = dados_aluno[x - 1]['nome']
            for (let n = 1; n <= dados_aluno[x - 1]['notas'].length; n++) {
                document.getElementById(`nota${x}${n}`).value = dados_aluno[x - 1]['notas'][n - 1]
            }
            let cor = ''
            if (dados_aluno[x - 1]['situacao'] == 'Aprovado') {
                cor = 'green'
            }
            else if (dados_aluno[x - 1]['situacao'] == 'Recuperação') {
                cor = 'orange'
            }
            else if (dados_aluno[x - 1]['situacao'] == 'Reprovado') {
                cor = 'red'
            }
            document.getElementById(`media${x}`).innerText = dados_aluno[x - 1]['media']
            document.getElementById(`situacao${x}`).innerText = dados_aluno[x - 1]['situacao']
            document.getElementById(`situacao${x}`).style.color = cor
        }
    }
}