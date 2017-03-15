# get
* array[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <size_t I, class T, size_t N>
  T& get(array<T, N>& x) noexcept;                       // (1) C++11

  template <size_t I, class T, size_t N>
  constexpr T& get(array<T, N>& x) noexcept;             // (1) C++14

  template <size_t I, class T, size_t N>
  T&& get(array<T, N>&& x) noexcept;                     // (2) C++11

  template <size_t I, class T, size_t N>
  T&& get(array<T, N>&& x) noexcept;                     // (2) C++14

  template <size_t I, class T, size_t N>
  const T& get(const array<T, N>& x) noexcept;           // (3) C++11

  template <size_t I, class T, size_t N>
  constexpr const T& get(const array<T, N>& x) noexcept; // (3) C++14
}
```
* size_t[link /reference/cstddef/size_t.md]

## 概要
タプルと見なせる型から指定した位置の要素を取得する。
`<array>`ヘッダでは、`array`クラスに関するオーバーロードを定義する。


## 要件
`I < N`であること。`I`が`array`の要素数以上である場合、プログラムは不適格である。


## 戻り値
`x[I]`


## 例外
投げない


## 計算量
定数時間


## 例
```cpp
#include <cassert>
#include <array>
#include <utility>

int main()
{
  // 非const左辺値参照版
  {
    std::array<int, 3> ar = {3, 1, 4};
    int& front = std::get<0>(ar); // 先頭要素を取得する
    int& back = std::get<2>(ar);  // 最後尾要素を取得する

    assert(front == 3);
    assert(back == 4);
  }

  // 右辺値参照版
  {
    std::array<int, 3> ar = {3, 1, 4};
    int front = std::get<0>(std::move(ar));

    assert(front == 3);
  }

  // const左辺値参照版
  {
    const std::array<int, 3> ar = {3, 1, 4};
    const int& front = std::get<0>(ar);
    const int& back = std::get<2>(ar);

    assert(front == 3);
    assert(back == 4);
  }
}
```
* std::get[color ff0000]
* std::move[link /reference/utility/move.md]


### 出力
```
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 9.0 (std::tr1), 10.0, 11.0

#### 備考
GCC 4.7の`std::get()`は、`I`の境界チェックがない。


## 参照
- [N3470 Constexpr Library Additions: containers, v2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3470.html)

