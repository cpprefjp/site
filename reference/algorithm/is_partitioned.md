#is_partitioned (C++11)
```cpp
namespace std {
  template <class InputIterator, class Predicate>
  bool is_partitioned(InputIterator first, InputIterator last, Predicate pred);
}
```

##概要
与えられた範囲がパーティションされているか判定する。


##要件
`InputIterator`のvalue typeは `Predicate` の引数型へ変換可能でなければならない。

つまり `pred(*first)` という式が有効でなければならない。


##戻り値
`[first,last)` が空、 または `[first,last)` が `pred` によって partition されているなら `true` 、そうでなければ `false` を返す。

つまり、`pred` を満たす全ての要素が、`pred` を満たさない全ての要素より前に出現するなら `true` を返す。


##計算量
線形時間。最大で `last - first` 回 `pred` が適用される。


##例
```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {1, 2, 3, 4, 5};

  auto pred = [](int x) { return x % 2 == 0; };

  // 偶数グループと奇数グループに分ける
  std::partition(v.begin(), v.end(), pred);

  std::for_each(v.begin(), v.end(), [](int x) {
   std::cout << x << std::endl;
  });

  // 偶数グループと奇数グループに分かれているか
  if (std::is_partitioned(v.begin(), v.end(), pred)) {
    std::cout << "partitioned" << std::endl;
  }
  else {
    std::cout << "not partitioned" << std::endl;
  }
}
```
* is_partitioned[color ff0000]

###出力
```
4
2
3
1
5
partitioned
```


##実装例
```cpp
template <class InputIterator, class Predicate>
bool is_partitioned(InputIterator first, InputIterator last, Predicate pred)
{
  return std::none_of(std::find_if_not(first, last, pred), last, pred);
}
```


##バージョン
###言語
- C++11


###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照


