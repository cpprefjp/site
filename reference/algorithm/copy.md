# copy
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class InputIterator, class OutputIterator>
  OutputIterator
    copy(InputIterator first,
         InputIterator last,
         OutputIterator result);   // (1) C++03

  template <class InputIterator, class OutputIterator>
  constexpr OutputIterator
    copy(InputIterator first,
         InputIterator last,
         OutputIterator result);   // (1) C++20

  template <class ExecutionPolicy, class ForwardIterator1, class ForwardIterator2>
  ForwardIterator2
    copy(ExecutionPolicy&& exec,
         ForwardIterator1 first,
         ForwardIterator1 last,
         ForwardIterator2 result); // (2) C++17
}
```

## 概要
指定されたイテレータ範囲`[first, last)`の要素を出力イテレータにコピーする。


## 要件
`result` はイテレータ範囲 `[first,last)` に含まれてはならない。


## 効果
`[first,last)` 内の要素を、それぞれ `[result,result + (last - first))` へコピーする。

コピーは `first` から順番に行い、0 以上 `last - first` 未満であるそれぞれの `n` について、`*(result + n) = *(first + n)` を行う。


## 戻り値
`result + (last - first)`


## 計算量
正確に `last - first` 回代入が行われる。


## 例
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>
#include <list>
#include <iterator>

int main() {
  std::vector<int> v = { 3,1,2 };

  // v から v2 へ普通にコピーする
  std::vector<int> v2(v.size()); // ちゃんと確保しておくこと
  std::copy(v.begin(), v.end(), v2.begin());

  // back_inserter を使って v3 へ設定。
  // back_inserter は要素をコピーするときに v3.push_back() するイテレータを作る関数。
  std::list<int> ls3;
  std::copy(v2.begin(), v2.end(), std::back_inserter(ls3));

  // ostream_iterator を使って出力。
  // ostream_iterator<int>(cout, ",") は要素をコピーするときに cout << x << "," としてくれるイテレータ。
  std::copy(ls3.begin(), ls3.end(), std::ostream_iterator<int>(std::cout, ","));
}
```
* std::copy[color ff0000]

### 出力
```
3,1,2,
```


## 実装例
```cpp
template <class InputIterator, class OutputIterator>
OutputIterator copy(InputIterator first, InputIterator last, OutputIterator result) {
  while (first != last)
    *result++ = *first++;
  return result;
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
- [P0202R3 Add Constexpr Modifiers to Functions in `<algorithm>` and `<utility>` Headers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0202r3.html)
- [P0467R2 Iterator Concerns for Parallel Algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0467r2.html)
