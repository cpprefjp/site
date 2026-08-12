# protect
* hazard_pointer[meta header]
* function[meta id-type]
* std[meta namespace]
* hazard_pointer[meta class]
* cpp26[meta cpp]

```cpp
template <class T>
T* protect(const atomic<T*>& src) noexcept;
```

## 概要
アトミックオブジェクト`src`が現在指しているオブジェクトを、このハザードポインタで保護する。

保護に成功すると、`src`が指していたオブジェクトは、この保護が解除されるまで、[`retire()`](../hazard_pointer_obj_base/retire.md)されても回収されない。


## テンプレートパラメータ制約
- `T`はハザードポインタで保護可能 (hazard-protectable) な型であること。


## 事前条件
- `*this`が空でないこと。


## 効果
以下と等価である：

```cpp
T* ptr = src.load(memory_order::relaxed);
while (!try_protect(ptr, src)) {}
return ptr;
```
* src.load[link /reference/atomic/atomic/load.md]
* memory_order::relaxed[link /reference/atomic/memory_order.md]
* try_protect[link try_protect.md]


## 戻り値
保護したオブジェクトを指すポインタ。


## 例外
投げない


## 例
```cpp example
#include <hazard_pointer>
#include <atomic>
#include <print>

struct Data : std::hazard_pointer_obj_base<Data> {
  int value;
  explicit Data(int v) : value(v) {}
};

std::atomic<Data*> data{new Data(42)};

int main()
{
  std::hazard_pointer h = std::make_hazard_pointer();

  // data が指すオブジェクトを保護して安全に参照する
  Data* p = h.protect(data);
  std::println("{}", p->value);

  // 後始末: 共有データが指すオブジェクトを回収予約する
  data.load()->retire();
}
```
* h.protect[color ff0000]
* std::make_hazard_pointer[link ../make_hazard_pointer.md]
* data.load()[link /reference/atomic/atomic/load.md]
* retire()[link ../hazard_pointer_obj_base/retire.md]

### 出力
```
42
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
- [`std::hazard_pointer::try_protect`](try_protect.md)
- [`std::hazard_pointer::reset_protection`](reset_protection.md)


## 参照
- [P2530R3 Hazard Pointers for C++26](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2530r3.pdf)
