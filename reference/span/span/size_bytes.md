# size_bytes
* span[meta header]
* std[meta namespace]
* span[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr size_type size_bytes() const noexcept;
```

## 概要
参照している範囲のバイト数を取得する。


## 戻り値
以下と等価：

```cpp
return size() * sizeof(element_type);
```
* size()[link size.md]


## 例外
投げない


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

  assert(std::span{v}.size_bytes() == 5 * sizeof(int));
  assert(std::span{v}.first(3).size_bytes() == 3 * sizeof(int));
}
```
* size_bytes()[color ff0000]
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
- [P1872R0 `span` should have `size_type`, not `index_type`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1872r0.pdf)
