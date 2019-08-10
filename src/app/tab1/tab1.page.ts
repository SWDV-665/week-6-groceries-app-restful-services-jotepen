import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { GroceriesServiceProvider} from '../../providers/groceries-service/groceries-service';
import { InputDialogServiceProvider} from '../../providers/input-dialog-service/input-dialog-service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  title = "Grocery";

  items = [];
  errorMessage: string;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertController:AlertController, public dataservice: GroceriesServiceProvider, public inputDialogService: InputDialogServiceProvider, public socialSharing: SocialSharing){ 
    dataservice.dataChanged$.subscribe((dataChanged: boolean) => {
      this.loadItems();
    });
  }

  /** This function removes grocery items from the list */
  
  ionViewDidLoad(){
    this.loadItems();
  }
  
  loadItems(){
    this.dataservice.getItems()
      .subscribe(
        items => this.items = items,
        error => this.errorMessage = <any>error);
  }
  
  removeItem(id)
  {
  console.log("Removing item...", id);
  this.dataservice.removeItem(id);

  
  }

  shareItem(item, index)
  {
  console.log("Sharing item...", item, index);
  const toast = this.toastCtrl.create({
    message: 'Sharing Item - ' +index+ "...",
    duration: 3000
  });
  let message = "Grocery Item - Name:" + item.name + " - Quantity: " + item.quantity;
  let subject = "Shared via Groceries app";

  this.socialSharing.share(message, subject).then(() => {
    // Sharing via email is possible
    console.log("Shared successfully")
  }).catch((error) => {
    // Sharing via email is not possible
    console.log("Error while sharing", error);
  });

  }

  editItem(item, index)
  {
  console.log("Edit item...", item, index);
  const toast = this.toastCtrl.create({
    message: 'Editing Item - ' +index+ "...",
    duration: 3000
  });

  this.inputDialogService.showPrompt(item, index);
  }


 /** This function prompts you to add grocery items to the list */
  addItem()
  {
    console.log("Adding item");
    this.inputDialogService.showPrompt();
  }
 /** This function prompts the user to add the grocery item and quantity */




}



