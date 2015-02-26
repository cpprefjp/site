#distance
* iterator[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class InputIterator>
  typename iterator_traits<InputIterator>::difference_type
              distance(InputIterator first, InputIterator last);
}
```

##概要
イテレータ間の距離を求める。


##要件
`InputIterator`がランダムアクセスイテレータの場合、`first`は`last`に到達可能、もしくは`last`から`first`に到達可能であること。
それ以外のイテレータの場合には、`first`から`last`に到達可能であること。


##効果
`InputIterator`がランダムアクセスイテレータの場合は、`last - first`が返る。
それ以外のイテレータの場合は、`first`から`last`までイテレータをインクリメントしていき、距離をカウントする。


##戻り値
`first`から`last`までの距離


##計算量
`InputIterator`がランダムアクセスイテレータの場合はO(1)。それ以外のイテレータの場合はO(n)。


##例
```cpp
#include <iterator>
#include <iostream>
#include <vector>
#include <list>

int main()
{
  {
    std::vector<int> v = {3, 1, 4};
    std::size_t d = std::distance(v.begin(), v.end());

    std::cout << d << std::endl;
  }
  {
    std::list<int> ls = {3, 1, 4, 5, 2};
    std::size_t d = std::distance(ls.begin(), ls.end());

    std::cout << d << std::endl;
  }
}
```
* distance[color ff0000]
* distance[color ff0000]

###出力
```
3
5
```

##実装例
```cpp
template <class InputIterator>
typename std::iterator_traits<InputIterator>::difference_type
    distance_impl(InputIterator first, InputIterator last,
                  std::input_iterator_tag)
{
  typedef
    typename std::iterator_traits<InputIterator>::difference_type
  result_type;

  result_type n = 0;
  for (; first != last; ++first) {
    ++n;
  }
  return n;
}

template <class RandomAccessIterator>
typename std::iterator_traits<RandomAccessIterator>::difference_type
    distance_impl(RandomAccessIterator first, RandomAccessIterator last,
                  std::random_access_iterator_tag)
{
  return last - first;
}

template <class InputIterator>
typename std::iterator_traits<InputIterator>::difference_type
    distance(InputIterator first, InputIterator last)
{
  return distance_impl(first, last,
              typename std::iterator_traits<InputIterator>::iterator_category());
}
```

##参照


