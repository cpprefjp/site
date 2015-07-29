#none_of (C++11)
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class InputIterator, class Predicate>
  bool none_of(InputIterator first, InputIterator last, Predicate pred);
}
```

##概要
範囲の全ての要素が条件を満たさないかを判定する。


##戻り値
`[first,last)` が空であったり、`[first,last)` 内の全てのイテレータ `i` について `pred(*i)` が `false` である場合は `true` を返し、そうでない場合は `false` を返す。


##計算量
最大で `last - first` 回 `pred` を実行する。


###備考
この関数は

```cpp
all_of(first, last, not1(pred));
```
* all_of[link /reference/algorithm/all_of.md]

とほぼ同じであるが、全ての要素が条件を満たしていないということを明示したい場合は `none_of()` を使う方が意図が伝わりやすい。


##例
```cpp
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
* none_of[color ff0000]

###出力
```
false
true
```

##実装例
```cpp
template <class InputIterator, class Predicate>
bool none_of(InputIterator first, InputIterator last, Predicate pred) {
  for ( ; first != last; ++first)
    if (pred(*first)) return false;
  return true;
}
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.4.7
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


##関連項目
- [`all_of`](/reference/algorithm/all_of.md)
- [`any_of`](/reference/algorithm/any_of.md)


##参照
- [N2569 More STL algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2569.pdf)
- [N2666 More STL algorithms (revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2666.pdf)

