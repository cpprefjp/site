# end
* ranges[meta header]
* std::ranges[meta namespace]
* chunk_by_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr default_sentinel_t end() const; // (1) C++23
```

## 概要

番兵を取得する。

## 効果

- (1) : `return default_sentinel;`

## 備考

`chunk_by_view`は常に`default_sentinel_t`を番兵として使用する。これは、チャンクの境界が動的に決まるため、事前にサイズを計算することができないためである。

## 例
```cpp example
#include <ranges>
#include <vector>
#include <functional>
#include <print>

int main() {
  std::vector<int> v = {1, 2, 2, 3, 0, 4, 5, 2};
  
  std::ranges::chunk_by_view cv{v, std::ranges::less_equal{}};
  
  // イテレータ範囲で全チャンクを出力
  for (auto it = cv.begin(); it != cv.end(); ++it) {
    std::println("{}", *it);
  }
}
```
* end[color ff0000]
* begin[link begin.md]

### 出力
```
[1, 2, 2, 3]
[0, 4, 5]
[2]
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