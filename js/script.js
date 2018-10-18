const page = document.getElementById('page'); // numero di pagine
const form = document.getElementById('form'); // il box delle pagine
const submit = document.getElementById('submit'); // tasto submit
const reset = document.getElementById('reset'); // tasto reset
const help = document.getElementById('help'); // tasto reset
const minPage = document.getElementById('minPage'); // pagina iniziale
const maxPage = document.getElementById('maxPage'); // pagina finale

const select = document.getElementById('select'); // checkbox selezione
const parameters = document.getElementById('parameters'); // inizio fine stampa
const result = document.getElementById('result'); // esito calcolo

let papers = 0; //inizializzazione pagine da stampare
let even = [] , odd = []; //array pagine risultati

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
    submit.disabled = true;
    select.disabled = true;
    reset.disabled = true;
    minPage.value = '';
    maxPage.value = '';
  }
}

reset.onclick = function() {
  location.reload();
}

let helpCheck = true;
help.onclick = function() {
  if (helpCheck) {
    helpCheck = false;
    help.value = '>> Close <<';
    helpMessage.innerHTML = `<div class="message">
                              <p>This app, is designed to help the user who needs to print a document on both sides of one sheets or more,
                              but he does not own an automatic duplex printer and or the software managing the document is not capable to separately print even/odd pages.</p>

                              <p>Whithout this app the user needs to manually insert a sequence of even/odd pages in the print window. This, for larger documents
                              could really be a trouble, causing mistakes and waste of time and paper if the sequence is wrong.</p>

                              <p>With this app the user needs to just provide the document's number of pages, or an interval of pages (whithin that number).
                              The app automatically provides both the even and odd sequences, ready for a copy and paste and the number of sheets needed for the operation.</p>
                              <p><strong>Example</strong></p>
                              <p>Let say we have a document, 50 pages long.</p>
                              <p>If we have to print all the pages, we just insert 50 in the box "Number of pages" and click "Submit" to receive the result.</p>
                              <p>If we have to print an interval, let say from page 14 to page 37, we insert 50 in the box as said before, then we select the checkbox "Select an interval". The 2 box "First page" and "Last page" will be active now, so we can insert 14 as first page and 37 as last. Lastly we have to click "Submit" to receive the result.</p>
                              <p><strong>Note:</strong></p>
                              <p>1) As soon the app is loaded, only the box to insert the number of pages and the help button are available. Other elements are disabled.</p>
                              <p>2) After a first positive number is provided in the box, other elements will be available. The user will be able to submit the number, to select the checkbox to provide an interval or just reset the app.</p>
                            <div>`;
  } else {
    help.value = '>> Help <<';
    helpCheck = true;
    helpMessage.innerHTML = '';
  }
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
      even.push(i);
    } else {
      odd.push(i);
    }
  }

  if (pagesNumber%2 === 0) {
    papers = pagesNumber/2;
  } else {
    papers = (pagesNumber+1)/2;
  }

  if ( (maxNumber<=totalpages) && (minNumber<maxNumber || minNumber===maxNumber) ) {
    if (pagesNumber > 2) {
      result.innerHTML = `<div class="message">
                            <p><strong>To print:</strong></p>
                            <p class="spacer"><strong>${odd.length}</strong> odd, <strong>${even.length}</strong> even. Needed <strong>${papers}</strong> sheets.</p>
                            <p><strong>Odd</strong>:</p>
                            <p class="sequence spacer">${odd.join(', ')}</p>
                            <p><strong>Even</strong>:</p>
                            <p class="sequence spacer">${even.join(', ')}</p>
                          </div>`;
    } else {
      result.innerHTML = `<div class="message">
                            <p><strong>To print:</strong></p>
                            <p class="spacer">It is needed 1 sheet only.</p>
                          </div>`;
    }
  } else {
    result.innerHTML = `<div class="message">
                          <p><strong>Error :</strong></p>
                          <p class="spacer">Wrong data insertion. Press <strong>Reset</strong> to repeat the operation.</p>
                        </div>`;
    // maxPage.style.color = 'red';
    maxPage.style.boxShadow = '0 0 2px 1px #f00';
    // minPage.style.color = 'red';
    minPage.style.boxShadow = '0 0 2px 1px #f00';
  }
};
