# コンストラクタ
* ranges[meta header]
* std::ranges[meta namespace]
* owning_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
owning_view()
  requires default_initializable<R> = default;   // (1) C++20

constexpr owning_view(R&& t);                    // (2) C++20

owning_view(owning_view&&) = default;            // (3) C++20
owning_view& operator=(owning_view&&) = default; // (4) C++20
```

## 概要

`owning_view`オブジェクトを構築する。

- (1) : デフォルトコンストラクタ。元となるRangeを値初期化する。
- (2) : 元となるRangeの右辺値参照を受け取り、ムーブして所有するコンストラクタ。
- (3) : ムーブコンストラクタ。
- (4) : ムーブ代入演算子。

## 効果

- (1) : `r_`を値初期化する。
- (2) : `r_(std::move(t))`でメンバを初期化する。
- (3) : 他の`owning_view`オブジェクトからムーブ構築する。
- (4) : 他の`owning_view`オブジェクトからムーブ代入する。

ここで、`r_`は元となるRangeを保持するメンバ変数である。

## 備考

- `owning_view`はコピー不可である（コピーコンストラクタとコピー代入演算子は削除されている）。
- 元のRangeオブジェクトを所有するため、元のオブジェクトの寿命に依存しない。

## 例
```cpp example
#include <ranges>
#include <vector>
#include <iostream>

std::vector<int> get_vector() {
  return {1, 2, 3, 4, 5};
}

int main() {
  // (1) デフォルトコンストラクタ
  std::ranges::owning_view<std::vector<int>> ov1{};
  
  // (2) 右辺値参照から構築
  std::ranges::owning_view ov2{get_vector()};
  
  // (3) ムーブコンストラクタ
  auto ov3 = std::move(ov2);
  
  for (int n : ov3) {
    std::cout << n << " ";
  }
  std::cout << std::endl;
}
```
* std::ranges::owning_view[color ff0000]

### 出力
```
1 2 3 4 5 
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]
