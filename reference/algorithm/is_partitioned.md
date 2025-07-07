# is_partitioned
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class InputIterator, class Predicate>
  bool is_partitioned(InputIterator first,
                      InputIterator last,
                      Predicate pred);               // (1) C++11

  template <class InputIterator, class Predicate>
  constexpr bool is_partitioned(InputIterator first,
                                InputIterator last,
                                Predicate pred);     // (1) C++20

  template <class ExecutionPolicy, class ForwardIterator, class Predicate>
  bool is_partitioned(ExecutionPolicy&& exec,
                      ForwardIterator first,
                      ForwardIterator last,
                      Predicate pred);               // (2) C++17
}
```

## 概要
イテレータ範囲`[first, last)`が条件によって[区分化](/reference/algorithm.md#sequence-is-partitioned)されているか判定する。


## テンプレートパラメータ制約
- `InputIterator`のvalue typeは `Predicate` の引数型へ変換可能でなければならない
    - つまり `pred(*first)` という式が有効でなければならない


## 戻り値
イテレータ範囲`[first,last)` が空、 または `[first,last)` が `pred` によって[区分化](/reference/algorithm.md#sequence-is-partitioned)されているなら `true` 、そうでなければ `false` を返す。

つまり、`pred` を満たす全ての要素が、`pred` を満たさない全ての要素より前に出現するなら `true` を返す。


## 計算量
線形時間。最大で `last - first` 回 `pred` が適用される。


## 例
```cpp example
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
* std::is_partitioned[color ff0000]

### 出力
```
4
2
3
1
5
partitioned
```


## 実装例
```cpp
template <class InputIterator, class Predicate>
bool is_partitioned(InputIterator first, InputIterator last, Predicate pred)
{
  first = std::find_if_not(first, last, pred);
  return (first == last) || std::none_of(++first, last, pred);
}
```


## バージョン
### 言語
- C++11


### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified], 2013 [mark verified], 2015 [mark verified]


## 参照
- [N2569 More STL algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2569.pdf)
- [N2666 More STL algorithms (revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2666.pdf)
- [P0202R3 Add Constexpr Modifiers to Functions in `<algorithm>` and `<utility>` Headers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0202r3.html)
- [P0467R2 Iterator Concerns for Parallel Algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0467r2.html)
