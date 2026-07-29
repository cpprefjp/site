# shrink_to_fit
* hive[meta header]
* std[meta namespace]
* hive[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
void shrink_to_fit(); // (1) C++26
```

## 概要
容量を要素数に近づける。


## 事前条件
型`T`が`*this`に対してムーブ挿入可能であること。


## 効果
[`capacity()`](capacity.md)を[`size()`](size.md)に近づけるという非拘束の（non-binding）リクエストを行う。

- このリクエストは、実装依存の最適化を許可するために非拘束である。
- この関数によって[`capacity()`](capacity.md)が増えることはないが、[`capacity()`](capacity.md)が縮小することはある。
- 要素の再割り当てが発生する場合がある。
- [`capacity()`](capacity.md)がすでに[`size()`](size.md)と等しい場合、何もしない。
- 新たな要素ブロックの確保中に例外が送出された場合、[`capacity()`](capacity.md)が縮小されることや再割り当てが発生することがある。それ以外で例外が送出された場合、効果は未規定である。


## 戻り値
なし


## 計算量
再割り当てが発生した場合、シーケンスのサイズに対して線形時間


## 備考
再割り当てが発生した場合、`*this`の要素の順序が変わる可能性があり、`*this`の要素を指す全ての参照・ポインタ・イテレータ、および終端イテレータは無効になる。


## 例
```cpp example
#include <hive>
#include <print>

int main()
{
  std::hive<int> h;
  h.reserve(100);
  std::println("capacity >= 100 : {}", h.capacity() >= 100);

  h.insert(1);
  h.insert(2);
  h.insert(3);

  // 容量を要素数に近づけるよう要求する
  h.shrink_to_fit();
  std::println("size = {}", h.size());
}
```
* shrink_to_fit()[color ff0000]
* h.reserve[link reserve.md]
* h.capacity()[link capacity.md]
* h.insert[link insert.md]
* h.size()[link size.md]

### 出力
```
capacity >= 100 : true
size = 3
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
- [`hive::trim_capacity`](trim_capacity.md)


## 参照
- [P0447R28 Introduction of `std::hive` to the standard library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p0447r28.html)
    - C++26で`hive`が追加された
