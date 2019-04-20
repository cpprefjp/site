# begin (非メンバ関数)
* valarray[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  unspecified1 begin(valarray<T>& va);       // (1)

  template <class T>
  unspecified2 begin(const valarray<T>& va); // (2)
}
```
* unspecified1[italic]
* unspecified2[italic]

## 概要
先頭の要素を指すイテレータを取得する。


## 戻り値
先頭要素を指すイテレータを返す。この関数によって返されるイテレータは、ランダムアクセスイテレータの要件を満たす型である。

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

    - これは、`std::valarray<T>`型を返すあらゆる関数は、式テンプレートによる最適化を考慮して、ほかの型を返すことが許可されているためである。その「ほかの型」は、`std::valarray`クラスの`const`メンバ関数と同等の機能を使用できる必要があるが、これら非メンバ関数が使えることは実装に求められていない


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
* std::begin[color ff0000]
* std::end[link end_free.md]

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
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.6.4
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [N2930 Range-Based For Loop Wording (Without Concepts)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2009/n2930.html)
- [LWG2058. valarray and begin/end](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2058)
