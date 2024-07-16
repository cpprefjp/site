# at
* span[meta header]
* std[meta namespace]
* span[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr reference at(size_type i) const;
```

## 概要
参照範囲から、任意の位置の要素を取得する。


## 戻り値
以下と等価：

```cpp
return *(data() + i);
```
* data()[link data.md]


## 計算量
定数時間


## 例外
`i >=` [`size()`](size.md)の場合、[`out_of_range`](/reference/stdexcept.md)例外を送出する。


## 例
```cpp example
#include <cassert>
#include <span>
#include <vector>

int main()
{
  std::vector<int> v = {1, 2, 3, 4, 5};

  int& x = std::span{v}.at(2);
  assert(x == 3);

  int& y = std::span{v}.subspan(2, 3).at(1);
  assert(y == 4);
}
```
* at[color ff0000]
* subspan[link subspan.md]

### 出力
```
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 14 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`operator[]`](op_at.md)


## 参照
- [P2821R5 `span.at()`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2821r5.html)
