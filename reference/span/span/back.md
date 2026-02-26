# back
* span[meta header]
* std[meta namespace]
* span[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr reference back() const;
```

## 概要
参照範囲の末尾要素を取得する。


## 堅牢化された事前条件
- [`empty()`](empty.md)が`false`であること


## 戻り値
以下と等価：

```cpp
return *(data() + (size() - 1));
```
* data()[link data.md]
* size()[link size.md]


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

  int& x = std::span{v}.back();
  assert(x == 5);

  int& y = std::span{v}.first(3).back();
  assert(y == 3);
}
```
* back()[color ff0000]
* first[link first.md]

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


## 参照
- [P3471R4 Standard library hardening](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3471r4.html)
- [P3878R1 Standard library hardening should not use the 'observe' semantic](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3878r1.html)
