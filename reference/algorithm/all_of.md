#all_of
```cpp
namespace std {
  template <class InputIterator, class Predicate>
  bool all_of(InputIterator first, InputIterator last, Predicate pred);
}
```

###概要
範囲の全ての要素が条件を満たすかを判定する。


###戻り値
`[first,last)` が空であったり、`[first,last)` 内の全てのイテレータ `i` について `pred(*i)` が `true` である場合は `true` を返し、そうでない場合は `false` を返す。


###計算量
最大で `last - first` 回 `pred` を実行する。


###言語のバージョン
C++11 以降


###実装例
```cpp
template <class InputIterator, class Predicate>
bool all_of(InputIterator first, InputIterator last, Predicate pred) {
  for ( ; first != last; ++first)
    if (!bool(pred(*first))) return false;
  return true;
}
```

###使用例

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
  std::vector<int> v = { 3, 1, 4 };

  std::cout << std::boolalpha;

  // 全ての要素が 5 より小さいか
  bool result1 = std::all_of(v.begin(), v.end(), [](int x) { return x < 5; });
  std::cout << result1 << std::endl;

  // 全ての要素が 1 であるか
  bool result2 = std::all_of(v.begin(), v.end(), [](int x) { return x == 1; });
  std::cout << result2 << std::endl;
}
```
* all_of[color ff0000]

###出力
```
true
false
```

###参照
[any_of](/reference/algorithm/any_of.md), [none_of](/reference/algorithm/none_of.md)

