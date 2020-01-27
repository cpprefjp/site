# minmax_element
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template<class ForwardIterator>
  pair<ForwardIterator, ForwardIterator>
    minmax_element(ForwardIterator first,
                   ForwardIterator last); // (1) C++11

  template<class ForwardIterator, class Compare>
  pair<ForwardIterator, ForwardIterator>
    minmax_element(ForwardIterator first,
                   ForwardIterator last,
                   Compare comp);         // (2) C++11

  template <class ExecutionPolicy, class ForwardIterator>
  pair<ForwardIterator, ForwardIterator>
    minmax_element(ExecutionPolicy&& exec,
                   ForwardIterator first,
                   ForwardIterator last); // (3) C++17

  template <class ExecutionPolicy, class ForwardIterator, class Compare>
  pair<ForwardIterator, ForwardIterator>
    minmax_element(ExecutionPolicy&& exec,
                   ForwardIterator first,
                   ForwardIterator last,
                   Compare comp);         // (4) C++17
}
```
* pair[link /reference/utility/pair.md]

## 概要
`[first, last)` の範囲において、最小要素を指すイテレータと最大要素を指すイテレータの組を取得する。


## 戻り値
`operator<` もしくは `comp` を比較基準とした際の、最小の要素を指すイテレータを `first`、最大の要素を指すイテレータを `second` に持つ [`pair`](/reference/utility/pair.md) オブジェクトを返す。

ただし、`first == last` の場合には、[`make_pair`](/reference/utility/make_pair.md)`(first, first)`を返す。


## 計算量
`n` を範囲の要素数とする場合、[`max`](max.md)`(3(n / 2) - 1, 0)` 回の述語適用を行う。


## 備考
- `comp` は 2 引数の関数オブジェクトで、1 番目の引数が 2 番目の引数「より小さい」場合に `true` を、そうでない場合に `false` を返すものとして扱われる。
- 最小の要素が複数ある場合、[`min_element`](min_element.md) と同様、最も左側（`first` に近い方）にある要素を指すイテレータを返す。  
	一方、最大の要素が複数ある場合、[`max_element`](max_element.md) と**異なり**、最も右側（`last` に近い方）にあるイテレータを返す。
- 最小の要素と最大の要素の両方が必要な場合には、[`min_element`](min_element.md) と [`max_element`](max_element.md) をそれぞれ呼び出すよりも本関数を呼び出した方が、計算量の点で効率的である。  
	ただし、上記の通り最大の要素に関しては [`max_element`](max_element.md) と結果が異なる可能性があるため、注意する必要がある。


## 例
```cpp example
#include <cassert>
#include <algorithm>
#include <vector>

int main()
{
  std::vector<int> v = {3, 1, 4};

  auto i = std::minmax_element(v.begin(), v.end());
  assert(*i.first == 1);
  assert(*i.second == 4);

  auto j = std::minmax_element(v.begin(), v.end(), [](int a, int b) {
                                return a > b;
                              });
  assert(*j.first == 4);
  assert(*j.second == 1);
}
```
* std::minmax_element[color ff0000]

### 出力
```
```


## 実装例
```cpp
template <class ForwardIterator, class Compare>
std::pair<ForwardIterator, ForwardIterator>
minmax_element(ForwardIterator first, ForwardIterator last, Compare comp)
{
  // 結果用オブジェクト
  std::pair<ForwardIterator, ForwardIterator> result(first, first);

  // 範囲の要素数が 0 か 1 だったら、そのまま result を返す
  if (first != last && ++first != last) {
    // 最初の 2 個を比較して、小さい方を .first に、大きい方を .second に�定
    if (comp(*first, *result.first))
      result.first = first;
    else
      result.second = first;

    // 残りの要素を 2 個ずつ繰り返し
    while (++first != last) {
      ForwardIterator prev = first;

      // 残りの要素が 1 個しか無かったら、.first と .second の両方の要素と比較して、
      // 必要に応じで結果を更新後、ループを抜ける
      if (++first == last) {
        if (comp(*prev, *result.first))
          result.first = prev;
        else if (!comp(*prev, *result.second))
          result.second = prev;
        break;
      }

      // 残りの要素が 2 個以上あれば、まずその 2 個を比較してから、小さい方を .first と、
      // 大きい方を .second と比較して、必要に応じて結果を更新
      if (comp(*first, *prev)) {
        if (comp(*first, *result.first))
          result.first = first;
        if (!comp(*prev, *result.second))
          result.second = prev;
      } else {
        if (comp(*prev, *result.first))
          result.first = prev;
        if (!comp(*first, *result.second))
          result.second = first;
      }
    }
  }
  return result;
}

// operator< 用の関数オブジェクト（std::less は特殊化されているかもしれないので）
struct less_inner {
  template <class T>
  bool operator()(const T& lhs, const T& rhs) const { return bool(lhs < rhs); }
};

template <class ForwardIterator>
inline std::pair<ForwardIterator, ForwardIterator>
minmax_element(ForwardIterator first, ForwardIterator last)
{
  return std::minmax_element(first, last, less_inner());
}
```
* std::pair[link /reference/utility/pair.md]


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013, 2015


## 参照
- [N1840 C++0x Proposal: Function template `std::minmax` and / or algorithm `std::minmax_element`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2005/n1840.pdf)
- [N1990 Proposed Text for `minmax` (N1840)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2006/n1990.htm)
- [LWG Issue 715. `minmax_element` complexity is too lax](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#715)

