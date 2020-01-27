# unique
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class ForwardIterator>
  ForwardIterator
    unique(ForwardIterator first,
           ForwardIterator last); // (1) C++03

  template <class ForwardIterator>
  constexpr ForwardIterator
    unique(ForwardIterator first,
           ForwardIterator last); // (1) C++20

  template <class ForwardIterator, class BinaryPredicate>
  ForwardIterator
    unique(ForwardIterator first,
           ForwardIterator last,
           BinaryPredicate pred); // (2) C++03

  template <class ForwardIterator, class BinaryPredicate>
  constexpr ForwardIterator
    unique(ForwardIterator first,
           ForwardIterator last,
           BinaryPredicate pred); // (2) C++20

  template <class ExecutionPolicy, class ForwardIterator>
  ForwardIterator
    unique(ExecutionPolicy&& exec,
           ForwardIterator first,
           ForwardIterator last); // (3) C++17

  template <class ExecutionPolicy, class ForwardIterator, class BinaryPredicate>
  ForwardIterator
    unique(ExecutionPolicy&& exec,
           ForwardIterator first,
           ForwardIterator last,
           BinaryPredicate pred);  // (4) C++17
}
```

## 概要
重複した要素を除ける。

この関数は、隣り合った重複要素を除いた要素を、範囲の先�に集める。この関数によってコンテナから直接要素が削除され、コンテナの要素数が減るようなことはない。コンテナから実際に要素を削除する場合は、この関数の戻り値として、先�に集められた重複なし範囲の末尾の次を指すイテレータが返るため、そのイテレータを介してコンテナの`erase()`メンバ関数などを呼び出し、削除を行うこと。

この関数の戻り値として返されるイテレータ以降の値は未規定。


## 要件
- 二項関数オブジェクト`pred`は、ふたつの値の�値性を判定できなければならない


## テンプレートパラメータ制約
- `*first`の型が[MoveAssignable](/reference/concepts/MoveAssignable.md.nolink)要件を満たすこと


## 効果
`[first,last)` が空の範囲でない場合、`[first + 1,last)` 内のイテレータ `i` について、

- (1) では`*(i - 1) == *i`
- (2) では`pred(*(i - 1), *i) != false`

による�値の比較によって連続したグループに分け、それぞれのグループの先�以外を取り除く。


## 戻り値
重複を除いた範囲の、末尾の次を指すイテレータを返す


## 計算量
`[first,last)` が空の範囲でない場合、�確に `last - first - 1` 回の比較または述語の適用を行う


## 例 (C++11)
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>

void print(const char* tag, const std::vector<int>& v) {
  std::cout << tag << " : ";
  bool first = true;
  for (int x : v) {
    if (first) {
      first = false;
    }
    else {
      std::cout << ',';
    }
    std::cout << x;
  }
  std::cout << std::endl;
}

int main() {
  // 入力の配列がソート済みではない場合、
  // 隣り合った重複要素が取り除かれる
  {
    std::vector<int> v = { 2,5,3,3,1,2,4,2,1,1,4,4,3,3,3 };

    decltype(v)::iterator result = std::unique(v.begin(), v.end());

    // [v.begin(), result)の範囲に、重複を除いた結果が入っている。
    // 不要になった要素を削除
    v.erase(result, v.end());

    print("unsorted unique", v);
  }

  // 入力の配列がソート済みである場合、
  // 重複している全ての要素が取り除かれて一意になる
  {
    std::vector<int> v = { 2,5,3,3,1,2,4,2,1,1,4,4,3,3,3 };

    std::sort(v.begin(), v.end());
    decltype(v)::iterator result = std::unique(v.begin(), v.end());

    // 不要になった要素を削除
    v.erase(result, v.end());

    print("sorted unique", v);
  }
}
```
* std::unique[color ff0000]
* v.erase[link /reference/vector/vector/erase.md]

### 出力
```
unsorted unique : 2,5,3,1,2,4,2,1,4,3
sorted unique : 1,2,3,4,5
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


## 参照
- [P0202R3 Add Constexpr Modifiers to Functions in `<algorithm>` and `<utility>` Headers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0202r3.html)
