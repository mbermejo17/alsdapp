import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Registro } from '../../models/registro';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  constructor(
    private barcodeScanner: BarcodeScanner
  ) { }

  ngOnInit() {
    console.log('hola');
  }


  scan() {
    this.barcodeScanner.scan().then(barcodeData => {
      const registro = new Registro(barcodeData.format, barcodeData.text);
      // this.presentToast(JSON.stringify(barcodeData));
      console.log('Barcode data', barcodeData);
      console.log('BarCode Type', registro.type);
    }).catch(err => {
      console.log('Error', err);
    });
  }

}
