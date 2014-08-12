#remove_if
```cpp
namespace std {
  template <class ForwardIterator, class Predicate>
  ForwardIterator remove_if(ForwardIterator first, ForwardIterator last, Predicate pred);
}
```

##概要
条件を満たす要素を除ける。


##要件
`*first` の型は `MoveAssignable` の要件を満たす必要がある


##効果
`[first,last)` 内にあるイテレータ `i` について、`pred(*i) != false` である要素を取り除く


##戻り値
実行結果の範囲の終端を返す


##計算量
正確に `last - first` 回の述語の適用を行う


##備考
安定。


##例
```cpp
#include <algorithm>
#include <iostream>
#include <vector>
 
int main() {
  std::vector<int> v = { 2,3,1,2,1 };

  auto result = std::remove_if(v.begin(), v.end(),
    [](int x) { return x%2 != 0; });

  // [v.begin(),result) の範囲に奇数を除去した結果が入っている
  std::for_each(v.begin(), result, [](int x) { std::cout << x << ","; });
  std::cout << std::endl;

  // remove を使ってもコンテナの要素数は変わらないことに注意しよう
  std::cout << "size before: " << v.size() << std::endl;

  // [v.begin(),result) の範囲に奇数を除去した結果が入っているので、
  // [result,v.end()) を erase することでサイズも変更することができる
  // （Erase-remove イディオム）
  v.erase(result, v.end());
  std::cout << "size after: " << v.size() << std::endl;
}
```
* result[color ff0000]
* remove_if[color ff0000]
* result[color ff0000]
* v.erase(result, v.end());[color ff0000]


###出力
```
2,2,
size before: 5
size after: 2
```


##実装例
```cpp
template <class ForwardIterator, class Predicate>
ForwardIterator remove_if(ForwardIterator first, ForwardIterator last, Predicate pred) {
  auto result = first;
  for ( ; first != last; ++first)
    if (!pred(*first))
      *result++ = move(*first);
  return result;
}
```

