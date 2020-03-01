import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderDetailPagePage } from './order-detail-page.page';

describe('OrderDetailPagePage', () => {
  let component: OrderDetailPagePage;
  let fixture: ComponentFixture<OrderDetailPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDetailPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderDetailPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
