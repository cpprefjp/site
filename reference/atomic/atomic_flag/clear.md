# clear
* atomic[meta header]
* std[meta namespace]
* atomic_flag[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void clear(memory_order order = memory_order_seq_cst) volatile noexcept;
void clear(memory_order order = memory_order_seq_cst) noexcept;
```
* memory_order[link /reference/atomic/memory_order.md]
* memory_order_seq_cst[link /reference/atomic/memory_order.md]

## 概要
フラグをクリアする


## 要件
`order`が以下のメモリオーダーではないこと：

- [`memory_order_consume`](/reference/atomic/memory_order.md) (C++14)
- [`memory_order_acquire`](/reference/atomic/memory_order.md)
- [`memory_order_acq_rel`](/reference/atomic/memory_order.md)


## 効果
`order`で指定されたメモリオーダーにしたがって、アトミックに`false`値を書き込む。


## 戻り値
なし


## 例外
投げない


## 例
```cpp
#include <iostream>
#include <atomic>

int main()
{
  std::atomic_flag x = ATOMIC_FLAG_INIT;

  std::cout << std::boolalpha;
  {
    // 値をtrueに設定する(変更前の値はfalse)
    bool result = x.test_and_set();
    std::cout << result << std::endl;
  }

  // 値をfalseにする
  x.clear();

  {
    // 値をtrueに設定する(変更前の値はfalse)
    bool result = x.test_and_set();
    std::cout << result << std::endl;
  }
}
```
* clear[color ff0000]
* std::atomic_flag[link /reference/atomic/atomic_flag.md]
* ATOMIC_FLAG_INIT[link /reference/atomic_atomic_flag_init.md]
* x.test_and_set()[link test_and_set.md]

### 出力
```
false
false
```

## バージョン
### 言語
- C++11


### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0


## 参照
- [LWG Issue 2138. `atomic_flag::clear` should not accept `memory_order_consume`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2138)


