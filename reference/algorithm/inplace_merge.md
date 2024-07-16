# inplace_merge
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class BidirectionalIterator>
  void inplace_merge(BidirectionalIterator first,
                     BidirectionalIterator middle,
                     BidirectionalIterator last);  // (1) C++03

  template <class BidirectionalIterator, class Compare>
  void inplace_merge(BidirectionalIterator first,
                     BidirectionalIterator middle,
                     BidirectionalIterator last,
                     Compare comp);                // (2) C++03

  template <class ExecutionPolicy, class BidirectionalIterator>
  void inplace_merge(ExecutionPolicy&& exec,
                     BidirectionalIterator first,
                     BidirectionalIterator middle,
                     BidirectionalIterator last);  // (3) C++17

  template <class ExecutionPolicy, class BidirectionalIterator, class Compare>
  void inplace_merge(ExecutionPolicy&& exec,
                     BidirectionalIterator first,
                     BidirectionalIterator middle,
                     BidirectionalIterator last,
                     Compare comp);                // (4) C++17
}
```

## 概要
2つの連続したソート済みイテレータ範囲`[first, middle)`と`[middle, last)`をマージする。

この関数は、ソート済みイテレータ範囲`[first, middle)`と、ソート済み範囲`[middle, last)`のように大きいイテレータ範囲`[first, last)`内に2つのソート済みイテレータ範囲が含まれている場合に、それらをマージしてソートする。


## テンプレートパラメータ制約
- `BidirectionalIterator` は `ValueSwappable` の要件を満たしていること。
- `*first` の型は `MoveConstructible` と `MoveAssignable` の要件を満たしていること。


## 事前条件
- イテレータ範囲`[first,middle)` と イテレータ範囲`[middle,last)` はそれぞれ `operator<` か `comp` でソートされていること。


## 効果
`[first,middle)`, `[middle,last)` という、連続した２つの範囲をマージし、結果を `[first,last)` へ格納する。

結果のイテレータ範囲 `[first,last)` は昇順になる。つまり、`first` を除く `[first,last)` 内の全てのイテレータ `i` について、`*i < *(i - 1)` または `comp(*i, *(i - 1))` が `false` になる。


## 戻り値
なし


## 計算量
`N = last - first`であるとして説明する。

- (1), (2) : 余分なメモリを使用する場合は、`N - 1` 回比較する。そうでない場合は、O(N log(N))回比較する
- (3), (4) : O(N log N)回比較する


## 例
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {1,4,5,  2,3,6};

  // ソートされた2つのイテレータ範囲をマージ
  std::inplace_merge(v.begin(), v.begin() + 3, v.end());

  std::for_each(v.begin(), v.end(), [](int x) {
    std::cout << x << std::endl;
  });
}
```
* std::inplace_merge[color ff0000]

### 出力
```
1
2
3
4
5
6
```

## 実装例
- [inplace_merge を読んでみた](http://www.kmonos.net/wlog/115.html#_2300101215)



