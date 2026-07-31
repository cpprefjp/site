# swap
* hive[meta header]
* std[meta namespace]
* hive[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
void swap(hive& x)
  noexcept(allocator_traits<Allocator>::propagate_on_container_swap::value ||
           allocator_traits<Allocator>::is_always_equal::value); // C++26
```

## 概要
他の`hive`オブジェクトと内容を入れ替える。


## 効果
`*this`の内容、[`capacity()`](capacity.md)、および要素ブロックの現在の容量制限（`current-limits`）を`x`のものと交換する。


## 戻り値
なし


## 計算量
定数時間


## 備考
この操作によって、要素へのポインタ・参照・イテレータが指す先の要素は変わらず、交換後もそれぞれの要素を指し続ける。ただしそれらが所属するコンテナは入れ替わる。


## 例
```cpp example
#include <hive>
#include <print>

int main()
{
  std::hive<int> h1;
  h1.insert(1);
  h1.insert(2);

  std::hive<int> h2;
  h2.insert(3);

  h1.swap(h2);

  std::print("h1: ");
  for (int x : h1) {
    std::print("{} ", x);
  }
  std::println("");

  std::print("h2: ");
  for (int x : h2) {
    std::print("{} ", x);
  }
  std::println("");
}
```
* swap[color ff0000]
* h1.insert[link insert.md]
* h2.insert[link insert.md]

### 出力例
```
h1: 3 
h2: 1 2 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目

| 名前                          | 説明                                |
|-------------------------------|-------------------------------------|
| [`swap`](swap_free.md)        | 2つの`hive`オブジェクトを入れ替える |


## 参照
- [P0447R28 Introduction of `std::hive` to the standard library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p0447r28.html)
    - C++26で`hive`が追加された
