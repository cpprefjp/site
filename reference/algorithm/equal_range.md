# equal_range
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class ForwardIterator,
            class T>
  pair<ForwardIterator, ForwardIterator>
    equal_range(ForwardIterator first,
                ForwardIterator last,
                const T& value);      // (1) C++03
  template <class ForwardIterator,
            class T>
  constexpr pair<ForwardIterator, ForwardIterator>
    equal_range(ForwardIterator first,
                ForwardIterator last,
                const T& value);      // (1) C++20
  template <class ForwardIterator,
            class T = typename iterator_traits<ForwardIterator>::value_type>
  constexpr pair<ForwardIterator, ForwardIterator>
    equal_range(ForwardIterator first,
                ForwardIterator last,
                const T& value);      // (1) C++26

  template <class ForwardIterator,
            class T,
            class Compare>
  pair<ForwardIterator, ForwardIterator>
    equal_range(ForwardIterator first,
                ForwardIterator last,
                const T& value,
                Compare comp);        // (2) C++03
  template <class ForwardIterator,
            class T,
            class Compare>
  constexpr pair<ForwardIterator, ForwardIterator>
    equal_range(ForwardIterator first,
                ForwardIterator last,
                const T& value,
                Compare comp);        // (2) C++20
  template <class ForwardIterator,
            class T = typename iterator_traits<ForwardIterator>::value_type,
            class Compare>
  constexpr pair<ForwardIterator, ForwardIterator>
    equal_range(ForwardIterator first,
                ForwardIterator last,
                const T& value,
                Compare comp);        // (2) C++26
}
```
* pair[link /reference/utility/pair.md]


## 概要
[`lower_bound()`](/reference/algorithm/lower_bound.md)と[`upper_bound()`](/reference/algorithm/upper_bound.md)の結果を組で取得する。


## 要件
`[first,last)` の要素 `e` は `e < value` および `!(value < e)` 、あるいは `comp(e, value)` および `!comp(value, e)` によって[区分化](/reference/algorithm.md#sequence-is-partitioned)されていなければならない。

また、`[first, last)` の要素 `e` は全て暗黙に、`e < value` が `!(value < e)` または `comp(e, value)` が `!comp(value, e)` を意味している必要がある。


## 戻り値
- (1) : [`make_pair`](/reference/utility/make_pair.md)([`lower_bound`](/reference/algorithm/lower_bound.md)`(first, last, value),` [`upper_bound`](/reference/algorithm/upper_bound.md)`(first, last, value))`
- (2) : [`make_pair`](/reference/utility/make_pair.md)([`lower_bound`](/reference/algorithm/lower_bound.md)`(first, last, value, comp),` [`upper_bound`](/reference/algorithm/upper_bound.md)`(first, last, value, comp))`


## 計算量
最大で 2 * log2(`last - first`) + O(1) 回の比較を行う


## 備考
- (1), (2) :
    - C++26 : 引数として波カッコ初期化`{}`を受け付ける
        ```cpp
        std::vector<T> v;
        auto result = std::equal_range(v.begin(), v.end(), {a, b});
        ```


## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {3, 1, 4, 2, 5};

  std::sort(v.begin(), v.end());

  // 3以上の要素と、3より大きい要素を二分探索で検索
  auto result = std::equal_range(v.begin(), v.end(), 3);

  std::cout << *result.first << std::endl;
  std::cout << *result.second << std::endl;
}
```
* equal_range[color ff0000]

#### 出力
```
3
4
```

### 波カッコ初期化を入力として使用する (C++26)
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>

struct Point {
  int x;
  int y;

  bool operator==(const Point& other) const = default;
  auto operator<=>(const Point& other) const = default;
};

int main() {
  std::vector<Point> v = {
    {1, 2},
    {3, 4},
    {3, 4},
    {5, 6},
  };

  // 値{3, 4}が見つかる範囲を取得
  auto result = std::equal_range(v.begin(), v.end(), {3, 4});

  while (result.first != result.second) {
    std::cout << result.first->x << "," << result.first->y << std::endl;
    ++result.first;
  }
}
```
* std::equal_range[color ff0000]

#### 出力
```
3,4
3,4
```

## 参照
- [LWG Issue 384. `equal_range` has unimplementable runtime complexity](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#384)
- [P0202R3 Add Constexpr Modifiers to Functions in `<algorithm>` and `<utility>` Headers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0202r3.html)
- [P2248R8 Enabling list-initialization for algorithms](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2248r8.html)
    - C++26で波カッコ初期化 (リスト初期化) に対応した
