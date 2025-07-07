# common_with
* concepts[meta header]
* concept[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class T, class U>
  concept common_with =
    same_as<common_type_t<T, U>, common_type_t<U, T>> &&
    requires {
      static_cast<common_type_t<T, U>>(declval<T>());
      static_cast<common_type_t<T, U>>(declval<U>());
    } &&
    common_reference_with<
      add_lvalue_reference_t<const T>,
      add_lvalue_reference_t<const U>> &&
    common_reference_with<
      add_lvalue_reference_t<common_type_t<T, U>>,
      common_reference_t<
        add_lvalue_reference_t<const T>,
        add_lvalue_reference_t<const U>>>;
}
```
* add_lvalue_reference_t[link /reference/type_traits/add_lvalue_reference.md]

## 概要

`common_with`は、`T, U`の間で、どちらの型からも変換可能な共通の型が存在することを表すコンセプトである。

2つの型`T, U`はある型`C`へ両方の型から明示的に変換可能な場合にのみ、共通型を持つ。このような型`C`は、必ずしも`T`や`U`と同じ型である必要はなく、`C`は一意で無くても良い。

## モデル

`C = common_type_t<T, U>`、[等しさを保持](/reference/concepts.md)し`decltype((t1))`と`decltype((t2))`が共に`T`となるような式`t1, t2`及び、等しさを保持し`decltype((u1))`と`decltype((u2))`が共に`U`となるような式`u1, u2`について以下の条件を満たす場合に限って、型`T, U`は`common_with`のモデルである。

- `t1`と`t2`が等値である場合にのみ、`C(t1)`と`C(t2)`も等値となる
- `u1`と`u2`が等値である場合にのみ、`C(u1)`と`C(u2)`も等値となる

## 備考

このコンセプトをカスタマイズするには、[`common_type`](/reference/type_traits/common_type.md)を利用する。

## 例
```cpp example
#include <iostream>
#include <concepts>
#include <vector>
#include <string>

template<typename T, typename U>
requires std::common_with<T, U>
void f() {
  std::cout << "T, U share a common type" << std::endl;
}

template<typename T, typename U>
void f() {
  std::cout << "T, U not share a common type" << std::endl;
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
* std::common_with[color ff0000]

### 出力
```
T, U share a common type
T, U share a common type
T, U share a common type
T, U not share a common type
T, U share a common type
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark verified]

## 関連項目

- [C++20 コンセプト](/lang/cpp20/concepts.md)
- [`common_type`](/reference/type_traits/common_type.md)

## 参照

- [P0898R3 Standard Library Concepts](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0898r3.pdf)
- [P1754R1 Rename concepts to standard_case for C++20, while we still can](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1754r1.pdf)
- [LWG Issue 3153. `Common` and `common_type` have too little in common](https://wg21.cmeerw.net/lwg/issue3153)
- [LWG Issue 3154. `Common` and `CommonReference` have a common defect](https://wg21.cmeerw.net/lwg/issue3154)
