#copy_n

```cpp
namespace std {
  template <class InputIterator, class Size, class OutputIterator>
  OutputIterator copy_n(InputIterator first, Size n, OutputIterator result);
}
```

###概要
指定された数の要素をコピーする

###効果
0 以上 `n` 未満であるそれぞれの `i` について、`*(result + i) = *(first + i)` を行う。

###戻り値
`result + n`

###計算量
正確に `n` 回代入が行われる。

###言語のバージョン
C++11 以降

###実装例
```cpp
template<class InputIterator, class Size, class OutputIterator>
OutputIterator copy_n(InputIterator first, Size n, OutputIterator result) {
  for (Size i = 0; i < n; i++)
    *result++ = *first++;
  return result;
}
```

###使用例
```cpp
#include <algorithm>
#include <iostream>
#include <iterator>
 
int main() {
  std::copy_n(std::istream_iterator<int>(std::cin), 5, std::ostream_iterator<int>(std::cout, "\n"));
}
```
* copy_n[color ff0000]

###入力
```
3 1 5 2 4
```

###出力
```
3
1
5
2
4
```

