# for_each_n
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class InputIterator, class Size, class Function>
  InputIterator
    for_each_n(InputIterator first,
               Size n,
               Function f);            // (1) C++17

  template <class InputIterator, class Size, class Function>
  constexpr InputIterator
    for_each_n(InputIterator first,
               Size n,
               Function f);            // (1) C++20

  template <class ExecutionPolicy, class ForwardIterator, class Size, class Function>
  ForwardIterator
    for_each_n(ExecutionPolicy&& exec,
               ForwardIterator first,
               Size n,
               Function f);            // (2) C++17
}
```

## 概要
イテレータ範囲`[first, first + n)` (範囲の先頭N要素) のすべての要素に、指定された関数を適用する。


## 要件
- `Function` は `MoveConstructible` の要件を満たす必要があるが、`CopyConstructible` の要件を満たす必要はない
- `n >= 0`であること


## 効果
イテレータ範囲`[first, first + n)` 内の全てのイテレータ `i` に `f(*i)` という操作を行う。

このアルゴリズムはその他のアルゴリズムと違い、関数 `f` の内部で `*i` の値を書き換えても構わない（もちろんイテレータの型が `mutable iterator` の要件を満たしている場合に限る）。


## 戻り値
```cpp
return first + n;
```


## 備考
- この関数は、`thrust::for_each_n()`を元にして並列アルゴリズムの導入に合わせて追加された。[`std::generate_n()`](generate_n.md)が[`std::generate()`](generate.md)の実装を容易にするのと同様に、このアルゴリズムによって[`std::for_each()`](for_each.md)の実装を簡略化できる
- 関数 `f` に戻り値がある場合、それは単に無視される


## 例
```cpp example
#include <iostream>
#include <algorithm>
#include <vector>

void f(int& x)
{
  x *= 2;
}

int main()
{
  std::vector<int> v = {3, 1, 4, 5, 2};

  // コンテナvの先頭3要素に、関数f()を適用する。
  // 関数f()は要素の変更を行う
  std::for_each_n(v.begin(), 3, f);

  // コンテナvの先頭3要素に、ラムダ式で記述した関数オブジェクトを適用する
  std::for_each_n(v.begin(), 3, [](int x) {
    std::cout << x << std::endl;
  });
}
```
* std::for_each_n[color ff0000]
* std::vector[link /reference/vector/vector.md]
* v.begin[link /reference/vector/vector/begin.md]
* std::cout[link /reference/iostream/cout.md]
* std::endl[link /reference/ostream/endl.md]

### 出力
```
6
2
8
```


### 処理系
- [Clang](/implementation.md#clang): 5.0 [mark verified]
- [GCC](/implementation.md#gcc): 9.3 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0024R2 The Parallelism TS Should be Standardized](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0024r2.html)
- [P0202R3 Add Constexpr Modifiers to Functions in `<algorithm>` and `<utility>` Headers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0202r3.html)
- [P0467R2 Iterator Concerns for Parallel Algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0467r2.html)
- [Bug 91748 - doesn't compile `std::for_each_n` with random access iterator range](https://gcc.gnu.org/bugzilla/show_bug.cgi?id=91748)
    - GCC 9.2の`std::for_each_n()`は、ランダムアクセスイテレータを与えるとコンパイルに失敗する。9.3で修正済み
