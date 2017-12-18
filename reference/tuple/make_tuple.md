# make_tuple
* tuple[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class... Types>
  tuple<VTypes ...> make_tuple(Types&&...);           // C++11

  template <class... Types>
  constexpr tuple<VTypes ...> make_tuple(Types&&...); // C++14
}
```

## 概要
渡された可変個パラメータのコピーから`tuple`型のオブジェクトを構築する。


## 戻り値
パラメータパックの値からなる`tuple`オブジェクトを返す。

`Types...`の各型`T`において、

- [`std::decay`](/reference/type_traits/decay.md)`<T>::type`の結果型を使用し、
- かつ型`T`が[`std::reference_wrapper`](/reference/functional/reference_wrapper.md)型であった場合`T&`型を使用する


## 例
```cpp example
#include <tuple>
#include <string>
#include <functional>

int main()
{
  // 渡した値からtupleを構築
  std::tuple<int, char, const char*> t1 = std::make_tuple(1, 'a', "Hello");

  // tupleのコンストラクタによってconst char*をstd::stringに型変換
  std::tuple<int, char, std::string> t2 = std::make_tuple(1, 'a', "Hello");

  int a = 1;
  char b = 'b';
  std::string c = "hello";

  // 変数のコピーからtupleを構築
  std::tuple<int, char, std::string> t3 = std::make_tuple(a, b, c);

  // 変数の一部を参照と見なしてtupleを構築
  std::tuple<int, char&, const std::string&> t4 = std::make_tuple(a, std::ref(b), std::cref(c));
}
```
* std::make_tuple[color ff0000]
* std::tuple[link tuple.md]
* std::ref[link /reference/functional/ref.md]
* std::cref[link /reference/functional/cref.md]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ?
- [GCC](/implementation.md#gcc): ?
- [GCC, C++11 mode](/implementation.md#gcc): 4.6.1
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2008, 2010


## 参照
- [N3471 Constexpr Library Additions: utilities, v3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3471.html)

