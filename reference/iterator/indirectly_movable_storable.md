# indirectly_movable_storable
* iterator[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class In, class Out>
  concept indirectly_movable_storable =
    indirectly_movable<In, Out> &&
    indirectly_writable<Out, iter_value_t<In>> &&
    movable<iter_value_t<In>> &&
    constructible_from<iter_value_t<In>, iter_rvalue_reference_t<In>> &&
    assignable_from<iter_value_t<In>&, iter_rvalue_reference_t<In>>;
}
```
* indirectly_movable[link /reference/iterator/indirectly_movable.md]
* indirectly_writable[link /reference/iterator/indirectly_writable.md]
* iter_value_t[link /reference/iterator/iter_value_t.md]
* movable[link /reference/concepts/movable.md]
* constructible_from[link /reference/concepts/constructible_from.md]
* iter_rvalue_reference_t[link /reference/iterator/iter_rvalue_reference_t.md]
* assignable_from[link /reference/concepts/assignable_from.md]

## 概要

`indirectly_movable_storable`は、型`In, Out`が[`indirectly_movable`](/reference/iterator/indirectly_movable.md)の関係にあり、[`iter_value_t<In>`](/reference/iterator/iter_value_t.md)型の中間オブジェクトを介しても、`In`から`Out`へその要素のオブジェクトがムーブ可能であることを表すコンセプトである。

単純には、型`In, Out`のオブジェクトをそれぞれ`in, out`とすると次のような代入が可能であることを表している。

```cpp
iter_value_t<In> tmp = std::move(*in);
*out = std::move(tmp);
```

## モデル

間接参照可能な型`In`のオブジェクト`i`について次の条件を満たす場合に限って、型`In, Out`は`indirectly_movable_storable`のモデルである。

次のように初期化された`obj`は、その以前に`*i`が示していた値と等しい（*equal*）。

```cpp
iter_value_t<In> obj(std::ranges::iter_move(i));
```

[`iter_rvalue_reference_t<In>`](/reference/iterator/iter_rvalue_reference_t.md)が右辺値参照型の場合、この初期化の後で`*i`が示す値は有効だが未規定な状態となる。

## 例
```cpp example
#include <iostream>
#include <concepts>
#include <iterator>
#include <vector>
#include <memory>

template<typename In, typename Out>
  requires std::indirectly_movable_storable<In, Out>
void f(const char* nameIn, const char* nameO) {
  std::cout << nameIn << " is indirectly_movable_storable " << nameO << std::endl;
}

template<typename In, typename Out>
void f(const char* nameIn, const char* nameO) {
  std::cout << nameIn << " is not indirectly_movable_storable " << nameO << std::endl;
}


struct non_copy {
  non_copy(const non_copy&) = delete;
};

int main() {
  f<int*, int* const>("int*", "int* const");
  f<std::unique_ptr<int>, int*>("std::unique_ptr<int>", "int*");
  f<std::vector<int>::iterator, std::unique_ptr<int>>("std::vector<int>::iterator", "std::unique_ptr<int>");
  f<std::istream_iterator<int>, std::vector<int>::iterator>("std::istream_iterator<int>", "std::vector<int>::iterator");
  f<std::istream_iterator<int>, std::ostream_iterator<int>>("std::istream_iterator<int>", "std::ostream_iterator<int>");

  std::cout << "\n";
  f<int*, const int*>("int*", "const int*");
  f<std::ostream_iterator<int>, std::istream_iterator<int>>("std::ostream_iterator<int>", "std::istream_iterator<int>");
  f<non_copy*, non_copy*>("non_copy*", "non_copy*");
}
```
* std::indirectly_movable_storable[color ff0000]

### 出力
```
int* is indirectly_movable_storable bool(const int&, const int&)
std::unique_ptr<int> is indirectly_movable_storable bool(const int&, const int&)
std::vector<int>::iterator is indirectly_movable_storable bool(const int&, const int&)
std::istream_iterator<int> is indirectly_movable_storable bool(const int&, const int&)

int* is not indirectly_movable_storable void(const int&, const int&)
std::unique_ptr<int> is not indirectly_movable_storable void(const int&, const int&)
std::vector<int>::iterator is not indirectly_movable_storable void(const int&, const int&)
std::istream_iterator<int> is not indirectly_movable_storable void(const int&, const int&)
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 6

## 関連項目

- [C++20 コンセプト](/lang/cpp20/concepts.md)

## 参照

- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
