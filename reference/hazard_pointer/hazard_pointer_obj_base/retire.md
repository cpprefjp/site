# retire
* hazard_pointer[meta header]
* function[meta id-type]
* std[meta namespace]
* hazard_pointer_obj_base[meta class]
* cpp26[meta cpp]

```cpp
void retire(D d = D()) noexcept;
```

## 概要
ハザードポインタで保護されるオブジェクトの回収 (reclamation) をスケジュールする。

このオブジェクトを削除済みとして登録し、どのハザードポインタからも指されていないことが確認された時点で、削除器`d`によって回収 (破棄) されるようにする。


## 適格要件
- クラステンプレートパラメータ`T`が、ハザードポインタで保護可能 (hazard-protectable) な型であること。すなわち、
    - `hazard_pointer_obj_base<T, D>`型を唯一の基底クラスとして持ち、かつ
    - その基底は公開 (public) かつ非仮想基底クラスであり、かつ
    - 型`T2`, `D2`の他の組合せに対して`hazard_pointer_obj_base<T2, D2>`型を基底クラスとして持たないこと。


## 事前条件
- `*this`が型`T`のオブジェクト`x`の基底クラスサブオブジェクトであること。
- `x`が回収予約されていないこと。任意のオブジェクトの回収予約は高々1回だけ行える。
- `D`型の説明用メンバ変数`deleter`への`d`のムーブ代入が例外で終了しないこと。


## 効果
- `deleter =` [`std::move`](/reference/utility/move.md)`(d)`を評価して`x`の削除器として設定し、`x`を回収予約する。
- 回収可能となったオブジェクトを回収する可能性がある。

回収は、削除器に`x`へのポインタを渡して呼び出すことで行われる。この呼び出しが例外で終了した場合の動作は未定義である。


## 戻り値
なし


## 例外
投げない


## 備考
- ライブラリが回収 (破棄) するのは、`retire()`に渡されたオブジェクトだけである。**データ構造から取り外したオブジェクトを`retire()`し忘れると、そのオブジェクトは回収されずメモリリークになる**ので注意すること。ガベージコレクションのように未参照オブジェクトが自動的に回収されるわけではない。
- 回収は、この`retire()`の呼び出し時に即座に行われるとは限らない。実際の回収 (削除器の呼び出し) は、どのハザードポインタからも指されていないことが確認できたオブジェクトに対して、後続の`retire()`や[`make_hazard_pointer()`](../make_hazard_pointer.md)などのライブラリ呼び出しの中で、まとめて (償却的に) 行われうる。遅くともプログラムの終了までには回収される。


## 例
```cpp example
#include <hazard_pointer>
#include <atomic>
#include <print>

struct Data : std::hazard_pointer_obj_base<Data> {
  int value;
  explicit Data(int v) : value(v) {}
};

std::atomic<Data*> data{new Data(1)};

int main()
{
  // 新しいデータで差し替え、古いデータを回収予約する
  Data* old = data.exchange(new Data(2));
  old->retire(); // 保護しているスレッドがいなくなったら回収される

  std::println("{}", data.load()->value);

  // 最後に残ったオブジェクトも回収予約する
  data.load()->retire();
}
```
* retire()[color ff0000]
* exchange[link /reference/atomic/atomic/exchange.md]
* load[link /reference/atomic/atomic/load.md]

### 出力
```
2
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`std::hazard_pointer::protect`](../hazard_pointer/protect.md)
- [`rcu_obj_base::retire`](/reference/rcu/rcu_obj_base/retire.md)


## 参照
- [P2530R3 Hazard Pointers for C++26](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2530r3.pdf)
