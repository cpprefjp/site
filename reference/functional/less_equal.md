# less_equal
* functional[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  // C++03
  template <typename T>
  struct less_equal {
    bool operator ()(const T& x, const T& y) const;
    using first_argument_type  = T;
    using second_argument_type = T;
    using result_type          = bool;
  };

  // C++14
  template <class T = void>
  struct less_equal {
    constexpr bool operator()(const T& x, const T& y) const;
    using first_argument_type  = T;
    using second_argument_type = T;
    using result_type          = bool;
  };

  template <>
  struct less_equal<void> {
    template <class T, class U> auto operator()(T&& t, U&& u) const
      -> decltype(std::forward<T>(t) <= std::forward<U>(u));
    using is_transparent = unspecified;
  };
}
```
* unspecified[italic]
* std::forward[link ../utility/forward.md]

## 概要
`less_equal`クラスは、左辺が右辺以下かの比較を行う関数オブジェクトである。

この関数オブジェクトは一切のメンバ変数を持たず、状態を保持しない。


## メンバ関数

| 名前 | 説明 |
|---------------|-----------------|
| `operator ()` | `x <= y` と等価 |


## メンバ型

| 名前 | 説明 |
|------------------------|-------------------------------|
| `first_argument_type`  | `operator()` の最初の引数の型。`T` と等価（`T` が `void` 以外の場合のみ）  | C++17から非推奨 |
| `second_argument_type` | `operator()` の２番目の引数の型。`T` と等価（`T` が `void` 以外の場合のみ）| C++17から非推奨 |
| `result_type`          | `operator()` の戻り値の型。`bool` と等価（`T` が `void` 以外の場合のみ）   | C++17から非推奨 |
| `is_transparent`       | `operator()` が関数テンプレートである事を示すタグ型。<br/>実装依存の型であるがあくまでタグ型であり、型そのものには意味はない。（`T` が `void` の場合のみ） | C++14 |


## 例

```cpp
#include <iostream>
#include <functional>

int main()
{
  std::cout << std::boolalpha << std::less_equal<int>()(2, 3) << std::endl;
}
```
* std::less_equal[color ff0000]

### 出力
```
true
```

## 参照
- [N3421 Making Operator Functors greater<>](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3421.htm)
- [N3657 Adding heterogeneous comparison lookup to associative containers (rev 4)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3657.htm)
- [N3789 Constexpr Library Additions: functional](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3789.htm)
- [P0005R4 Adopt `not_fn` from Library Fundamentals 2 for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0005r4.html)
