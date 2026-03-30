# コンストラクタ
* inplace_vector[meta header]
* std[meta namespace]
* inplace_vector[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr inplace_vector() noexcept;                              // (1) C++26

constexpr explicit inplace_vector(size_type n);                   // (2) C++26

constexpr inplace_vector(size_type n, const T& value);            // (3) C++26

template <class InputIterator>
constexpr inplace_vector(InputIterator first, InputIterator last); // (4) C++26

template <container-compatible-range<T> R>
constexpr inplace_vector(from_range_t, R&& rg);                   // (5) C++26

constexpr inplace_vector(const inplace_vector& other);            // (6) C++26

constexpr inplace_vector(inplace_vector&& other)
  noexcept(N == 0 || is_nothrow_move_constructible_v<T>);         // (7) C++26

constexpr inplace_vector(initializer_list<T> il);                 // (8) C++26
```
* from_range_t[link /reference/ranges/from_range_t.md]
* initializer_list[link /reference/initializer_list/initializer_list.md]

## 概要
`inplace_vector`オブジェクトを次に示す通りの要素で初期化する。

- (1) : デフォルトコンストラクタ。空の`inplace_vector`を構築する。
- (2) : `n`個の値初期化された要素で構築する。
- (3) : `n`個の`value`のコピーで構築する。
- (4) : イテレータ範囲`[first, last)`の要素で構築する。
- (5) : Range`rg`の要素で構築する。
- (6) : コピーコンストラクタ。
- (7) : ムーブコンストラクタ。
- (8) : 初期化子リストの要素で構築する。


## 効果

- (1) : デフォルトコンストラクタ。要素を持たない空の`inplace_vector`オブジェクトを構築する。
- (2) : `n`個の`T()`で値初期化された要素を保持した`inplace_vector`オブジェクトを構築する。
- (3) : `value`のコピーを`n`個要素として保持した`inplace_vector`オブジェクトを構築する。
- (4) : イテレータ範囲`[first, last)`の要素をコピーした`inplace_vector`オブジェクトを構築する。
- (5) : Range `rg`の要素から`inplace_vector`オブジェクトを構築する。
- (6) : コピーコンストラクタ。`other`と同じ要素を保持した`inplace_vector`オブジェクトを構築する。
- (7) : ムーブコンストラクタ。`other`の各要素をムーブして`inplace_vector`オブジェクトを構築する。
- (8) : 初期化子リストの要素から`inplace_vector`オブジェクトを構築する。


## 例外
- (1) : 投げない
- (2), (3), (4), (5), (8) : 要素数が`N`を超える場合、[`bad_alloc`](/reference/new/bad_alloc.md)例外を送出する。


## 計算量
- (1) : 定数時間
- (2), (3) : `n`に対して線形時間
- (4) : [`distance`](/reference/iterator/distance.md)`(first, last)`に対して線形時間
- (5) : [`ranges::distance`](/reference/iterator/ranges_distance.md)`(rg)`に対して線形時間
- (6) : `other.`[`size()`](size.md)に対して線形時間
- (7) : `other.`[`size()`](size.md)に対して線形時間
- (8) : `il.`[`size()`](/reference/initializer_list/initializer_list/size.md)に対して線形時間


## 備考
- ムーブコンストラクタ(7)は、[`vector`](/reference/vector/vector.md)の定数時間のムーブとは異なり、各要素を個別にムーブするため線形時間である。これは`inplace_vector`の内部配列が動的確保メモリを使用していないためである。


## 例
```cpp example
#include <print>
#include <inplace_vector>
#include <algorithm>

int main()
{
  std::inplace_vector<int, 5> first;
  std::inplace_vector<int, 5> second(4, 100);
  std::inplace_vector<int, 5> third(second.begin(), second.end());
  std::inplace_vector<int, 5> fourth(third);
  std::inplace_vector<int, 5> fifth = {1, 2, 3};

  std::print("first: ");
  for (int x : first) std::print("{} ", x);
  std::println("");

  std::print("second: ");
  for (int x : second) std::print("{} ", x);
  std::println("");

  std::print("third: ");
  for (int x : third) std::print("{} ", x);
  std::println("");

  std::print("fourth: ");
  for (int x : fourth) std::print("{} ", x);
  std::println("");

  std::print("fifth: ");
  for (int x : fifth) std::print("{} ", x);
  std::println("");
}
```

### 出力
```
first:
second: 100 100 100 100 
third: 100 100 100 100 
fourth: 100 100 100 100 
fifth: 1 2 3 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 23 [mark verified]
- [GCC](/implementation.md#gcc): 16 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 参照
- [P0843R14 `inplace_vector`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p0843r14.html)
