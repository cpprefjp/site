# make_hazard_pointer_batch
* hazard_pointer[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp29[meta cpp]

```cpp
namespace std {
  void make_hazard_pointer_batch(span<hazard_pointer> batch); // C++29
}
```
* span[link /reference/span/span.md]
* hazard_pointer[link hazard_pointer.md]

## 概要
複数のハザードポインタを、まとめて構築する。

`batch`に含まれる空の[`hazard_pointer`](hazard_pointer.md)オブジェクトそれぞれに、新しく構築したハザードポインタを所有させる。[`make_hazard_pointer()`](make_hazard_pointer.md)を個別に呼び出すよりも、複数のハザードポインタをまとめて構築することでレイテンシを低減できる。


## 効果
例外が送出された場合、何の効果も持たない (強い例外安全性の保証)。

そうでなければ、`batch`の各要素`e`のうち`e.`[`empty()`](hazard_pointer/empty.md)が`true`であるものについて、ハザードポインタを構築し、`e`をそのハザードポインタの所有者にする。


## 戻り値
なし


## 例外
新しく構築するハザードポインタのいずれかのメモリを確保できなかった場合、[`std::bad_alloc`](/reference/new/bad_alloc.md)を送出する可能性がある。


## 備考
- 既に非空 (ハザードポインタを所有している) の要素は変更されない。


## 例
```cpp example
#include <hazard_pointer>
#include <array>
#include <atomic>
#include <print>

struct Data : std::hazard_pointer_obj_base<Data> {
  int value;
  explicit Data(int v) : value(v) {}
};

std::atomic<Data*> d0{new Data(1)};
std::atomic<Data*> d1{new Data(2)};

int main()
{
  // 2つのハザードポインタをまとめて構築する (個別構築より低レイテンシ)
  std::array<std::hazard_pointer, 2> hp;
  std::make_hazard_pointer_batch(hp);

  // それぞれで別の共有データを保護する
  Data* p0 = hp[0].protect(d0);
  Data* p1 = hp[1].protect(d1);
  std::println("{} {}", p0->value, p1->value);

  // まとめて破棄する
  std::clear_hazard_pointer_batch(hp);

  // 後始末: 共有データを回収予約する
  d0.load()->retire();
  d1.load()->retire();
}
```
* std::make_hazard_pointer_batch[color ff0000]
* std::hazard_pointer_obj_base[link hazard_pointer_obj_base.md]
* hp[0].protect[link hazard_pointer/protect.md]
* std::clear_hazard_pointer_batch[link clear_hazard_pointer_batch.md]
* load[link /reference/atomic/atomic/load.md]
* retire()[link hazard_pointer_obj_base/retire.md]

### 出力
```
1 2
```


## バージョン
### 言語
- C++29

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`std::make_hazard_pointer`](make_hazard_pointer.md)
- [`std::clear_hazard_pointer_batch`](clear_hazard_pointer_batch.md)
- [`std::hazard_pointer`](hazard_pointer.md)


## 参照
- [P3428R4 Hazard Pointer Batches](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3428r4.pdf)
    - C++29で追加された
