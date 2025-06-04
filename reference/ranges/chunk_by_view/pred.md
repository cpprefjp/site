# pred
* ranges[meta header]
* std::ranges[meta namespace]
* chunk_by_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr const Pred& pred() const; // (1) C++23
```

## 概要

メンバ変数として保持している、述語を取得する。

## 効果

- (1) : `return pred_;`

## 例
```cpp example
#include <ranges>
#include <vector>
#include <functional>
#include <iostream>

int main() {
  std::vector<int> v = {1, 2, 2, 3, 0, 4, 5, 2};
  
  std::ranges::chunk_by_view cv{v, std::ranges::less_equal{}};
  
  // 述語を取得
  const auto& predicate = cv.pred();
  
  // 述語を使用して比較
  std::cout << "predicate(1, 2): " << predicate(1, 2) << std::endl;
  std::cout << "predicate(3, 0): " << predicate(3, 0) << std::endl;
}
```
* pred[color ff0000]

### 出力
```
predicate(1, 2): 1
predicate(3, 0): 0
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 17 [mark verified]
- [GCC](/implementation.md#gcc): 14.0 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 3 [mark verified]

## 参照
- [N4950 26.7.30 Chunk by view](https://timsong-cpp.github.io/cppwp/n4950/range.chunk.by)