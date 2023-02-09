# expected.void
* expected[meta header]
* class template[meta id-type]
* std[meta namespace]
* cpp23[meta cpp]

```cpp
namespace std {
  // プライマリテンプレート
  template<class T, class E>
  class expected;

  // T=cv void 部分特殊化テンプレート
  template<class T, class E>
    requires is_void_v<T>
  class expected<T, E>;
}
```
* expected[link expected.md]
* is_void_v[link /reference/type_traits/is_void.md]

このページは`expected<cv void, E>`部分特殊化テンプレートに対応するプレースホルダです。

`expected`クラスの説明は[`expected<T, E>`プライマリテンプレート](expected.md)ページを参照してください。
