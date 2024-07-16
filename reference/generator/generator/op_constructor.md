# コンストラクタ
* generator[meta header]
* std[meta namespace]
* generator[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
generator(const generator&) = delete;   // (1)
generator(generator&& other) noexcept;  // (2)
```

## 概要
有効な`generator`オブジェクトは、ジェネレータ[コルーチン](/lang/cpp20/coroutines.md)呼び出しによってのみ生成される。

- (1) コピーコンストラクタ : コピー禁止。
- (2) ムーブコンストラクタ


## 例外
投げない


## 備考
- (2) ムーブ前に`other`から取得したイテレータは無効化されず、`*this`に対応するイテレータとなる。


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
