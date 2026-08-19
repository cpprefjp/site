# stdatomic.h
* stdatomic.h[meta header]
* cpp23[meta cpp]

`<stdatomic.h>`はC++の[`<atomic>`](atomic.md)ライブラリの機能をC言語と相互運用するための互換ライブラリである。

このヘッダは、[`<atomic>`](atomic.md)ライブラリのすべての機能が、別名定義もしくはusing宣言によって、グローバル名前空間に定義される。


`intN_t`、`uintN_t`、`intptr_t`、`uintptr_t`に対するアトミック型は、それらの整数型が定義される場合にのみ定義される。

## バージョン
### 言語
- C++23

### 処理系

- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照
- [P0943R6 Support C atomics in C++](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p0943r6.html)
- [LWG Issue 3671. `atomic_fetch_xor` missing from `stdatomic.h`](https://cplusplus.github.io/LWG/issue3671)
    - C++23で、`<stdatomic.h>`のシノプシスに`atomic_fetch_xor`/`atomic_fetch_xor_explicit`のusing宣言が追加された（C23・`<atomic>`との整合をとるための欠落補完）
- [LWG Issue 4480. `<stdatomic.h>` should provide `ATOMIC_CHAR8_T_LOCK_FREE`](https://cplusplus.github.io/LWG/issue4480)
    - C++26で、`atomic_char8_t`に対応するロックフリー判定マクロ[`ATOMIC_CHAR8_T_LOCK_FREE`](atomic/lock_free_property.md)が`<stdatomic.h>`のシノプシスに追加された（C23の`<stdatomic.h>`との整合をとるための欠落補完）
