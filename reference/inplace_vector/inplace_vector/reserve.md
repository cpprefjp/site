# reserve
* inplace_vector[meta header]
* std[meta namespace]
* inplace_vector[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
static constexpr void reserve(size_type n); // (1) C++26
```

## 概要
容量を確認する。`inplace_vector`の容量は固定であるため、この関数は容量の変更を行わない。`n`が`N`以下であれば何もせず、`n`が`N`を超える場合は例外を送出する。

この関数は、[`std::vector`](/reference/vector/vector.md)`::`[`reserve()`](/reference/vector/vector/reserve.md)との互換性のために提供されている。


## 例外
`n > N`の場合、[`std::bad_alloc`](/reference/new/bad_alloc.md)例外を送出する。


## 戻り値
なし


## 計算量
定数時間


## 例
```cpp example
#include <print>
#include <inplace_vector>
#include <stdexcept>

int main()
{
  std::inplace_vector<int, 5> iv;

  // 容量内なので何も起きない
  iv.reserve(3);
  std::println("reserve(3): OK");

  // 容量超過で例外
  try {
    iv.reserve(10);
  }
  catch (const std::bad_alloc&) {
    std::println("reserve(10): bad_alloc");
  }
}
```
* reserve[color ff0000]
* std::bad_alloc[link /reference/new/bad_alloc.md]

### 出力
```
reserve(3): OK
reserve(10): bad_alloc
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
