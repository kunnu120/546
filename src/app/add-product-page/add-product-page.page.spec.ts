import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddProductPagePage } from './add-product-page.page';

describe('AddProductPagePage', () => {
  let component: AddProductPagePage;
  let fixture: ComponentFixture<AddProductPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddProductPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
