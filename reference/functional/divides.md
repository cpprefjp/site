#divides
* functional[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  // C++03
  template <typename T>
  struct divides {
    T operator ()(const T& x, const T& y) const;
    typedef T first_argument_type;
    typedef T second_argument_type;
    typedef T result_type;
  };

  // C++14
  template <typename T = void>
  struct divides {
    constexpr T operator()(const T& x, const T& y) const;
    typedef T first_argument_type;
    typedef T second_argument_type;
    typedef T result_type;
  };

  template <>
  struct divides<void> {
    template <class T, class U> constexpr auto operator()(T&& t, U&& u) const
      -> decltype(std::forward<T>(t) / std::forward<U>(u));
    typedef unspecified is_transparent;
  };
}
```
* unspecified[italic]
* forward[link ../utility/forward.md]

##概要
`divides`クラスは、除算を行う関数オブジェクトである。

この関数オブジェクトは一切のメンバ変数を持たず、状態を保持しない。


##メンバ関数

| 名前 | 説明 | 対応バージョン |
|--------------|----------------|-------|
| `operator()` | `x / y` と等価 | |


##メンバ型

| 名前                   | 説明                           | 対応バージョン |
|------------------------|--------------------------------|----------------|
| `first_argument_type`  | `operator()` の最初の引数の型。`T` と等価（`T` が `void` 以外の場合のみ）  | |
| `second_argument_type` | `operator()` の２番目の引数の型。`T` と等価（`T` が `void` 以外の場合のみ）| |
| `result_type`          | `operator()` の戻り値の型。`T` と等価（`T` が `void` 以外の場合のみ）      | |
| `is_transparent`       | `operator()` が関数テンプレートである事を示すタグ型。<br/>実装依存の型であるがあくまでタグ型であり、型そのものには意味はない。（`T` が `void` の場合のみ） | C++14 |


##例
```cpp
#include <iostream>
#include <functional>

int main()
{
  std::cout << std::divides<int>()(6, 2) << std::endl;
}
```
* iostream[link ../iostream.md]
* functional[link ../functional.md]
* divides[color ff0000]

###出力
```
3
```

##参照
- [N3421 Making Operator Functors greater<>](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3421.htm)
- [N3657 Adding heterogeneous comparison lookup to associative containers (rev 4)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3657.htm)
- [N3789 Constexpr Library Additions: functional](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3789.htm)

