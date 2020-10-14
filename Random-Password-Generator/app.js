const password = document.querySelector("#password"),
      passLength = document.querySelector("#pass-length"),
      numbers = document.querySelector("#numbers"),
      smallCaracters = document.querySelector("#small-caracters"),
      bigCaracters = document.querySelector("#big-caracters"),
      submitBtn = document.querySelector("#btn");

      function* generateSequence(start, end) {
        for (let i = start; i <= end; i++) yield i;
      }

      function* generatePasswordCodes() {
      
        // 0..9
        yield* generateSequence(48, 57);
      
        // A..Z
        yield* generateSequence(65, 90);
      
        // a..z
        yield* generateSequence(97, 122);
      
      }
      
      let array = [],
          i = 0,
          removed;
      
      for(let code of generatePasswordCodes()) {
        array[i] = String.fromCharCode(code);
        i++;
      }

      function shuffle(arr){
        let j, temp;
        for(let i = arr.length - 1; i > 0; i--){
            j = Math.floor(Math.random()*(i + 1));
            temp = arr[j];
            arr[j] = arr[i];
            arr[i] = temp;
        }
        return arr;
    }
    
    submitBtn.onclick = () => {
        let temporary = [...array];
        if (numbers.checked === true) {
         removed = array.splice(0,10);
         temporary.concat(removed);
        }else if (bigCaracters.checked === true) {
          removed = array.splice(10,26);
          temporary.concat(removed);
         }
         if (bigCaracters.checked === true && numbers.checked === true) {
          removed = array.splice(0,26);
          temporary.concat(removed);
         }
         if (smallCaracters.checked === true) {
          removed = array.splice(-26,26);
          temporary.concat(removed);
         }
        shuffle(array); 
        array.length = passLength.value;
        password.value = array.join(""); 
        array = temporary;
    }