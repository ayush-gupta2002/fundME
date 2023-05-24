# number-to-date-month-name
##### Make date and month more beautiful & more understandable for user. 

## install
```sh
npm install number-to-date-month-name --save
````

## Example
```javascript
var ntdmn = require('number-to-date-month-name');
ntdmn.toMonth(12) // December
ntdmn.toMonth(12, 's') // Dec.

ntdmn.toDate(2) // 2nd
```

## Methods
| Name | Descrition | Params 
| ------------- | ------------- | ------------- |
|toMonth(number, string(optional) ) | Month number to month name. Full and short both. | number, string ('s' for short. 'f'(default) for full)|
|toDate(number) | Date Number to date name. Example 1st, 2nd, 3rd etc| number|