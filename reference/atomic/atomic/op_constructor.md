# コンストラクタ
* atomic[meta header]
* std[meta namespace]
* atomic[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
atomic() noexcept = default;                       // (1) C++11
constexpr atomic()
  noexcept(is_nothrow_default_constructible_v<T>); // (1) C++20

constexpr atomic(T desired) noexcept;              // (2) C++11

atomic(const atomic&) = delete;                    // (3) C++11
atomic(atomic&&) = delete;                         // (4) C++11
```
* is_nothrow_default_constructible_v[link /reference/type_traits/is_nothrow_default_constructible.md]

## 概要
- (1) : デフォルトコンストラクタ
- (2) : `desired`でオブジェクトを初期化する
- (3) : コピーコンストラクタ。コピー不可
- (4) : ムーブコンストラクタ。ムーブ不可


## 効果
- (1) :
    - C++17 : `atomic`オブジェクトを未初期化状態にする (C言語との互換性のため)
    - C++20 : `atomic`オブジェクトを`T()`で初期化する。この初期化はアトミック操作ではないことに注意
- (2) :
    - パラメータ`desired`の値を、メンバ変数として保持する。この初期化はアトミック操作ではないことに注意


## 例外
- (1) :
    - C++17 : 投げない
    - C++20 : 型`T`のデフォルトコンストラクタ例外を投げない場合、この関数は例外を投げない
- (2) :
    - 投げない


## 例
```cpp example
#include <iostream>
#include <atomic>

int main()
{
  // デフォルト構築。
  // C++17までは不定値、
  // C++20からは値ゼロで初期化される
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
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified], 2013 [mark verified]
	- 2012はコピーコンストラクタのdeleteに対応していないため、代わりにprivateで宣言のみ行う手法で代用されている。


## 参照
- [P0883R2 Fixing Atomic Initialization, Rev2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0883r2.pdf)
