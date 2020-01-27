# get
* array[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <std::size_t I, class T, std::size_t N>
  T& get(array<T, N>& x) noexcept;                         // (1) C++11

  template <std::size_t I, class T, std::size_t N>
  constexpr T& get(array<T, N>& x) noexcept;               // (1) C++14

  template <std::size_t I, class T, std::size_t N>
  T&& get(array<T, N>&& x) noexcept;                       // (2) C++11

  template <std::size_t I, class T, std::size_t N>
  T&& get(array<T, N>&& x) noexcept;                       // (2) C++14

  template <std::size_t I, class T, std::size_t N>
  const T& get(const array<T, N>& x) noexcept;             // (3) C++11

  template <std::size_t I, class T, std::size_t N>
  constexpr const T& get(const array<T, N>& x) noexcept;   // (3) C++14

  template <std::size_t I, class T, std::size_t N>
  constexpr const T&& get(const array<T, N>&& x) noexcept; // (4) C++17
}
```

## 概要
タプルと見なせる型から指定した位置の要素を取得する。

`<array>`ヘッダでは、`array`クラスに関するオーバー�ードを定義する。


## 適格要件
- `I < N`であること


## 戻り値
`x[I]`


## 例外
投げない


## 計算量
定数時間


## 例
```cpp example
#include <cassert>
#include <array>
#include <utility>

const std::array<int, 3> make()
{
  return {3, 1, 4};
}

int main()
{
  // 非const左辺値参照版
  {
    std::array<int, 3> ar = {3, 1, 4};
    int& front = std::get<0>(ar); // 先�要素を取得する
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

  // const右辺値参照版
  {
    int front = std::get<0>(make());
    assert(front == 3);
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
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2008 (std::tr1), 2010, 2012

#### 備考
GCC 4.7の`std::get()`は、`I`の境界チェックがない。


## 関連項目
- [`get - std::tuple`](/reference/tuple/tuple/get.md)
- [`get - std::pair`](/reference/utility/pair/get.md)


## 参照
- [N3470 Constexpr Library Additions: containers, v2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3470.html)
- [LWG Issue 2485. `get()` should be overloaded for `const tuple&&`](https://wg21.cmeerw.net/lwg/issue2485)
