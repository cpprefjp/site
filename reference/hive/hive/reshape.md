# reshape
* hive[meta header]
* std[meta namespace]
* hive[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
void reshape(hive_limits block_limits); // C++26
```
* hive_limits[link ../hive_limits.md]

## 概要
要素ブロックの容量制限を変更する。

要素ブロックが保持できる要素数の下限・上限（[`hive_limits`](../hive_limits.md)）を`block_limits`に変更する。新しい制限の範囲外となる要素ブロックがあれば、その要素を範囲内の要素ブロックに再割り当てし、範囲外の要素ブロックを解放する。


## 事前条件
型`T`が`*this`に対してムーブ挿入可能であること。


## 効果
`block_limits`の範囲外にあるすべてのアクティブブロックについて、そのブロック内の要素を、範囲内にある新規または既存の要素ブロックへ再割り当てする。`block_limits`の範囲外にある要素ブロックはすべて解放する。

新しい要素ブロックの確保中に例外が送出された場合、[`capacity()`](capacity.md)は削減されることがあり、再割り当てが発生することがあり、現在の容量制限に`block_limits`以外の値が設定されることがある。そうでない場合、現在の容量制限に`block_limits`が設定される。それ以外の例外が送出された場合の効果は未規定である。


## 戻り値
なし


## 事後条件
[`size()`](size.md)は変化しない。


## 計算量
`*this`の要素ブロックの数に対して線形時間。再割り当てが発生する場合、加えて再割り当てされる要素の数に対して線形時間。


## 備考
この操作は[`capacity()`](capacity.md)を変化させることがある。再割り当てが発生する場合、`*this`の要素の順序が変化することがあり、`*this`の要素を指すすべての参照、ポインタ、イテレータ、および終端イテレータが無効になる。再割り当てが発生しなかった場合、これらは有効なままである。


## 例
```cpp example
#include <hive>
#include <print>

int main()
{
  // 最小3・最大16の容量制限で構築する
  std::hive<int> h{std::hive_limits{3, 16}};

  for (int i = 0; i < 100; ++i) {
    h.insert(i);
  }

  // 容量制限をより大きなブロックへ変更する
  h.reshape(std::hive_limits{32, 64});

  std::println("min={}, max={}", h.block_capacity_limits().min,
                                 h.block_capacity_limits().max);
  std::println("size={}", h.size());
}
```
* reshape[color ff0000]
* std::hive_limits[link ../hive_limits.md]
* h.insert[link insert.md]
* h.block_capacity_limits()[link block_capacity_limits.md]
* h.size()[link size.md]

### 出力
```
min=32, max=64
size=100
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`hive_limits`](../hive_limits.md)
- [`hive::block_capacity_limits`](block_capacity_limits.md)
- [`hive::is_within_hard_limits`](is_within_hard_limits.md)


## 参照
- [P0447R28 Introduction of `std::hive` to the standard library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p0447r28.html)
    - C++26で追加された
