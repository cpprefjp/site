# end (非メンバ関数)
* valarray[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]
* cpp26removed[meta cpp]

```cpp
namespace std {
  template <class T>
  unspecified1 end(valarray<T>& va);       // (1) C++11、C++26で削除

  template <class T>
  unspecified2 end(const valarray<T>& va); // (2) C++11、C++26で削除
}
```
* unspecified1[italic]
* unspecified2[italic]

この関数はC++26で削除された。代わりにメンバ関数版の[`end()`](end.md)および、[`<iterator>`](/reference/iterator.md)ヘッダで定義される[`std::end()`](/reference/iterator/end.md)関数を使用すること。

## 概要
末尾の次を指すイテレータを取得する。


## 戻り値
末尾の次を指すイテレータを返す。この関数によって返されるイテレータは、ランダムアクセスイテレータの要件を満たす型である。

*unspecified1*は非`const`なランダムアクセスイテレータ、*unspecified2*は`const`なランダムアクセスイテレータである。


## 備考
- この関数によって返されるイテレータは、[`resize()`](resize.md)メンバ関数が呼び出されると無効になる
- `valarray`オブジェクト同士の演算結果を型推論する場合 (`auto`、`decltype`、関数テンプレートなど)、以下のようなコードは実装によってコンパイルエラーになる可能性がある：

    ```cpp
    std::valarray<double> a = {1.0, 2.0, 3.0};
    std::valarray<double> b = {1.0, 2.0, 3.0};
    auto c = a + b;

    // 以下の2行がコンパイルエラーになる可能性がある
    auto first = std::begin(c); // 変数cの型をautoではなく、
    auto last = std::end(c);    // std::valarray<double>にする必要がある
    ```
    * std::end[color ff0000]
    * std::begin[link /reference/valarray/valarray/begin_free.md]

    これは、[`std::valarray`](../valarray.md)`<T>` 型を返す関数（本リファレンスでは戻り値型を *`ValOrProxy`* と表記）は、式テンプレートによる最適化を考慮して、代理の型を返すことが許可されているが、[`begin`](begin_free.md) と `end` はその代理の型を受け取りが可能であることを求められていないためである。  
    [`<valarray>`](../../valarray.md) の概要も参照のこと。


## 例
```cpp example
#include <iostream>
#include <valarray>
#include <algorithm>

int main()
{
  std::valarray<int> va = {1, 2, 3};

  std::for_each(std::begin(va), std::end(va), [](int x) {
    std::cout << x << std::endl;
  });
}
```
* std::end[color ff0000]
* std::begin[link /reference/valarray/valarray/begin_free.md]

### 出力
```
1
2
3
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [GCC](/implementation.md#gcc): 4.6.4 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [N2930 Range-Based For Loop Wording (Without Concepts)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2009/n2930.html)
- [LWG2058. valarray and begin/end](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2058)
- [P3016R6 Resolve inconsistencies in `begin`/`end` for `valarray` and `braced-initializer-list`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3016r6.html)
