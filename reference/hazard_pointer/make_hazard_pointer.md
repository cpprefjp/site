# make_hazard_pointer
* hazard_pointer[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  hazard_pointer make_hazard_pointer();
}
```
* hazard_pointer[link hazard_pointer.md]

## 概要
新しいハザードポインタを構築し、それを所有する[`hazard_pointer`](hazard_pointer.md)オブジェクトを返す。


## 効果
ハザードポインタを構築する。


## 戻り値
新しく構築したハザードポインタを所有する[`hazard_pointer`](hazard_pointer.md)オブジェクト。


## 例外
ハザードポインタ用のメモリを確保できなかった場合、[`std::bad_alloc`](/reference/new/bad_alloc.md)を送出する可能性がある。


## 例
```cpp example
#include <hazard_pointer>
#include <atomic>
#include <print>

struct Data : std::hazard_pointer_obj_base<Data> {
  int value;
  explicit Data(int v) : value(v) {}
};

std::atomic<Data*> data{new Data(7)};

int main()
{
  // ハザードポインタを構築する
  std::hazard_pointer h = std::make_hazard_pointer();

  Data* p = h.protect(data);
  std::println("{}", p->value);

  // 後始末: 共有データが指すオブジェクトを回収予約する
  data.load()->retire();
}
```
* std::make_hazard_pointer[color ff0000]
* std::hazard_pointer_obj_base[link hazard_pointer_obj_base.md]
* h.protect[link hazard_pointer/protect.md]
* data.load()[link /reference/atomic/atomic/load.md]
* retire()[link hazard_pointer_obj_base/retire.md]

### 出力
```
7
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


## 参照
- [P2530R3 Hazard Pointers for C++26](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2530r3.pdf)
