#transform

###概要
全ての要素に関数を適用する。

###transform 4 引数バージョン

```cpp
namespace std {
  template<class InputIterator, class OutputIterator, class UnaryOperation>
  OutputIterator transform(InputIterator first, InputIterator last,
                           OutputIterator result, UnaryOperation op);

}
```

###効果
`[result,result + (last - first))` 内のイテレータ `i` の要素に、それぞれ `op(*(first + (i - result)))` を代入する


###要件
`op` は、`[first,last]`, `[result,result + (last - first)]` 内のイテレータや subrange を無効にしたり、要素を書き換えてはならない。
※ 閉区間で表しているのは意図的なもの


###戻り値
`result + (last - first)`


###計算量
正確に `last - first` 回の `op` の適用が行われる。


###備考
`result` は `first` と同じであっても構わない。


###実装例
```cpp
template<class InputIterator, class OutputIterator, class UnaryOperation>
OutputIterator transform(InputIterator first, InputIterator last,
                         OutputIterator result, UnaryOperation op) {
  while (first != last)
    *result++ = op(*first++);
  return result;
}
```


###使用例
```cpp
#include <algorithm>
#include <iostream>
#include <vector>
#include <string>
#include <iterator>

int main() {
  std::vector<int> v = { 3,1,4 };
  std::vector<std::string> result;

  // 2倍してから文字列に変換する
  std::transform(v.begin(), v.end(), std::back_inserter(result),
    [](int x) { return std::to_string(x * 2); });

  std::for_each(result.begin(), result.end(),
    [](const std::string& s) { std::cout << s << std::endl; });
}
```
* transform[color ff0000]


###出力
```
6
2
8
```


###transform 5 引数バージョン
```cpp
namespace std {
  template<class InputIterator1, class InputIterator2, class OutputIterator, class BinaryOperation>
  OutputIterator transform(InputIterator1 first1, InputIterator1 last1, InputIterator2 first2,
                           OutputIterator result, BinaryOperation binary_op);
}
```

###効果
`[result,result + (last1 - first1))` 内のイテレータ `i` の要素に、それぞれ `binary_op(*(first1 + (i - result)), *(first2 + (i - result)))` を代入する。


###要件
`binary_op` は、`[first1,last1]`, `[first2,first2 + (last1 - first1)]`, `[result,result + (last1 - first1)]` 内のイテレータや subrange を無効にしたり、要素を書き換えてはならない。
※ 閉区間で表しているのは意図的なもの


###戻り値
`result + (last1 - first1)`


###計算量
正確に `last - first` 回の `binary_op` の適用が行われる。


###備考
`result` は `first1` や `first2` と同じであっても構わない。


###実装例
```cpp
template<class InputIterator1, class InputIterator2, class OutputIterator, class BinaryOperation>
OutputIterator transform(InputIterator1 first1, InputIterator1 last1, InputIterator2 first2,
                         OutputIterator result, BinaryOperation binary_op) {
  while (first1 != last1)
    *result++ = binary_op(*first1++, *first2++);
  return result;
}
```


###使用例
```cpp
#include <algorithm>
#include <iostream>
#include <vector>
#include <string>
#include <iterator>

int main() {
  std::vector<char> v1 = { 'a','b','c' };
  std::vector<int> v2 = { 3,1,4 };
  std::vector<std::string> result;

  // v1[n] の文字を v2[n] 回繰り返した文字列を返す
  std::transform(v1.begin(), v1.end(), v2.begin(), std::back_inserter(result),
    [](char a, int b) { return std::string(b, a); });

  std::for_each(result.begin(), result.end(),
    [](const std::string& s) { std::cout << s << std::endl; });
}
```
* transform[color ff0000]

###出力
```
aaa
b
cccc
```


