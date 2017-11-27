# bit_not
* functional[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp14[meta cpp]

```cpp
namespace std {
  template <typename T = void>
  struct bit_not {
    constexpr T operator()(const T& x) const;
    using argument_type = T;
    using result_type   = T;
  };

  template <>
  struct bit_not<void> {
    template <typename T>
    constexpr auto operator()(T&& t) const
      -> decltype(~forward<T>(t));
    using is_transparent = unspecified;
  };
}
```
* unspecified[italic]
* forward[link ../utility/forward.md]

## 概要
`bit_not`クラスは、ビットごとの論理否定(NOT)をとる関数オブジェクトである。

この関数オブジェクトは一切のメンバ変数を持たず、状態を保持しない。


## メンバ関数

| 名前         | 説明        | 対応バージョン |
|--------------|-------------|----------------|
| `operator()` | `~x` と等価 | C++14          |


## メンバ型

| 名前                   | 説明                                                                                                                                                       | 対応バージョン |
|------------------------|--------------------------------|----------------|
| `argument_type`        | `operator()` の引数の型。`T` と等価（`T` が `void` 以外の場合のみ）        | C++14<br/> C++17から非推奨 |
| `result_type`          | `operator()` の戻り値の型。`T` と等価（`T` が `void` 以外の場合のみ）      | C++14<br/> C++17から非推奨 |
| `is_transparent`       | `operator()` が関数テンプレートである事を示すタグ型。<br/>実装依存の型であるがあくまでタグ型であり、型そのものには意味はない。（`T` が `void` の場合のみ） | C++14          |


## 例

```cpp example
#include <iostream>
#include <functional>

int main()
{
  // テンプレート引数で operator() の引数の型を指定した書き方
  std::cout << "0x" << std::hex << std::bit_not<int>()(0xFA) << std::endl;

  // テンプレート引数で operator() の引数の型を指定しない書き方
  std::cout << "0x" << std::hex << std::bit_not<>()(0xFA) << std::endl;
}
```
* std::bit_not[color ff0000]
* std::hex[link ../ios/hex.md]

### 出力
```
0xffffff05
0xffffff05
```

## バージョン
### 言語
- C++14

### 処理系
- [Clang, C++14 mode](/implementation.md#clang): 3.4
- [GCC, C++14 mode](/implementation.md#gcc): 4.9
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


## 参照
- [LWG Issue 660. Missing Bitwise Operations](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#660)
- [N3421 Making Operator Functors greater<>](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3421.htm)
- [N3657 Adding heterogeneous comparison lookup to associative containers (rev 4)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3657.htm)
- [N3789 Constexpr Library Additions: functional](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3789.htm)
- [P0005R4 Adopt `not_fn` from Library Fundamentals 2 for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0005r4.html)
