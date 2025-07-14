# same_as
* concepts[meta header]
* concept[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class T, class U>
  concept same_as = /*see below*/;
}
```

## 概要

`same_as`は、型`T, U`が同じ型であることを表すコンセプトである。これを満たす型のペアはCVや参照修飾も含めて完全に同じ型である必要がある。


## 要件

まず、説明専用コンセプト`same-as-impl`を以下のように定義する。

```cpp
template <class T, class U>
concept same-as-impl = is_same_v<T, U>;
```
* is_same_v[link /reference/type_traits/is_same.md]

`same_as`コンセプトは、以下のように定義される。

```cpp
template <class T, class U>
concept same_as = same-as-impl<T, U> && same-as-impl<U, T>;
```

## 備考

`same_as<T, U>`は`same_as<U, T>`を包摂しており、その逆も同様である。定義に`same-as-impl`を使用しているのは、この包摂関係を成立させるため。


## 例
```cpp example
#include <iostream>
#include <concepts>
#include <cstdint>

int main()
{
  std::cout << std::boolalpha;

  std::cout << std::same_as<int, int> << std::endl;
  std::cout << std::same_as<int, short> << std::endl;
  std::cout << std::same_as<int, const int> << std::endl;
  std::cout << std::same_as<int, int&> << std::endl;
  std::cout << std::same_as<int, std::int32_t> << std::endl;
  std::cout << std::same_as<std::int32_t, int> << std::endl;
}
```
* std::same_as[color ff0000]

### 出力例（GCC10.1 x86-64）
```
true
false
false
false
true
true
```

`std::int32_t`と`int`型は処理系によっては同じ型ではない場合がありうる。また、処理系によっては`std::int32_t`は定義されないかもしれない。

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark verified]

## 関連項目

- [C++20 コンセプト](/lang/cpp20/concepts.md)

## 参照

- [P0898R3 Standard Library Concepts](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0898r3.pdf)
- [LWG Issue 3182. Specification of Same could be clearer](https://cplusplus.github.io/LWG/issue3182)
- [P1754R1 Rename concepts to standard_case for C++20, while we still can](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1754r1.pdf)
- [same_asコンセプトとSymmetric Subsumption Idiom - yohhoyの日記](https://yohhoy.hatenadiary.jp/entry/20190925/p1)
