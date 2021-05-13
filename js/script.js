
function GhanaianName(){
    let _name;
    let _week_day ;
    let _sex;
    let _kinships;
    return {
        getName,
        findDay,
        getDay,
        getSex,
        getKinship,
        loadKinship,
        goToDaySection,
        goToDayRevealSection,
        reveal
    }


    function goToDaySection(event){
        event.preventDefault();

        _name = getName();
        _sex = getSex();
        if (_name != undefined && _sex != undefined){
            window.location = window.location.pathname + '#day_section';
        }
    }


    function getName(){
        // event.preventDefault();
        return document.querySelector('[name=first_name]').value;

    }

    function getSex(){
        // event.preventDefault();
        return document.querySelector('[name=sex]:checked').value;
    }

    function findDay(){
       

        
        const day = document.querySelector('[name=day]').value;
        const month = document.querySelector('[name=month]').value;
        const year = document.querySelector('[name=year]').value;
        
        if (day == undefined || month == undefined || year == undefined){
            alert('enter a valid date');
            return;
        }

        _week_day = new Date(`${year}-${month}-${day}`).getDay();
        debugger
        return (_week_day +1) % 6; // _week_day is coming back as correct - 1, so adjustment is needed, text again in the future using current day
    }

    function getDay(){
        return document.querySelector('[name=day_radio]:checked').value;
    }

    function getKinship(_week_day,_sex){
        
        debugger
        const day_key = Object.keys(_kinships)[_week_day];
        return _kinships[day_key][_sex];
        
    }

    function goToDayRevealSection(event,day_known){
        event.preventDefault();
        // debugger
        // const day_known = document.querySelector('[name=day_known]').value;

        if (!day_known)
            _day = findDay();
        else 
            _day = getDay();

        _kinship = getKinship(_day,_sex);

        reveal(_kinship);
        
    }
    async function loadKinship(){
        let temp = await fetch('js/info.js').then(res => res.json())
        _kinships = temp[0]
        console.table(_kinships);
    }
    

    function reveal(kinship){
        document.querySelector('span.first_name').innerHTML = _name;
        document.querySelector('span.day_name').innerHTML = kinship.names[0];
        window.location = window.location.pathname + "#day_reveal";
    }
}

let gn = new GhanaianName();
gn.loadKinship();

function selectDayRadio(event){
    //event.preventDefault();

    //uncheck all radios 
    document.querySelectorAll('[name=day_radio').forEach(function(day_rad){
        if (day_rad == event.target)
            day_rad.setAttribute('aria-checked',true);
        else
            day_rad.setAttribute('aria-checked',false);
            
        
    });

    // event.target.setAttribute('aria-checked',true);
    // event.target.setAttribute('checked',true);
}