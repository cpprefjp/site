# コンストラクタ
* ranges[meta header]
* std::ranges[meta namespace]
* chunk_by_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
chunk_by_view()
  requires default_initializable<V> &&
           default_initializable<Pred> = default; // (1) C++23

constexpr explicit
chunk_by_view(V base, Pred pred);                 // (2) C++23
```

## 概要

`chunk_by_view`オブジェクトを構築する。

- (1) : デフォルトコンストラクタ。元となるRangeと述語を値初期化する。
- (2) : 元となるRangeと述語を受け取るコンストラクタ。

## 効果

- (1) : `base_`と`pred_`を値初期化する。
- (2) : `base_(std::move(base))`、`pred_(std::move(pred))`で初期化する。

ここで、`base_`は元となるRangeを保持するメンバ変数、`pred_`は述語を保持するメンバ変数である。

## 例
```cpp example
#include <ranges>
#include <vector>
#include <functional>
#include <print>

int main() {
  std::vector<int> v = {1, 2, 2, 3, 0, 4, 5, 2};
  
  // デフォルトコンストラクタ
  std::ranges::chunk_by_view<std::views::all_t<std::vector<int>>, std::ranges::less_equal> cv1{};
  
  // 元となるRangeと述語を指定
  std::ranges::chunk_by_view cv2{v, std::ranges::less_equal{}};
  
  std::println("{}", cv2);
}
```
* std::ranges::chunk_by_view[color ff0000]

### 出力
```
[[1, 2, 2, 3], [0, 4, 5], [2]]
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