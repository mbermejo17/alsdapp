

export class Registro {

    public format: string;
    public text: string;
    public type: string;
    public icon: string;
    public created: Date;

    constructor(format: string, text: string) {
        console.log('hola');
        this.format = format;
        this.text = text;

        this.created = new Date();

        this.determinarTipo();

    }

    convertToJSON(text) {
        if (text.indexOf('{') === -1 && text.indexOf('}') === -1) {
            return text;
        }
        let resultText = '';
        resultText = text.replace(/{/g, '{"');
        resultText = resultText.replace(/}/g, '"}');
        resultText = resultText.replace(/:/g, '":"');
        resultText = resultText.replace(/,/g, '","');
        return resultText;
    }


    private determinarTipo() {

        try {
            if (this.text.indexOf('{') !== -1 && this.text.indexOf('}') !== -1) {
                this.text = this.convertToJSON(this.text);
                const data = JSON.parse(this.text);
                console.log('TIPO', data);
                if (data.DataType) {
                    switch (data.DataType) {

                        case 'Location':
                            this.type = 'Location';
                            this.icon = 'ping';
                            break;

                        case 'Article':
                            this.type = 'Article';
                            this.icon = 'globe';
                            break;

                        default:
                            this.type = 'No reconocido';
                            this.icon = 'create';
                    }
                }
            } else {
                this.type = 'Factory';
                this.icon = 'create';
            }
        } catch (err) {
            console.log(err);
        }

    }
}
