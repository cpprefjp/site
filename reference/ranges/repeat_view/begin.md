# begin
* ranges[meta header]
* std::ranges[meta namespace]
* repeat_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr iterator begin() const; // (1) C++23
```
* iterator[link iterator.md]

## 概要

`view`の先頭要素を指すイテレータを取得する。


## 戻り値
以下と等価：

```cpp
return iterator(addressof(*value_));
```


## 例

```cpp example
#include <ranges>
#include <iostream>

int main() {
  auto r = std::views::repeat(42, 3);
  auto it = r.begin();
  std::cout << *it << std::endl; // 42
}
```
* begin[color ff0000]

### 出力

```
42
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 17 [mark verified]
- [GCC](/implementation.md#gcc): 13 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 6 [mark verified]
