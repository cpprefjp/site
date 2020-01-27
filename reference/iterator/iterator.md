# iterator
* iterator[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp17deprecated[meta cpp]

```cpp
namespace std {
  template<class Category,
           class T,
           class Distance = ptrdiff_t,
           class Pointer = T*,
           class Reference = T&>
  struct iterator {
    using value_type        = T;
    using difference_type   = Distance;
    using pointer           = Pointer;
    using reference         = Reference;
    using iterator_category = Category;
  };
}
```
* ptrdiff_t[link /reference/cstddef/ptrdiff_t.md]

この機能は、C++17から非推奨となった。


## 概要
`std::iterator`クラスは、イテレータを定義するための基底クラスである。

イテレータの実装に必要となるいくつかの型の別名定義を簡略化するために使用できる。


| テンプレートパラメータ | 説明 |
|-------------|-----------------|
| `Category`  | イテレータの分類。 (参照： [iterator tag](/reference/iterator/iterator_tag.md)) |
| `T`         | イテレータが指す値型 |
| `Distance`  | イテレータ間の差を表す符号付き整数型。 デフォルトは[`std::ptrdiff_t`](/reference/cstddef/ptrdiff_t.md) |
| `Pointer`   | イテレータが指す値のポインタ型 デフォルトは`T*` |
| `Reference` | イテレータが指す値の参照型 デフォルトは`T&` |


## 非推奨の詳細
この機能はイテレータを自作する際に使用するが、このクラスを使用したとしても、イテレータの定義は容易にならなかった。また、このクラスを使用してイテレータを実装することで、ほかの問題も発生していたため、この機能は非推奨となった。


## 例
```cpp example
#include <iostream>
#include <iterator>
#include <algorithm>

// インクリメントするイテレータ
class increment_iterator
    : public std::iterator<std::input_iterator_tag, int> {

  int x_;

public:
  increment_iterator(int x = 0) : x_(x) {}

  increment_iterator& operator++()
  {
    ++x_;
    return *this;
  }

  increment_iterator operator++(int)
  {
    int tmp = x_;
    ++x_;
    return increment_iterator(tmp);
  }

  int operator*() const
    { return x_; }
};

inline bool operator==(const increment_iterator& a, const increment_iterator& b)
  { return *a == *b; }

inline bool operator!=(const increment_iterator& a, const increment_iterator& b)
  { return !(a == b); }

inline bool operator<(const increment_iterator& a, const increment_iterator& b)
  { return *a < *b; }

inline bool operator<=(const increment_iterator& a, const increment_iterator& b)
  { return !(b < a); }

inline bool operator>(const increment_iterator& a, const increment_iterator& b)
  { return b < a; }

inline bool operator>=(const increment_iterator& a, const increment_iterator& b)
  { return !(a < b); }

int main()
{
  increment_iterator first(0);
  increment_iterator last(10);

  std::for_each(first, last, [](int x) {
    std::cout << x << std::endl;
  });
}
```
* std::iterator[color ff0000]
* std::input_iterator_tag[link iterator_tag.md]

### 出力
```
0
1
2
3
4
5
6
7
8
9
```

## 参照
- `std::iterator`は型定義のみを簡略化するが、これを発展させた[Boost Iterators Library](http://www.boost.org/doc/libs/release/libs/iterator/doc/index.html)は、演算�定義も簡略化する機能を提供している。
- [P0174R2 Deprecating Vestigial Library Parts in C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0174r2.html)
