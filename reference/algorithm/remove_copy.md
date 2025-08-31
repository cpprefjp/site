# remove_copy
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class InputIterator,
            class OutputIterator,
            class T>
  OutputIterator
    remove_copy(InputIterator first,
                InputIterator last,
                OutputIterator result,
                const T& value);         // (1) C++03
  template <class InputIterator,
            class OutputIterator,
            class T>
  constexpr OutputIterator
    remove_copy(InputIterator first,
                InputIterator last,
                OutputIterator result,
                const T& value);         // (1) C++20
  template <class InputIterator,
            class OutputIterator,
            class T = typename iterator_traits<InputIterator>::value_type>
  constexpr OutputIterator
    remove_copy(InputIterator first,
                InputIterator last,
                OutputIterator result,
                const T& value);         // (1) C++26

  template <class ExecutionPolicy,
            class ForwardIterator1,
            class ForwardIterator2,
            class T>
  ForwardIterator2
    remove_copy(ExecutionPolicy&& exec,
                ForwardIterator1 first,
                ForwardIterator1 last,
                ForwardIterator2 result,
                const T& value);         // (2) C++17
  template <class ExecutionPolicy,
            class ForwardIterator1,
            class ForwardIterator2,
            class T = typename iterator_traits<ForwardIterator1>::value_type>
  ForwardIterator2
    remove_copy(ExecutionPolicy&& exec,
                ForwardIterator1 first,
                ForwardIterator1 last,
                ForwardIterator2 result,
                const T& value);         // (2) C++26
}
```

## 概要
イテレータ範囲`[first, last)`から指定された要素を除け、その結果を出力の範囲へコピーする。


## 適格要件
- `*result = *first` という式が有効であること


## 事前条件
- `[first,last)` と `[result,result + (last - first))` は重なってはならない。


## 効果
`[first,last)` 内にあるイテレータ `i` について、`*i == value` でない要素を `result` へコピーする


## 戻り値
実行結果の範囲の終端を返す


## 計算量
正確に `last - first` 回の比較を行う


## 備考
- 安定。
- (1), (2) :
    - C++26 : 引数として波カッコ初期化`{}`を受け付ける
        ```cpp
        std::vector<T> v;
        std::remove_copy(v.begin(), v.end(), result, {a, b});
        ```


## 例
### 基本的な使い方
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>
#include <iterator>

int main() {
  std::vector<int> v = { 2,3,1,2,1 };

  // 1 を除去した結果を出力する
  std::remove_copy(v.begin(), v.end(),
    std::ostream_iterator<int>(std::cout, ","), 1);
}
```
* std::remove_copy[color ff0000]

#### 出力
```
2,3,2,
```

### 波カッコ初期化を入力として使用する (C++26)
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>
#include <iterator>

struct Point {
  int x;
  int y;

  bool operator==(const Point& other) const = default;
};

std::ostream& operator<<(std::ostream& os, const Point& p) {
  return os << p.x << "," << p.y;
}

int main() {
  std::vector<Point> v = {
    {1, 2},
    {3, 4},
    {5, 6},
    {1, 2},
  };

  // 値{1, 2}を除去した結果を出力する
  std::remove_copy(
    v.begin(),
    v.end(),
    std::ostream_iterator<Point>(std::cout, "\n"),
    {1, 2}
  );
}
```
* std::remove_copy[color ff0000]

#### 出力
```
3,4
5,6
```


## 実装例
```cpp
template <class InputIterator, class OutputIterator, class T>
OutputIterator remove_copy(InputIterator first, InputIterator last,
                           OutputIterator result, const T& value) {
  for ( ; first != last; ++first)
    if (!(*first == value))
      *result++ = *first;
  return result;
}
```


## 参照
- [P0202R3 Add Constexpr Modifiers to Functions in `<algorithm>` and `<utility>` Headers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0202r3.html)
- [P0467R2 Iterator Concerns for Parallel Algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0467r2.html)
- [P2248R8 Enabling list-initialization for algorithms](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2248r8.html)
    - C++26で波カッコ初期化 (リスト初期化) に対応した
