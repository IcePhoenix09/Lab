const sizes = {
    'ISO 216': {
        'size': {
            'A0': [841, 1189],
            'A1': [594, 841],
            'A2': [420, 594],
            'A3': [297, 420],
            'A4': [210, 297],
            'A5': [148, 210],
        },
        'unit': 'mm'
    },
    'US/Canada': {
        'size': {
            'Letter': [8.5, 11],
            'Legal': [8.5, 14],
            'Tabloid': [11, 17]
        },
        'unit': 'inch'
    }
};

function toInches(sizeList){
    let newSizeList = JSON.parse(JSON.stringify(sizeList));
    Object.keys(newSizeList).forEach(function(key, index) {
        newSizeList[key][0] = Number((newSizeList[key][0] / 25.4).toFixed(1));
        newSizeList[key][1] = Number((newSizeList[key][1] / 25.4).toFixed(1));
      });

    return newSizeList;
}

class PaperSizeStandard {
    constructor(locale) {
        this.locale = locale;
        if (this.locale === 'en-US' || this.locale === 'en-CA') {
            this.sizes = sizes["US/Canada"]["size"];
            this.unit = sizes["US/Canada"]["unit"];
        } else {
            this.sizes = sizes["ISO 216"]["size"];

            if (this.locale === 'en-LR' || this.locale === 'my-MM'){
                this.sizes = toInches(this.sizes);
                this.unit = sizes["US/Canada"]["unit"];
            } else {
                this.unit = sizes["ISO 216"]["unit"];
            }
        }
    }
}

let paperSt = new PaperSizeStandard('my-MM');
console.log(paperSt.sizes);

paperSt = new PaperSizeStandard('en-CA');
console.log(paperSt.sizes);

paperSt = new PaperSizeStandard('en-UK');
console.log(paperSt.sizes);
