const stateName = {
    johor: 'Johor',
    kedah: 'Kedah',
    kelantan: 'Kelantan',
    melacca: 'Melacca',
    negerisembilan: 'Negeri Sembilan',
    pahang: 'Pahang',
    penang: 'Penang',
    perak: 'Perak',
    perlis: 'Perlis',
    selangor: 'Selangor',
    terengganu: 'Terengganu',
    sabah: 'Sabah',
    sarawak: 'Sarawak',
    kualalumpur: 'Federal Territory of Kuala Lumpur',
    labuan: 'Federal Territory of Labuan',
    putrajaya: 'Federal Territory of Putrajaya'
}

const getDate = function (identityCode) {
    const currentYear = {
        century: new Date().getFullYear().toString().slice(0, 2),
        year: new Date().getFullYear().toString().slice(-2)
    };
    const year = identityCode.toString().slice(0, 2);

    // if current year (2 digit) if large than year (2 digit), 
    // it means a century or pass, then use current year century
    // else the minus 1 for last century
    let fullYear = `${currentYear.century - 1}${year}`

    if (year < currentYear.year) {
        fullYear = `${currentYear.century}${year}`
    }
    
    const month = identityCode.toString().slice(2, 4);
    const day = identityCode.toString().slice(4, 6);

    if (isValidDate(fullYear, month, day)) {
        return new Date(`${fullYear}-${month}-${day}`);
    }

    return null;
}

/**
 * Get the number of days in any particular month
 * @link https://stackoverflow.com/a/1433119/1293256
 * @param  {integer} m The month (valid: 0-11)
 * @param  {integer} y The year (e.g 2019)
 * @return {integer}   The number of days in the month
 */
const daysInMonth = function (m, y) {
    switch (m) {
        case 1 :
            return (y % 4 == 0 && y % 100) || y % 400 == 0 ? 29 : 28;
        case 8 : case 3 : case 5 : case 10 :
            return 30;
        default :
            return 31
    }
};

/**
 * Check if a date is valid
 * @link https://stackoverflow.com/a/1433119/1293256
 * @param  {[type]}  y The year (e.g 2019)
 * @param  {[type]}  m The month (valid: 0-11)
 * @param  {[type]}  d The day (1-31)
 * @return {Boolean}   Returns true if valid
 */
const isValidDate = function (y, m, d) {
    m = parseInt(m, 10) - 1;
    y = parseInt(y);
    d = parseInt(d);
    return m >= 0 && m < 12 && d > 0 && d <= daysInMonth(m, y);
};

class MyKad {

    constructor(identityCode) {
        this.identityCode = identityCode;
    }
   
    isValid = function () {
        return this.identityCode.toString().length === 12 && 
            Boolean(getDate(this.identityCode)) && 
            Boolean(this.getBirthPlace());
    };

    getBirthDate = function () {
        return getDate(this.identityCode);
    };

    getBirthPlace = function () {
        const code = this.identityCode.toString().slice(6, 8);
        const state = {
            code: code,
            name: ''
        };

        switch (code) {
            case '01': case '21': case '22': case '23': case '24':
                state.name = stateName.johor;
                break;
            case '02': case '25': case '26': case '27':
                state.name = stateName.kedah;
                break;
            case '03': case '28': case '29':
                state.name = stateName.kelantan;
                break;
            case '04': case '30':
                state.name = stateName.melacca;
                break;
            case '05': case '31': case '59':
                state.name = stateName.negerisembilan;
                break;
            case '06': case '32': case '33':
                state.name = stateName.pahang;
                break;
            case '07': case '34': case '35':
                state.name = stateName.penang;
                break;
            case '08': case '36': case '37': case '38': case '39':
                state.name = stateName.perak;
                break;
            case '09': case '40':
                state.name = stateName.perlis;
                break;
            case '10': case '41': case '42': case '43': case '44':
                state.name = stateName.selangor;
                break;
            case '11': case '45': case '46':
                state.name = stateName.terengganu;
                break;
            case '12': case '47': case '48': case '49':
                state.name = stateName.sabah;
                break;
            case '13': case '50': case '51': case '52': case '53':
                state.name = stateName.sarawak;
                break;
            case '14': case '54': case '55': case '56': case '57':
                state.name = stateName.kualalumpur;
                break;
            case '15': case '58':
                state.name = stateName.labuan
                break;
            case '16':
                state.name = stateName.putrajaya
                break;
            default:
                return null;
        }
        return state;
    };

    getGender = function () {
        const code = this.identityCode.toString().slice(-1);
        let gender = 'Male';

        // is even number which is female
        if (code % 2 === 0 || code === 0) {
            gender = 'Female';
        }

        return {
            code: Number(code),
            name: gender
        }
    }

    getMeta = function () {
        return {
            identityCode: this.identityCode,
            birthDate: getDate(this.identityCode),
            birthPlace: this.getBirthPlace() ? this.getBirthPlace().name : null,
            gender: this.getGender().name
        }
    }
}

export default MyKad;
