# reserve
* hive[meta header]
* std[meta namespace]
* hive[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
void reserve(size_type n); // (1) C++26
```

## 概要
指定した要素数を格納できるよう容量を確保する。


## 効果
`n <= capacity()`である場合、何もしない。そうでなければ、予約ブロックを確保することで[`capacity()`](capacity.md)を増加させる。


## 戻り値
なし


## 事後条件
`capacity() >= n`である。


## 例外
事後条件を満たすことで[`capacity()`](capacity.md)が[`max_size()`](max_size.md)を超える場合、`length_error`例外を送出する。また、アロケータが送出するあらゆる例外を送出する。


## 計算量
確保される予約ブロックの数に対して線形時間


## 備考
`*this`の要素を指す全ての参照・ポインタ・イテレータ、および終端イテレータは有効なまま保たれる。


## 例
```cpp example
#include <hive>
#include <print>

int main()
{
  std::hive<int> h;

  // 100要素分の領域を予約する
  h.reserve(100);
  std::println("capacity >= 100 : {}", h.capacity() >= 100);

  // 予約済みの領域に要素を挿入する
  int* p = &*h.insert(42);

  // 予約した容量の範囲内では、挿入時に新たなメモリ確保が発生しない
  for (int i = 0; i < 50; ++i) {
    h.insert(i);
  }
  std::println("{}", *p);
}
```
* reserve[color ff0000]
* h.capacity()[link capacity.md]
* h.insert[link insert.md]

### 出力
```
capacity >= 100 : true
42
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
- [`hive::shrink_to_fit`](shrink_to_fit.md)
- [`hive::trim_capacity`](trim_capacity.md)


## 参照
- [P0447R28 Introduction of `std::hive` to the standard library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p0447r28.html)
    - C++26で`hive`が追加された
- [LWG Issue 4379. `hive::reserve()` needs *Throws:* element adjusted to match block min/max considerations](https://cplusplus.github.io/LWG/issue4379)
    - C++26で、`capacity()`が`max_size()`を超える場合に`length_error`を送出するよう例外指定が明確化された
