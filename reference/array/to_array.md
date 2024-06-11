# to_array
* array[meta header]
* function template[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class T, size_t N>
    constexpr array<remove_cv_t<T>, N> to_array(T (&a)[N]);  // (1)
  template<class T, size_t N>
    constexpr array<remove_cv_t<T>, N> to_array(T (&&a)[N]); // (2)
}
```
* remove_cv_t[link /reference/type_traits/remove_cv.md]

## 概要
組み込み 1 次元配列から、[`std::array`](array.md) を作成する。


## 適格要件
- (1) : `std::is_array_v<T>` が `false` かつ `is_constructible_v<T, T&>` が `true` であること。
- (2) : `std::is_array_v<T>` が `false` かつ `is_move_constructible_v<T>` が `true` であること。


## 事前条件
- (1) : `T` は `Cpp17CopyConstructible` 要件を満たしていること。 
- (2) : `T` は `Cpp17MoveConstructible` 要件を満たしていること。


## 戻り値
- (1) : `{{ a[0], ..., a[N - 1] }}`
- (2) : `{{ std::move(a[0]), ..., std::move(a[N - 1]) }}`


## 例
```cpp example
#include <iostream>
#include <array>
#include <algorithm>
#include <iterator>
 
int main()
{
  int a[] = { 3, 1, 4, 1, 5 };
    
  std::array<int, 5> b = std::to_array(a); // 組み込みの配列の要素をコピーし、 std::array を作成

  std::copy(b.begin(), b.end(), std::ostream_iterator<int>(std::cout, ", "));
    
  int c[3][2] = { { 1, 2 }, { 3, 4 }, { 5, 6 } };
    
  // auto d = std::to_array(c); // 多次元配列はサポートされない
}
```
* to_array[color ff0000]

### 出力
```
3, 1, 4, 1, 5, 
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 10.0.0 現在未実装 [mark verified]
- [GCC](/implementation.md#gcc): 10.0.0 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [std::array](array.md)


## 参照
- [P0325R4 to_array from LFTS with updates](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0325r4.html)
