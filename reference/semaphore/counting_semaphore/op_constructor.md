# コンストラクタ
* semaphore[meta header]
* std[meta namespace]
* counting_semaphore[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr explicit counting_semaphore(ptrdiff_t desired); // (1)
counting_semaphore(const counting_semaphore&) = delete;   // (2)
```

## counting_semaphoreオブジェクトの構築
- (1) : カウンタ初期値を`desired`として、`counting_semaphore`オブジェクトの初期化を行う。
- (2) : コピーコンストラクタ。コピー不可。


## 事前条件
`desired >= 0` かつ `desired <=` [`max()`](max.md)


## 例外
投げない


## 例
```cpp example
#include <semaphore>

// カウンタ 初期値0／最大値10 のセマフォを定義
std::counting_semaphore<10> sem{0};

// カウンタ 初期値1／最大値1 の(バイナリ)セマフォを定義
// このセマフォはミューテックス相当の排他制御に用いられる
std::counting_semaphore<1> mtx{1};

int main() {}
```
* std::counting_semaphore[color ff0000]

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
