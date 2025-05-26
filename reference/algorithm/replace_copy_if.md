# replace_copy_if
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class InputIterator,
            class OutputIterator,
            class Predicate,
            class T>
  OutputIterator
    replace_copy_if(InputIterator first,
                    InputIterator last,
                    OutputIterator result,
                    Predicate pred,
                    const T& new_value);     // (1) C++03
  template <class InputIterator,
            class OutputIterator,
            class Predicate,
            class T>
  constexpr OutputIterator
    replace_copy_if(InputIterator first,
                    InputIterator last,
                    OutputIterator result,
                    Predicate pred,
                    const T& new_value);     // (1) C++20
  template <class InputIterator,
            class OutputIterator,
            class Predicate,
            class T = typename iterator_traits<OutputIterator>::value_type>
  constexpr OutputIterator
    replace_copy_if(InputIterator first,
                    InputIterator last,
                    OutputIterator result,
                    Predicate pred,
                    const T& new_value);     // (1) C++26

  template <class ExecutionPolicy,
            class ForwardIterator1,
            class ForwardIterator2,
            class Predicate,
            class T>
  ForwardIterator2
    replace_copy_if(ExecutionPolicy&& exec,
                    ForwardIterator1 first,
                    ForwardIterator1 last,
                    ForwardIterator2 result,
                    Predicate pred,
                    const T& new_value);     // (2) C++17
  template <class ExecutionPolicy,
            class ForwardIterator1,
            class ForwardIterator2,
            class Predicate,
            class T = typename iterator_traits<ForwardIterator2>::value_type>
  ForwardIterator2
    replace_copy_if(ExecutionPolicy&& exec,
                    ForwardIterator1 first,
                    ForwardIterator1 last,
                    ForwardIterator2 result,
                    Predicate pred,
                    const T& new_value);     // (2) C++26
}
```

## 概要
イテレータ範囲`[first, last)`のうち、条件を満たす要素を指定された値に置き換え、その結果を出力の範囲へコピーする。


## 適格要件
- `*first` と `new_value` は `result` へ書き込み可能であること


## 事前条件
- `[first,last)` と `[result,result + (last - first))` の範囲が重なっていてはならない


## 効果
`[result,result + (last - first))` 内のイテレータ `i` について、`pred(*(first + (i - result))) != false` である場合は `new_value` が代入され、そうでない場合は `*(first + (i - result))` が 代入される。


## 戻り値
`result + (last - first)`


## 計算量
正確に `last - first` 回の述語の適用を行う


## 備考
- (1), (2) :
    - C++26 : 引数として波カッコ初期化`{}`を受け付ける
        ```cpp
        std::vector<T> v;
        std::replace_copy_if(v.begin(), v.end(), result, pred, {a, b});
        ```


## 例
### 基本的な使い方
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>
#include <iterator>

int main() {
  std::vector<int> v = { 3,1,2,1,2 };

  // 奇数の要素を全部 10 に置き換えたものを出力する
  std::replace_copy_if(v.begin(), v.end(),
    std::ostream_iterator<int>(std::cout, ","),
    [](int x) { return x%2 != 0; }, 10);
}
```
* std::replace_copy_if[color ff0000]

#### 出力
```
10,10,2,10,2,
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
  return os << p.x << ',' << p.y << std::endl;
}

int main() {
  std::vector<Point> v = {
    {1, 2},
    {3, 4},
    {5, 6},
    {1, 2},
  };

  // 値が{1, 2}の要素をすべて{9, 9}に置き換えたものを出力する
  std::replace_copy_if(
    v.begin(),
    v.end(),
    std::ostream_iterator<int>(std::cout, "\n"),
    [](const Point& p) { return p.x == 1 && p.y == 2; },
    {9, 9}
  );
}
```
* std::replace_copy_if[color ff0000]

#### 出力
```
9,9
3,4
5,6
9,9
```

## 実装例
```cpp
template <class InputIterator, class OutputIterator, class Predicate, class T>
OutputIterator replace_copy_if(InputIterator first, InputIterator last, OutputIterator result,
                               Predicate pred, const T& new_value) {
  for ( ; first != last; ++first)
    *result++ = pred(*first, old_value) ? new_value : *first;
  return result;
}
```


## 参照
- [P0202R3 Add Constexpr Modifiers to Functions in `<algorithm>` and `<utility>` Headers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0202r3.html)
- [P0467R2 Iterator Concerns for Parallel Algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0467r2.html)
- [P2248R8 Enabling list-initialization for algorithms](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2248r8.html)
    - C++26で波カッコ初期化 (リスト初期化) に対応した
