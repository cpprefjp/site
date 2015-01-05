#ビット演算関数オブジェクト (C++11)
```cpp
namespace std {
  // C++11
  template <typename T>
  struct bit_and {
    T operator ()(const T &x, const T &y) const;
    typedef T first_argument_type, second_argument_type, result_type;
  };

  template <typename T>
  struct bit_or {
    T operator ()(const T &x, const T &y) const;
    typedef T first_argument_type, second_argument_type, result_type;
  };

  template <typename T>
  struct bit_xor {
    T operator ()(const T &x, const T &y) const;
    typedef T first_argument_type, second_argument_type, result_type;
  };


  // C++14 から（operator() が constexpr、テンプレート引数にデフォルトが指定された）
  template <typename T = void>
  struct bit_and {
    constexpr T operator ()(const T &x, const T &y) const;
    typedef T first_argument_type, second_argument_type, result_type;
  };

  template <typename T = void>
  struct bit_or {
    constexpr T operator ()(const T &x, const T &y) const;
    typedef T first_argument_type, second_argument_type, result_type;
  };

  template <typename T = void>
  struct bit_xor {
    constexpr T operator ()(const T &x, const T &y) const;
    typedef T first_argument_type, second_argument_type, result_type;
  };

  template <typename T = void>
  struct bit_not {
    constexpr T operator ()(const T &x) const;
    typedef T argument_type, result_type;
  };

  // テンプレート引数が void（デフォルト）の場合の特殊化（operator() が関数テンプレート）
  template <>
  struct bit_and<void> {
    template <typename T, typename U>
    constexpr auto operator ()(const T &t, const U &u) const
      -> decltype(forward<T>(t) & forward<U>(u));
    typedef unspecified is_transparent;
  };

  template <>
  struct bit_or<void> {
    template <typename T, typename U>
    constexpr auto operator ()(const T &t, const U &u) const
      -> decltype(forward<T>(t) | forward<U>(u));
    typedef unspecified is_transparent;
  };

  template <>
  struct bit_xor<void> {
    template <typename T, typename U>
    constexpr auto operator ()(const T &t, const U &u) const
      -> decltype(forward<T>(t) ^ forward<U>(u));
    typedef unspecified is_transparent;
  };

  template <>
  struct bit_not<void> {
    template <typename T>
    constexpr auto operator()(T&& t) const
      -> decltype(~forward<T>(t));
    typedef unspecified is_transparent;
  };
}
```
* unspecified[italic]
* forward[link ../utility/forward.md]

##概要
ビット演算を提供する関数オブジェクト群。これらは一切のメンバ変数を持たず、状態を保持しない。`bit_not` は C++14 で用意された。


##メンバ関数

| 名前                     | 説明                           | 対応バージョン |
|--------------------------|--------------------------------|----------------|
| `bit_and<T>::operator()` | `x & y` と等価                 | C++11          |
| `bit_or<T>::operator()`  | <code>x &#x7C; y</code> と等価 | C++11          |
| `bit_xor<T>::operator()` | `x ^ y` と等価                 | C++11          |
| `bit_not<T>::operator()` | `~x` と等価                    | C++14          |


##メンバ型

| 名前                   | 説明                                                                                                                                                       | 対応バージョン |
|------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------|
| `first_argument_type`  | `operator()` の最初の引数の型。`T` と等価（`T` が `void` 以外の場合のみ。`bit_not` には無い）                                                              | C++11          |
| `second_argument_type` | `operator()` の２番目の引数の型。`T` と等価（`T` が `void` 以外の場合のみ。`bit_not` には無い）                                                            | C++11          |
| `argument_type`        | `operator()` の引数の型。`T` と等価（`T` が `void` 以外の場合のみ。`bit_not` のみ）                                                                        | C++14          |
| `result_type`          | `operator()` の戻り値の型。`T` と等価（`T` が `void` 以外の場合のみ）                                                                                      | C++11          |
| `is_transparent`       | `operator()` が関数テンプレートである事を示すタグ型。<br/>実装依存の型であるがあくまでタグ型であり、型そのものには意味はない。（`T` が `void` の場合のみ） | C++14          |


##例

```cpp
#include <iostream>
#include <functional>

int main()
{
  // テンプレート引数で operator() の引数の型を指定した書き方（C++11 でも使用可能）
  std::cout << "0x" << std::hex << std::bit_and<int>()(0xFA, 0x47) << std::endl;

  // テンプレート引数で operator() の引数の型を指定しない書き方（C++11 では使用不可能）
  std::cout << "0x" << std::hex << std::bit_and<>()(0xFA, 0x47) << std::endl;
}
```
* iostream[link ../iostream.md]
* functional[link ../functional.md]
* hex[link ../ios/hex.md]
* bit_and[color ff0000]

###出力
```
0x42
0x42
```

##参照
- [N3421 Making Operator Functors greater<>](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3421.htm)
- [N3657 Adding heterogeneous comparison lookup to associative containers (rev 4)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3657.htm)
- [N3789 Constexpr Library Additions: functional](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3789.htm)
