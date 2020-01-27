# distance
* iterator[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class InputIterator>
  typename iterator_traits<InputIterator>::difference_type
    distance(InputIterator first, InputIterator last);     // C++03

  template <class InputIterator>
  constexpr typename iterator_traits<InputIterator>::difference_type
    distance(InputIterator first, InputIterator last);     // C++17
}
```

## 概要
イテレータ間の距離を求める。

この関数は、以下のような状況で活用できる：

- [`std::find()`](/reference/algorithm/find.md)や[`std::find_if()`](/reference/algorithm/find_if.md)で検索し、見つかった要素が先�から何番目かを調べる。

    ```cpp
    std::vector<int> v = { … };
    auto it = std::find_if(v.begin(), v.end(), pred);
    std::size_t index = std::distance(v.begin(), it);
    ```
    * std::distance[color ff0000]
    * std::find_if[link /reference/algorithm/find_if.md]

- [`std::forward_list`](/reference/forward_list/forward_list.md)のような、要素数を直接取得できないコンテナに対して、イテレータ範囲で要素数を求める。

    ```cpp
    std::forward_list<int> ls = { … };
    std::size_t size = std::distance(ls.begin(), ls.end());
    ```
    * std::distance[color ff0000]
    * std::forward_list[link /reference/forward_list/forward_list.md]
    * ls.begin()[link /reference/forward_list/forward_list/begin.md]
    * ls.end()[link /reference/forward_list/forward_list/end.md]


## 要件
- `InputIterator`がランダムアクセスイテレータの場合、`first`は`last`に到達可能、もしくは`last`から`first`に到達可能であること。
- それ以外のイテレータの場合には、`first`から`last`に到達可能であること。


## 効果
- `InputIterator`がランダムアクセスイテレータの場合は、`last - first`が返る。
- それ以外のイテレータの場合は、`first`から`last`までイテレータをインクリメントしていき、距離をカウントする。


## 戻り値
`first`から`last`までの距離


## 計算量
`InputIterator`がランダムアクセスイテレータの場合はO(1)。それ以外のイテレータの場合はO(n)。


## 例
```cpp example
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
* std::distance[color ff0000]
* ls.begin()[link /reference/list/list/begin.md]
* ls.end()[link /reference/list/list/end.md]

### 出力
```
3
5
```

## 実装例
```cpp
template <class InputIterator>
typename std::iterator_traits<InputIterator>::difference_type
    distance_impl(InputIterator first, InputIterator last,
                  std::input_iterator_tag)
{
  using result_type = typename std::iterator_traits<InputIterator>::difference_type;

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
* std::iterator_traits[link iterator_traits.md]
* std::input_iterator_tag[link iterator_tag.md]
* std::random_access_iterator_tag[link iterator_tag.md]


## 参照
- [P0031R0 A Proposal to Add Constexpr Modifiers to `reverse_iterator`, `move_iterator`, `array` and Range Access](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0031r0.html)
