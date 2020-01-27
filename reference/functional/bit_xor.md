# bit_xor
* functional[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  // C++11
  template <typename T>
  struct bit_xor {
    T operator()(const T& x, const T& y) const;
    using first_argument_type  = T;
    using second_argument_type = T;
    using result_type          = T;
  };

  // C++14 (operator() が constexpr、テンプレート引数にデフォルトが指定された)
  template <typename T = void>
  struct bit_xor {
    constexpr T operator()(const T& x, const T& y) const;
    using first_argument_type  = T;
    using second_argument_type = T;
    using result_type          = T;
  };

  template <> // テンプレート引数が void（デフォルト）の場合の特殊化（operator() が関数テンプレート）
  struct bit_xor<void> {
    template <typename T, typename U>
    constexpr auto operator()(const T& t, const U& u) const
      -> decltype(forward<T>(t) | forward<U>(u));
    using is_transparent = unspecified;
  };

  // C++20 (first_argument_type, second_argument_type, result_type削除)
  template <typename T = void>
  struct bit_xor {
    constexpr T operator()(const T& x, const T& y) const;
  };

  template <> // テンプレート引数が void（デフォルト）の場合の特殊化（operator() が関数テンプレート）
  struct bit_xor<void> {
    template <typename T, typename U>
    constexpr auto operator()(const T& t, const U& u) const
      -> decltype(forward<T>(t) | forward<U>(u));
    using is_transparent = unspecified;
  };
}
```
* unspecified[italic]
* forward[link ../utility/forward.md]

## 概要
`bit_xor`クラスは、ビットごとの排他的論理和(XOR)をとる関数オブジェクトである。

この関数オブジェクトは一切のメンバ変数を持たず、状態を保持しない。


## メンバ関数

| 名前         | 説明           | 対応バージョン |
|--------------|----------------|----------------|
| `operator()` | `x ^ y` と�価 | C++11          |


## メンバ型

| 名前                   | 説明                                                                                                                                                       | 対応バージョン |
|------------------------|--------------------------------|----------------|
| `first_argument_type`  | `operator()` の最初の引数の型。`T` と�価（`T` が `void` 以外の場合のみ）  | C++11<br/> C++17から非推奨<br/> C++20で削除 |
| `second_argument_type` | `operator()` の２番目の引数の型。`T` と�価（`T` が `void` 以外の場合のみ）| C++11<br/> C++17から非推奨<br/> C++20で削除 |
| `result_type`          | `operator()` の戻り値の型。`T` と�価（`T` が `void` 以外の場合のみ）      | C++11<br/> C++17から非推奨<br/> C++20で削除 |
| `is_transparent`       | `operator()` が関数テンプレートである事を示すタグ型。<br/>実装依�の型であるがあくまでタグ型であり、型そのものには意味はない。（`T` が `void` の場合のみ） | C++14          |


## 例

```cpp example
#include <iostream>
#include <functional>

int main()
{
  // テンプレート引数で operator() の引数の型を指定した書き方（C++11 でも使用可能）
  std::cout << "0x" << std::hex << std::bit_xor<int>()(0xFA, 0x47) << std::endl;

  // テンプレート引数で operator() の引数の型を指定しない書き方（C++14 以降で使用可能）
  std::cout << "0x" << std::hex << std::bit_xor<>()(0xFA, 0x47) << std::endl;
}
```
* std::bit_xor[color ff0000]
* std::hex[link ../ios/hex.md]

### 出力
```
0xbd
0xbd
```

## C++11バージョン
### 処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 4.3
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## C++14バージョン
### 処理系
- [Clang](/implementation.md#clang): 3.4
- [GCC](/implementation.md#gcc): 4.9
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [LWG Issue 660. Missing Bitwise Operations](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#660)
- [N3421 Making Operator Functors greater<>](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3421.htm)
- [N3657 Adding heterogeneous comparison lookup to associative containers (rev 4)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3657.htm)
- [N3789 Constexpr Library Additions: functional](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3789.htm)
- [P0005R4 Adopt `not_fn` from Library Fundamentals 2 for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0005r4.html)
- [P0619R4 Reviewing deprecated facilities of C++17 for C++20](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0619r4.html)
