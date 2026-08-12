# hazard_pointer
* hazard_pointer[meta header]
* class[meta id-type]
* std[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std {
  class hazard_pointer;
}
```

## 概要
`hazard_pointer`は、1つのハザードポインタを所有するクラスである。

このクラスのオブジェクトは、「空 (empty)」であるか、ちょうど1つのハザードポインタを所有するかのいずれかである。ハザードポインタは同時に高々1つのスレッドから所有され、その所有スレッドだけが値を設定できる。ムーブのみ可能で、コピーはできない。

オブジェクトは通常、[`make_hazard_pointer()`](make_hazard_pointer.md)関数で構築する。参照したい共有オブジェクトを[`protect()`](hazard_pointer/protect.md)メンバ関数で保護すると、その保護が解除される (デストラクタや[`reset_protection()`](hazard_pointer/reset_protection.md)メンバ関数) まで、そのオブジェクトは[`retire()`](hazard_pointer_obj_base/retire.md)されても回収されない。

```cpp
std::hazard_pointer h = std::make_hazard_pointer();
Data* p = h.protect(shared_ptr_atomic); // 保護開始
// ... *p を安全に参照できる ...
// h のスコープ終了で保護終了
```


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](hazard_pointer/op_constructor.md) | コンストラクタ | C++26 |
| [`(destructor)`](hazard_pointer/op_destructor.md) | デストラクタ | C++26 |
| [`operator=`](hazard_pointer/op_assign.md) | ムーブ代入演算子 | C++26 |
| [`empty`](hazard_pointer/empty.md) | 空かどうかを判定する | C++26 |
| [`protect`](hazard_pointer/protect.md) | オブジェクトを保護する | C++26 |
| [`try_protect`](hazard_pointer/try_protect.md) | オブジェクトの保護を試みる | C++26 |
| [`reset_protection`](hazard_pointer/reset_protection.md) | 保護を解除する | C++26 |
| [`swap`](hazard_pointer/swap.md) | 他の`hazard_pointer`オブジェクトと入れ替える | C++26 |


## 非メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`swap`](hazard_pointer/swap_free.md) | 2つの`hazard_pointer`オブジェクトを入れ替える | C++26 |
| [`make_hazard_pointer`](make_hazard_pointer.md) | ハザードポインタを構築する | C++26 |
| [`make_hazard_pointer_batch`](make_hazard_pointer_batch.md) | 複数のハザードポインタをまとめて構築する | C++29 |
| [`clear_hazard_pointer_batch`](clear_hazard_pointer_batch.md) | 複数のハザードポインタをまとめて破棄する | C++29 |


## 例
```cpp example
#include <hazard_pointer>
#include <atomic>
#include <thread>
#include <print>

struct Data : std::hazard_pointer_obj_base<Data> {
  int value;
  explicit Data(int v) : value(v) {}
};

// 複数スレッドから並行にアクセスされる共有データ
std::atomic<Data*> data{new Data(0)};

// 読み込み側スレッド
void reader()
{
  // ハザードポインタで共有データを保護してから参照する
  std::hazard_pointer h = std::make_hazard_pointer();
  Data* p = h.protect(data);

  // 更新側スレッドが data を差し替えて retire しても、
  // このハザードポインタが保護している間は *p は回収されない
  std::println("{}", p->value);
} // h のデストラクタで保護が解除される

// 更新側スレッド
void updater()
{
  // 新しいデータで差し替え、取り外した古いデータを回収予約する
  // (現役のオブジェクトは他スレッドが参照しうるので retire しない。
  //  差し替えて取り外したものだけを retire する)
  Data* old = data.exchange(new Data(1));
  old->retire();
}

int main()
{
  // 読み込みスレッドと更新スレッドを並行に実行する
  {
    std::jthread r{reader};
    std::jthread w{updater};
  } // 両スレッドの終了を待つ

  // 最後に data が指しているオブジェクトも回収予約する
  // (取り外したオブジェクトを retire し忘れると回収されずリークするので注意)
  data.load()->retire();
}
```
* std::hazard_pointer[color ff0000]
* std::hazard_pointer_obj_base[link hazard_pointer_obj_base.md]
* std::make_hazard_pointer[link make_hazard_pointer.md]
* h.protect[link hazard_pointer/protect.md]
* old->retire()[link hazard_pointer_obj_base/retire.md]
* exchange[link /reference/atomic/atomic/exchange.md]
* data.load()[link /reference/atomic/atomic/load.md]
* std::jthread[link /reference/thread/jthread.md]

### 出力例
```
0
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
- [`std::hazard_pointer_obj_base`](hazard_pointer_obj_base.md)
- [`std::make_hazard_pointer`](make_hazard_pointer.md)


## 参照
- [P2530R3 Hazard Pointers for C++26](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2530r3.pdf)
    - C++26で追加された
- [P2422R1 Remove `nodiscard` annotations from the standard library specification](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2422r1.html)
    - C++26で`empty`メンバ関数の`[[nodiscard]]`指定が削除された
