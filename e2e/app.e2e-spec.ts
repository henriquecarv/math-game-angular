import { AngulartestPage } from './app.po';

describe('angulartest App', function() {
  let page: AngulartestPage;

  beforeEach(() => {
    page = new AngulartestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
