# none_of
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class InputIterator, class Predicate>
  bool none_of(InputIterator first,
               InputIterator last,
               Predicate pred);               // (1) C++11

  template <class InputIterator, class Predicate>
  constexpr bool none_of(InputIterator first,
                         InputIterator last,
                         Predicate pred);     // (1) C++20

  template <class ExecutionPolicy, class ForwardIterator, class Predicate>
  bool none_of(ExecutionPolicy&& exec,
               ForwardIterator first,
               ForwardIterator last,
               Predicate pred);               // (2) C++17
}
```

## 概要
イテレータ範囲`[first, last)`の全ての要素が条件を満たさないかを判定する。


## 戻り値
イテレータ範囲`[first,last)` が空であったり、イテレータ範囲`[first,last)` 内の全てのイテレータ `i` について `pred(*i)` が `false` である場合は `true` を返し、そうでない場合は `false` を返す。


## 計算量
最大で `last - first` 回 `pred` を実行する。


### 備考
この関数は

```cpp
all_of(first, last, not1(pred));
```
* all_of[link /reference/algorithm/all_of.md]

とほぼ同じであるが、全ての要素が条件を満たしていないということを明示したい場合は `none_of()` を使う方が意図が伝わりやすい。


## 例
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
  std::vector<int> v = { 3, 1, 4 };

  std::cout << std::boolalpha;

  // 全ての要素が 3 以上であるか
  bool result1 = std::none_of(v.begin(), v.end(), [](int x) { return x < 3; });
  std::cout << result1 << std::endl;

  // 全ての要素が 0 以外であるか
  bool result2 = std::none_of(v.begin(), v.end(), [](int x) { return x == 0; });
  std::cout << result2 << std::endl;
}
```
* std::none_of[color ff0000]

### 出力
```
false
true
```

## 実装例
```cpp
template <class InputIterator, class Predicate>
bool none_of(InputIterator first, InputIterator last, Predicate pred) {
  for ( ; first != last; ++first)
    if (pred(*first)) return false;
  return true;
}
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [GCC](/implementation.md#gcc): 4.4.7 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified], 2013 [mark verified], 2015 [mark verified]


## 関連項目
- [`all_of`](/reference/algorithm/all_of.md)
- [`any_of`](/reference/algorithm/any_of.md)


## 参照
- [N2569 More STL algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2569.pdf)
- [N2666 More STL algorithms (revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2666.pdf)
- [P0202R3 Add Constexpr Modifiers to Functions in `<algorithm>` and `<utility>` Headers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0202r3.html)
- [P0467R2 Iterator Concerns for Parallel Algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0467r2.html)
