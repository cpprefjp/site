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

### 制約式について

`const_cast`を用いる制約式は、非プロキシオブジェクト（値を所有するオブジェクトのことである。[`std::string`](/reference/string/basic_string.md)などが該当）を弾くために存在する。

まず前提として、非プロキシオブジェクトは[メンバ関数の左辺値／右辺値修飾](https://cpprefjp.github.io/lang/cpp11/ref_qualifier_for_this.html)が追加される以前からの慣習により、*prvalue*であっても代入が可能である。また、値を所有するために`const`が付与されれば代入は不可能となる。

```cpp example
#include <string>

int main()
{ 
  std::string()  = "string"; // prvalueに代入
}
```

このような非プロキシオブジェクトの*prvalue*がイテレータの間接参照結果として返された場合、それに書き込んだとしても、その*prvalue*のオブジェクトが所有する値を書き換えるのみであり、正しく出力されるとは言えない。

一方で、プロキシオブジェクト（所有権を持たず、他のオブジェクトを参照するオブジェクト）がイテレータの間接参照結果として返された場合は、*prvalue*の場合も代入された値を「参照する先のオブジェクトが所有する値」へ書き込むことによって、正しく出力を完了することが出来る。

更に、プロキシオブジェクトは値を所有しないため「`const`な参照先」でなければ、プロキシオブジェクトそれ自体が`const`であっても代入は可能であるべきである。しかしながら、従来のプロキシオブジェクトは`const`を付与された場合代入が不可能になる実装が殆どであり、変更が必要である。例としては[`std::vector<bool>::reference`](/reference/vector/vector.md)がある。

プロキシオブジェクトの他にも、参照（右辺値参照/左辺値参照問わず）も正しく出力が可能である。このことから、「`const`を付与した上でも代入が可能であるようなプロキシオブジェクト」と「参照」を合わせて「プロキシ参照（proxy reference）」と呼称することがある。

以上のことから、`const`を付与した際にも代入が可能であればプロキシ参照、不可能であれば非プロキシ参照と区別することが可能となる。したがって、間接参照が非プロキシ参照（プロキシオブジェクトでない*prvalue*など）を返すイテレータ型は本コンセプトのモデルとならず、プロキシ参照を返すイテレータは本コンセプトのモデルとなる事ができる。

## モデル

`decltype((E)) == T`となるような式`E`及び[`dereferenceable`](dereferenceable.md)な型`Out`のオブジェクト`o`について次の条件を満たす場合に限って、型`Out, T`は`indirectly_writable`のモデルである。

- `Out, T`が次の制約式のモデルとなる場合、式`E`を上記（定義内）式のいずれかの形で出力した後で、`*o`は元の`E`の値と等値（*equal*）になる。
    - ただし、そのような出力の後で`o`が間接参照可能である必要はない。
```cpp
indirectly_readable<Out> && same_as<iter_value_t<Out>, decay_t<T>>
```
* indirectly_readable[link indirectly_readable.md]

`E`の値カテゴリが*xvalue*の場合、上記式による出力後`E`のオブジェクトは有効だが未規定な状態となる

## 備考

`indirectly_writable`のモデルとなる`Out`の`operator*`は出力（上記式による代入文の左辺に来ること）だけが唯一有効な使用法であり、[`indirectly_readable`](indirectly_readable.md)である必要はない。

## 例

### C++20
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

#### 出力
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


### C++23 で満たすようになった型
```cpp example
#include <iostream>
#include <concepts>
#include <iterator>
#include <utility>
#include <tuple>
#include <vector>

template <typename Out, typename T>
requires std::indirectly_writable<Out, T>
void f(const char* out, const char* t)
{
	std::cout << out << " is indirectly writable " << t << std::endl;
}

template <typename Out, typename T>
void f(const char* out, const char* t)
{
	std::cout << out << " is not indirectly writable " << t << std::endl;
}

struct ret_proxy_pair
{
  // 全ての要素がプロキシ参照である pair はプロキシ参照
	std::pair<int&, std::pair<int&, int&>> operator*();
};

struct ret_proxy_tuple
{
  // 全ての要素がプロキシ参照である tuple はプロキシ参照
	std::tuple<int&, std::tuple<int&>> operator*();
};


int main()
{
	f<std::vector<bool>::iterator, bool>("std::vector<bool>::iterator", "bool");
	f<ret_proxy_pair, std::pair<int, std::pair<int, int>>>("ret_proxy_pair", "std::pair<int, std::pair<int, int>>");
	f<ret_proxy_tuple, std::tuple<int, std::tuple<int>>>("ret_proxy_tuple", "std::tuple<int, std::tuple<int>>");
}
```
* std::indirectly_writable[color ff0000]

#### 出力
```
std::vector<bool>::iterator is indirectly writable bool
ret_proxy_pair is indirectly writable std::pair<int, std::pair<int, int>>
ret_proxy_tuple is indirectly writable std::tuple<int, std::tuple<int>>

```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 6 [mark verified]

## 関連項目

- [C++20 コンセプト](/lang/cpp20/concepts.md)

## 参照

- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
- [P2214R0 A Plan for C++23 Ranges](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2214r0.html#a-tuple-that-is-writable)
    - `const_cast`を用いる制約式についての説明がなされている
