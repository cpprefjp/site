# コンストラクタ
* ranges[meta header]
* std::ranges[meta namespace]
* slide_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr explicit
slide_view(V base, range_difference_t<V> n);   // (1) C++23
```

## 概要

`slide_view`オブジェクトを構築する。

- (1) : 元となるRangeとスライドサイズを受け取るコンストラクタ。

## 効果

- (1) : `base_(std::move(base))`、`n_(n)`で初期化する。

ここで、`base_`は元となるRangeを保持するメンバ変数、`n_`はスライドサイズを保持するメンバ変数である。

## 事前条件

- (1) : `n > 0`

## 例
```cpp example
#include <ranges>
#include <vector>
#include <print>

int main() {
  std::vector<int> v = {1, 2, 3, 4, 5, 6};

  // 元となるRangeとスライドサイズを指定
  std::ranges::slide_view sv{v, 3};

  std::println("{}", sv);
}
```

### 出力
```
[[1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6]]
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 17 [mark verified]
- [GCC](/implementation.md#gcc): 13.0 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 3 [mark verified]

## 参照
- [N4950 26.7.31 Slide view](https://timsong-cpp.github.io/cppwp/n4950/range.slide)
- [LWG Issue 3711. Missing preconditions for slide_view constructor](https://cplusplus.github.io/LWG/issue3711)
    - C++23で、コンストラクタ(1)に事前条件`n > 0`が追加された
- [LWG Issue 3712. chunk_view and slide_view should not be default_initializable](https://cplusplus.github.io/LWG/issue3712)
    - C++23で、事前条件`n > 0`を満たせないデフォルトコンストラクタが削除された
