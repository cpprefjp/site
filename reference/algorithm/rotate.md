#rotate

```cpp
namespace std {
  template <class ForwardIterator>
  ForwardIterator rotate(ForwardIterator first, ForwardIterator middle, ForwardIterator last);
}
```

###概要
要素の並びを回転させる。


###効果
0 以上 `last - first` 未満の整数 `i` について、`first + i` の要素を `first + (i + (last - middle)) % (last - first)` の位置へ移動させる。


###戻り値
`first + (last - middle)`


###注意
これは left rotate である


###要件
`[first,middle)` と `[middle,last)` は有効な範囲である必要がある。
`ForwardIterator` は `ValueSwappable` の要件を満たしている必要がある。
`*first` の型は `MoveConstructible` と `MoveAssignable` の要件を満たしている必要がある。


###計算量
最大で `last - first` 回 swap する。


###実装例
[std::rotate を読んでみた](http://www.kmonos.net/wlog/115.html#_0007101223)


###使用例
```cpp
#include <algorithm>
#include <iostream>
#include <string>
 
int main() {
  std::string str = "rotate";
 
  std::rotate(str.begin(), str.begin() + 2, str.end());

  std::cout << str << std::endl;
}
```
* rotate[color ff0000]

###出力
```
tatero
```

