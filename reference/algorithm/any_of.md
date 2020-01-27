# any_of
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class InputIterator, class Predicate>
  bool any_of(InputIterator first,
              InputIterator last,
              Predicate pred);                // (1) C++11

  template <class InputIterator, class Predicate>
  constexpr bool any_of(InputIterator first,
                        InputIterator last,
                        Predicate pred);      // (1) C++20

  template <class ExecutionPolicy, class ForwardIterator, class Predicate>
  bool any_of(ExecutionPolicy&& exec,
              ForwardIterator first,
              ForwardIterator last,
              Predicate pred);                // (2) C++17
}
```

## 概要
範囲のいずれかの要素が条件を満たすかを判定する。


## 戻り値
`[first,last)` 内のイテレータ `i` について `pred(*i)` が `true` になるような要素があれば`true`を返し、そうでなければ`false`を返す。
`[first,last)`の範囲が空の場合は`false`を返す。


## 計算量
最大で `last - first` 回 `pred` を実行する。


## 例
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
  std::vector<int> v = { 3, 1, 4 };

  std::cout << std::boolalpha;

  // 5 以上の要素が�在するかどうか
  bool result1 = std::any_of(v.begin(), v.end(), [](int x) { return x >= 5; });
  std::cout << result1 << std::endl;

  // 1 の要素が�在するかどうか
  bool result2 = std::any_of(v.begin(), v.end(), [](int x) { return x == 1; });
  std::cout << result2 << std::endl;
}
```
* std::any_of[color ff0000]

### 出力
```
false
true
```


## 実装例
```cpp
template <class InputIterator, class Predicate>
bool any_of(InputIterator first, InputIterator last, Predicate pred) {
  for ( ; first != last; ++first)
    if (pred(*first)) return true;
  return false;
}
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 4.4.7
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013, 2015


## 関連項目
- [`all_of`](/reference/algorithm/all_of.md)
- [`none_of`](/reference/algorithm/none_of.md)


## 参照
- [N2569 More STL algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2569.pdf)
- [N2666 More STL algorithms (revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2666.pdf)
- [P0202R3 Add Constexpr Modifiers to Functions in `<algorithm>` and `<utility>` Headers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0202r3.html)
- [P0467R2 Iterator Concerns for Parallel Algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0467r2.html)
