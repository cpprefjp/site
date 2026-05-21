# コンストラクタ
* ranges[meta header]
* std::ranges[meta namespace]
* cache_latest_view[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
cache_latest_view()
  requires default_initializable<V> = default;  // (1) C++26

constexpr explicit
cache_latest_view(V base);                      // (2) C++26
```

## 概要
`cache_latest_view`オブジェクトを構築する。

- (1) : デフォルトコンストラクタ
- (2) : ベースとなるRangeを受け取るコンストラクタ


## 効果
- (1) : ベースとなるRangeをデフォルト構築する
- (2) : ベースとなるRangeを`std::move(base)`で初期化する


## 例
```cpp example
#include <ranges>
#include <vector>

int main() {
  std::vector<int> v = {1, 2, 3};

  // (2) ベースRangeを受け取るコンストラクタ
  std::ranges::cache_latest_view view{v};
}
```

### 出力
```
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 21 [mark verified]
- [GCC](/implementation.md#gcc): 15.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]
