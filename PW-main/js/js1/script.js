

let a = 1
let b = 1
let c = a * b

document.write(`<div>`)
for (let a = 1; a <= 10; a++) {
    
    document.write(`<table border = 1 >
    <tr>
      <th colspan=3>Produto de ${a}</th>
    </tr>`)
    for (let index = 0; index < 10; index++) {
        document.write(`
        <tr>
          <td>${a} x ${b}</td>
          <td>${c}</td>
        </tr>

        `);

        b = b + 1;
        c = a * b;
    }
    b=1;
    c = a * b;
    document.write(`</table>`)
}
document.write(`</div>`)