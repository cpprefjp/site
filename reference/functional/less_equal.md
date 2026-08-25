# less_equal
* functional[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  // C++98
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

  // C++20
  template <class T = void>
  struct less_equal {
    constexpr bool operator()(const T& x, const T& y) const;
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
| `first_argument_type`  | `operator()` の最初の引数の型。`T` と等価（`T` が `void` 以外の場合のみ）  | C++17から非推奨<br/> C++20で削除 |
| `second_argument_type` | `operator()` の２番目の引数の型。`T` と等価（`T` が `void` 以外の場合のみ）| C++17から非推奨<br/> C++20で削除 |
| `result_type`          | `operator()` の戻り値の型。`bool` と等価（`T` が `void` 以外の場合のみ）   | C++17から非推奨<br/> C++20で削除 |
| `is_transparent`       | `operator()` が関数テンプレートである事を示すタグ型。<br/>実装依存の型であるがあくまでタグ型であり、型そのものには意味はない。（`T` が `void` の場合のみ） | C++14 |


## 備考
- `less_equal<void>`の`operator()`が組み込みのポインタ比較演算子を呼び出す場合、その比較は厳密な全順序を与える。この順序は、`less`/`greater`/`less_equal`/`greater_equal`の各特殊化の間で一貫しており、かつ組み込みのポインタ比較演算子が定義される場合はその結果とも一致する。


## 例

```cpp example
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
- [P0619R4 Reviewing deprecated facilities of C++17 for C++20](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0619r4.html)
- [LWG Issue 2450. `(greater|less|greater_equal|less_equal)<void>` do not yield a total order for pointers](https://cplusplus.github.io/LWG/issue2450)
    - C++17で、`less_equal<void>`がポインタを比較する場合に全順序を与えることが規定された（非`void`版と同様）
- [LWG Issue 2562. Consistent total ordering of pointers by comparison functors](https://cplusplus.github.io/LWG/issue2562)
    - C++17で、`less`/`greater`/`less_equal`/`greater_equal`が同一ポインタ型に対して同じ全順序を与え、組み込みのポインタ比較演算子とも一致することが規定された
