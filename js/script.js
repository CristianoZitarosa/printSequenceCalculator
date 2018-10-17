const page = document.getElementById('page'); // numero di pagine
const form = document.getElementById('form'); // il box delle pagine
const submit = document.getElementById('submit'); // tasto submit
const reset = document.getElementById('reset'); // tasto reset
const minPage = document.getElementById('minPage'); // pagina iniziale
const maxPage = document.getElementById('maxPage'); // pagina finale

const select = document.getElementById('select'); // checkbox selezione
const parameters = document.getElementById('parameters'); // inizio fine stampa
const result = document.getElementById('result'); // esito calcolo

let papers = 0; //inizializzazione pagine da stampare
let pari = [] , dispari = []; //array pagine risultati

select.onchange = function() {
  if (select.checked) {
    minPage.disabled = false;
    maxPage.disabled = false;
  } else {
    minPage.disabled = true;
    maxPage.disabled = true;
    setValues();
  }
}

page.addEventListener("input", setValues);

function setValues() {
  if (page.value>0) {
    submit.disabled = false;
    select.disabled = false;
    reset.disabled = false;
    minPage.value = 1;
    maxPage.value = page.value;
  } else {
    minPage.value = '';
    maxPage.value = '';
  }
}

reset.onclick = function() {
  location.reload();
}

form.onsubmit = function(e) {
  e.preventDefault();
  select.disabled = true;
  submit.disabled = true;
  minPage.disabled = true;
  maxPage.disabled = true;
  page.disabled = true;

  const totalpages = Number(page.value);
  const minNumber = Number(minPage.value);
  const maxNumber = Number(maxPage.value);
  const pagesNumber = ( Number(maxNumber)-Number(minNumber) )+1;

  for (let i=minNumber; i<=maxNumber; i++) {
  	if (i%2 == 0) {
  		pari.push(i);
  	} else {
  		dispari.push(i);
  	}
  }

  if (pagesNumber%2 === 0) {
  	papers = pagesNumber/2;
  } else {
  	papers = (pagesNumber+1)/2;
  }

  if ( (maxNumber<=totalpages) && (minNumber<maxNumber || minNumber===maxNumber) ) {
    if (pagesNumber > 2) {
      result.innerHTML = `<p>Da stampare: ${dispari.length} dispari, ${pari.length} pari. Prepara ${papers} fogli.</p>
                          <p>Dispari: ${dispari.toString()}</p>
                          <p>Pari: ${pari.toString()}</p>`;
    } else {
    	result.innerHTML = `<p>Occorre 1 solo foglio.</p>`;
    }
  } else {
    result.innerHTML = `<p>Error! Incorrect data insertion. Press <strong>Reset</strong> to repeat the operation.</p>`;
  }
};
