# コンストラクタ
* latch[meta header]
* std[meta namespace]
* latch[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr explicit latch(ptrdiff_t expected); // (1)
latch(const latch&) = delete;                 // (2)
```

## latchオブジェクトの構築
- (1) : カウンタ値を`expected`として、`latch`オブジェクトの初期化を行う。
- (2) : コピーコンストラクタ。コピー不可。


## 事前条件
`expected >= 0` かつ `expected <=` [`max()`](max.md)


## 例外
投げない


## 例
```cpp example
#include <latch>

// カウンタ値1のラッチを定義
std::latch latch{1};

int main() {}
```
* std::latch[color ff0000]

### 出力
```
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 11.0 [mark verified]
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
