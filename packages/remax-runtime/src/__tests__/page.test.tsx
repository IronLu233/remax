import * as React from 'react';
import './helpers/setupGlobals';
import createPageConfig from '../createPageConfig';
import { usePageEvent } from '../../src';
import { PageProps } from '../createPageWrapper';
import View from './helpers/View';
import Page from './helpers/Page';

jest.mock('../stopPullDownRefresh', () => () => void 0);

const TEST_PAGE = 'pages/test/index';

describe('page', () => {
  it('create page config', () => {
    const Foo = () => {
      return <View>foo</View>;
    };
    const page = Page(createPageConfig(Foo, TEST_PAGE));
    page.load();
    expect(page.config.wrapper).not.toBeNull();
  });

  describe('hooks', () => {
    it('works', () => {
      const log: string[] = [];
      const Foo: React.FC<PageProps> = () => {
        usePageEvent('onReady', () => {
          log.push('useReady');
        });
        usePageEvent('onShow', () => {
          log.push('useShow');
        });

        usePageEvent('onHide', () => {
          log.push('useHide');
        });

        usePageEvent('onPullDownRefresh', () => {
          log.push('usePullDownRefresh');
        });

        usePageEvent('onReachBottom', () => {
          log.push('useReachBottom');
        });

        usePageEvent('onPageScroll', () => {
          log.push('usePageScroll');
        });

        usePageEvent('onShareAppMessage', object => {
          log.push(object.from);
          log.push('useShareAppMessage');

          return {};
        });

        usePageEvent('onTitleClick', () => {
          log.push('useTitleClick');
        });

        usePageEvent('onOptionMenuClick', () => {
          log.push('useOptionMenuClick');
        });

        usePageEvent('onPopMenuClick', () => {
          log.push('usePopMenuClick');
        });

        usePageEvent('onPullIntercept', () => {
          log.push('usePullIntercept');
        });

        usePageEvent('onBack', () => {
          log.push('useEventOnBack');
        });

        usePageEvent('onKeyboardHeight', () => {
          log.push('useEventOnKeyboardHeight');
        });

        usePageEvent('onTabItemTap', () => {
          log.push('useEventOnTabItemTap');
        });

        usePageEvent('beforeTabItemTap', () => {
          log.push('useEventBeforeTabItemTap');
        });

        usePageEvent('onResize', () => {
          log.push('useEventOnResize');
        });

        usePageEvent('onShow', () => {
          log.push('useEventOnShow');
        });

        return <View>foo</View>;
      };
      const page = Page(createPageConfig(Foo, TEST_PAGE));
      page.load();
      page.ready();
      page.pullDownRefresh();
      page.pullIntercept();
      page.reachBottom();
      page.pageScroll();
      page.shareAppMessage();
      page.titleClick();
      page.optionMenuClick();
      page.popMenuClick();
      page.back();
      page.keyboardHeight();
      page.tabItemTap();
      page.beforeTabItemTap();
      page.resize();
      page.hide();

      expect(log).toEqual([
        'useShow',
        'useEventOnShow',
        'useReady',
        'usePullDownRefresh',
        'usePullIntercept',
        'useReachBottom',
        'usePageScroll',
        'menu',
        'useShareAppMessage',
        'useTitleClick',
        'useOptionMenuClick',
        'usePopMenuClick',
        'useEventOnBack',
        'useEventOnKeyboardHeight',
        'useEventOnTabItemTap',
        // 测试了微信和阿里两个hook，所以有两个
        'useEventOnTabItemTap',
        'useEventBeforeTabItemTap',
        'useEventOnResize',
        // 测试了微信和阿里两个hook，所以有两个
        'useEventOnResize',
        'useHide',
      ]);
    });

    it('works in component', () => {
      const log: string[] = [];
      const Foo = () => {
        usePageEvent('onShow', () => {
          log.push('onShow');
        });
        return <View>foo</View>;
      };
      const Bar = () => <Foo />;
      const page = Page(createPageConfig(Bar, TEST_PAGE));
      page.load();
      expect(log).toEqual(['onShow']);
    });

    it('register once', () => {
      const log: string[] = [];
      const foo = React.createRef<any>();
      const Foo = React.forwardRef((props, ref) => {
        const forceUpdate = React.useState(0)[1];

        usePageEvent('onShow', () => {
          log.push('onShow');
        });

        usePageEvent('onShareAppMessage', () => {
          log.push('onShareAppMessage');
        });

        React.useImperativeHandle(ref, () => ({
          forceUpdate,
        }));

        return <View>foo</View>;
      });
      const page = Page(createPageConfig(() => <Foo ref={foo} />, TEST_PAGE));
      page.load();
      foo.current.forceUpdate();
      page.shareAppMessage();
      expect(log).toEqual(['onShow', 'onShareAppMessage']);
    });
  });

  it('lifecycle methods', () => {
    const log: string[] = [];
    class Foo extends React.Component {
      componentWillMount() {
        log.push('componentWillMount');
      }

      componentDidMount() {
        log.push('componentDidMount');
      }

      componentWillUnmount() {
        log.push('componentWillUnmount');
      }

      onShow() {
        log.push('onShow');
      }

      onHide() {
        log.push('onHide');
      }

      onPullDownRefresh() {
        log.push('onPullDownRefresh');
      }

      onReachBottom() {
        log.push('onReachBottom');
      }

      onPageScroll() {
        log.push('onPageScroll');
      }

      onShareAppMessage(object: any) {
        log.push(object.from);
        log.push('onShareAppMessage');
      }

      onTitleClick() {
        log.push('onTitleClick');
      }

      onOptionMenuClick() {
        log.push('onOptionMenuClick');
      }

      onPopMenuClick() {
        log.push('onPopMenuClick');
      }

      onPullIntercept() {
        log.push('onPullIntercept');
      }

      onResize() {
        log.push('onResize');
      }

      onTabItemTap() {
        log.push('onTabItemTap');
      }

      onKeyboardHeight() {
        log.push('onKeyboardHeight');
      }

      onBack() {
        log.push('onBack');
      }

      beforeTabItemTap() {
        log.push('beforeTabItemTap');
      }

      render() {
        return <View>foo</View>;
      }
    }

    const page = Page(createPageConfig(Foo, TEST_PAGE));
    page.load();
    page.pullDownRefresh();
    page.pullIntercept();
    page.reachBottom();
    page.pageScroll();
    page.shareAppMessage();
    page.titleClick();
    page.optionMenuClick();
    page.popMenuClick();
    page.hide();
    page.back();
    page.keyboardHeight();
    page.beforeTabItemTap();
    page.tabItemTap();
    page.resize();
    page.unload();

    expect(log).toEqual([
      'componentWillMount',
      'componentDidMount',
      'onShow',
      'onPullDownRefresh',
      'onPullIntercept',
      'onReachBottom',
      'onPageScroll',
      'menu',
      'onShareAppMessage',
      'onTitleClick',
      'onOptionMenuClick',
      'onPopMenuClick',
      'onHide',
      'onBack',
      'onKeyboardHeight',
      'beforeTabItemTap',
      'onTabItemTap',
      'onTabItemTap',
      'onResize',
      'onResize',
      'componentWillUnmount',
    ]);
  });
});
