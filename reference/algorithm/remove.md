#remove

```cpp
namespace std {

  template <class ForwardIterator, class T>

  ForwardIterator remove(ForwardIterator first, ForwardIterator last, const T& value);

}
```

###概要
指定された要素を除ける。

###要件

*first の型は MoveAssignable の要件を満たす必要がある

###効果

[first,last) 内にあるイテレータ i について、*i == value である要素を取り除く

###戻り値

実行結果の範囲の終端を返す

###計算量

正確に last - first 回の比較を行う

###注意

安定。

###実装例

```cpp
template <class ForwardIterator, class T>
ForwardIterator remove(ForwardIterator first, ForwardIterator last, const T& value) {
  auto result = first;
  for ( ; first != last; ++first)
    if (!(*first == value))
      *result++ = move(*first);
  return result;
}
```

###使用例

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
 
int main() {
  std::vector<int> v = { 2,3,1,2,1 };

  auto result = std::remove(v.begin(), v.end(), 1);

  // [v.begin(),result) の範囲に 1 を除去した結果が入っている
  std::for_each(v.begin(), result, [](int x) { std::cout << x << ","; });
  std::cout << std::endl;

  // remove を使ってもコンテナの要素数は変わらないことに注意しよう
  std::cout << "size before: " << v.size() << std::endl;

  // [v.begin(),result) の範囲に 1 を除去した結果が入っているので、
  // [result,v.end()) を erase することでサイズも変更することができる
  // （Erase-remove イディオム）
  v.erase(result, v.end());
  std::cout << "size after: " << v.size() << std::endl;
}
```
* result[color ff0000]
* remove[color ff0000]
* result[color ff0000]
* v.erase(result, v.end());[color ff0000]

###出力

```cpp
`2,3,2,`
`size before: 5`
`size after: 3`


