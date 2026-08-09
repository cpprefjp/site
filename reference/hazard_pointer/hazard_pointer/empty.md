# empty
* hazard_pointer[meta header]
* function[meta id-type]
* std[meta namespace]
* hazard_pointer[meta class]
* cpp26[meta cpp]

```cpp
bool empty() const noexcept;
```

## 概要
`*this`が空である（ハザードポインタを所有していない）かどうかを判定する。


## 戻り値
`*this`が空である場合にのみ`true`を返す。


## 例外
投げない


## 備考
- 空の`hazard_pointer`オブジェクトは、非関連 (unassociated) 状態のハザードポインタを所有する`hazard_pointer`オブジェクトとは異なる。空のオブジェクトはハザードポインタを1つも所有していない。


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P2530R3 Hazard Pointers for C++26](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2530r3.pdf)
- [P2422R1 Remove `nodiscard` annotations from the standard library specification](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2422r1.html)
    - C++26で`[[nodiscard]]`指定が削除された
