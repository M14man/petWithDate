const timer = (id) => {
    const errorText = document.querySelector('.error__text'),
        toSmall = errorText.querySelector('.to__small'),
        toBig = errorText.querySelector('.to__big'),
        incorrect = errorText.querySelector('.incorrect');

    let timeInterval = null;
    // let deadLine = '2022-04-30';
    console.log(new Date().getFullYear() + 1)
    const children = [].slice.call(errorText.children);
    console.log(errorText.children)
    let deadLine = Date.parse(new Date()) + 100000000;
    console.log('We are starting');
    function getTimeRemaining(endtime) {

        // let t = Date.parse(endtime) - Date.parse(new Date()),
            let t = endtime - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor(t / (1000 * 60 * 60) % 24),
            minutes = Math.floor(t / (1000 * 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            days,
            hours,
            minutes,
            seconds
        };

    }

    function addZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        if (timeInterval) {
        clearInterval(timeInterval);
        }
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds');
        
        timeInterval = setInterval(updateClock, 1000);   
        
        updateClock();

        function updateClock() {
            let t = getTimeRemaining(endtime);

            days.innerHTML = addZero(t.days);
            hours.innerHTML = addZero(t.hours);
            minutes.innerHTML = addZero(t.minutes);
            seconds.innerHTML = addZero(t.seconds);
            
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }

            let input = document.querySelector('[name="text"]');

            input.addEventListener('input', () => {
                
                if (input.value.length == 5) {
                    if (Date.parse(`${new Date().getFullYear()}-${input.value}`) < Date.parse(new Date())) {
                        // input.style.borderColor = 'red';
                        // children.forEach(item => {
                        //     item.style.display = 'none'; 
                        // });
                        // toSmall.style.display = 'inline';
                        // console.log('Замале число');
                        // input.value = '';
                        input.style.borderColor = '';
                        clearInterval(timeInterval);
                        // deadLine = input.value;
                        deadLine = Date.parse(`${(new Date().getFullYear() + 1)}-${input.value}`);
                        setClock(id, deadLine);
                        console.log(Date.parse(input.value));
                        input.value = '';
                        children.forEach(item => {
                            item.style.display = 'none'; 
                        });
                    }else
                    // else if (Date.parse(`2022-${input.value}`) - Date.parse(new Date()) > 63102225000) {
                    //     input.style.borderColor = 'red';
                    //     console.log('Завелике число');
                    //     children.forEach(item => {
                    //         item.style.display = 'none'; 
                    //     });
                    //     toBig.style.display = 'inline';
                    //     input.value = '';
                    // } else
                        if (isNaN(Date.parse(input.value))) {
                        input.style.borderColor = 'red';
                        console.log('Неправильне число');
                        children.forEach(item => {
                            item.style.display = 'none'; 
                        });
                        incorrect.style.display = 'inline';
                        input.value = '';
                    }else {
                        input.style.borderColor = '';
                        clearInterval(timeInterval);
                        // deadLine = input.value;
                        deadLine = Date.parse(`${new Date().getFullYear()}-${input.value}`)
                        setClock(id, deadLine);
                        console.log(Date.parse(input.value));
                        input.value = '';
                        children.forEach(item => {
                            item.style.display = 'none'; 
                        });
                    }
                    
                        
                }
            });

        }

    }

    setClock(id, deadLine);

    let setCursorPosition = (pos, elem)=>{
        elem.focus();

        if (elem.setSelectionRange){
            elem.setSelectionRange(pos, pos);
        } else if (elem.createTextRange) {
            let range = elem.createTextRange();

            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    };


    function createMask(event) {
        let matrix = '__-__',
            i = 0,
            def = matrix.replace(/\D/g, ''),
            val = this.value.replace(/\D/g, '');

        if (def.length >= val.length){
            val = def;
        }

        this.value = matrix.replace(/./g, function(a){ // a технічний символ і він дорівнюватиме кожному символу який находиться в матриці
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
        });

        if (event.type === 'blur') {
            // if (this.value.length == 3){
            //     this.value = '';
            // }
        } else {
            setCursorPosition(this.value.length, this);
        }
        // console.log(this);
    }

    let inputs = document.querySelectorAll('[name="text"]');

    inputs.forEach(input => {
        input.addEventListener('input', createMask);
        input.addEventListener('focus', createMask);
        input.addEventListener('blur', createMask);
        

    });


};

export default timer;