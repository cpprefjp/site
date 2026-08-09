# hazard_pointer
* hazard_pointer[meta header]
* cpp26[meta cpp]

`<hazard_pointer>`ヘッダは、ハザードポインタ (hazard pointer) による安全な遅延回収 (safe deferred reclamation) の機能を提供する。

ハザードポインタは、複数スレッドから並行に参照される動的オブジェクトを、参照中に破棄されないよう保護するための仕組みである。ロックフリーなデータ構造で、あるスレッドがオブジェクトを参照している間、別のスレッドがそのオブジェクトを安全に回収 (reclaim) できるようにする。

- オブジェクトを保護する側のスレッドは、[`hazard_pointer`](hazard_pointer/hazard_pointer.md)オブジェクトを取得し、参照するオブジェクトを指すよう設定する（保護）。
- オブジェクトを削除する側のスレッドは、削除したオブジェクトを[`retire()`](hazard_pointer/hazard_pointer_obj_base/retire.md)メンバ関数で回収予約する。予約されたオブジェクトは、どのハザードポインタからも指されていないことが確認された後に回収される（遅延回収）。

ハザードポインタで保護できるオブジェクトは、[`hazard_pointer_obj_base`](hazard_pointer/hazard_pointer_obj_base.md)を基底クラスとして継承する必要がある。


## クラス

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`hazard_pointer_obj_base`](hazard_pointer/hazard_pointer_obj_base.md) | ハザードポインタで保護可能なオブジェクトの基底クラス (class template) | C++26 |
| [`hazard_pointer`](hazard_pointer/hazard_pointer.md) | ハザードポインタを所有するクラス (class) | C++26 |


## 関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`make_hazard_pointer`](hazard_pointer/make_hazard_pointer.md) | ハザードポインタを構築する | C++26 |
| [`make_hazard_pointer_batch`](hazard_pointer/make_hazard_pointer_batch.md) | 複数のハザードポインタをまとめて構築する | C++29 |
| [`clear_hazard_pointer_batch`](hazard_pointer/clear_hazard_pointer_batch.md) | 複数のハザードポインタをまとめて破棄する | C++29 |


## バージョン
### 言語
- C++26


## 関連項目
- [`<atomic>`](atomic.md)


## 参照
- [P2530R3 Hazard Pointers for C++26](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2530r3.pdf)
    - C++26で`<hazard_pointer>`ヘッダが追加された
- [P2422R1 Remove `nodiscard` annotations from the standard library specification](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2422r1.html)
    - C++26で`[[nodiscard]]`指定が削除された
