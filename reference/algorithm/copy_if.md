#copy_if (C++11)
* algorithm[meta header]
* std[meta namespace]

```cpp
namespace std {
  template <class InputIterator, class OutputIterator, class Predicate>
  OutputIterator copy_if(InputIterator first, InputIterator last,
                         OutputIterator result, Predicate pred);
}
```

##概要
条件を満たす要素のみをコピーする。


##要件
`[first,last)` の範囲と、`[result,result + (last - first))` の範囲は重なっていてはならない。


##効果
`[first,last)` 内のイテレータ `i` について `pred(*i)` が `true` である要素を `result` へ順番にコピーする。


##戻り値
コピー先の範囲の終端を返す。


##計算量
正確に `last - first` 回述語を適用する。


##備考
このコピーは安定なコピーである。つまり、コピーによって要素の前後が入れ替わることは無い。


##例
```cpp
#include <algorithm>
#include <iostream>
#include <vector>
#include <iterator>

bool isOdd(int x) { return x % 2 != 0; }

int main() {
  std::vector<int> v1 = { 3, 1, 4 };
  std::vector<int> v2 = { 1, 5, 9 };
  std::vector<int> v3 = { 2, 6, 5 };
  std::vector<int> result(v1.size() + v2.size() + v3.size());

  // copy_if の戻り値を使って、複数のコンテナにある奇数を全て繋げる
  auto out = result.begin();
  out = std::copy_if(v1.begin(), v1.end(), out, isOdd);
  out = std::copy_if(v2.begin(), v2.end(), out, isOdd);
  out = std::copy_if(v3.begin(), v3.end(), out, isOdd);

  std::copy(result.begin(), out, std::ostream_iterator<int>(std::cout, ","));
}
```

###出力
```
3,1,1,5,9,5,
```


##実装例
```cpp
template <class InputIterator, class OutputIterator, class Predicate>
OutputIterator copy_if(InputIterator first, InputIterator last,
                       OutputIterator result, Predicate pred) {
  for ( ; first != last; ++first)
    if (pred(*first))
      *result++ = *first;
  return result;
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



