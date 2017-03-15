# negate
* functional[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  // C++03
  template <typename T>
  struct negate {
    T operator()(const T& x) const;
    constexpr T operator ()(const T& x) const;
    using argument_type = T;
    using result_type   = T;
  };

  // C++14
  template <typename T = void>
  struct negate {
    constexpr T operator()(const T& x) const;
    using argument_type = T;
    using result_type   = T;
  };

  template <>
  struct negate<void> {
    template <class T> constexpr auto operator()(T&& t) const
      -> decltype(-std::forward<T>(t));
    using is_transparent = unspecified;
  };
}
```
* unspecified[italic]
* std::forward[link ../utility/forward.md]

## 概要
`negate`クラスは、符号反転を行う関数オブジェクトである。

この関数オブジェクトは一切のメンバ変数を持たず、状態を保持しない。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|--------------|-------------|-------|
| `operator()` | `-x` と等価 | |


## メンバ型

| 名前                   | 説明                           | 対応バージョン |
|------------------------|--------------------------------|----------------|
| `argument_type`        | `operator()` の引数の型。`T` と等価（`T` が `void` 以外の場合のみ          | |
| `result_type`          | `operator()` の戻り値の型。`T` と等価（`T` が `void` 以外の場合のみ）      | |
| `is_transparent`       | `operator()` が関数テンプレートである事を示すタグ型。<br/>実装依存の型であるがあくまでタグ型であり、型そのものには意味はない。（`T` が `void` の場合のみ） | C++14 |


## 例
```cpp
#include <iostream>
#include <functional>

int main()
{
  std::cout << std::negate<int>()(3) << std::endl;
  std::cout << std::negate<int>()(-3) << std::endl;
}
```
* std::negate[color ff0000]

### 出力
```
-3
3
```

## 参照
- [N3421 Making Operator Functors greater<>](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3421.htm)
- [N3657 Adding heterogeneous comparison lookup to associative containers (rev 4)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3657.htm)
- [N3789 Constexpr Library Additions: functional](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3789.htm)

