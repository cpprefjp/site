# コンストラクタ
* atomic[meta header]
* std[meta namespace]
* atomic[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
atomic() noexcept = default;          // (1)
constexpr atomic(T desired) noexcept; // (2)

atomic(const atomic&) = delete;       // (3)
```

## 概要
- (1) : デフォルトコンストラクタ。
- (2) : `desired`でオブジェクトを初期化する。
- (3) : コピーコンストラクタ。コピー不可。これによって、ムーブ構築も不可となる。


## 効果
- (1) : `atomic`オブジェクトを未初期化状態にする(C言語との互換性のため)
- (2) : パラメータ`desired`の値を、メンバ変数として保持する。この初期化はアトミック操作ではないことに注意。


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <atomic>

int main()
{
  // デフォルト構築(不定値)
  std::atomic<int> a;

  // 値を指定して初期化
  std::atomic<int> b(3);

  std::cout << b.load() << std::endl;
}
```
* b.load()[link load.md]


### 出力
```
3
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013
	- 2012はコピーコンストラクタのdeleteに対応していないため、代わりにprivateで宣言のみ行う手法で代用されている。


## 参照


