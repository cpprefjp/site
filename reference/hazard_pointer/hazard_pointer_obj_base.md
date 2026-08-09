# hazard_pointer_obj_base
* hazard_pointer[meta header]
* class template[meta id-type]
* std[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std {
  template <class T, class D = default_delete<T>>
  class hazard_pointer_obj_base;
}
```
* default_delete[link /reference/memory/default_delete.md]

## 概要
`hazard_pointer_obj_base`は、ハザードポインタで保護する対象とする型の基底クラスである。

使用するときは、型`T`で`hazard_pointer_obj_base`を公開かつ非仮想で継承した上で、派生クラス`T`を`hazard_pointer_obj_base`のテンプレート引数にする(CRTP)。

```cpp
struct Data : std::hazard_pointer_obj_base<Data> {
  // ...
};
```

型`T`が、ちょうど1つの`public`かつ非仮想な基底クラス`hazard_pointer_obj_base<T, D>`をもち、ほかに`hazard_pointer_obj_base<T2, D2>`型の基底クラスをもたないとき、その型は「ハザードポインタで保護可能な型」(hazard-protectable type)となる。

テンプレートパラメータ`D`は、オブジェクトの削除方法を指定する関数オブジェクト型であり、既定では[`default_delete`](/reference/memory/default_delete.md)`<T>`(`delete`式による破棄)となる。


## 適格要件
- `T`は不完全型でもよいが、特殊化された`hazard_pointer_obj_base`のメンバが参照されるまでに完全型とすること。
- `D`は関数オブジェクト型であり、`D`型の値`d`と`T*`型の値`ptr`に対して式`d(ptr)`が有効であること。
- `D`型は要件 Cpp17DefaultConstructible および Cpp17MoveAssignable を満たすこと。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](hazard_pointer_obj_base/op_constructor.md) | コンストラクタ | C++26 |
| `(destructor)` | デストラクタ | C++26 |
| [`operator=`](hazard_pointer_obj_base/op_assign.md) | 代入演算子 | C++26 |
| [`retire`](hazard_pointer_obj_base/retire.md) | オブジェクト回収をスケジュールする | C++26 |


## 備考
- このクラステンプレートに対する特殊化を追加するプログラムの動作は未定義である。


## 例
```cpp example
#include <hazard_pointer>
#include <atomic>
#include <print>

struct Data : std::hazard_pointer_obj_base<Data> {
  int value;
  explicit Data(int v) : value(v) {}
};

// 共有データを指すポインタ
std::atomic<Data*> data{new Data(1)};

int main()
{
  // 読み込み側: ハザードポインタで保護してから参照する
  std::hazard_pointer h = std::make_hazard_pointer();
  Data* p = h.protect(data);
  std::println("{}", p->value);

  // 更新側: 差し替えて古いオブジェクトを回収予約する
  Data* old = data.exchange(new Data(2));
  old->retire(); // 保護が解除されてから回収される

  // 最後に残ったオブジェクトも回収予約する
  // (取り外したオブジェクトを retire し忘れると回収されずリークするので注意)
  data.load()->retire();
}
```
* std::hazard_pointer_obj_base[color ff0000]
* std::make_hazard_pointer[link make_hazard_pointer.md]
* h.protect[link hazard_pointer/protect.md]
* old->retire()[link hazard_pointer_obj_base/retire.md]
* exchange[link /reference/atomic/atomic/exchange.md]
* data.load()[link /reference/atomic/atomic/load.md]

### 出力
```
1
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
- [`std::hazard_pointer`](hazard_pointer.md)
- [`std::make_hazard_pointer`](make_hazard_pointer.md)
- [`rcu_obj_base`](/reference/rcu/rcu_obj_base.md)


## 参照
- [P2530R3 Hazard Pointers for C++26](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2530r3.pdf)
    - C++26で追加された
