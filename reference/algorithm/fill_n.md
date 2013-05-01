#fill_n

```cpp
namespace std {

  template <class OutputIterator, class Size, class T>

  OutputIterator fill_n(OutputIterator first, Size n, const T& value);

}
```

###概要
指定された値で出力の範囲に n 個書き込む。

###要件

value は output iterator へ書き込み可能でなければならない。
Size は integral type に変換可能でなければならない。

###効果

n が 1 以上の場合は [first,first + n) 内の全ての要素に value を代入し、そうでない場合は何もしない

###戻り値

n が 1 以上の場合は first + n、そうでない場合は first を返す

###計算量

n が 1 以上の場合は n 回、そうでない場合は 0 回の代入を行う

###実装例
```cpp
template <class OutputIterator, class Size, class T>
OutputIterator fill_n(OutputIterator first, Size n, const T& value) {
  while (n-- > 0)
    *first++ = value;
  return first;
}
```

###使用例

```cpp
#include <algorithm>
#include <iostream>
#include <iterator>
 
int main() {
  // 3 を出力しまくる
  std::fill_n(std::ostream_iterator<int>(std::cout, ","), 10, 3);
}
```
* fill_n[color ff0000]

###出力
```cpp
3,3,3,3,3,3,3,3,3,3,
```
