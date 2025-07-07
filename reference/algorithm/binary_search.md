# binary_search
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class ForwardIterator,
            class T>
  bool
    binary_search(ForwardIterator first,
                  ForwardIterator last,
                  const T& value);       // (1) C++03
  template <class ForwardIterator,
            class T>
  constexpr bool
    binary_search(ForwardIterator first,
                  ForwardIterator last,
                  const T& value);       // (1) C++20

  template <class ForwardIterator,
            class T,
            class Compare>
  bool
    binary_search(ForwardIterator first,
                  ForwardIterator last,
                  const T& value,
                  Compare comp);         // (2) C++03
  template <class ForwardIterator,
            class T,
            class Compare>
  constexpr bool
    binary_search(ForwardIterator first,
                  ForwardIterator last,
                  const T& value,
                  Compare comp);         // (2) C++20
}
```

## 概要
イテレータ範囲`[first, last)`から、二分探索法によって条件一致する要素の検索を行う。


## 要件
`[first,last)` の要素 `e` は `e < value` および `!(value < e)`、または `comp(e, value)` および `!comp(value, e)` によって[区分化](/reference/algorithm.md#sequence-is-partitioned)されていなければならない。

また、`[first, last)` の全ての要素 `e` は、`e < value` であれば `!(value < e)` である、または `comp(e, value)` であれば `!comp(value, e)` である必要がある。


## 戻り値
`[first,last)` 内のイテレータ `i` について、`!(*i < value) && !(value < *i)` または `comp(*i, value) == false && comp(value, *i) == false` であるようなイテレータが見つかった場合は `true` を返す。


## 計算量
最大で log2(`last - first`) + O(1) 回の比較を行う


## 備考
- `comp` は 2 引数の関数オブジェクトで、1 番目の引数が 2 番目の引数「より小さい」場合に `true` を、そうでない場合に `false` を返すものとして扱われる。
- (1), (2) :
    - C++26 : 引数として波カッコ初期化`{}`を受け付ける
        ```cpp
        std::vector<T> v;
        bool found = std::binary_search(v.begin(), v.end(), {a, b});
        ```


## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  // binary_search で 4 を検索する場合、
  // 4 より小さい物、4 と等しい物、4 より大きい物がその順に並んでいれば、
  // 必ずしもソートされている必要はない。
  std::vector<int> v = {3, 1, 4, 6, 5};

  if (std::binary_search(v.begin(), v.end(), 4)) {
    std::cout << "found" << std::endl;
  }
  else {
    std::cout << "not found" << std::endl;
  }
}
```
* std::binary_search[color ff0000]

#### 出力
```
found
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
    {5, 6},
  };

  // 値{3, 4}を二分検索
  bool found = std::binary_search(v.begin(), v.end(), {3, 4});
  if (found) {
    std::cout << "found" << std::endl;
  }
  else {
    std::cout << "not found" << std::endl;
  }
}
```
* std::binary_search[color ff0000]

### 出力
```
found
```


## 実装例
```cpp
template <class ForwardIterator, class T>
bool binary_search(ForwardIterator first, ForwardIterator last,
                   const T& value)
{
  first = std::lower_bound(first, last, value);
  return first != last && !bool(value < *first);
}

template <class ForwardIterator, class T, class Compare>
bool binary_search(ForwardIterator first, ForwardIterator last,
                   const T& value, Compare comp)
{
  first = std::lower_bound(first, last, value, comp);
  return first != last && !bool(comp(value, *first));
}
```

## バージョン
### 言語
- C++98

### 処理系
- [Clang](/implementation.md#clang): 14.0.6 [mark verified]
- [GCC](/implementation.md#gcc): 9.5.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照
- [LWG Issue 787. complexity of `binary_search`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#787)
    - C++03までの計算量が間違っていたので、C++11で修正。
- [P0202R3 Add Constexpr Modifiers to Functions in `<algorithm>` and `<utility>` Headers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0202r3.html)
- [P2248R8 Enabling list-initialization for algorithms](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2248r8.html)
    - C++26で波カッコ初期化 (リスト初期化) に対応した
