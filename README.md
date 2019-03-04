# mykad
Library to validate, retrive meta info Malaysia Identity Card (MyKad)

## Installation
```javascript
npm install malaysia-mykad
```

## Usage
```javascript
import mykad from 'malaysia-mykad'

const mykad = new mykad(891225085673)
```

## Methods

### isValid()
```javascript
console.log(mykad.isValid())
// true
```

### getBirthDate()
```javascript
console.log(mykad.getBirthDate())
// 1989-12-25T00:00:00.000Z
```

### getBirthPlace()
```javascript
console.log(mykad.getBirthPlace())
// { code: 08, name: 'Perak' }
```

### getGender()
```javascript
console.log(mykad.getGender())
// 'Male'
```

### getMeta()
```javascript
console.log(mykad.getMeta())
// { identityCode: 891225085673, birthDate: 1989-12-25T00:00:00.000Z, birthPlace: 'Perak', gender: 'Male' }
```