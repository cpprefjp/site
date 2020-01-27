# common_reference_with
* concepts[meta header]
* concept[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class T, class U>
  concept common_reference_with =
    same_as<common_reference_t<T, U>, common_reference_t<U, T>> &&
    convertible_to<T, common_reference_t<T, U>> &&
    convertible_to<U, common_reference_t<T, U>>;
}
```
* same_as[link /reference/concepts/same_as.md]
* convertible_to[link /reference/concepts/convertible_to.md]
* common_reference_t[link /reference/type_traits/common_reference.md]

## 概要

`common_reference_with`は、`T, U`の間で、どちらの型からも変換可能な共通の参照型が�在することを表すコンセプトである。

2つの型`T, U`は以下の全ての条件を満たす場合にのみ、共通の参照型を持つ。

- `C = `[`common_reference_t<T, U>`](/reference/type_traits/common_reference.md)が有効な型である
- 型`T, C`は、[`convertible_to<T, C>`](/reference/concepts/convertible_to.md)のモデルである
- 型`U, C`は、[`convertible_to<U, C>`](/reference/concepts/convertible_to.md)のモデルである

このような型`C`は、必ずしも`T`や`U`と同じ型である必要はなく、参照型でなくても良い。

## モデル

`C = common_reference_t<T, U>`、[�しさを保持](/reference/concepts.md)し`decltype((t1))`と`decltype((t2))`が共に`T`となるような式`t1, t2`及び、�しさを保持し`decltype((u1))`と`decltype((u2))`が共に`U`となるような式`u1, u2`について以下の条件を満たす場合に限って、型`T, U`は`common_reference_with`のモデルである。

- `t1`と`t2`が�値である場合にのみ、`C(t1)`と`C(t2)`も�値となる
- `u1`と`u2`が�値である場合にのみ、`C(u1)`と`C(u2)`も�値となる

## 備考

このコンセプトをカスタマイズするには、[`basic_common_reference`](/reference/type_traits/basic_common_reference.md)を利用する。

## 例
```cpp example
#include <iostream>
#include <concepts>
#include <vector>
#include <string>

template<typename T, typename U>
requires std::common_reference_with<T, U>
void f() {
  std::cout << "T, U share a common reference type" << std::endl;
}

template<typename T, typename U>
void f() {
  std::cout << "T, U not share a common reference type" << std::endl;
}

int main()
{
  f<std::size_t&, int&>();
  f<std::string&, std::string_view&>();
  f<std::vector<int>, std::vector<int>&>();
  f<std::vector<int>, std::vector<double>>();
  f<std::pair<int&, double&>, std::pair<int, double>>();
}
```
* std::common_reference_with[color ff0000]

### 出力
```
T, U share a common reference type
T, U share a common reference type
T, U share a common reference type
T, U not share a common reference type
T, U share a common reference type
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3

## 関連項目

- [C++20 コンセプト](/lang/cpp20/concepts.md)
- [`common_reference`](/reference/type_traits/common_reference.md)
- [`basic_common_reference`](/reference/type_traits/basic_common_reference.md)

## 参照

- [P0898R3 Standard Library Concepts](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0898r3.pdf)
- [P1754R1 Rename concepts to standard_case for C++20, while we still can](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1754r1.pdf)
