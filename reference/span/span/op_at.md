# operator[]
* span[meta header]
* std[meta namespace]
* span[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr reference operator[](size_type i) const;
```

## 概要
参照範囲から、任意の位置の要素を取得する。


## 堅牢化された事前条件
- `i <` [`size()`](size.md)が`true`であること


## 戻り値
以下と等価：

```cpp
return *(data() + i);
```
* data()[link data.md]


## 計算量
定数時間


## 例
```cpp example
#include <cassert>
#include <span>
#include <vector>

int main()
{
  std::vector<int> v = {1, 2, 3, 4, 5};

  int& x = std::span{v}[2];
  assert(x == 3);

  int& y = std::span{v}.subspan(2, 3)[1];
  assert(y == 4);
}
```
* [2][color ff0000]
* [1][color ff0000]
* subspan[link subspan.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark verified]
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`at`](at.md)


## 参照
- [P1872R0 `span` should have `size_type`, not `index_type`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1872r0.pdf)
- [P3471R4 Standard library hardening](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3471r4.html)
- [P3878R1 Standard library hardening should not use the 'observe' semantic](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3878r1.html)
