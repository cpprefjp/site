#logical_not
* functional[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  // C++03
  template <typename T>
  struct logical_not {
    bool operator ()(const T& x) const;
    using argument_type = T;
    using result_type   = bool;
  };

  // C++14
  template <class T = void>
  struct logical_not {
    bool constexpr operator()(const T& x) const;
    using argument_type = T;
    using result_type   = bool;
  };

  template <>
  struct logical_not<void> {
    template <class T> constexpr auto operator()(T&& t) const
      -> decltype(!std::forward<T>(t));
    using is_transparent = unspecified;
  };
}
```
* unspecified[italic]
* std::forward[link ../utility/forward.md]

##概要
`logical_not`クラスは、論理否定(NOT)を計算する関数オブジェクトである。

この関数オブジェクトは一切のメンバ変数を持たず、状態を保持しない。


##メンバ関数

| 名前 | 説明 |
|---------------|-----------------|
| `operator ()` | `!x` と等価 |


##メンバ型

| 名前 | 説明 |
|--------------------------------------|-------------------------------|
| `argument_type`  | `operator()` の引数の型。`T` と等価（`T` が `void` 以外の場合のみ）  | |
| `result_type`          | `operator()` の戻り値の型。`bool` と等価（`T` が `void` 以外の場合のみ）   | |
| `is_transparent`       | `operator()` が関数テンプレートである事を示すタグ型。<br/>実装依存の型であるがあくまでタグ型であり、型そのものには意味はない。（`T` が `void` の場合のみ） | C++14          |


##例
```cpp
#include <iostream>
#include <functional>

int main()
{
  std::cout << std::boolalpha << std::logical_not<bool>()(false) << std::endl;
}
```
* std::logical_not[color ff0000]

###出力
```
true
```

##参照
- [N3421 Making Operator Functors greater<>](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3421.htm)
- [N3657 Adding heterogeneous comparison lookup to associative containers (rev 4)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3657.htm)
- [N3789 Constexpr Library Additions: functional](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3789.htm)

