# trim_capacity
* hive[meta header]
* std[meta namespace]
* hive[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
void trim_capacity() noexcept;         // (1) C++26
void trim_capacity(size_type n) noexcept; // (2) C++26
```

## 概要
予約ブロックを解放して容量を削減する。

要素を格納していない要素ブロック（予約ブロック）を解放することで、[`capacity()`](capacity.md)を削減する。


## 効果
- (1) : すべての予約ブロックを解放し、それに応じて[`capacity()`](capacity.md)を削減する。
- (2) : `n >= capacity()`が`true`である場合、何もしない。そうでない場合、[`capacity()`](capacity.md)を`n`以上の値まで削減する。


## 戻り値
なし


## 計算量
解放される予約ブロックの数に対して線形時間。


## 備考
`*this`の要素を指すすべての参照、ポインタ、イテレータ、および終端イテレータは有効なままである。


## 例
```cpp example
#include <hive>
#include <print>

int main()
{
  std::hive<int> h;

  // 100要素分の容量を予約する
  h.reserve(100);
  std::println("capacity = {}", h.capacity());

  // 予約ブロックを解放して容量を削減する
  h.trim_capacity();
  std::println("capacity = {}", h.capacity());
}
```
* trim_capacity[color ff0000]
* h.reserve[link reserve.md]
* h.capacity()[link capacity.md]

### 出力例
```
capacity = 100
capacity = 0
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`hive::capacity`](capacity.md)
- [`hive::reserve`](reserve.md)
- [`hive::shrink_to_fit`](shrink_to_fit.md)


## 参照
- [P0447R28 Introduction of `std::hive` to the standard library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p0447r28.html)
    - C++26で追加された
