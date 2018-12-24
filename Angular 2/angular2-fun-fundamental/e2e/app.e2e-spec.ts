import { Angular2FunFundamentalPage } from './app.po';

describe('angular2-fun-fundamental App', function() {
  let page: Angular2FunFundamentalPage;

  beforeEach(() => {
    page = new Angular2FunFundamentalPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
