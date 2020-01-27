# transform
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class InputIterator, class OutputIterator, class UnaryOperation>
  OutputIterator
    transform(InputIterator first,
              InputIterator last,
              OutputIterator result,
              UnaryOperation op);         // (1) C++03

  template <class InputIterator, class OutputIterator, class UnaryOperation>
  constexpr OutputIterator
    transform(InputIterator first,
              InputIterator last,
              OutputIterator result,
              UnaryOperation op);         // (1) C++20

  template <class InputIterator1, class InputIterator2,
            class OutputIterator, class BinaryOperation>
  OutputIterator
    transform(InputIterator1 first1,
              InputIterator1 last1,
              InputIterator2 first2,
              OutputIterator result,
              BinaryOperation binary_op); // (2) C++03

  template <class InputIterator1, class InputIterator2,
            class OutputIterator, class BinaryOperation>
  constexpr OutputIterator
    transform(InputIterator1 first1,
              InputIterator1 last1,
              InputIterator2 first2,
              OutputIterator result,
              BinaryOperation binary_op); // (2) C++20

  template <class ExecutionPolicy, class ForwardIterator1, class ForwardIterator2,
            class UnaryOperation>
  ForwardIterator2
    transform(ExecutionPolicy&& exec,
              ForwardIterator1 first,
              ForwardIterator1 last,
              ForwardIterator2 result,
              UnaryOperation op);         // (3) C++17

  template <class ExecutionPolicy, class ForwardIterator1, class ForwardIterator2,
            class ForwardIterator, class BinaryOperation>
  ForwardIterator
    transform(ExecutionPolicy&& exec,
              ForwardIterator1 first1,
              ForwardIterator1 last1,
              ForwardIterator2 first2,
              ForwardIterator result,
              BinaryOperation binary_op); // (4) C++17
}
```


## 概要
全ての要素に関数を適用する。


## 要件
- (1) : `op` は、`[first,last]`, `[result,result + (last - first)]` 内のイテレータや subrange を無効にしたり、要素を書き換えてはならない。
- (2) : `binary_op` は、`[first1,last1]`, `[first2,first2 + (last1 - first1)]`, `[result,result + (last1 - first1)]` 内のイテレータや subrange を無効にしたり、要素を書き換えてはならない。

※ 閉区間で表しているのは意図的なもの


## 効果
- (1) : `[result,result + (last - first))` 内のイテレータ `i` の要素に、それぞれ `op(*(first + (i - result)))` を代入する
- (2) : `[result,result + (last1 - first1))` 内のイテレータ `i` の要素に、それぞれ `binary_op(*(first1 + (i - result)), *(first2 + (i - result)))` を代入する。


## 戻り値
- (1) : `result + (last - first)`
- (2) : `result + (last1 - first1)`


## 計算量
- (1) : �確に `last - first` 回の `op` の適用が行われる。
- (2) : �確に `last - first` 回の `binary_op` の適用が行われる。


## 備考
- (1) : `result` は `first` と同じであっても構わない。
- (2) : `result` は `first1` や `first2` と同じであっても構わない。


## (1)の例
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>
#include <string>
#include <iterator>

int main() {
  std::vector<int> v = { 3,1,4 };
  std::vector<std::string> result;

  // 2倍してから文�列に変換する
  std::transform(v.begin(), v.end(), std::back_inserter(result),
    [](int x) { return std::to_string(x * 2); });

  std::for_each(result.begin(), result.end(),
    [](const std::string& s) { std::cout << s << std::endl; });
}
```
* std::transform[color ff0000]
* std::to_string[link /reference/string/to_string.md]

### 出力
```
6
2
8
```


## (2)の例
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>
#include <string>
#include <iterator>

int main() {
  std::vector<char> v1 = { 'a','b','c' };
  std::vector<int> v2 = { 3,1,4 };
  std::vector<std::string> result;

  // v1[n] の文�を v2[n] 回繰り返した文�列を返す
  std::transform(v1.begin(), v1.end(), v2.begin(), std::back_inserter(result),
    [](char a, int b) { return std::string(b, a); });

  std::for_each(result.begin(), result.end(),
    [](const std::string& s) { std::cout << s << std::endl; });
}
```
* std::transform[color ff0000]
* result.begin()[link /reference/vector/vector/begin.md]
* result.end()[link /reference/vector/vector/end.md]
* std::to_string[link /reference/string/to_string.md]

### 出力
```
aaa
b
cccc
```


## 実装例
```cpp
template <class InputIterator, class OutputIterator, class UnaryOperation>
OutputIterator transform(InputIterator first, InputIterator last,
                         OutputIterator result, UnaryOperation op) {
  while (first != last)
    *result++ = op(*first++);
  return result;
}

template <class InputIterator1, class InputIterator2,
          class OutputIterator, class BinaryOperation>
OutputIterator transform(InputIterator1 first1,
                         InputIterator1 last1,
                         InputIterator2 first2,
                         OutputIterator result,
                         BinaryOperation binary_op) {
  while (first1 != last1)
    *result++ = binary_op(*first1++, *first2++);
  return result;
}
```


## 参照
- [P0202R3 Add Constexpr Modifiers to Functions in `<algorithm>` and `<utility>` Headers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0202r3.html)
- [P0467R2 Iterator Concerns for Parallel Algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0467r2.html)
