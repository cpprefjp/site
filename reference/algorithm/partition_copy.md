#partition_copy(C++11)
```cpp
namespace std {
  template <class InputIterator, class OutputIterator1, class OutputIterator2, class Predicate>
  pair<OutputIterator1, OutputIterator2>
    partition_copy(InputIterator first, InputIterator last,
                   OutputIterator1 out_true, OutputIterator2 out_false, Predicate pred);
}
```
* pair[link /reference/utility/pair.md]

##概要
与えられた範囲を条件によって 2 つのグループに分け、その結果を出力の範囲へコピーする。


##要件
`InputIterator` の value type は `Assignable` で、`out_true` と `out_false` の `OutputIterator` へ書き込み可能で、`Predicate` の argument type へ変換可能でなければならない。
入力範囲は出力範囲のどちらとも重なっていてはならない。


##効果
`[first,last)` 内にあるそれぞれのイテレータ `i` について、`pred(*i)` が `true` なら `*i` を `out_true` へコピーし、そうでない場合は `out_false` へコピーする。


##戻り値
`first` には `out_true` の終端が、`second` には `out_false` の終端が格納された[`pair`](/reference/utility/pair.md)オブジェクトを返す。


##計算量
正確に `last - first` 回述語が適用される。


##例
```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <iterator>
#include <string>

void print(const std::string& name, const std::vector<int>& v)
{
  std::cout << name << " : ";
  std::for_each(v.begin(), v.end(), [](int x) {
    std::cout << x << ",";
  });
  std::cout << std::endl;
}

bool is_even(int x) { return x % 2 == 0; }

int main()
{
  std::vector<int> v = {1, 2, 3, 4, 5};

  // 偶数グループと奇数グループに分ける
  std::vector<int> evens;
  std::vector<int> odds;
  std::partition_copy(v.begin(), v.end(),
                      std::back_inserter(evens),
                      std::back_inserter(odds),
                      is_even);

  print("v", v);
  print("evens", evens);
  print("odds", odds);
}
```
* partition_copy[color ff0000]

###出力
```
v : 1,2,3,4,5,
evens : 2,4,
odds : 1,3,5,
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


##実装例
```cpp
```

##参照

