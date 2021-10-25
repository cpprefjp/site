# indirectly_writable
* iterator[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class Out, class T>
  concept indirectly_writable = 
    requires(Out&& o, T&& t) {
      *o = std::forward<T>(t);
      *std::forward<Out>(o) = std::forward<T>(t);
      const_cast<const iter_reference_t<Out>&&>(*o) = std::forward<T>(t);
      const_cast<const iter_reference_t<Out>&&>(*std::forward<Out>(o)) = std::forward<T>(t);
    };
}
```
* forward[link /reference/utility/forward.md]
* iter_reference_t[link /reference/iterator/iter_reference_t.md]

## 概要

`indirectly_writable`は、任意の型`Out`が間接参照演算子（`operator*`）によって型`T`の値を書き込み（出力）可能であることを表すコンセプトである。

イテレータ型に限らず、ポインタ型、スマートポインタ型などがこのコンセプトのモデルとなることができる。

## 要件

このコンセプトを構成する4つの制約式は全て、[等しさを保持](/reference/concepts.md)することを要求しない。

`const_cast`を用いる制約式は、右辺値に対しても代入できるが`const`な右辺値では代入できなくなる非プロキシイテレータの*prvalue*（例えば`std::string`そのものなど）を返すイテレータを弾くためにある。これによって、間接参照が*prvalue*を返すようなイテレータ型は`indirectly_writable`のモデルとならないが、出力可能なプロキシオブジェクトを返すイテレータは`indirectly_writable`のモデルとなる事ができる。

## モデル

`decltype((E)) == T`となるような式`E`及び[`dereferenceable`](dereferenceable.md)な型`Out`のオブジェクト`o`について次の条件を満たす場合に限って、型`Out, T`は`indirectly_writable`のモデルである。

- `Out, T`が次の制約式のモデルとなる場合、式`E`を上記（定義内）式のいずれかの形で出力した後で、`*o`は元の`E`の値と等値（*equal*）になる。
    - ただし、そのような出力の後で`o`が間接参照可能である必要はない。
```cpp
indirectly_readable<Out> && same_as<iter_value_t<Out>, decay_t<T>>
```
* indirectly_readable[link indirectly_readable.md]
* same_as[link /reference/concepts/same_as.md]
* iter_value_t[link /reference/iterator/iter_value_t.md]
* decay_t[link /reference/type_traits/decay.md]

`E`の値カテゴリが*xvalue*の場合、上記式による出力後`E`のオブジェクトは有効だが未規定な状態となる

## 備考

`indirectly_writable`のモデルとなる`Out`の`operator*`は出力（上記式による代入文の左辺に来ること）だけが唯一有効な使用法であり、[`indirectly_readable`](indirectly_readable.md)である必要はない。

## 例
```cpp example
#include <iostream>
#include <concepts>
#include <iterator>
#include <memory>
#include <vector>
#include <optional>

template<typename Out, typename T>
requires std::indirectly_writable<Out, T>
void f(const char* out, const char* t) {
  std::cout << out << " is indirectly writable " << t << std::endl;
}

template<typename Out, typename T>
void f(const char* out, const char* t) {
  std::cout << out << " is not indirectly writable " << t << std::endl;
}


struct writable {
  int& operator*();
};

struct not_writable {
  //prvalueを返す、出力不可能
  int operator*();
};


int main() {
  f<int*, int>("int*", "int");
  f<std::unique_ptr<int>, int&>("std::unique_ptr<int>", "int&");
  f<std::vector<int>::iterator, int&&>("std::vector<int>::iterator", "int&&");
  f<std::ostream_iterator<double>, double>("std::ostream_iterator<double>", "double");
  f<writable, int>("writable", "int");
  
  std::cout << "\n";
  f<std::vector<bool>::iterator, bool>("std::vector<bool>::iterator", "bool");
  f<std::optional<int>, int>("std::optional<int>", "int");
  f<not_writable, int>("not_writable", "int");
}
```
* std::indirectly_writable[color ff0000]

### 出力
```
int* is indirectly writable int
std::unique_ptr<int> is indirectly writable int&
std::vector<int>::iterator is indirectly writable int&&
std::ostream_iterator<double> is indirectly writable double
writable is indirectly writable int

std::vector<bool>::iterator is not indirectly writable bool
std::optional<int> is not indirectly writable int
not_writable is not indirectly writable int
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
- [P2214R0 A Plan for C++23 Ranges](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2214r0.html#a-tuple-that-is-writable)
    - `const_cast`を用いる制約式についての説明がなされている
