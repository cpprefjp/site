# stdckdint.h
* stdckdint.h[meta header]
* cpp26[meta cpp]

`<stdckdint.h>`はC23で追加された検査付き整数演算ライブラリをC++から使用するための互換ヘッダである。

C言語では型総称マクロ (type-generic macro) として提供される関数が、C++では関数テンプレートとして提供される。

このヘッダで宣言される関数およびマクロは`std`名前空間に属さず、グローバル名前空間に定義される。C++の対応するヘッダとして`<cstdckdint>`は提供されない。これは、C言語との相互運用性を重視し、CとC++の両方でコンパイル可能なコードを記述できるようにするためである。


## マクロ

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `__STDC_VERSION_STDCKDINT_H__` | ヘッダのバージョン (`202311L`) | C++26 |


## 検査付き整数演算

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`ckd_add`](stdckdint.h/ckd_add.md) | 検査付き整数の加算 (function template) | C++26 |
| [`ckd_sub`](stdckdint.h/ckd_sub.md) | 検査付き整数の減算 (function template) | C++26 |
| [`ckd_mul`](stdckdint.h/ckd_mul.md) | 検査付き整数の乗算 (function template) | C++26 |


## バージョン
### 言語
- C++26

### 処理系

- [Clang](/implementation.md#clang): 21 [mark verified]
- [GCC](/implementation.md#gcc): 15 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 参照
- [N2683 Towards Integer Safety](https://www.open-std.org/jtc1/sc22/wg14/www/docs/n2683.pdf)
- [P3370R1 Add new C headers as C++ headers](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3370r1.html)