import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

import { BattleService } from './battle.service';
import { NotificationService } from './notification.service';

describe('BattleService', () => {
  let service: BattleService;
  let notifications: Record<
    'showInfo' | 'showError' | 'showWarning' | 'showSuccess',
    ReturnType<typeof vi.fn>
  >;

  const inventory = () => firstValueFrom(service.currentPlayerInventory);
  const health = () => firstValueFrom(service.currentPlayerHealth);
  const bullets = () => firstValueFrom(service.currentPlayerBulletsNumber);
  const weapon = () => firstValueFrom(service.currentWeapon);

  beforeEach(() => {
    notifications = {
      showInfo: vi.fn(),
      showError: vi.fn(),
      showWarning: vi.fn(),
      showSuccess: vi.fn(),
    };
    TestBed.configureTestingModule({
      providers: [{ provide: NotificationService, useValue: notifications }],
    });
    service = TestBed.inject(BattleService);
  });

  it('stacks picked-up items and removes them with the (delete) marker', async () => {
    service.addItem('Lámpa');
    service.addItem('Lámpa');
    expect(await inventory()).toEqual([
      expect.objectContaining({ name: 'Lámpa', numberOfItems: 2 }),
    ]);

    service.addItem('Lámpa (delete)');
    expect(await inventory()).toEqual([]);
  });

  it('heals by 20 (capped at 100) and consumes one medicine', async () => {
    service.changePlayerInventory([
      { name: 'Gyógyszer', numberOfItems: 2, description: '', effect: '' },
    ]);
    service.changePlayerHealth(70);

    service.inventoryUsing('Gyógyszer');

    expect(await health()).toBe(90);
    expect(await inventory()).toEqual([expect.objectContaining({ numberOfItems: 1 })]);
  });

  it('refuses medicine when already healthy', async () => {
    service.changePlayerInventory([
      { name: 'Gyógyszer', numberOfItems: 1, description: '', effect: '' },
    ]);
    service.changePlayerHealth(85);

    service.inventoryUsing('Gyógyszer');

    expect(await health()).toBe(85);
    expect((await inventory())[0].numberOfItems).toBe(1);
  });

  it('does not heal when no medicine is in the inventory', async () => {
    service.changePlayerInventory([]);
    service.changePlayerHealth(40);

    service.inventoryUsing('Gyógyszer');

    expect(await health()).toBe(40);
    expect(notifications.showError).toHaveBeenCalledWith('Nincs ilyen tárgy!', expect.any(String));
  });

  it('reloads ammunition up to the magazine size', async () => {
    service.changePlayerInventory([
      { name: 'Lőszer', numberOfItems: 1, description: '', effect: '' },
    ]);
    service.changePlayerBulletsNumber(8);

    service.inventoryUsing('Lőszer');

    expect(await bullets()).toBe(15);
    expect(await inventory()).toEqual([]);
  });

  it('equips the AK-47 only when it is actually carried', async () => {
    service.changePlayerInventory([]);
    service.inventoryUsing('AK-47');
    expect(await weapon()).toBe('Beretta 92FS');

    service.changePlayerInventory([
      { name: 'AK-47', numberOfItems: 1, description: '', effect: '' },
    ]);
    service.inventoryUsing('AK-47');
    expect(await weapon()).toBe('AK-47 gépkarabély');
    expect(await bullets()).toBe(30);
  });

  it('rejects items without a use', () => {
    service.inventoryUsing('Kő');
    expect(notifications.showError).toHaveBeenCalledWith(
      'Ezt a tárgyat nem így kell használni!',
      expect.any(String)
    );
  });
});
