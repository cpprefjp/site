# assign
* inplace_vector[meta header]
* std[meta namespace]
* inplace_vector[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
template <class InputIterator>
constexpr void assign(InputIterator first, InputIterator last); // (1) C++26

constexpr void assign(size_type n, const T& u);                 // (2) C++26

constexpr void assign(initializer_list<T> il);                  // (3) C++26
```
* initializer_list[link /reference/initializer_list/initializer_list.md]

## 概要
コンテナの再代入。

- (1) : イテレータ範囲`[first, last)`の要素で既存の要素を置き換える。
- (2) : `n`個の`u`のコピーで既存の要素を置き換える。
- (3) : 初期化子リスト`il`の要素で既存の要素を置き換える。


## 効果
- (1) : `*this`の全要素を破棄し、イテレータ範囲`[first, last)`の要素で置き換える。
- (2) : `*this`の全要素を破棄し、`n`個の`u`のコピーで置き換える。
- (3) : `*this`の全要素を破棄し、`il`の要素で置き換える。


## 例外
- (1) : [`distance`](/reference/iterator/distance.md)`(first, last) > N`の場合、[`std::bad_alloc`](/reference/new/bad_alloc.md)例外を送出する。
- (2) : `n > N`の場合、[`std::bad_alloc`](/reference/new/bad_alloc.md)例外を送出する。
- (3) : `il.size() > N`の場合、[`std::bad_alloc`](/reference/new/bad_alloc.md)例外を送出する。


## 戻り値
なし


## 例
```cpp example
#include <print>
#include <inplace_vector>

int main()
{
  std::inplace_vector<int, 10> iv = {1, 2, 3};

  // (1) イテレータ範囲で再代入
  int arr[] = {10, 20, 30, 40};
  iv.assign(std::begin(arr), std::end(arr));
  for (int x : iv) std::print("{} ", x);
  std::println("");

  // (2) n個の値で再代入
  iv.assign(3, 99);
  for (int x : iv) std::print("{} ", x);
  std::println("");

  // (3) 初期化子リストで再代入
  iv.assign({5, 6, 7});
  for (int x : iv) std::print("{} ", x);
  std::println("");
}
```
* assign[color ff0000]

### 出力
```
10 20 30 40
99 99 99
5 6 7
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
