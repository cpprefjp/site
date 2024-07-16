# デストラクタ
* functional[meta header]
* std[meta namespace]
* move_only_function[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
~move_only_function();
```

## 概要
`move_only_function`オブジェクトを破棄する。


## 効果
`*this`が有効な関数ポインタ、メンバポインタ、もしくは関数オブジェクトを持っている場合、その関数を解放する。


## 例外
投げない


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0288R9 move_only_function](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p0288r9.html)
