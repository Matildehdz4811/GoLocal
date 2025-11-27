import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController, ActionSheetController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../services/data.service';
import { ListModalComponent } from '../components/list-modal/list-modal.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ListModalComponent] 
})
export class Tab1Page implements OnInit {
  
  texts: any = {};
  darkMode = false; 
  
  // --- AQUÍ ESTÁN LAS VARIABLES QUE FALTABAN (Esto soluciona el error rojo) ---
  logoPrincipal = 'assets/logo.jpeg';
  botonDia      = 'assets/logo-dia.jpg'; 
  botonNoche    = 'assets/logo-noche.jpg'; // Ojo: .jpg sin "e", según tus fotos
  // ---------------------------------------------------------------------------

  // Lista de categorías
  catList: any[] = [
    { key: 'taquerias', icon: '🌮', style: 'c-food' },
    { key: 'restaurantes', icon: '🍴', style: 'c-eat' },
    { key: 'cabanas', icon: '🏡', style: 'c-stay' },
    { key: 'loncherias', icon: '🍽️', style: 'c-eat' },
    { key: 'hoteles', icon: '🏨', style: 'c-stay' },
    { key: 'cascadas', icon: '🏞', style: 'c-nature' },
    { key: 'presas', icon: '💧', style: 'c-water' },
    { key: 'turismo', icon: '🌟', style: 'c-fun' },
    { key: 'albercas', icon: '🏊', style: 'c-water' },
    { key: 'dulces', icon: '🍬', style: 'c-sweet' },
    { key: 'plaza', icon: '🏛', style: 'c-place' },
    { key: 'mercados', icon: '🛍', style: 'c-market' },
    { key: 'panaderias', icon: '🍞', style: 'c-eat' },
    { key: 'museo', icon: '🏛️', style: 'c-museum' },
    { key: 'historia', icon: '📜', style: 'c-place' }
  ];

  constructor(
    private dataService: DataService, 
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController
  ) {}

  ngOnInit() {
    this.loadData();
    this.dataService.currentLang$.subscribe(() => this.loadData());
  }

  loadData() {
    this.texts = this.dataService.getTexts();
  }

  async openModal(key: string) {
    const list = this.dataService.getCategoryList(key);
    const modal = await this.modalCtrl.create({
      component: ListModalComponent,
      componentProps: { categoryTitle: key.toUpperCase(), items: list }
    });
    await modal.present();
  }

  async showLanguageMenu() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Selecciona un idioma',
      buttons: [
        { text: 'Español 🇲🇽', handler: () => { this.dataService.setLanguage('es'); } },
        { text: 'English 🇺🇸', handler: () => { this.dataService.setLanguage('en'); } },
        { text: 'Cancelar', role: 'cancel' }
      ]
    });
    await actionSheet.present();
  }

  toggleDark() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark', this.darkMode);
  }
}