# unique
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class ForwardIterator>
  ForwardIterator unique(ForwardIterator first, ForwardIterator last);

  template <class ForwardIterator, class BinaryPredicate>
  ForwardIterator unique(ForwardIterator first, ForwardIterator last,
                         BinaryPredicate pred);
}
```

## 概要
重複した要素を除ける。


## 要件
- 比較関数は equivalence relation でなければならない。
- `*first` は `MoveAssignable` の要求を満たす必要がある。


## 効果
`[first,last)` が空の範囲でない場合、`[first + 1,last)` 内のイテレータ `i` について、`*(i - 1) == *i` もしくは `pred(*(i - 1), *i) != false` による等値の比較によって連続したグループに分け、それぞれのグループの先頭以外を削除する。


## 戻り値
結果の範囲の終端を返す


## 計算量
`[first,last)` が空の範囲でない場合、正確に `last - first - 1` 回の比較または述語の適用を行う


## 例
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
  std::vector<int> v = { 2,5,3,3,1,2,4,2,1,1,4,4,3,3,3 };
  // 連続した値を削除する
  auto result = std::unique(v.begin(), v.end());

  // [v.begin(),result) の範囲に結果が入っている
  std::cout << "unique: ";
  std::for_each(v.begin(), result, [](int x) { std::cout << x << ","; });
  std::cout << std::endl;

  // sort してから unique すると、それぞれの要素が一意な値になる
  std::sort(v.begin(), result);

  std::cout << "sorted: ";
  std::for_each(v.begin(), result, [](int x) { std::cout << x << ","; });
  std::cout << std::endl;

  auto result2 = std::unique(v.begin(), result);

  // 一意な値が出力される
  std::cout << "sorted unique: ";
  std::for_each(v.begin(), result2, [](int x) { std::cout << x << ","; });
  std::cout << std::endl;

  // 不要になった要素は削除しておくべし
  v.erase(result2, v.end());
}
```
* std::unique[color ff0000]
* result[color ff0000]
* result2[color ff0000]
* v.erase[link /reference/vector/erase.md]

### 出力
```
unique: 2,5,3,1,2,4,2,1,4,3,
sorted: 1,1,2,2,2,3,3,4,4,5,
sorted unique: 1,2,3,4,5,
```


## 実装例
```cpp
template <class ForwardIterator>
ForwardIterator unique(ForwardIterator first, ForwardIterator last) {
  if (first == last) return first;

  auto result = first;
  auto value = move(*first++);
  for ( ; first != last; ++first) {
    if (!(value == *first)) {
      *result++ = move(value);
      value = move(*first);
    }
  }
  *result++ = move(value);

  return result;
}

template <class ForwardIterator, class BinaryPredicate>
ForwardIterator unique(ForwardIterator first, ForwardIterator last, BinaryPredicate pred) {
  if (first == last) return first;

  auto result = first;
  auto value = move(*first++);
  for ( ; first != last; ++first) {
    if (!pred(value, *first)) {
      *result++ = move(value);
      value = move(*first);
    }
  }
  *result++ = move(value);

  return result;
}
```
* move[link /reference/utility/move.md]

