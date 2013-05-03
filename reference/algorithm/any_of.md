#any_of
```cpp
namespace std {
  template <class InputIterator, class Predicate>
  bool any_of(InputIterator first, InputIterator last, Predicate pred);
}
```

###概要
範囲のいずれかの要素が条件を満たすかを判定する。


###戻り値
`[first,last)` 内のイテレータ `i` について `pred(*i)` が `true` になるような要素があれば`true`を返し、そうでなければ`false`を返す。
`[first,last)`の範囲が空の場合は`false`を返す。

###計算量
最大で `last - first` 回 `pred` を実行する。


###言語のバージョン
C++11 以降


###実装例
```
template<class InputIterator, class Predicate>
bool any_of(InputIterator first, InputIterator last, Predicate pred) {
  for ( ; first != last; ++first)
    if (pred(*first)) return true;
  return false;
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

  // 5 以上の要素が存在するかどうか
  bool result1 = std::any_of(v.begin(), v.end(), [](int x) { return x >= 5; });
  std::cout << result1 << std::endl;

  // 1 の要素が存在するかどうか
  bool result2 = std::any_of(v.begin(), v.end(), [](int x) { return x == 1; });
  std::cout << result2 << std::endl;
}
```
* any_of[color ff0000]

###出力
```
false
true
```

