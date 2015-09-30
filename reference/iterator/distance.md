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

この関数は、以下のような状況で活用できる：

- [`std::find()`](/reference/algorithm/find.md)や[`std::find_if()`](/reference/algorithm/find_if.md)で検索し、見つかった要素が先頭から何番目かを調べる。

    ```cpp
std::vector<int> v = { … };
auto it = std::find_if(v.begin(), v.end(), pred);
std::size_t index = std::distance(v.begin(), it);
```
* std::vector[link /reference/vector.md]
* std::find_if[link /reference/algorithm/find_if.md]
* std::size_t[link /reference/cstddef/size_t.md]
* begin()[link /reference/vector/begin.md]

- [`std::forward_list`](/reference/forward_list.md)のような、要素数を直接取得できないコンテナに対して、イテレータ範囲で要素数を求める。

    ```cpp
std::forward_list<int> ls = { … };
std::size_t size = std::distance(ls.begin(), ls.end());
```
* std::forward_list[link /reference/forward_list.md]
* begin()[link /reference/forward_list/begin.md]
* end()[link /reference/forward_list/end.md]
* std::size_t[link /reference/cstddef/size_t.md]


##要件
- `InputIterator`がランダムアクセスイテレータの場合、`first`は`last`に到達可能、もしくは`last`から`first`に到達可能であること。
- それ以外のイテレータの場合には、`first`から`last`に到達可能であること。


##効果
- `InputIterator`がランダムアクセスイテレータの場合は、`last - first`が返る。
- それ以外のイテレータの場合は、`first`から`last`までイテレータをインクリメントしていき、距離をカウントする。


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


