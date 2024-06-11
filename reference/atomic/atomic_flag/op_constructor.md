# コンストラクタ
* atomic[meta header]
* std[meta namespace]
* atomic_flag[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
atomic_flag() noexcept = default;         // (1) C++11
constexpr atomic_flag() noexcept;         // (1) C++20

atomic_flag(const atomic_flag&) = delete; // (2) C++11
atomic_flag(atomic_flag&&) = delete;      // (3) C++11

atomic_flag(FOR_ATOMIC_FLAG_INIT);        // (4) C++11
                                          // (4) C++20で非推奨
```

## 概要
- (1) : デフォルトコンストラクタ
- (2) : コピーコンストラクタ。コピー禁止
- (3) : ムーブコンストラクタ。ムーブ禁止
- (4) : `ATOMIC_FLAG_INIT`マクロのための特別なコンストラクタ。フラグをクリアする。`atomic_flag`クラスのデフォルトコンストラクタはデフォルト定義されるため、デフォルト構築では未初期化状態となる。


## 効果
- (1) :
    - C++11 : フラグを未初期化状態にする
    - C++14 : フラグを未規定の状態にする
    - C++20 : フラグをクリア状態にする
- (4) :
    - `ATOMIC_FLAG_INIT`マクロを使用することで、フラグがクリアされた状態となる
    - C++11 : このマクロを、静的な有効期間を持つ`atomic_flag`オブジェクトに使用した場合、その初期化は静的に行われる
    - C++14 : このマクロを、完全に静的な有効期間を持つ`atomic_flag`オブジェクトに使用した場合、その初期化は静的に行われる


## 例
```cpp example
#include <iostream>
#include <atomic>

int main()
{
  std::atomic_flag x = ATOMIC_FLAG_INIT;
}
```
* std::atomic_flag[link /reference/atomic/atomic_flag.md]
* ATOMIC_FLAG_INIT[link /reference/atomic/atomic_flag_init.md]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2013 [mark verified]
    - 2012はコピーコンストラクタのdeleteに対応していないため、代わりにprivateで宣言のみ行う手法で代用されている。

## 参照
- [LWG Issue 2159. `atomic_flag` initialization](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2159)
- [P0883R2 Fixing Atomic Initialization, Rev2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0883r2.pdf)
