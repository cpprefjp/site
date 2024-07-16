# デストラクタ
* functional[meta header]
* std[meta namespace]
* copyable_function[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
~copyable_function();
```

## 概要
`copyable_function`オブジェクトを破棄する。


## 効果
`*this`が有効な関数ポインタ、メンバポインタ、もしくは関数オブジェクトを持っている場合、その関数を解放する。


## 例外
投げない


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P2548R6 copyable_function](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2548r6.pdf)
