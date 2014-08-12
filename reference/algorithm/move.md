#move (C++11)
```cpp
namespace std {
  template <class InputIterator, class OutputIterator>
  OutputIterator move(InputIterator first, InputIterator last,
                      OutputIterator result);
}
```

##概要
指定された範囲の要素をムーブする。


##要件
`result` は `[first,last)` の範囲に含まれてはならない。


##効果
`[first,last)` 内の要素を、それぞれ `[result,result + (last - first))` へムーブする。

ムーブは `first` から順番に行い、0 以上 `last - first` 未満であるそれぞれの `n` について、`*(result + n) = std::move(*(first + n))` を行う。


##戻り値
`result + (last - first)`


##計算量
正確に `last - first` 回ムーブ代入が行われる。


##例
```cpp
#include <algorithm>
#include <iostream>
#include <vector>
#include <memory>
 
int main() {
  std::vector<std::unique_ptr<int>> v;
  for (int i = 0; i < 5; i++)
    v.emplace_back(new int(i));
 
  std::vector<std::unique_ptr<int>> v2;
  // v のそれぞれの要素を v2 へムーブする
  std::move(v.begin(), v.end(), std::back_inserter(v2));
 
  std::for_each(v2.begin(), v2.end(),
    [](const std::unique_ptr<int>& v) { std::cout << *v << std::endl; });
}
```
* move[color ff0000]

###出力
```
0
1
2
3
4
```


##実装例
```cpp
template <class InputIterator, class OutputIterator>
OutputIterator move(InputIterator first, InputIterator last, OutputIterator result) {
  while (first != last)
    *result++ = move(*first++);
  return result;
}
```


##バージョン
###言語
- C++11


###処理系
- [Clang](/implementation#clang.md): 3.0
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.3.6
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


