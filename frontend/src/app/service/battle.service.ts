import { NotificationService } from 'src/app/service/notification.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Player } from '../model/player';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';
import { PlayerService } from './player.service';

@Injectable({
  providedIn: 'root',
})
export class BattleService {
  private inBattle = new BehaviorSubject<boolean>(false);
  currentBattleState = this.inBattle.asObservable();

  //Monster data

  private monsterName = new BehaviorSubject('Nincs');
  currentMessage = this.monsterName.asObservable();

  private monsterMinDamage = new BehaviorSubject<number>(0);
  currentMinDamage = this.monsterMinDamage.asObservable();

  private monsterMaxDamage = new BehaviorSubject<number>(0);
  currentMaxDamage = this.monsterMaxDamage.asObservable();

  private monsterHealth = new BehaviorSubject<number>(0);
  currentMonsterHealth = this.monsterHealth.asObservable();

  //Player data

  private weaponName = new BehaviorSubject('Beretta 92FS');
  currentWeapon = this.weaponName.asObservable();

  private playerMinDamage = new BehaviorSubject<number>(2);
  currentPlayerMinDamage = this.playerMinDamage.asObservable();

  private playerMaxDamage = new BehaviorSubject<number>(6);
  currentPlayerMaxDamage = this.playerMaxDamage.asObservable();

  private playerHealth = new BehaviorSubject<number>(100);
  currentPlayerHealth = this.playerHealth.asObservable();

  private playerBulletsNumber = new BehaviorSubject<number>(15);
  currentPlayerBulletsNumber = this.playerBulletsNumber.asObservable();

  private playerInventory = new BehaviorSubject<Array<any>>([]);
  currentPlayerInventory = this.playerInventory.asObservable();

  itemName: string = '';

  constructor(private message: NotificationService) {}

  changeMessage(message: string) {
    this.monsterName.next(message);
  }

  changeCurrentBattleState(state: boolean) {
    this.inBattle.next(state);
  }

  changeMonsterMinDamage(value: number) {
    this.monsterMinDamage.next(value);
  }

  changeMonsterMaxDamage(value: number) {
    this.monsterMaxDamage.next(value);
  }

  changeMonsterHealth(value: number) {
    this.monsterHealth.next(value);
  }

  //Player

  changePlayerMinDamage(value: number) {
    this.playerMinDamage.next(value);
  }

  changePlayerMaxDamage(value: number) {
    this.playerMaxDamage.next(value);
  }

  changePlayerHealth(value: number) {
    this.playerHealth.next(value);
  }

  changePlayerWeapon(message: string) {
    this.weaponName.next(message);
  }

  changePlayerBulletsNumber(value: number) {
    this.playerBulletsNumber.next(value);
  }

  changePlayerInventory(data: any) {
    this.playerInventory.next(data);
  }

  //Inventory functions

  addItem(dataObj: string) {
    if (dataObj.includes('(delete)')) {
      const deleteArray = dataObj.split(' ');
      this.deleteItem(deleteArray[0]);
    } else {
      const currentValue = this.playerInventory.value;
      let obj = {
        name: dataObj,
        numberOfItems: 0,
        description: 'Cantus még nem tudja, hogy mire lesz jó a tárgy...',
      };
      if (currentValue.find(item => item.name === dataObj)) {
        let item = currentValue.find(item => item.name === dataObj);
        item.numberOfItems++;
        this.message.showInfo('Cantus felvett egy ' + dataObj + '-t', 'Miserere Mei v.1.0.0');
      } else {
        obj.numberOfItems = 1;
        const updatedValue = [...currentValue, obj];
        this.message.showInfo('Cantus felvett egy ' + dataObj + '-t', 'Miserere Mei v.1.0.0');
        this.playerInventory.next(updatedValue);
      }
    }
  }

  deleteItem(dataObj: string) {
    const currentValue = this.playerInventory.value;
    if (this.playerInventory.value.find(item => item.name === dataObj)) {
      let item = this.playerInventory.value.find(item => item.name === dataObj);
      const index = this.playerInventory.value.indexOf(item);
      if (index > -1) {
        this.playerInventory.value.splice(index, 1);
      }
      const updatedValue = [...currentValue];
      this.message.showInfo('Cantus elveszette: ' + dataObj, 'Miserere Mei v.1.0.0');
      this.playerInventory.next(updatedValue);
    }
  }

  inventoryUsing(itemName: string) {
    this.itemName = itemName;
    switch (itemName) {
      case 'Gyógyszer':
        if (this.playerHealth.value >= 80) {
          this.message.showInfo(
            'Cantus kirobbanó formában van, nincs szüksége gyógyszerre.',
            'Miserere Mei v.1.0.0'
          );
          break;
        } else {
          this.consumeItem(itemName);
          this.changePlayerHealth(this.playerHealth.value + 20);
        }
        break;
      case 'Lőszer':
        if (this.playerBulletsNumber.value >= 15) {
          this.message.showInfo(
            'Cantus fegyvere tele van. Nem szükséges újratölteni.',
            'Miserere Mei v.1.0.0'
          );
          break;
        } else {
          this.consumeItem(itemName);
          this.changePlayerBulletsNumber(this.playerBulletsNumber.value + 10);
          break;
        }
      case 'AK-47':
        if (this.weaponName.value != 'AK-47 gépkarabély') {
          this.changePlayerWeapon('AK-47 gépkarabély');
          this.changePlayerMinDamage(5);
          this.changePlayerMaxDamage(10);
          this.changePlayerBulletsNumber(30);
          this.consumeItem(itemName);
          break;
        } else {
          this.consumeItem(itemName);
          this.changePlayerBulletsNumber(this.playerBulletsNumber.value + 30);
          break;
        }
      default:
        this.message.showError('Ezt a tárgyat nem így kell használni!', 'Miserere Mei v.1.0.0');
    }
  }

  consumeItem(itemName: any) {
    let item = this.playerInventory.value.find(item => item.name === itemName);
    if (item == null) {
      this.message.showError('Nincs ilyen tárgy!', 'Miserere Mei v.1.0.0');
      return;
    }
    if (item.numberOfItems <= 1) {
      const index = this.playerInventory.value.indexOf(item);
      if (index > -1) {
        // this.message.showWarning(item.name + ' elfogyott.', 'Miserere Mei v.1.0.0')
        this.playerInventory.value.splice(index, 1);
      }
    }
    item.numberOfItems -= 1;
    this.playerInventory.next([...this.playerInventory.value]);
    this.message.showInfo(item.name + ' felhasználva.', 'Miserere Mei v.1.0.0');
  }
}
