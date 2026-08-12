# clear_hazard_pointer_batch
* hazard_pointer[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp29[meta cpp]

```cpp
namespace std {
  void clear_hazard_pointer_batch(span<hazard_pointer> batch) noexcept; // C++29
}
```
* span[link /reference/span/span.md]
* hazard_pointer[link hazard_pointer.md]

## 概要
複数のハザードポインタを、まとめて破棄する。

`batch`に含まれる非空の[`hazard_pointer`](hazard_pointer.md)オブジェクトそれぞれが所有するハザードポインタを破棄し、その要素を空にする。個別に破棄するよりも、複数のハザードポインタをまとめて破棄することでレイテンシを低減できる。

[`make_hazard_pointer_batch()`](make_hazard_pointer_batch.md)で構築したハザードポインタ群をまとめて破棄する用途に使用する。


## 効果
`batch`の各要素`e`について、`e.`[`empty()`](hazard_pointer/empty.md)が`false`であるものは、`e`が所有するハザードポインタを破棄し、`e`を空にする。

破棄されたハザードポインタが保護していたオブジェクトは、他に保護しているハザードポインタがなければ回収可能となる。


## 戻り値
なし


## 例外
投げない


## 備考
- 既に空の要素は変更されない。


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

std::atomic<Data*> data{new Data(42)};

int main()
{
  // ハザードポインタ群をまとめて構築する
  std::array<std::hazard_pointer, 2> hp;
  std::make_hazard_pointer_batch(hp);

  Data* p = hp[0].protect(data);
  std::println("{}", p->value);

  // 使い終わったハザードポインタ群をまとめて破棄する
  std::clear_hazard_pointer_batch(hp);

  // 後始末: 共有データを回収予約する
  data.load()->retire();
}
```
* std::clear_hazard_pointer_batch[color ff0000]
* std::hazard_pointer_obj_base[link hazard_pointer_obj_base.md]
* std::make_hazard_pointer_batch[link make_hazard_pointer_batch.md]
* hp[0].protect[link hazard_pointer/protect.md]
* load[link /reference/atomic/atomic/load.md]
* retire()[link hazard_pointer_obj_base/retire.md]

### 出力
```
42
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
- [`std::make_hazard_pointer_batch`](make_hazard_pointer_batch.md)
- [`std::hazard_pointer`](hazard_pointer.md)


## 参照
- [P3428R4 Hazard Pointer Batches](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3428r4.pdf)
    - C++29で追加された
