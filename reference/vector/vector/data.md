# data
* vector[meta header]
* std[meta namespace]
* vector[meta class]
* function[meta id-type]

```cpp
T* data();                      // (1) C++03
T* data() noexcept;             // (1) C++11
constexpr T* data() noexcept;   // (1) C++20

const T* data() const;                    // (2) C++03
const T* data() const noexcept;           // (2) C++11
constexpr const T* data() const noexcept; // (2) C++20
```

## 概要
配列の先頭へのポインタを返す。

`vector`が空の場合であっても、この関数の呼び出し自体は問題なく行える。ただし、その戻り値については規定されていないため、間接参照を行うと未定義動作になる。


## 戻り値
`[data(), data() + size())` が適正な範囲になるようなポインタ。

- C++11 : 空ではない`vector`に対しては`data() == &`[`front()`](front.md)となる
- C++17 : 空ではない`vector`に対しては`data() ==` [`addressof`](/reference/memory/addressof.md)`(`[`front()`](front.md)`)`となる


## 計算量
定数時間


## 例
```cpp example
#include <iostream>
#include <vector>

int main()
{
  std::vector<int> v = {3, 1, 4};

  int* p = v.data();

  std::cout << *p << std::endl;

  ++p;
  std::cout << *p << std::endl;
}
```
* data()[color ff0000]

### 出力
```
3
1
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified], 2013 [mark verified]


### 備考
gcc 4.8.2 の時点で libstdc++ の実装にはバグがあり、`vector` が空の場合に `data()` を呼び出すと未定義動作になる。([Bug 59829](https://gcc.gnu.org/bugzilla/show_bug.cgi?id=59829))。gcc 4.9.0で修正されている。


## 参照
- [LWG Issue 464. Suggestion for new member functions in standard containers](https://wg21.cmeerw.net/lwg/issue464)
- [LWG Issue 2596. `vector::data()` should use addressof](https://wg21.cmeerw.net/lwg/issue2596)
- [[gcc] Revision 207241](https://gcc.gnu.org/viewcvs/gcc?view=revision&revision=207241)
- [P1004R2 Making `std::vector` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1004r2.pdf)
