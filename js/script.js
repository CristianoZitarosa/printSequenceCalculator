/* jshint esversion: 6 */
(function() {
/* MODEL */
let model = {

  even : [],
  odd : [],
  helpCheck : true,
  error : false

};

/* CONTROLLER */
let controller = {

  init : function() {
    view.init();
  },

  setValues : function() {
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
  },

  fillArray : function() {
    const totalpages = Number(page.value);
    const minNumber = Number(minPage.value);
    const maxNumber = Number(maxPage.value);
    const pagesNumber = ( Number(maxNumber)-Number(minNumber) )+1;

    for (let i=minNumber; i<=maxNumber; i++) {
      if (i%2 == 0) {
        model.even.push(i);
      } else {
        model.odd.push(i);
      }
    }

    this.totalSheets(pagesNumber);
    this.correctInsertion(totalpages, pagesNumber, minNumber, maxNumber);
  },

  totalSheets : function(pagesNumber) {
    if (pagesNumber%2 === 0) {
      sheets = pagesNumber/2;
    } else {
      sheets = (pagesNumber+1)/2;
    }
  },

  reset : function () {
    model.even = [];
    model.odd = [];
    sheets = 0;
    view.reset();
  },

  correctInsertion : function(totalpages, pagesNumber, minNumber, maxNumber) {
    if ( (maxNumber<=totalpages) && (minNumber<maxNumber || minNumber===maxNumber) ) {
      view.sequenceMessage(pagesNumber);
    } else {
      view.errorCheck(totalpages, minNumber, maxNumber);
    }
  }

};

/* VIEW */
  let view = {
    init : function() {
      const page = document.getElementById('page'); // numero di pagine
      const minPage = document.getElementById('minPage'); // pagina iniziale
      const maxPage = document.getElementById('maxPage'); // pagina finale
      const submit = document.getElementById('submit'); // tasto submit
      const reset = document.getElementById('reset'); // tasto reset
      const help = document.getElementById('help'); // tasto reset
      const helptxt = document.getElementById('helpTxt'); // messaggio help
      const result = document.getElementById('result'); // messaggio sequenze
      const select = document.getElementById('select'); // checkbox selezione
      this.set();
    },

    set : function() {
      page.addEventListener('input', controller.setValues);
      help.addEventListener('click', this.helpMessage);
      if (submit.disabled) { form.addEventListener('submit', this.submit); }
      if (select.disabled) { select.addEventListener('change', this.enableInterval); }
      if (reset.disabled) { reset.addEventListener('click', controller.reset); }
    },

    submit : function(e) {
      e.preventDefault();
      select.disabled = true;
      submit.disabled = true;
      minPage.disabled = true;
      maxPage.disabled = true;
      page.disabled = true;

      controller.fillArray();
    },

    enableInterval : function () {
      if (select.checked) {
        minPage.disabled = false;
        maxPage.disabled = false;
      } else {
        minPage.disabled = true;
        maxPage.disabled = true;
        controller.setValues();
      }
    },

    sequenceMessage : function(pagesNumber) {
      if (pagesNumber > 2) {
        result.innerHTML = `<div class="message">
                              <p><strong>To print:</strong></p>
                              <p class="spacer"><strong>${model.odd.length}</strong> odd, <strong>${model.even.length}</strong> even. Needed <strong>${sheets}</strong> sheets.</p>
                              <p><strong>Odd</strong>:</p>
                              <p id ="test" class="sequence spacer">${model.odd.join(', ')}</p>
                              <p><strong>Even</strong>:</p>
                              <p class="sequence spacer">${model.even.join(', ')}</p>
                            </div>`;
      } else {
      result.innerHTML = `<div class="message">
                            <p><strong>To print:</strong></p>
                            <p class="spacer">It is needed 1 sheet only.</p>
                          </div>`;
      }
    },

    errorCheck : function(totalpages, minNumber, maxNumber) {
      if (maxNumber>totalpages) {
        model.error = true;
        result.innerHTML = `<div class="message">
                              <p><strong>Error :</strong></p>
                              <p class="spacer">Last page of interval can't be bigger than document's last page.</p>
                              <p class="spacer">Press <strong>Reset</strong> to repeat the operation.</p>
                            </div>`;
        //maxPage.style.boxShadow = '0 0 2px 1px #f00';
        maxPage.style.background = '#e48f8f';

      } else if (minNumber>maxNumber) {
        model.error = true;
        result.innerHTML = `<div class="message">
                              <p><strong>Error :</strong></p>
                              <p class="spacer">First page can't be bigger than last page.</p>
                              <p class="spacer">Press <strong>Reset</strong> to repeat the operation.</p>
                            </div>`;
        maxPage.style.background = '#e48f8f';
        minPage.style.background = '#e48f8f';
        // maxPage.style.boxShadow = '0 0 2px 1px #f00';
        // minPage.style.boxShadow = '0 0 2px 1px #f00';
      }
    },

    reset : function () {
      page.value = '';
      page.disabled = false;
      select.checked = false;
      if (model.error) {
        model.error = false;
        minPage.style.background = '';
        maxPage.style.background = '';
      }
      controller.setValues();
    },

    helpMessage : function() {
      if (model.helpCheck) {
        model.helpCheck = false;
        help.value = '>> Close <<';
        helpTxt.innerHTML = `<div class="message">
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
                                  <p>3) Once the result is shown, the user can only reset the App for a new sequence.
                                <div>`;
      } else {
        help.value = '>> Help <<';
        model.helpCheck = true;
        helpTxt.innerHTML = '';
      }
    }

  };

controller.init();
})();
