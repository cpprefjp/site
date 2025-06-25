# unique_copy
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class InputIterator, class OutputIterator>
  OutputIterator
    unique_copy(InputIterator first,
                InputIterator last,
                OutputIterator result);    // (1) C++03

  template <class InputIterator, class OutputIterator>
  constexpr OutputIterator
    unique_copy(InputIterator first,
                InputIterator last,
                OutputIterator result);    // (1) C++20

  template <class InputIterator, class OutputIterator,
            class BinaryPredicate>
  OutputIterator
    unique_copy(InputIterator first,
                InputIterator last,
                OutputIterator result,
                BinaryPredicate pred);     // (2) C++03

  template <class InputIterator, class OutputIterator,
            class BinaryPredicate>
  constexpr OutputIterator
    unique_copy(InputIterator first,
                InputIterator last,
                OutputIterator result,
                BinaryPredicate pred);     // (2) C++20

  template <class ExecutionPolicy, class ForwardIterator1, class ForwardIterator2>
  ForwardIterator2
     unique_copy(ExecutionPolicy&& exec,
                 ForwardIterator1 first,
                 ForwardIterator1 last,
                 ForwardIterator2 result); // (3) C++17

  template <class ExecutionPolicy, class ForwardIterator1, class ForwardIterator2,
            class BinaryPredicate>
  ForwardIterator2
    unique_copy(ExecutionPolicy&& exec,
                ForwardIterator1 first,
                ForwardIterator1 last,
                ForwardIterator2 result,
                BinaryPredicate pred);     // (4) C++17
}
```

## 概要
イテレータ範囲`[first, last)`から隣り合った重複要素を取り除き、その結果を出力の範囲へコピーする。


## 要件
- 二項関数オブジェクト`pred`は、ふたつの値の等値性を判定できなければならない
- `[first,last)` と `[result,result + (last - first))` は重なっていてはならない


## テンプレートパラメータ制約
- `*result = *first` は有効な式でなければならない
- `InputIterator` と `OutputIterator` のどちらも forward iterator の要求を満たしていない場合、`InputIterator` の値型は [コピー構築可能](/reference/concepts/copy_constructible.md) かつ [コピー代入可能](/reference/type_traits/is_copy_assignable.md) でなければならない。そうでない場合は [コピー構築可能](/reference/concepts/copy_constructible.md) であることは要求されない


## 効果
`[first,last)` 内のイテレータ `i` について、

- (1) では `*(i - 1) == *i`
- (2) では `pred(*(i - 1), *i) != false`

による等値の比較によって連続したグループに分け、それぞれのグループの先頭を `result` へコピーする。


## 戻り値
結果の範囲の終端を返す。


## 計算量
`[first,last)` が空の範囲でない場合、正確に `last - first - 1` 回の比較または述語の適用を行う


## 例
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>
#include <iterator>

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
    std::vector<int> uniqued;

    // 重複を除いた要素がuniquedに追加されていく
    std::unique_copy(v.begin(), v.end(), std::back_inserter(uniqued));

    print("unsorted unique", uniqued);
  }

  // 入力の配列がソート済みである場合、
  // 重複している全ての要素が取り除かれて一意になる
  {
    std::vector<int> v = { 2,5,3,3,1,2,4,2,1,1,4,4,3,3,3 };
    std::vector<int> uniqued;

    std::sort(v.begin(), v.end());
    std::unique_copy(v.begin(), v.end(), std::back_inserter(uniqued));

    print("sorted unique", uniqued);
  }
}
```
* std::unique_copy[color ff0000]

### 出力
```
unsorted unique : 2,5,3,1,2,4,2,1,4,3
sorted unique : 1,2,3,4,5
```


## 実装例
```cpp
template <class InputIterator, class OutputIterator>
OutputIterator unique_copy(InputIterator first, InputIterator last,
                           OutputIterator result) {
  if (first == last) return result;

  auto value = *first++;
  *result++ = value;
  for ( ; first != last; ++first) {
    if (!(value == *first)) {
      value = *first;
      *result++ = value;
    }
  }

  return result;
}

template <class InputIterator, class OutputIterator, class BinaryPredicate>
OutputIterator unique_copy(InputIterator first, InputIterator last,
                           OutputIterator result, BinaryPredicate pred) {
  if (first == last) return result;

  auto value = *first++;
  *result++ = value;
  for ( ; first != last; ++first) {
    if (!pred(value, *first)) {
      value = *first;
      *result++ = value;
    }
  }

  return result;
}
```


## 参照
- [P0202R3 Add Constexpr Modifiers to Functions in `<algorithm>` and `<utility>` Headers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0202r3.html)
- [P0467R2 Iterator Concerns for Parallel Algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0467r2.html)
