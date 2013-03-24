#iterator
```cpp
namespace std {
  template<class Category,
           class T,
           class Distance = ptrdiff_t,
           class Pointer = T*,
           class Reference = T&>
  struct iterator {
    typedef T value_type;
    typedef Distance difference_type;
    typedef Pointer pointer;
    typedef Reference reference;
    typedef Category iterator_category;
  };
}
```

##概要

`std::iterator`クラスは、イテレータを定義するための基本クラスである。
イテレータ定義に必要ないくつかのtypedefを簡略化するために使用できる。


| | |
|-----------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| テンプレートパラメータ | 説明 |
| `Category` | イテレータの分類。 (参照： [iterator tag](/reference/iterator/iterator_tag)) |
| `T` | イテレータが指す値型 |
| `Distance` | イテレータ間の差を表す型。 デフォルトは`std::ptrdiff_t` |
| `Pointer` | イテレータが指す値のポインタ型 デフォルトは`T*` |
| `Reference` | イテレータが指す値の参照型 デフォルトは`T&` |


##例

```cpp
#include <iostream>
#include <iterator>
#include <algorithm> // for_each

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
* iterator[color ff0000]

###出力

```cpp
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

##参照

- std::iteratorは型定義のみを簡略化するが、これを発展させた[Boost Iterators Library](http://www.boost.org/doc/libs/release/libs/iterator/doc/index.html)は、演算子定義も簡略化する機能を提供している。

