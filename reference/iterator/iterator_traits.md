```cpp
namespace std {

  template <class Iterator>
  struct iterator_traits {
    typedef typename Iterator::difference_type difference_type;
    typedef typename Iterator::value_type value_type;
    typedef typename Iterator::pointer pointer;
    typedef typename Iterator::reference reference;
    typedef typename Iterator::iterator_category iterator_category;
  };

  // ポインタに対する特殊化
  template <class T>
  struct iterator_traits<T*> {

    typedef ptrdiff_t difference_type;
    typedef T value_type;
    typedef T* pointer;
    typedef T& reference;
    typedef random_access_iterator_tag iterator_category;
  };

  template<class T>
  struct iterator_traits<const T*> {
    typedef ptrdiff_t difference_type;
    typedef T value_type;
    typedef const T* pointer;
    typedef const T& reference;
    typedef random_access_iterator_tag iterator_category;
  };
}
```

##概要

イテレータに関する型情報を取得するクラス。
イテレータが指す値型、分類を取得でき、ポインタに対しても一様に適用できる。


| | |
|--------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| `difference_type` | イテレータの差 |
| `value_type` | イテレータが指している値型 |
| `pointer` | ポインタ型 |
| `reference` | イテレータが指している参照型 |
| `iterator_category` | イテレータの分類を表す型(参照： [iterator tag](/reference/iterator/iterator_tag)) |


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

```cpp
15
15
```

##参照


