#iterator_traits
* iterator[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class Iterator>
  struct iterator_traits {
    using difference_type   = typename Iterator::difference_type;
    using value_type        = typename Iterator::value_type;
    using pointer           = typename Iterator::pointer;
    using reference         = typename Iterator::reference;
    using iterator_category = typename Iterator::iterator_category;
  };

  // ポインタに対する特殊化
  template <class T>
  struct iterator_traits<T*> {
    using difference_type   = ptrdiff_t;
    using value_type        = T;
    using pointer           = T*;
    using reference         = T&;
    using iterator_category = random_access_iterator_tag;
  };

  template<class T>
  struct iterator_traits<const T*> {
    using difference_type   = ptrdiff_t;
    using value_type        = T;
    using pointer           = const T*;
    using reference         = const T&;
    using iterator_category = random_access_iterator_tag;
  };
}
```
* ptrdiff_t[link /reference/cstddef/ptrdiff_t.md]
* random_access_iterator_tag[link /reference/iterator/iterator_tag.md]

##概要
`iterator_traits`は、イテレータに関する型情報を取得するためのクラスである。

イテレータが指す値型、分類を取得でき、ポインタに対しても一様に適用できる。


| 型 | 説明 |
|---------------------|------------------------|
| `difference_type`   | イテレータの差を表す符号あり整数型 |
| `value_type`        | イテレータが指している値型 |
| `pointer`           | ポインタ型 |
| `reference`         | イテレータが指している参照型 |
| `iterator_category` | イテレータの分類を表す型(参照： [iterator tag](/reference/iterator/iterator_tag.md)) |


##例
```cpp
#include <iostream>
#include <vector>
#include <iterator>

// 範囲の合計値を計算する
template <class Iterator>
typename std::iterator_traits<Iterator>::value_type
    sum(Iterator first, Iterator last)
{
  // イテレータの型から値型を取得する
  typedef
    typename std::iterator_traits<Iterator>::value_type
  value_type;

  // 取得した値型の変数を定義し、合計値を計算する
  value_type result = value_type();
  for (; first != last; ++first) {
    result += *first;
  }
  return result;
}

int main()
{
  // std::vector
  {
    std::vector<int> v = {1, 2, 3, 4, 5};

    int result = sum(std::begin(v), std::end(v));
    std::cout << result << std::endl;
  }
  // ポインタ
  {
    int ar[] = {1, 2, 3, 4, 5};

    int result = sum(std::begin(ar), std::end(ar));
    std::cout << result << std::endl;
  }
}
```
* std::iterator_traits<Iterator>::value_type[color ff0000]

###出力
```
15
15
```

##参照


