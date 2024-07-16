# コンストラクタ
* generator[meta header]
* function[meta id-type]
* std[meta namespace]
* generator::iterator[meta class]
* cpp23[meta cpp]

```cpp
iterator(iterator&& other) noexcept;
```

## 概要
ジェネレータコルーチンのイテレータをムーブ構築する。

ジェネレータコルーチンの有効なイテレータは[`generator::begin()`](../begin.md)によって構築される。


## 効果
説明用メンバ`coroutine_`を[`exchange`](/reference/utility/exchange.md)`(other.coroutine_, {})`で初期化する。


## 例外
投げない


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc):
- [ICC](/implementation.md#icc):
- [Visual C++](/implementation.md#visual_cpp):


## 関連項目
- [`generator::begin()`](../begin.md)
