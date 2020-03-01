import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductDetailPagePage } from './product-detail-page.page';

describe('ProductDetailPagePage', () => {
  let component: ProductDetailPagePage;
  let fixture: ComponentFixture<ProductDetailPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDetailPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
