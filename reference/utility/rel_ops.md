# rel_ops
* utility[meta header]
* std[meta namespace]
* namespace[meta id-type]
* cpp20deprecated[meta cpp]

```cpp
namespace std {
namespace rel_ops {
  template <class T> bool operator!= ( const T& x, const T& y );
  template <class T> bool operator>  ( const T& x, const T& y );
  template <class T> bool operator<= ( const T& x, const T& y );
  template <class T> bool operator>= ( const T& x, const T& y );
}}
```

この機能は、C++20から非推奨となった。代わりに[一貫比較](/lang/cpp20/consistent_comparison.md)機能を使用すること。

## 概要
`std::rel_ops`名前空間は、関係演算�を自動的に定義する。

`operator!=()`は、`operator==()`によって定義され、`operator>()`、`operator<=()`、`operator>=()`は、`operator<()`によって定義される。

各演算�の定義は以下の通りである：

```cpp
namespace std {
namespace rel_ops {
  template <class T> bool operator!= ( const T& x, const T& y ) { return !( x == y ); }
  template <class T> bool operator>  ( const T& x, const T& y ) { return    y < x;   }
  template <class T> bool operator<= ( const T& x, const T& y ) { return !( y < x ); }
  template <class T> bool operator>= ( const T& x, const T& y ) { return !( x < y ); }
}}
```

## 要件
`operator!=()`に対し、型`T`は`EqualityComparable`である必要がある。

すなわち、型`T`は`operator==()`による比較が可能であり、その比較は反射律、対象律、推移律を満たさ�ばならない。


`operator>()`、`operator<=()`、`operator>=()`に対し、型`T`は`LessThanComparable`である必要がある。

すなわち、型`T`は`operator<()`による比較が可能であり、その比較は[�義の弱順序](/reference/algorithm.md#strict-weak-ordering)でなければならない。


## 非推奨の詳細
C++20で[一貫比較演算�](/lang/cpp20/consistent_comparison.md)が追加された。この機能によって比較演算�を容易に定義できるようになったため、比較演算�の簡潔な定義をサポートする本機能は不要になった。


## 例
```cpp example
#include <utility>

struct X {
  int value;
};

bool operator==(const X& a, const X& b)
{
  return a.value == b.value;
}

bool operator<(const X& a, const X& b)
{
  return a.value < b.value;
}

// operator==()、operator<()以外は自動定義
bool operator!=(const X& a, const X& b)
{
  return std::rel_ops::operator!=(a, b);
}

bool operator>(const X& a, const X& b)
{
  return std::rel_ops::operator>(a, b);
}

bool operator<=(const X& a, const X& b)
{
  return std::rel_ops::operator<=(a, b);
}

bool operator>=(const X& a, const X& b)
{
  return std::rel_ops::operator>=(a, b);
}

int main()
{
  const X a = {1};
  const X b = {1};
  const X c = {2};

  if (a == b) {}
  if (a != b) {}
  if (a <  c) {}
  if (a <= c) {}
  if (a >  c) {}
  if (a >= c) {}
}
```
* std::rel_ops::operator!=[color ff0000]
* std::rel_ops::operator>[color ff0000]
* std::rel_ops::operator<=[color ff0000]
* std::rel_ops::operator>=[color ff0000]

### 出力
```
```

## 参照
- このライブラリを使う場合、 Boost Operators Libraryの使用も検討すべきである。
    - [Boost Operators Library](http://www.boost.org/doc/libs/release/libs/utility/operators.htm)
    - [演算�を自動定義する - Boost逆引きリファレンス](https://boostjp.github.io/tips/operators.html)
- [P0768R1 Library Support for the Spaceship (Comparison) Operator](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0768r1.pdf)
