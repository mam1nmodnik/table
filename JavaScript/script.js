// Вывод данных из таблице.
$(document).ready(function() {
  return newProduct();
 });

//Функция, с ajax запросом с выводом элементов из бд
function newProduct() {
  $.ajax({
    url: '../vendor/withdrawalOfGoods.php',
    type: 'POST',
    processData: false,
    contentType: false,
    success: function(response) { 
      let orders = document.getElementById('order'), 
      sumBlock = document.getElementById('sumBlock')
      inner = ' ';  
      sum = ' ';
      let priceSumArray = [], 
      quantitySumArray = [];
    for(let kay of response){  
     // <div class="block1" id="text" data-id="${kay.id}"> <div  class="block">${kay.manufacturer} :: ${kay.name} :: ${kay.price} :: ${kay.quantity}</div> </div>
        inner += 
        `
        
        <tr class="elem" data-id="${kay.id}" data-modelWindow="modelWindow"" >
          <td data-label="Производитель">${kay.manufacturer}</td>
          <td data-label="Наименование">${kay.name}</td>
          <td data-label="Цена">${kay.price}</td>
          <td data-label="Количество">${kay.quantity}</td>
        </tr>`;
        priceSumArray.push(+kay.price);
        quantitySumArray.push(+kay.quantity);
      }
      let priceSum = priceSumArray.reduce(function(sum, elem) {
        return sum + elem;
      }, 0);
      let quantitySum = quantitySumArray.reduce(function(sum, elem) {
        return sum + elem;
      }, 0);
      sum = 
        `<button>Сохранить</button>
        <div><p>Цена: ${priceSum}</p></div>
        <div><p>Количество: ${quantitySum}</p></div>`
      
    orders.innerHTML = inner;
    sumBlock.innerHTML = sum;
    },
    error: function(_jqXHR, status, error) {
      console.log(status + ': ' + error);
   }
  });   
 }
 //Добавление новой записи 
 $('button').click(function(e) {
        e.preventDefault();
        var formData = new FormData($('#newProduct')[0]);
        //console.log(formData)
         $.ajax({
           url: '../vendor/newProduct.php',
           type: 'POST',
           data: formData,
           processData: false,
           contentType: false,
           success: function(response) {
           return newProduct() 
           },
           error: function(_jqXHR, status, error) {
             console.log(status + ': ' + error);
          }
         });   
    });


    
class popupWindow {
  constructor(elem) {
    elem.onclick = this.onClick.bind(this); // (*)
  }
  buttonUnDelete() {
    setTimeout(function() {
      let poput = document.getElementById('popup-overlay');
      poput.style.display = "none";
      poput.innerHTML = ``;
    }, 100);
}

buttonDelete(){
    let id = document.getElementById('popup').dataset.id;
    $.ajax({
        url: '../vendor/deleteEntry.php',
        type: 'POST',
        data: { //передоваемые данные
          'id': id,
      },
        processData: false,
        contentType: false,
        success: function(response) {  
          return newProduct()
        },
        error: function(_jqXHR, status, error) {
        //  console.log(status + ': ' + error);
      }
      });   
      setTimeout(function() {
      let poput = document.getElementById('popup-overlay');
      poput.style.display = "none";
      poput.innerHTML = ``;
    }, 100);
  }
  onClick(event) {
    let action = event.target.dataset.action;
    if (action) {
      this[action]();
    }
  }
}


function showBlock(show){
  let tr = event.target.closest('.elem');
  if (!tr) return; // (2)
  if (!table.contains(tr)) return;
  let text = document.querySelectorAll('.block1')
  let array = [...text];
  for(let kay of array){
      if (kay.dataset.id == tr.dataset.id) {
        kay.style.display = show;
    }
  } 
}
table.onmouseover = function(event) {
  let display = "block"
  showBlock(display)
}
table.onmouseout  = function(event) {
  let display = "none"
   showBlock(display)
}


// table.onclick = function(event) {
//       //thead 
//         let t = event.target;
//         if (!t) return; // (2)
//         if (!table.contains(t)) return; // (3)


//         let headTable = table.tHead;
//         let bodyTable = table.tBodies[0];
//         let columnMarks = headTable.children[0].children
//         let rows = bodyTable.children;
//         let position;
//         let trigger = true;
  
//         if (t.parentNode == columnMarks[0].parentNode) {
//           position = [...columnMarks].findIndex(el => el == t);
//           console.log(`Успешно ${position}`)
          
//         }

//         let tr = event.target.closest('.elem');
//         if (!tr && !table.contains(tr)) return; // (2)

//         let poput = document.getElementById('popup-overlay');
//         poput.style.display = "block";
//         poput.innerHTML = `
//           <div id="popup" data-id="${tr.dataset.id}">
//           <p>Вы действительно хотите удалить запись?</p>
//           <div>
//               <button id="buttonDelete" data-action="buttonDelete">ДА!</button>
//               <button id="buttonUnDelete" data-action="buttonUnDelete">НЕТ!</button>
//           </div>
//           </div>`;  
//         new popupWindow(popup);


//   }

  
  function funcTable(table){

    let headTable = table.tHead;
    let bodyTableRows = table.tBodies[0];
    let rows = bodyTableRows.children;
    let trigger = true;

    table.addEventListener('click', function(event) {

      if (event.target.parentNode === headTable.rows[0]) {
       
      const columnIndex = [...headTable.rows[0].cells].indexOf(event.target);

      sort(columnIndex);   
            
        //console.log(`${columnIndex}`);

      } else if (event.target.closest('.elem')){
        
          const columnIndex = [...bodyTableRows.rows].indexOf(event.target.closest('.elem'));

          let poput = document.getElementById('popup-overlay');

          poput.style.display = "block";

          poput.innerHTML = `
            <div id="popup" data-id="${columnIndex}">
            <p>Вы действительно хотите удалить запись?</p>
            <div>
                <button id="buttonDelete" data-action="buttonDelete">ДА!</button>
                <button id="buttonUnDelete" data-action="buttonUnDelete">НЕТ!</button>
            </div>
            </div>`;  

          new popupWindow(popup);
          console.log(`Кликнули в на строку ${columnIndex}`);
          
      } 

});

  function sort(columnIndex){

    if(trigger) {

      trigger = false
      bodyTableRows.replaceChildren(...sortTableAsc(columnIndex));

    } else{

      trigger = true
      bodyTableRows.replaceChildren(...sortTableDesc(columnIndex));

    }
  }

  function sortTableAsc(columnIndex){

    return [...rows].sort((a,b) => a.children[columnIndex].innerText > b.children[columnIndex].innerText ? 1 : -1);
    
  }

  function sortTableDesc(columnIndex){

    return [...rows].sort((a,b) => a.children[columnIndex].innerText < b.children[columnIndex].innerText ? 1 : -1);

  }

}
funcTable(document.querySelector("#table"))





