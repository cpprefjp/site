#move

```cpp
namespace std {

  template <class InputIterator, class OutputIterator>

  OutputIterator move(InputIterator first, InputIterator last, OutputIterator result);

}
```

###概要
指定された範囲の要素をムーブする。

###効果

[first,last) 内の要素を、それぞれ [result,result + (last - first)) へムーブする。
ムーブは first から順番に行い、0 以上 last - first 未満であるそれぞれの n について、*(result + n) = std::move(*(first + n)) を行う。

###戻り値

result + (last - first)

###要件

result は [first,last) の範囲に含まれていてはいけない。

###計算量

正確に last - first 回ムーブ代入が行われる。


###言語のバージョン

C++11 以降


###実装例
<span style='line-height:13px;background-color:rgb(239,239,239)'>```cpp
template <class InputIterator, class OutputIterator>
OutputIterator move(InputIterator first, InputIterator last, OutputIterator result) {
  while (first != last)
    *result++ = move(*first++);
  return result;
}

</span>
```

###使用例
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
```cpp
0
1
2
3
4
```
